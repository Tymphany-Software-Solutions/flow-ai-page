<!-- 蓝色简洁登录页面 -->
<template>
	<view class="t-login" v-if="showLoginPage">
		<!-- 页面装饰图片 -->
		<image class="img-a" src="@/static/2.png"></image>
		<image class="img-b" src="@/static/3.png"></image>
		<!-- 标题 -->
		<view class="t-b">{{ title }}</view>
		<form class="cl">
			<view class="t-a">
				<image src="@/static/yx.png"></image>
				<input type="text" name="email" placeholder="请输入邮箱号" maxlength="50" v-model="email" />
			</view>
			<view class="t-a">
				<image src="@/static/yz.png"></image>
				<input type="password" name="code" maxlength="20" placeholder="请输入密码" v-model="password" />
			</view>
			<button @tap="login()">登 录</button>
		</form>
		<view class="t-f"><text>————— 第三方账号登录 —————</text></view>
		<view class="t-e cl">
			<view class="t-g" @tap="wxLogin()"><image src="@/static/wx.png"></image></view>
			<view class="t-g" @tap="zfbLogin()"><image src="@/static/qq.png"></image></view>
		</view>
		
	</view>
	<view class="t-login" v-else>
		<!-- 页面装饰图片 -->
		<image class="img-a" src="@/static/2.png"></image>
		<image class="img-b" src="@/static/3.png"></image>
		<!-- 标题 -->
		<view class="t-b">选择您的Address</view>
		<view v-for="(item,index) in addressList" :key="index" v-if="showAddressList" :data-item="item" @click="clickCrad" style="width: 800rpx;">
			<uni-card title="Address" :extra="item.create_time" >
				<text class="uni-body">{{item.address}}</text>
			</uni-card>
		</view>
	</view>
</template>
<script>
	import crypto from 'crypto-js';
export default {
	data() {
		return {
			content:
			          '\n# 一级标题\n\n## 二级标题\n\n### 三级标题\n\n### 1.2 无序列表\n\n无序列表的使用，在符号`-`后加空格使用。如下：\n- 无序列表 1\n- 无序列表 2\n  - 无序列表 2.1\n  - 无序列表 2.2\n\n**由于微信原因，最多支持到二级列表**。\n\n### 1.3 有序列表\n\n1. 有序列表 1\n2. 有序列表 2\n\n\n### 1.4 粗体和斜体\n\n**这个是粗体**\n\n_这个是斜体_\n\n**_这个是粗体加斜体_**\n\n\n### 1.5 链接\n\n对于该论述，欢迎读者查阅之前发过的文章，[你是《未来世界的幸存者》么？](https://mp.weixin.qq.com/s/s5IhxV2ooX3JN_X416nidA)\n\n### 1.6 引用\n\n> ### 一级引用示例\n> \n> 读一本好书，就是在和高尚的人谈话。 **——歌德**\n\n### 1.7 分割线\n\n可以在一行中用三个以上的减号来建立一个分隔线，同时需要在分隔线的上面空一行。如下：\n\n---\n\n### 1.8 删除线\n\n删除线的使用，在需要删除的文字前后各使用两个`~`，如下：\n\n~~这是要被删除的内容。~~\n\n### 1.9 表格\n\n| 姓名       | 年龄 |         工作 |\n| :--------- | :--: | -----------: |\n| 作者     |  18  |     web |\n| zerojs   |  20  |  前端 |\n| 太菜了 |  22  | 躺平 |\n\n\n## 2. 特殊语法\n\n### 2.1 脚注\n\n脚注与链接的区别如下所示：\n\n```markdown\n链接：[文字](链接)\n脚注：[文字](脚注解释 "脚注名字")\n```\n### 2.2 代码块\n\n```js\nconsole.log("1");\n\nsetTimeout(function () {\n  console.log("2");\n  process.nextTick(function () {\n    console.log("3");\n  });\n  new Promise(function (resolve) {\n    console.log("4");\n    resolve();\n  }).then(function () {\n    console.log("5");\n  });\n});\n```\n\ndiff 不能同时和其他语言的高亮同时显示，且需要调整代码主题为微信代码主题以外的代码主题才能看到 diff 效果，使用效果如下:\n\n```diff\n+ 新增项\n- 删除项\n```\n\n**其他主题不带行号，可自定义是否换行，代码大小与当前编辑器一致**\n\n\n\n## 3 其他语法\n\n### 3.1 HTML\n\n支持原生 HTML 语法，请写内联样式，如下：\n\n<span style="display:block;text-align:right;color:orangered;">橙色居右</span>\n<span style="display:block;text-align:center;color:orangered;">橙色居中</span>\n\n### 3.2 UML\n\n不支持，推荐使用开源工具`https://draw.io/`制作后再导入图片',
			title: '欢迎回来！', //填写logo或者app名称，也可以用：欢迎回来，看您需求
			second: 60, //默认60秒
			showText: true, //判断短信是否发送
			email: '', //邮箱号码
			password: '' ,//密码
			showLoginPage:true,
			addressList:[],
			showAddressList:false
		};
	},
	onLoad() {},
	methods: {
		//当前登录按钮操作
		login() {
			var that = this;
			if (!that.email) {
				uni.showToast({ title: '请输入邮箱号', icon: 'none' });
				return;
			}
			if (!that.checkEmail(that.email)) {
				uni.showToast({ title: '请输入正确邮箱号', icon: 'none' });
				return;
			}
			if (!that.password) {
				uni.showToast({ title: '请输入密码', icon: 'none' });
				return;
			}
			if (that.password!="123456") {
				uni.showToast({ title: '密码错误', icon: 'none' });
				return;
			}
			//....此处省略，这里需要调用后台验证一下验证码是否正确，根据您的需求来
			uni.showToast({ title: '登录成功！', icon: 'none' });
			that.getAddress()
		},
		checkEmail(email){
			return RegExp(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/).test(email);
		},
		//获取邮箱验证码
		getCode() {
			var that = this;
			var interval = setInterval(() => {
				that.showText = false;
				var times = that.second - 1;
				//that.second = times<10?'0'+times:times ;//小于10秒补 0
				that.second = times;
				console.log(times);
			}, 1000);
			setTimeout(() => {
				clearInterval(interval);
				that.second = 60;
				that.showText = true;
			}, 60000);
			//这里请求后台获取短信验证码
			uni.request({
				//......//此处省略
				success: function(res) {
					that.showText = false;
				}
			});
		},
		getAddress(){
			var that = this
		    var email = that.aesEncrypt(that.email);
			console.log(email)
			uni.request({
				url:"/api/tomcat/flowstudio/public/user/getAddressByEmail",
				method:"POST",
				data:{
					'email':email
				},
				success(res) {
					console.log(res)
					if (res.data.data.length>1) {
						that.showLoginPage = false
						that.showAddressList = true
						that.addressList = res.data.data
					} else{
					    uni.redirectTo({
					    	url:'../chat/chat?address='+res.data.data[0].address
					    })
					}
				},
				fail(res) {
						console.log(res)
				}
			})
		},
		clickCrad(e){
			console.log(e);
			uni.redirectTo({
				url:'../chat/chat?address='+e.currentTarget.dataset.item.address
			})
		},
		//AES加密方法
		aesEncrypt(content){
		     const srcs = crypto.enc.Utf8.parse(content);
		     const key = crypto.enc.Utf8.parse("7235967868936179");
		     const iv = crypto.enc.Utf8.parse('5183946738049788');
		     const encrypted = crypto.AES.encrypt(srcs, key, { iv: iv, mode: crypto.mode.CBC, padding: crypto.pad.Pkcs7});
		     return encrypted.ciphertext.toString().toUpperCase();
		},
		//等三方微信登录
		wxLogin() {
			uni.showToast({ title: '微信登录', icon: 'none' });
		},
		//第三方支付宝登录
		zfbLogin() {
			uni.showToast({ title: '支付宝登录', icon: 'none' });
		}
	}
};
</script>
<style>
.img-a {
	position: absolute;
	width: 100%;
	top: -280rpx;
	right: -100rpx;
}
.img-b {
	position: absolute;
	width: 50%;
	bottom: 0;
	left: -50rpx;
	margin-bottom: -200rpx;
}
.t-login {
	width: 600rpx;
	margin: 0 auto;
	font-size: 28rpx;
	color: #000;
}

