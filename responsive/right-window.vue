<template>
	<view>
		<rightChat ref="rightChatPage"></rightChat>
	</view>
</template>

<script setup>
	import rightChat from 'pages/chat/right-chat.vue'
	export default {
		components:{
			rightChat
		},
		data() {
			return {
				title: 'Hello'
			}
		},
		created(e) {
			//监听自定义事件，该事件由详情页列表的点击触发
			uni.$on('updateDetail', (e) => {
				// 执行 /pages/news/detail.nvue页面的load方法
				this.$refs.rightChatPage.load(e.detail);
			})
		}
	}
</script>

<style>
</style>
