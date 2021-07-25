<template>
	<view class="contianer">
		<view class="login_title" @click="login"><text>退出登錄</text></view>
		<view class="head">
			<text>頭像</text>
			<view class="head_img">
				<image src="http://10.68.2.9/CenMacauCMS2/static/MainMenu-360@2x.png"></image>
			</view>
		</view>
		<view class="name">
			<text>姓名</text>
			<input type="text" value="" placeholder="請輸入姓名" />
		</view>
		<view class="phone">
			<text>手提號</text>
			<view class="phone_number">
				<text class="number">(+86)15819494186</text>
				<text class="changenumber" @click="updatePhone">修改号码</text>
			</view>
		</view>
		<view class="wechat">
			<text>Wechat</text>
			<view class="bindwx">
				<text>未绑定</text>
			</view>
		</view>
		<view class="session">
			<text>清除緩存</text>
		</view>
		<view class="btn">
			<button class="save">保存</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showClearIcon: false,
				inputClearValue: '',
			}
		},
		methods: {
			clearInput(e){
				this.inputClearValue=e.detail.value;
				if(e.detail.vaue.length > 0){
					this.showClearIcon=true;
				}else{
					this.showClearIcon=false;
				}
			},
			updatePhone(e){
				uni.navigateTo({
					url:'/pages/updatePhone/updatePhone'
				})
			},
			login(){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contianer {
		width: 100%;
		height: 100%;

		.login_title {
			position: relative;
			margin-bottom: 20rpx;
			width: 100%;
			box-sizing: border-box;

			text {
				position: relative;
				left: 600rpx;
			}
		}

		.head,
		.name,
		.phone,
		.wechat,
		.session {
			display: flex;
			align-items: center;
			height: 90rpx;
			margin-left: 20rpx;
			box-sizing: border-box;
			border-bottom: 1rpx solid #999999;
			.head_img{
				position: relative;
				margin-left: 575rpx;
				image {
					width: 70rpx;
					height: 70rpx;
				}
			}
			input{
				width: 190rpx;
				margin-left: 450rpx;
				box-sizing: border-box;
			}
			.phone_number{
				margin-left: 155rpx;
				.number{
					color: #838383;
				}
				.changenumber{
					margin-left: 10rpx;
					color: #62affb;
				}
			}
			.bindwx{
				margin-left: 470rpx;
			}
			
		}
		.btn{
			width: 100%;
			margin-top: 30rpx;
			height: 70rpx;
			.save{
				display: flex;
				justify-content: center;
				align-items: center;
				width: 90%;
				height: 70rpx;
				color: #f9f9f9;
				background-color: #efcbcb;
			}
		}
		


		.userinfo {}
	}
</style>
