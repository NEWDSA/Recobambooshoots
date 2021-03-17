<template>
	<view class="l_content">
		<swiper class="cont_area" :duration="300" :current="tabCurrentIndex" indicator-dots="true">
			<swiper-item v-for="(content,index) in Activity.ActivityImg" :key="content.id">
				<image class="l_img"  mode="scaleToFill" :src="content" @error="imgerror($event,index)"></image>
				<!-- <an-image :width="750" :height="480" :src="content" alt="../../static/logo.png"></an-image> -->
			</swiper-item>
		</swiper>
		<view v-show="ShareUrl">
			分享:<button type="share">4444</button>
		</view>
		<view class="l_area">
			<view class="l_title">
				<text>{{Activity.Title}}</text>
			</view>
			<view class="l_title">
				地點：
				<text>{{Activity.ActivityAddress}}</text>
			</view>
			<view class="l_title">
				預約熱綫:
				<text class="l_line">{{Activity.Hotline}}</text>
			</view>

		</view>
	</view>
</template>
<script>
	// import anImage from '@/components/an-image/an-image' //引入组件//引入图片组件
	export default {
		data() {
			return {
				staff: [],
				Activity: {},
				ShareUrl: {},
				title: '',
				tabCurrentIndex: 0
			}
		},
		async onLoad(a) {
			// console.log(a)
			uni.request({
				url: 'http://10.68.2.9/CenMacauCMS2/Api/Activities/GetActivityDetail?ActivityTimeKey=' + a.data,
				success: (res) => {
					this.staff = res.data.staff;
					// console.log(res.data)
					this.Activity = res.data.Activity;
					this.ShareUrl = res.data.ShareUrl;
					console.log(this.ShareUrl)
				}
			})
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: '详情'
			})
		},
		methods: {
			share(value) {
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 2,
					imageUrl: "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/d8590190-4f28-11eb-b680-7980c8a877b8.png",
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				})
			},
			imgerror(e,index){
				this.Activity.ActivityImg.splice(index,1);
				this.Activity.ActivityImg.splice(index,0,'/static/noImg@2x.png');
			}
		}
	}
</script>

<style lang="scss">
	page,
	.l_content {
		display: flex;
		// align-items: flex-start;
		// align-content: center;
		box-sizing: border-box;
		flex-direction: column;
		width: 100%;
		height: 100%;

		// border: 1px solid pink;
		.cont_area {
			display: flex;
			align-content: center;
			width: 100%;
			height: 500rpx;
			margin-top: 20rpx;
			box-sizing: border-box;
			// border: 1px solid yellow;
			
		}
		.l_img{
			width: 750rpx;
			height: 480rpx;
			box-sizing: border-box;
			// border: 1px solid red;
		}
		.l_area {
			width: 100%;
			height: auto;
			box-sizing: border-box;
			// border: 1px solid blue;
			background: #FFFFFF;

			.l_title {
				float: left;
				box-sizing: border-box;
				display: inline-block;
				width: 100%;
				font-size: 30rpx;
				// height: 700rpx;
				margin: 0 10rpx;
				// background: #F8F8F8;
			}

			.l_line {
				color: #DD524D;
			}

			.l_addres {
				width: auto;
				display: inline-block;
				margin: 0 10rpx;
				// width: 300rpx;
				// border: 1px solid red;
			}
		}
		
		.l_pic {
			margin-bottom: 20rpx;
		}
	}
</style>
