<template>
	<view>
		<view @click="login">2222</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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

<style>

</style>
