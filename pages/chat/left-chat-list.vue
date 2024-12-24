<template>
	<view class="page-news" >
		<!-- 头部新建聊天 -->
		<view class="new-chat" style="margin-top: 100rpx;">
			<uni-tooltip style="width: 150rpx;" placement="bottom">
					<view :class="writeIconHover == true ? 'move-hover':''"   @mouseenter="writeIconHover = true" @mouseleave="writeIconHover = false" style="margin-right: 20rpx;width: 80rpx;height: 80rpx;border-radius: 10rpx; margin: 10rpx;" >
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
		<scroll-view class="listview"  enableBackToTop="true" :show-scrollbar="false" scroll-y >
			<view v-for="(item,index) in conversationList" :key="index">
				<view class="one-talk" @click="clickConversation(item)" :class="item.chatHover == true ? 'move-hover':''"   @mouseenter="item.chatHover = true" @mouseleave="item.chatHover = false">
					<view class="ellipsis" style="margin-left: 10rpx;">
						{{item.first_chat_history[0].message}}
					</view>
				</view>
			</view>
				<!-- <zero-markdown-view :markdown="content"></zero-markdown-view> -->
		</scroll-view>
	</view>
</template>

<script>
	import crypto from 'crypto-js';
	export default {
		props: {
		    address: String
		},
		data() {
			return {
				content:
				          '\n# 一级标题\n\n## 二级标题\n\n### 三级标题\n\n### 1.2 无序列表\n\n无序列表的使用，在符号`-`后加空格使用。如下：\n- 无序列表 1\n- 无序列表 2\n  - 无序列表 2.1\n  - 无序列表 2.2\n\n**由于微信原因，最多支持到二级列表**。\n\n### 1.3 有序列表\n\n1. 有序列表 1\n2. 有序列表 2\n\n\n### 1.4 粗体和斜体\n\n**这个是粗体**\n\n_这个是斜体_\n\n**_这个是粗体加斜体_**\n\n\n### 1.5 链接\n\n对于该论述，欢迎读者查阅之前发过的文章，[你是《未来世界的幸存者》么？](https://mp.weixin.qq.com/s/s5IhxV2ooX3JN_X416nidA)\n\n### 1.6 引用\n\n> ### 一级引用示例\n> \n> 读一本好书，就是在和高尚的人谈话。 **——歌德**\n\n### 1.7 分割线\n\n可以在一行中用三个以上的减号来建立一个分隔线，同时需要在分隔线的上面空一行。如下：\n\n---\n\n### 1.8 删除线\n\n删除线的使用，在需要删除的文字前后各使用两个`~`，如下：\n\n~~这是要被删除的内容。~~\n\n### 1.9 表格\n\n| 姓名       | 年龄 |         工作 |\n| :--------- | :--: | -----------: |\n| 作者     |  18  |     web |\n| zerojs   |  20  |  前端 |\n| 太菜了 |  22  | 躺平 |\n\n\n## 2. 特殊语法\n\n### 2.1 脚注\n\n脚注与链接的区别如下所示：\n\n```markdown\n链接：[文字](链接)\n脚注：[文字](脚注解释 "脚注名字")\n```\n### 2.2 代码块\n\n```js\nconsole.log("1");\n\nsetTimeout(function () {\n  console.log("2");\n  process.nextTick(function () {\n    console.log("3");\n  });\n  new Promise(function (resolve) {\n    console.log("4");\n    resolve();\n  }).then(function () {\n    console.log("5");\n  });\n});\n```\n\ndiff 不能同时和其他语言的高亮同时显示，且需要调整代码主题为微信代码主题以外的代码主题才能看到 diff 效果，使用效果如下:\n\n```diff\n+ 新增项\n- 删除项\n```\n\n**其他主题不带行号，可自定义是否换行，代码大小与当前编辑器一致**\n\n\n\n## 3 其他语法\n\n### 3.1 HTML\n\n支持原生 HTML 语法，请写内联样式，如下：\n\n<span style="display:block;text-align:right;color:orangered;">橙色居右</span>\n<span style="display:block;text-align:center;color:orangered;">橙色居中</span>\n\n### 3.2 UML\n\n不支持，推荐使用开源工具`https://draw.io/`制作后再导入图片',
				conversation: {},
				writeIconHover:false,
				chatHover:false,
				scrollTop: 0,
				old: {
					    scrollTop: 0
				},
				conversationList:[]
			}
		},
		created() {
			this._isWidescreen = false;
			// #ifdef H5
			var mediaQueryOb = uni.createMediaQueryObserver(this)
			mediaQueryOb.observe({
			  minWidth: 768
			}, matches => {
			  this._isWidescreen = matches;
			})
			// #endif
			this.getChatList(this.address)
		},
		methods: {
			goDetail(detail) {
			  if (this._isWidescreen) { //若为宽屏，则触发右侧详情页的自定义事件
			    uni.$emit('updateDetail', {
			      detail: encodeURIComponent(JSON.stringify(detail))
			    })
			  } else {
			    uni.navigateTo({
			      url: './right-chat?address=' + encodeURIComponent(JSON.stringify(detail))
			    });
			  }
			},
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				console.log(e)
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
			getChatList(address){
				console.log(address)
				var that = this
				if(address!=null){
					var jiamiAddress = that.aesEncrypt(address);
					console.log(jiamiAddress)
					uni.request({
						url:"/api/tomcat/flowstudio/public/chatHistory/getConversationAndUserIdListByAddress",
						method:"POST",
						data:{
							'address':jiamiAddress
						},
						success(res) {
							console.log(res)
							var allconversation = res.data.data.allConversation
							for (var i = 0; i < allconversation.length; i++) {
								allconversation[i].chatHover = false
							}
							console.log(allconversation);
							that.conversationList = allconversation
							
						},
						fail(res) {
								console.log(res)
						}
					})
				}
			},
			//AES加密方法
			aesEncrypt(content){
			     const srcs = crypto.enc.Utf8.parse(content);
			     const key = crypto.enc.Utf8.parse("7235967868936179");
			     const iv = crypto.enc.Utf8.parse('5183946738049788');
			     const encrypted = crypto.AES.encrypt(srcs, key, { iv: iv, mode: crypto.mode.CBC, padding: crypto.pad.Pkcs7});
			     return encrypted.ciphertext.toString().toUpperCase();
			},
			
			clickConversation(item){
				console.log(item);
				if (this._isWidescreen) { //若为宽屏，则触发右侧详情页的自定义事件
				  uni.$emit('updateDetail', {
				    detail: encodeURIComponent(JSON.stringify(item))
				  })
				} else {
				  uni.navigateTo({
				    url: './right-chat?item=' + encodeURIComponent(JSON.stringify(item))
				  });
				}
			}
		}
	}
