<template>
	<view class="container">
		<view>手機快捷登錄</view>
		<view>本APP無需註冊直接登錄使用</view>
		<!-- <view class="select" @click="open">
			<view style="display: flex;">
				<text>{{array[0].name}}</text>
				<image style="width: 40rpx;height: 40rpx;" src="/static/down.png"></image>
			</view>
			<input type="text" placeholder="請輸入手提號碼" />
		</view> -->
		<!-- 彈窗 -->
		<!-- <view class="tel">
			
		</view> -->
		<view @click="login">22222</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				array: [{
					name: "大陆(+86)",
					number: '+86',
					value: "0"
				}, {
					name: "香港(+852)",
					number: '+852',
					value: "1"
				}, {
					name: "澳门(+853)",
					number: '+853',
					value: "2"
				}],
				OpenId:''
			}
		},
		methods: {
			login() {
				var that=this;
				uni.login({
					provider: 'weixin',
					success: function(res) {
						console.log(res.code);
					uni.request({
					    url: 'http://10.68.2.9/Member/Api/Login/GetWechatToken?code='+res.code,
					    success: (res) => {
							that.OpenId=res.data.Data.openid;
							// 微信登錄
							uni.request({
								method:'POST',
								url:'http://10.68.2.9/Member/Api/Login/WeChatLogin',
								data:{
									OpenId:that.OpenId
								},
								success: (res) => {
									console.log(res);
									uni.setStorageSync("openid",res.data.openid); //保存openid
									// userInfo 为空帮定手机号
								}
							})
					    }
					});

					
					
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100%;

		.select {
			display: flex;
			box-sizing: border-box;
			border: 1rpx solid pink;
		}
		.tel{
			width: 200rpx;
			height: 200rpx;
		}
	}
</style>
