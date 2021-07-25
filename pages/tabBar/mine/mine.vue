<template>
	<view class="container">
		<!-- <nav-bar :back="false"></nav-bar> -->
		<view class="bgimg">
			<image style="position: absolute; width: 100%;height:400rpx;" src="http://10.68.2.9/CenMacauCMS2/static/bg_picture@2x.png"></image>
			<view class="bgs">
				<image src="http://10.68.2.9/CenMacauCMS2/static/MainMenu-Onlinelisting@2x.png"></image>
				<view style="margin-left: 30rpx;color: #FFFFFF;">
					<text>測試</text>
					<text></text>
				</view>
			</view>
			<!-- 設置 -->
			<view class="setting" @click="setup">
				<image src="http://10.68.2.9/CenMacauCMS2/static/set-up_icon@2x.png"></image>
			</view>
		</view>
		<view class="mine">
			<view class="min_title">
				<text>我的</text>
			</view>
			<view class="like">
				<view style="display: flex;flex-direction: column;align-items: center;">
					<image src="http://10.68.2.9/CenMacauCMS2/static/like_icon@2x.png"></image>
					<view style="text-align: center;">
						<text>喜欢</text>
					</view>

				</view>
				<view style="display: flex;flex-direction: column;align-items: center;">
					<image src="http://10.68.2.9/CenMacauCMS2/static/browse_icon@2x.png"></image>
					<view style="text-align: center;">
						<text>睇樓記錄</text>
					</view>

				</view>

			</view>
		</view>
		<!-- 服務 -->
		<view class="service">
			<view class="service_title">
				<text>服務</text>
			</view>
			<view class="service_item">
				<view style="display: flex;flex-direction: column;align-items: center;">
					<image src="http://10.68.2.9/CenMacauCMS2/static/staff_icon@2x.png"></image>
					<view>
						<text>經紀人互動</text>
					</view>
				</view>
				<view style="display: flex;flex-direction: column;align-items: center;">
					<image src="http://10.68.2.9/CenMacauCMS2/static/Showings_icon@2x.png"></image>
					<view>
						<text>睇樓記錄</text>
					</view>
				</view>
			</view>
			
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			setup(){
				uni.navigateTo({
					url:'/pages/setup/setup'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100%;

		.bgimg {
			position: relative;
			width: 100%;
			height: 270rpx;

			image {}

			.bgs {
				position: absolute;
				display: flex;
				align-items: center;
				top: 100rpx;
				left: 30rpx;

				image {
					width: 120rpx;
					height: 120rpx;
					box-sizing: border-box;
					border-radius: 100%;
					background: linear-gradient(130deg, rgba(205, 144, 42, 0.9) 0%, rgba(245, 213, 115, 0.3) 70%, rgba(205, 144, 42, 0.6) 100%);
					border: 3px solid transparent;
				}
			}

			.setting {
				position: absolute;
				top: 10rpx;
				right: 20rpx;

				image {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}

		.mine {
			position: relative;
			// width:100%; 
			margin: 0 10rpx;
			height: 300rpx;
			// border: 1rpx solid pink;
			box-sizing: border-box;
			box-shadow: 0px -10px 0px 0px rgba(0, 0, 0, 0),
				/*上边阴影  透明*/

				-10px 0px 0px 0px rgba(0, 0, 0, 0),
				/*左边阴影  透明*/

				10px 0px 0px 0px rgba(0, 0, 0, 0),
				/*右边阴影  透明*/

				0px 10px 30px 0px rgba(0, 0, 0, 0.1);
			/*下边阴影 */
			border-radius: 20rpx;
			background-color: #ffffff;
			margin-bottom: 40rpx;
			.min_title {
				padding-top: 30rpx;
				padding-left: 20rpx;
			}

			.like {
				display: flex;
				flex-wrap: wrap;
				justify-content:space-around;
				width: 100%;

				image {
					width: 90rpx;
					height: 90rpx;
				}
			}
			
		}
		.service{
			position: relative;
			// width:100%; 
			margin: 0 10rpx;
			height: 300rpx;
			// border: 1rpx solid pink;
			box-sizing: border-box;
			box-shadow: 0px -10px 0px 0px rgba(0, 0, 0, 0),
				/*上边阴影  透明*/
			
				-10px 0px 0px 0px rgba(0, 0, 0, 0),
				/*左边阴影  透明*/
			
				10px 0px 0px 0px rgba(0, 0, 0, 0),
				/*右边阴影  透明*/
			
				0px 10px 30px 0px rgba(0, 0, 0, 0.1);
			/*下边阴影 */
			border-radius: 20rpx;
			background-color: #ffffff;
			.service_title {
				padding-top: 30rpx;
				padding-left: 20rpx;
			}
			.service_item{
				display: flex;
				flex-wrap: wrap;
				justify-content:space-around;
				width: 100%;
				
				image {
					width: 90rpx;
					height: 90rpx;
				}
			}
			// display: flex;
			// flex-wrap: wrap;
			// justify-content: space-around;
			// width: 100%;
			// image{
			// 	width: 90rpx;
			// 	height: 90rpx;
			// }
		}
	}
</style>
