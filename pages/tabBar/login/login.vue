<template>
	<view class="container">
		<nav-bar></nav-bar>
		<view class="login">
			<view><text>手機快捷登錄</text></view>
			<view class="note"><text>本APP無須註冊直接登錄使用</text></view>
			<!-- 文本框輸入位置 -->
			<view class="input_line">
				<view style="display: flex; align-items: center; margin-top: 20rpx;margin-bottom: 20rpx;">
					<select-box @selectbox="selectbox" :select="array"></select-box>
					<!-- <text style="margin-right: 20rpx;">澳門(+863)</text> -->
					<input type="text" v-model="phone" placeholder="請輸入手提電話" />
				</view>
			</view>
			<view class="input_line">
				<view style="display: flex; align-items: center; margin-top: 20rpx;margin-bottom: 20rpx;">
					<text style="margin-right: 20rpx;">驗證碼</text><input type="text" v-model="code" placeholder="請輸入驗證碼" />
					<view class="code" @click="SendVerfiCode"><text>获取验证码</text></view>
				</view>
			</view>
		</view>
		<!-- 提交 -->
		<view class="submit_content">
			<button type="default" @click="login">登錄</button>
		</view>
		<!-- 經紀人登陸 -->
		<view class="monitors">
			<view><text>經紀人登錄</text></view>
		</view>
		<!-- 其它登錄方式 -->
		<view class="other_login">
			<view style="display: flex;justify-content: center;width:100%;">
				<text>其他登錄方式</text>
			</view>

			<view style="width: 100%;">
				<view class="wechat">
					<image src="http://10.68.2.9/CenMacauCMS2/static/wechat_icon@2x.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				array: [{
					name: "大陆(+86)",
					number: "+86",
					value: "0",

				}, {
					name: "香港(+852)",
					number: "+852",
					value: "1"
				}, {
					name: "澳门(+853)",
					number: "+852",
					value: "2"
				}],
				area: '',
				phone: '',
				code: '',
				status:''
			}
		},
		methods: {
			selectbox(data) {
				this.area = this.array[data].number;
				console.log(this.array[data].number);
				console.log(this.area);
			},
			// 發送驗證碼
			// Send verificationCode
			SendVerfiCode() {
				let _that = this;
				// uni.request({
				// 	method: 'POST',
				// 	url: '/Member/Api/Login/SendVerificationCode',
				// 	data: {
				// 		AreaCode: _that.area,
				// 		Phone: _that.phone
				// 	},
				// 	success: (res) => {
				// 		console.log(res.IsSuccess);
				// 		this.status=res.IsSuccess;  //短信是否發送成功
				// 	}
				// })
				this.$minApi.logverfi({
					AreaCode: _that.area,
					Phone: _that.phone
				}).then(res=>{
					this.status=res.IsSuccess;  //短信是否發送成功
				})
				console.log('发送')
			},
			// 登錄
			login(){
				let _that=this;
				// 檢測短信驗證碼是否正確
				// uni.request({
				// 	method:'POST',
				// 	url:'/Member/Api/Login/UserLogin',
				// 	data:{
				// 		AreaCode:_that.area,
				// 		Phone:_that.phone,
				// 		Code:_that.code
				// 	}
				// })
				this.$minApi.memberLogin({
					AreaCode:_that.area,
					Phone:_that.phone,
					Code:_that.code
				}).then(res=>{
					console.log(res)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page,
	.container {
		position: relative;
		width: 100%;
		height: 100%;

		.login {
			margin: 20rpx 10rpx;

			.note {
				font-size: 25rpx;
				color: #999999;
			}

			.input_line {
				display: flex;
				width: 100%;
				border-bottom: 1rpx solid #555555;
				margin-top: 30rpx;

				.code {
					width: fit-content;
					padding: 10rpx 10rpx;
					box-sizing: border-box;
					border: 1rpx solid #999999;
					border-radius: 10rpx;
					font-size: 20rpx;
				}
			}
		}

		.submit_content {
			display: flex;
			justify-items: center;
			width: 100%;
			height: 80rpx;
			margin-top: 30rpx;
			box-sizing: border-box;

			/deep/ button[type=default] {
				color: #ffffff;
				background-color: #aa0000;
			}

			button {
				width: 100%;
				margin: 0 10rpx;
			}
		}

		.monitors {
			position: relative;
			// float: right;
			margin-right: 10rpx;
			font-size: 20rpx;
			color: #007AFF;
			width: 100%;
			height: 40rpx;

			view {
				float: right;
				margin-right: 20rpx;
			}
		}

		.other_login {
			position: relative;
			top: 450rpx;
			display: flex;
			flex-wrap: wrap;
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			// border: 1rpx solid pink;

			.wechat {
				width: fit-content;
				height: fit-content;
				box-sizing: border-box;
				margin-left: 70rpx;

				image {
					width: 70rpx;
					height: 70rpx;
				}
			}
		}
	}
</style>