</script>

<style>
	.page-news {
	  flex: 1;
	  flex-direction: column;
	  position: absolute;
	  left: 0;
	  top: 0;
	  right: 0;
	  bottom: 0;
	  background-color: #181818;
	  color: #E4E4E4;
	}
	.new-chat{
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: flex-end;
	}
	.move-hover{
		background-color:dimgrey;
	}
	.uni-stat-tooltip{
		width: 105rpx;
	}
	.listview {
	  position: absolute;
	  left: 0;
	  top: 300rpx;
	  right: 0;
	  bottom: 100rpx;
	 
	}
	.one-talk{
		display: flex;
		width: 80%;
		margin-left: 10%;
		margin-bottom: 3%;
		line-height: 90rpx;
	    border-radius: 10rpx; 
		align-items: center;
		font-size: 40rpx;
	}
	.ellipsis {
	  overflow: hidden; /* 确保超出的内容被隐藏 */
	  white-space: nowrap; /* 确保文本在一行内显示 */
	  text-overflow: ellipsis; /* 使用省略符号表示被截断的文本 */
	}
 /* 隐藏滚动条，但仍然允许滚动 */
  ::-webkit-scrollbar {
    display: none; /* 针对Webkit浏览器 */
  }
 
  /* 针对其他浏览器的滚动条隐藏 */
::-moz-scrollbar {
    display: none;
  }
 


	
</style>