.t-login button {
	font-size: 28rpx;
	background: #5677fc;
	color: #fff;
	height: 90rpx;
	line-height: 90rpx;
	border-radius: 50rpx;
	box-shadow: 0 5px 7px 0 rgba(86, 119, 252, 0.2);
}

.t-login input {
	padding: 0 20rpx 0 120rpx;
	height: 90rpx;
	line-height: 90rpx;
	margin-bottom: 50rpx;
	background: #f8f7fc;
	border: 1px solid #e9e9e9;
	font-size: 28rpx;
	border-radius: 50rpx;
}

.t-login .t-a {
	position: relative;
}

.t-login .t-a image {
	width: 40rpx;
	height: 40rpx;
	position: absolute;
	left: 40rpx;
	top: 28rpx;
	border-right: 2rpx solid #dedede;
	padding-right: 20rpx;
}

.t-login .t-b {
	text-align: left;
	font-size: 46rpx;
	color: #000;
	padding: 300rpx 0 120rpx 0;
	font-weight: bold;
}

.t-login .t-c {
	position: absolute;
	right: 22rpx;
	top: 22rpx;
	background: #5677fc;
	color: #fff;
	font-size: 24rpx;
	border-radius: 50rpx;
	height: 50rpx;
	line-height: 50rpx;
	padding: 0 25rpx;
}

.t-login .t-d {
	text-align: center;
	color: #999;
	margin: 80rpx 0;
}

.t-login .t-e {
	text-align: center;
	width: 250rpx;
	margin: 80rpx auto 0;
}

.t-login .t-g {
	float: left;
	width: 50%;
}

.t-login .t-e image {
	width: 50rpx;
	height: 50rpx;
}

.t-login .t-f {
	text-align: center;
	margin: 200rpx 0 0 0;
	color: #666;
}

.t-login .t-f text {
	margin-left: 20rpx;
	color: #aaaaaa;
	font-size: 27rpx;
}

.t-login .uni-input-placeholder {
	color: #000;
}

.cl {
	zoom: 1;
}

.cl:after {
	clear: both;
	display: block;
	visibility: hidden;
	height: 0;
	content: '\20';
}
</style>
