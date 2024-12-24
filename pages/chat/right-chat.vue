<template>
	<view class="right-page">
		<view style="height: 80%; border: 1px solid; display: flex;
		justify-content: center;
		align-items: center;"  v-if="showGuideText">
			<!-- <view style="padding-top: 300rpx;">
				<scroll-view class="listview"  enableBackToTop="true" :show-scrollbar="false" scroll-y >
					<view>
						gfgsagas
					</view>
				</scroll-view>
			</view> -->
			<view>
				<view v-for="(item,index) in allGuideText" :key="index" style="display: flex; flex-direction: column; ">
						<view class="one-question ellipsis" :class="item.clickHover == true ? 'move-hover':''"   @mouseenter="item.clickHover = true" @mouseleave="item.clickHover = false">
							{{item.title}}
						</view>
				</view>
			</view>
			
		</view>
		<view style="height: 80%; border: 1px solid;" v-else>
			<view class="ai">
				<view class="ai-logo">
					<image src="../../static/openai.png" style="height: 50px; width: 50px;"></image>
				</view>
				<view class="ai-text">
					
				</view>
			</view>
			<view class="user">
				<view class="user-text">
					How do I install flow studio?
				</view>
			</view>
		</view>
		<view style="height: 20%; display: flex; align-items: center;">
			<view class="chat-box">
				<view class="left" >
					<view class="uni-textareaa" >
							<textarea style="width: 90%; font-size: 40rpx;" placeholder="Please enter your question here..." maxlength="300" @keydown.enter="handleInput" v-model="question" auto-height />
					</view>
				</view>
				<view class="right">
					<image src="../../static/upload.png" style="height: 80rpx; width: 80rpx;" @tap="upload"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	export default {
		data() {
			return {
				content:
				          '\n# 一级标题\n\n## 二级标题\n\n### 三级标题\n\n### 1.2 无序列表\n\n无序列表的使用，在符号`-`后加空格使用。如下：\n- 无序列表 1\n- 无序列表 2\n  - 无序列表 2.1\n  - 无序列表 2.2\n\n**由于微信原因，最多支持到二级列表**。\n\n### 1.3 有序列表\n\n1. 有序列表 1\n2. 有序列表 2\n\n\n### 1.4 粗体和斜体\n\n**这个是粗体**\n\n_这个是斜体_\n\n**_这个是粗体加斜体_**\n\n\n### 1.5 链接\n\n对于该论述，欢迎读者查阅之前发过的文章，[你是《未来世界的幸存者》么？](https://mp.weixin.qq.com/s/s5IhxV2ooX3JN_X416nidA)\n\n### 1.6 引用\n\n> ### 一级引用示例\n> \n> 读一本好书，就是在和高尚的人谈话。 **——歌德**\n\n### 1.7 分割线\n\n可以在一行中用三个以上的减号来建立一个分隔线，同时需要在分隔线的上面空一行。如下：\n\n---\n\n### 1.8 删除线\n\n删除线的使用，在需要删除的文字前后各使用两个`~`，如下：\n\n~~这是要被删除的内容。~~\n\n### 1.9 表格\n\n| 姓名       | 年龄 |         工作 |\n| :--------- | :--: | -----------: |\n| 作者     |  18  |     web |\n| zerojs   |  20  |  前端 |\n| 太菜了 |  22  | 躺平 |\n\n\n## 2. 特殊语法\n\n### 2.1 脚注\n\n脚注与链接的区别如下所示：\n\n```markdown\n链接：[文字](链接)\n脚注：[文字](脚注解释 "脚注名字")\n```\n### 2.2 代码块\n\n```js\nconsole.log("1");\n\nsetTimeout(function () {\n  console.log("2");\n  process.nextTick(function () {\n    console.log("3");\n  });\n  new Promise(function (resolve) {\n    console.log("4");\n    resolve();\n  }).then(function () {\n    console.log("5");\n  });\n});\n```\n\ndiff 不能同时和其他语言的高亮同时显示，且需要调整代码主题为微信代码主题以外的代码主题才能看到 diff 效果，使用效果如下:\n\n```diff\n+ 新增项\n- 删除项\n```\n\n**其他主题不带行号，可自定义是否换行，代码大小与当前编辑器一致**\n\n\n\n## 3 其他语法\n\n### 3.1 HTML\n\n支持原生 HTML 语法，请写内联样式，如下：\n\n<span style="display:block;text-align:right;color:orangered;">橙色居右</span>\n<span style="display:block;text-align:center;color:orangered;">橙色居中</span>\n\n### 3.2 UML\n\n不支持，推荐使用开源工具`https://draw.io/`制作后再导入图片',
				conversation: {},
				showGuidtext:true,
				question:'',
				allGuideText:[],
				showGuideText:false,
				testResponse:'\n# 一级标题\n\n## 二级标题\n\n### 三级标题\n\n### 1.2 无序列表\n\n无序列表的使用，在符号`-`后加空格使用。如下：\n- 无序列表 1\n- 无序列表 2\n  - 无序列表 2.1\n  - 无序列表 2.2\n\n**由于微信原因，最多支持到二级列表**。\n\n### 1.3 有序列表\n\n1. 有序列表 1\n2. 有序列表 2\n\n\n### 1.4 粗体和斜体\n\n**这个是粗体**\n\n_这个是斜体_\n\n**_这个是粗体加斜体_**\n\n\n### 1.5 链接\n\n对于该论述，欢迎读者查阅之前发过的文章，[你是《未来世界的幸存者》么？](https://mp.weixin.qq.com/s/s5IhxV2ooX3JN_X416nidA)\n\n### 1.6 引用\n\n> ### 一级引用示例\n> \n> 读一本好书，就是在和高尚的人谈话。 **——歌德**\n\n### 1.7 分割线\n\n可以在一行中用三个以上的减号来建立一个分隔线，同时需要在分隔线的上面空一行。如下：\n\n---\n\n### 1.8 删除线\n\n删除线的使用，在需要删除的文字前后各使用两个`~`，如下：\n\n~~这是要被删除的内容。~~\n\n### 1.9 表格\n\n| 姓名       | 年龄 |         工作 |\n| :--------- | :--: | -----------: |\n| 作者     |  18  |     web |\n| zerojs   |  20  |  前端 |\n| 太菜了 |  22  | 躺平 |\n\n\n## 2. 特殊语法\n\n### 2.1 脚注\n\n脚注与链接的区别如下所示：\n\n```markdown\n链接：[文字](链接)\n脚注：[文字](脚注解释 "脚注名字")\n```\n### 2.2 代码块\n\n```js\nconsole.log("1");\n\nsetTimeout(function () {\n  console.log("2");\n  process.nextTick(function () {\n    console.log("3");\n  });\n  new Promise(function (resolve) {\n    console.log("4");\n    resolve();\n  }).then(function () {\n    console.log("5");\n  });\n});\n```\n\ndiff 不能同时和其他语言的高亮同时显示，且需要调整代码主题为微信代码主题以外的代码主题才能看到 diff 效果，使用效果如下:\n\n```diff\n+ 新增项\n- 删除项\n```\n\n**其他主题不带行号，可自定义是否换行，代码大小与当前编辑器一致**\n\n\n\n## 3 其他语法\n\n### 3.1 HTML\n\n支持原生 HTML 语法，请写内联样式，如下：\n\n<span style="display:block;text-align:right;color:orangered;">橙色居右</span>\n<span style="display:block;text-align:center;color:orangered;">橙色居中</span>\n\n### 3.2 UML\n\n不支持，推荐使用开源工具`https://draw.io/`制作后再导入图片'
			}
		},
		created(e) {
			var that = this 
			that.getGuideText()
		},
		onLoad(event) {
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			console.log(event.item);

		},
		
		methods: {
			load(e) {
				var that = this
				var p = decodeURIComponent(e);
				try {
					that.conversation = JSON.parse(p)
				} catch (error) {
					that.conversation = JSON.parse(p)
				}
				console.log(that.conversation);
			},
			bindTextAreaBlur: function (e) {
			            console.log(e.detail.value)
			},
			upload(){
				console.log("输入完成");
				var that = this
				that.question = ''
			},
			handleInput(event) {
				console.log(event);
				var that = this
			      if (event.type === "keydown") { // Enter键的keyCode是13
			        console.log("输入完成");
					that.question = ''
			      }
			},
			getGuideText(){
				var that = this
				uni.request({
					url:"/api/tomcat/flowstudio/public/guideText/getAllGuideText",
					method:"POST",
					data:{
						'page':1,
						'size':6
					},
					success(res) {
						var allGuideText = res.data.data.allGuideText
						for (var i = 0; i < allGuideText.length; i++) {
							allGuideText[i].clickHover = false
						}
						console.log(allGuideText);
						that.allGuideText = allGuideText
						
					},
					fail(res) {
							console.log(res)
					}
				})
			},
			getHistory(){
				
			}
		}
	}
