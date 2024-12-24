<template>
	<view style="display: flex; width: 100%;height: 100%;">
		<!-- <leftChatList :address="address" class="page-item"></leftChatList> -->
		<view class="left-page">
			<view class="new-chat" style="margin-top: 100rpx;">
				<uni-tooltip style="width: 150rpx;" placement="bottom">
					<view :class="writeIconHover == true ? 'move-hover':''" @mouseenter="writeIconHover = true"
						@mouseleave="writeIconHover = false" @click="clickNewChat"
						style="margin-right: 20rpx;width: 80rpx;height: 80rpx;border-radius: 10rpx; margin: 10rpx;">
						<uni-icons type="compose" color="#E4E4E4" size="75rpx" style="padding: 2.5rpx;"></uni-icons>
					</view>
					<template v-slot:content>
						<view class="uni-stat-tooltip">
							new chat
						</view>
					</template>
				</uni-tooltip>

			</view>
			<!-- 对话列表 -->
			<scroll-view class="listview" enableBackToTop="true" :show-scrollbar="false" scroll-y>
				<view v-for="(item,index) in conversationList" :key="index">
					<view class="one-talk" @click="clickConversation(item)"
						:class="item.chatHover == true ? 'move-hover':''" @mouseenter="item.chatHover = true"
						@mouseleave="item.chatHover = false" v-if="item.conversation_id!='' && item.first_chat_history[0].message!=''">
						<view class="ellipsis" style="margin-left: 10rpx;">
							{{item.first_chat_history[0].message}}
						</view>
					</view>
				</view>
				<!-- <zero-markdown-view :markdown="content"></zero-markdown-view> -->
			</scroll-view>
		</view>
		<view class="right-page">
			<view style="height: 80%;  display: flex;
				justify-content: center;
				align-items: center;" v-show="showGuideText">
				<!-- <view style="padding-top: 300rpx;">
						<scroll-view class="listview"  enableBackToTop="true" :show-scrollbar="false" scroll-y >
							<view>
								gfgsagas
							</view>
						</scroll-view>
					</view> -->
				<view>
					<view v-for="(item,index) in allGuideText" :key="index">
						<view class="one-question ellipsis" :class="item.clickHover == true ? 'move-hover':''"
							@mouseenter="item.clickHover = true" @mouseleave="item.clickHover = false" @click="clickGuideText(item)">
							{{item.title}}
						</view>
					</view>
				</view>

			</view>

			<scroll-view class="scroll-view" enableBackToTop="true" :show-scrollbar="true" scroll-y
				style="height: 78%; padding-bottom: 20px;" @scrolltoupper="upper"
				:scroll-into-view="scrollIntoView" v-show="!showGuideText">
				<uni-load-more :status="status" />
				<view v-for="(item,index) in allChatHistory" :key="index">
					<view class="ai" v-if="item.role=='FlowAI'" :id="`item-${index}`">
						<view class="ai-logo">
							<image src="../../static/openai.png" style="height: 50px; width: 50px;"></image>
						</view>
						<view class="ai-text">
							<zero-markdown-view :markdown="item.message" themeColor="#E4E4E4"></zero-markdown-view>
						</view>
					</view>
					<view class="user" v-else-if="item.role=='User'" :id="`item-${index}`">
						<view class="user-text">
							<text>{{item.message}}</text>
						</view>
					</view>
				</view>
				<view id="last-msg-item" style="height: 1px;"></view>

			</scroll-view>


			<view style="height: 18%; display: flex; align-items: center;">
				<view class="chat-box">
					<view class="left">
						<view class="uni-textareaa">
							<textarea style="width: 90%; font-size: 40rpx;"
								placeholder="Please enter your question here..." maxlength="300"
								@keydown.enter="handleInput" v-model="question" :disabled="uploading" auto-height />
						</view>
					</view>
					<view class="right" disable="true">
						<image src="../../static/uploading.png" style="height: 80rpx; width: 80rpx;" v-if="uploading"></image>
						<image src="../../static/upload.png" style="height: 80rpx; width: 80rpx;" @tap="upload" v-else></image>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import crypto from 'crypto-js';
	export default {
		data() {
			return {
				content: `
1. **Launch Flow Studio**: Open the application. You will see an empty workspace ready for project creation.

2. **Create New Flow Object**: Click on the 'New' icon in the toolbar or go to 'File' > 'New'. This will create a new flow object which acts as a container for your DSP design.

3. **Save Your Project**: Immediately save your flow object by clicking the save icon or pressing Ctrl+S. Choose a location and name for your project files. The flow object saves your design and DSP runtime code.

4. **Build Your DSP Flow**: Drag and drop audio processing modules from the left toolbox into the workspace. Connect them using the green connect tool. Configure each module's parameters.

5. **Create GUI (Optional)**: Design a control interface by adding knobs, sliders, and displays if needed. Connect GUI elements to corresponding DSP parameters.

6. **Add Audio Input/Output**: Include soundcard input/output objects for real-time processing and monitoring.

7. **Compile and Run**: Click the 'Build' button to compile your design. After successful compilation, click 'Run' to start processing.

8. **Monitor Performance**: Check CPU and memory usage in status window. Adjust buffer sizes if necessary. [Reference: User Guide p.10-11 - Flow Object Creation]
`,
				address: '1234',
				conversation: {},
				writeIconHover: false,
				chatHover: false,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				conversationList: [],
				question: '',
				allGuideText: [],
				showGuideText: true,
				conversationID: '',
				userID: '',
				page: 1,
				size: 8,
				allChatHistory: [],
				scrollIntoView: "",
				status: 'more',
				statusTypes: [{
					value: 'more',
					text: '加载前',
					checked: true
				}, {
					value: 'loading',
					text: '加载中',
					checked: false
				}, {
					value: 'noMore',
					text: '没有更多',
					checked: false
				}],
				uploading:false
			}
		},
		created() {
			this.getChatList(this.address)
			this.getGuideText()

		},
		onLoad(event) {
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			console.log(event.address);
			var that = this
			that.address = event.address
			that.createConversationID()
			that.createUserID()
		},

		methods: {
			upper: function(e) {
				var that = this
				if (that.status != "noMore") {
					that.status = "loading"
					var jiamiConversationId = that.aesEncrypt(that.conversationID);
					var jiamiUserId = that.aesEncrypt(that.userID);
					var jiamiAddress = that.aesEncrypt(that.address);
					that.page = that.page + 1
					uni.request({
						url: "/tomcat/flowstudio/public/chatHistory/getChatHistoryByAddressAndUserIdAndConversationId",
						method: "POST",
						data: {
							'address': jiamiAddress,
							'user_id': jiamiUserId,
							'conversation_id': jiamiConversationId,
							'page': that.page,
							'size': that.size
						},
						success(res) {
						
							var addHistory = res.data.data.allChatHistory
							if (addHistory.length == 0) {
								that.status = "noMore"
							} else {
								that.status = "more"
							}
							var allHistory = that.allChatHistory
							for (var i = 0; i < addHistory.length; i++) {
								allHistory.unshift(addHistory[i])
							}
						
							that.allChatHistory = allHistory

							that.$nextTick(() => {
								// 将scrollIntoView属性设置为"last-msg-item"，以便滚动窗口到最后一条消息
								that.scrollIntoView = "item-1"
								// 等待DOM更新，即：滚动完成
								that.$nextTick(() => {
									// 将scrollIntoView属性设置为空，以便下次设置滚动条位置可被监听
									that.scrollIntoView = ""
								})
							})

						},
						fail(res) {
							
						}
					})
				}

			},
			lower: function(e) {

			},
			scroll: function(e) {
			
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				// 解决view层不同步的问题
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
				uni.showToast({
					icon: "none",
					title: "纵向滚动 scrollTop 值已被修改为 0"
				})
			},
			getChatList(address) {
			
				var that = this
				if (address != null) {
					var jiamiAddress = that.aesEncrypt(address);
		
					uni.request({
						url: "/tomcat/flowstudio/public/chatHistory/getConversationAndUserIdListByAddress",
						method: "POST",
						data: {
							'address': jiamiAddress
						},
						success(res) {
				
							var allconversation = res.data.data.allConversation
							for (var i = 0; i < allconversation.length; i++) {
								allconversation[i].chatHover = false
							}
					
							that.conversationList = allconversation

						},
						fail(res) {
					
						}
					})
				}
			},
			//AES加密方法
			aesEncrypt(content) {
				const srcs = crypto.enc.Utf8.parse(content);
				const key = crypto.enc.Utf8.parse("7235967868936179");
				const iv = crypto.enc.Utf8.parse('5183946738049788');
				const encrypted = crypto.AES.encrypt(srcs, key, {
					iv: iv,
					mode: crypto.mode.CBC,
					padding: crypto.pad.Pkcs7
				});
				return encrypted.ciphertext.toString().toUpperCase();
			},

			clickConversation(item) {
				var that = this
				that.showGuideText = false
				that.conversationID = item.conversation_id
				that.userID = item.user_id
				that.status= 'more'
				that.page = 1
				that.size= 8
				that.getHistory()
			},
			bindTextAreaBlur: function(e) {
				
			},
			upload() {
				console.log("输入完成");
				var that = this
				if (!that.question) {
					uni.showToast({ title: 'Cannot enter empty text', icon: 'none' });
					return;
				}
				that.uploading = true
				if(that.showGuideText){
					that.allChatHistory = []
					var oneConversation={
						"chatHover":false,
						"conversation_id":that.conversationID,
						"user_id":that.userID,
						"first_chat_history":[{
							"address":that.address,
							"conversation_id":that.conversationID,
							"user_id":that.userID,
							"role":"User",
							"message":that.question
						}]
					}
					var conversationList =  that.conversationList
					conversationList.push(oneConversation)
					that.conversationList = conversationList
				}
				that.showGuideText = false
				var message = {
					'address': that.address,
					'conversation_id': that.conversationID,
					'user_id': that.userID,
					'role': 'User',
					'message': that.question
				}
				that.allChatHistory.push(message)
				var message = {
					'address': that.address,
					'conversation_id': that.conversationID,
					'user_id': that.userID,
					'role': 'FlowAI',
					'message': '...'
				}
				var needToSend =
				{
					'conversation_id': that.conversationID,
					'user_id': that.userID,
					'message': that.question
				}
				that.allChatHistory.push(message)
				that.question = ''
				that.scrollToBottom()
				var wsUrl = 'wss://dev1.tymecho.com/tomcat/flowstudio/websocket/getChatResponse/'+that.aesEncrypt(that.address)+'/'+that.aesEncrypt(new Date().getTime());
				const ws = uni.connectSocket({
				  url: wsUrl,
				  complete: () => {}
				});
				// 监听WebSocket事件
				ws.onOpen(() => {
				  console.log('WebSocket连接已打开！');
				  console.log(JSON.stringify(needToSend));
				  ws.send({
				  	data:JSON.stringify(needToSend),
				  	success: () => {
				  	      console.log('消息发送成功！');
						  var allHistory = that.allChatHistory
						  allHistory.pop()
						  var message = {
						  	'address': that.address,
						  	'conversation_id': that.conversationID,
						  	'user_id': that.userID,
						  	'role': 'FlowAI',
						  	'message': ''
						  }
						  allHistory.push(message)
						  
						  that.allChatHistory = allHistory
				  	    },
				  	    fail: (error) => {
				  	      console.error('消息发送失败：', error);
				  	    }
				  })
				});
				 
				ws.onMessage((message) => {

				  console.log(message.data.includes("CONNECT"));
				  if(message.data.includes("[DONE]")){
					  that.uploading = false 
				  }
				  if(!message.data.includes("CONNECT") && !message.data.includes("[DONE]") && !message.data.includes("退出连接")){
					  var allHistory = that.allChatHistory
					  var lastHistory = allHistory.pop()
					  lastHistory.message = lastHistory.message+message.data
					  allHistory.push(lastHistory)
					  
					  that.allChatHistory = allHistory
					  that.scrollToBottom()
				  }
				  
				});
				 
				ws.onError((error) => {
				  console.error('WebSocket连接发生错误', error);
				});
				 
				ws.onClose(() => {
				  console.log('WebSocket已关闭！');
				});
				
			},
			handleInput(event) {
				console.log(event);
				var that = this
				if (event.type === "keydown") { // Enter键的keyCode是13
					console.log("输入完成");
					that.question = ''
				}
			},
			getGuideText() {
				var that = this
				uni.request({
					url: "/tomcat/flowstudio/public/guideText/getAllGuideText",
					method: "POST",
					data: {
						'page': 1,
						'size': 6
					},
					success(res) {
						var allGuideText = res.data.data.allGuideText
						for (var i = 0; i < allGuideText.length; i++) {
							allGuideText[i].clickHover = false
						}
						
						that.allGuideText = allGuideText

					},
					fail(res) {
				
					}
				})
			},
			getHistory() {
				var that = this
				console.log(that.conversationID);
				console.log(that.userID);
				var jiamiConversationId = that.aesEncrypt(that.conversationID);
				var jiamiUserId = that.aesEncrypt(that.userID);
				var jiamiAddress = that.aesEncrypt(that.address);
				uni.request({
					url: "/tomcat/flowstudio/public/chatHistory/getChatHistoryByAddressAndUserIdAndConversationId",
					method: "POST",
					sslVerify:true,
					data: {
						'address': jiamiAddress,
						'user_id': jiamiUserId,
						'conversation_id': jiamiConversationId,
						'page': that.page,
						'size': that.size
					},
					success(res) {
						
						that.allChatHistory = res.data.data.allChatHistory.reverse()
						that.scrollToBottom()
					},
					fail(res) {
						console.log(res)
					}
				})
			},
			scrollToBottom() {
				// 等待DOM更新
				this.$nextTick(() => {
					// 将scrollIntoView属性设置为"last-msg-item"，以便滚动窗口到最后一条消息
					this.scrollIntoView = "last-msg-item"
					// 等待DOM更新，即：滚动完成
					this.$nextTick(() => {
						// 将scrollIntoView属性设置为空，以便下次设置滚动条位置可被监听
						this.scrollIntoView = ""
					})
				})
			},
			clickNewChat() {
				console.log('clickNewChat');
				var that = this
				that.showGuideText = true
				that.createConversationID()
				that.createUserID()
			},
			createConversationID(){
				var that = this
				that.conversationID = that.address+"_"+new Date().getTime()
			},
			createUserID(){
				var that = this
				that.userID = that.address
			},
			clickGuideText(e){
				var that = this 
				that.question = e.title
				that.upload()
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
	}

	.rotate180 {
		transform: rotate(180deg);
		-ms-transform: rotate(180deg);
		-moz-transform: rotate(180deg);
		-webkit-transform: rotate(180deg);
		-o-transform: rotate(180deg);
	}

	.left-page {
		width: 25%;
		height: 100%;
		background-color: #181818;
		color: #E4E4E4;
	}

	.right-page {
		width: 75%;
		height: 100%;
		background-color: #212121;
		color: white;
	}

	.page-item {
		flex: 1;
		flex-direction: row;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
	}

	.new-chat {
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: flex-end;
	}

	.move-hover {
		background-color: dimgrey;
	}

	.uni-stat-tooltip {
		width: 105rpx;
	}

	.listview {
		margin-top: 50px;

	}

	.one-talk {
		display: flex;
		width: 80%;
		margin-left: 5%;
		margin-top: 20px;
		line-height: 70rpx;
		border-radius: 10rpx;
		align-items: center;
		font-size: 30rpx;
	}

	.ellipsis {
		overflow: hidden;
		/* 确保超出的内容被隐藏 */
		white-space: nowrap;
		/* 确保文本在一行内显示 */
		text-overflow: ellipsis;
		/* 使用省略符号表示被截断的文本 */
	}

	/* 隐藏滚动条，但仍然允许滚动 */
	::-webkit-scrollbar {
		display: none;
		/* 针对Webkit浏览器 */
	}

	/* 针对其他浏览器的滚动条隐藏 */
	::-moz-scrollbar {
		display: none;
	}

	.chat-box {
		width: 80%;
		height: 50%;

		border-radius: 20px;
		margin-left: 10%;
		display: flex;
		/* 使用flex布局 */
		flex-direction: row;
		/* 水平排列方向 */
		background-color: #303030;
	}

	.left {
		width: 85%;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	.right {
		width: 15%;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	.uni-textareaa {
		width: 90%;
	}

	.ellipsis {
		overflow: hidden;
		/* 确保超出的内容被隐藏 */
		white-space: ;
		/* 确保文本在一行内显示 */
		text-overflow: ellipsis;
		/* 使用省略符号表示被截断的文本 */
	}

	.one-question {
		width: auto;
		height: 3%;
		border: 1px solid;
		border-radius: 10px;
		font-size: 15px;
		padding: 10px;
		margin: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.move-hover {
		background-color: dimgrey;
	}

	.ai {
		max-width: 55%;
		margin-left: 20px;
		margin-top: 20px;
		display: flex;
		/* 使用flex布局 */
	}

	.ai-logo {
		width: 5%;
	}

	.ai-text {
		width: 95%;
		font-size: 15px;
		margin-left: 20px;
	}

	.user {
		margin-top: 20px;
		max-width: 100%;
		display: flex;
		justify-content: flex-end;
	}

	.user-text {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 35px;
		font-size: 15px;
		margin-right: 20px;
		border-radius: 3%;
		padding: 10px;
		background-color: #303030;
	}
</style>