<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
	::-webkit-scrollbar{
	　　width: 5px!important;
	　　height: 5px!important;
	　　background-color: rgba(0,0,0,0)!important;
	}
	
	/*定义滚动条轨道 内阴影+圆角*/
	::-webkit-scrollbar-track{
	　　border-radius: 5px!important;
	　　background-color: rgba(0,0,0,0)!important;
	}
	
	/*定义滑块 内阴影+圆角*/
	::-webkit-scrollbar-thumb{
	　　border-radius: 5px!important;
	　　background-color: #999!important;
	}
</style>