</script>

<style>
	.right-page {
		display: flex;
		flex: 1;
		flex-direction: column;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background-color: #212121;
		color: white;
	}
	.chat-box{
		width: 80%;
		height: 50%;
		
		border-radius: 20px;
		margin-left: 10%;
		display: flex; /* 使用flex布局 */
		flex-direction: row; /* 水平排列方向 */
		background-color: #303030;
	}
	.left{
		width: 85%;
	
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.right{
		width: 15%;

		display: flex;
		justify-content: center;
		align-items: center;
	}
	.uni-textareaa{
		width: 90%;
	}
	.ellipsis {
	  overflow: hidden; /* 确保超出的内容被隐藏 */
	  white-space: ; /* 确保文本在一行内显示 */
	  text-overflow: ellipsis; /* 使用省略符号表示被截断的文本 */
	}
	.one-question{
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
	.move-hover{
		background-color:dimgrey;
	}
	.ai{
		max-width: 55%;
		margin-left: 20px;
		margin-top: 20px;
		display: flex; /* 使用flex布局 */
	}
	.ai-logo{
		width: 5%;
	}
	.ai-text{
		width: 95%;
		font-size: 15px;
		margin-left: 20px;
	}
	.user{
		margin-top: 20px;
		max-width: 100%;
		display: flex;
		justify-content: flex-end;
	}
	.user-text{
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