<template>
	<view class="ac_flex">
		<template v-for="(content,index) in active">
			<view class="l_img" v-if="content.ActivityImg" v-show="content.ActivityImg.length>0" @click="details(content.ActivityTimeKey)">
				<!-- <an-image :src="content.ActivityImg[0]" :width="640" :height="480"  :radius="25"></an-image> -->
				<image mode="scaleToFill" :src="content.ActivityImg[0]" @error="imgerror($event,index)"></image>
				<view class="l_title"><text>{{content.Title}}</text></view>
			</view>
		</template>
		<!-- 下拉加载更多 -->
		<!-- <mix-load-more :status="loadMoreStatus"></mix-load-more> -->
		<uni-load-more :status="status" :content-text="contentText" color="#007aff" />
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more';
	export default {
		data() {
			return {
				active: [],
				show: true,
				shor: true,
				page: 1,
				status: 'more',
				statusTypes: [{
					value: 'more',
					text: '加载前'
				}, {
					value: 'loading',
					text: '加载中'
				}, {
					value: 'noMore',
					text: '没有更多'
				}],
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				}
			}
		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function() {
				//设置数据刷新
				uni.request({
					// url: 'http://10.68.2.9/CenMacauCMS2/Api/Activities/GetList?',
					url: 'https://mo.centanet.com/CenMacauCMS/Api/Activities/GetList?',
					data: {
						"pageIndex": 1,
						"pageSize": 20
					},
					success: (res) => {
						this.newsList = res.data.InnerList;
					}
				})
				uni.stopPullDownRefresh();
			}, 1000);
		},
		/* 加载时请求数据 */
		async onLoad() {
			uni.request({
				// url: 'http://10.68.2.9/CenMacauCMS2/Api/Activities/GetList?',
				url: 'http://mo.centanet.com/CenMacauCMS/Api/Activities/GetList?',
				data: {
					"pageIndex": this.page,
					"pageSize": 20
				},
				success: (res) => {
					this.active = res.data.InnerList;
				}
			})
		},
		/* 上拉加载更多 */
		onReachBottom() {
			let _self = this;
			this.status = 'loading',
				uni.showNavigationBarLoading()
			setTimeout(function() {
				//设置数据刷新
				uni.request({
					// url: 'http://10.68.2.9/CenMacauCMS2/Api/Activities/GetList?',
					url: 'https://mo.centanet.com/CenMacauCMS/Api/Activities/GetList?',
					data: {
						"pageIndex": 1,
						"pageSize": 20
					},
					success: (res) => {
						this.newsList = res.data.InnerList;
					}
				})
				_self.status = 'more',
					uni.hideNavigationBarLoading()
			}, 1000);
		},
		methods: {
			/* 页面跳转 */
			details(a) {
				uni.navigateTo({
					url: `/pages/detail/detail?data=` + a,
				})
			},
			/* 处理图片错误 */
			imgerror(e, index) {
				console.log(this.active[index]["ActivityImg"].splice(0, 1));
				console.log(this.active[index]["ActivityImg"].splice(0, 0, '/static/noImg@2x.png'));
			},
			/* 加载更多内容 */
			loadMore() {
				this.loadMoreStatus = 1;
				var _this = this;
				this.page++;
				uni.request({
					// url: 'http://10.68.2.9/CenMacauCMS2/Api/Activities/GetList?',
					url: 'https://mo.centanet.com/CenMacauCMS/Api/Activities/GetList?',
					data: {
						"pageIndex": this.page,
						"pageSize": 20
					},
					success(res) {
						this.active = res.data.InnerList;
						console.log('1111111')
					},
					fail() {
						this.loadMoreStatus = 2;
						console.log('错误！')
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.ac_flex {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		box-sizing: border-box;

		.l_img {
			position: relative;
			width: 750rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-bottom: 30rpx;

			// border: 1px solid pink;
			// .l_cover {
			// 	border-radius: 25rpx;
			// }
			image {
				width: 640rpx;
				border-radius: 25rpx;
			}

			.l_title {
				position: absolute;
				bottom: 0;
				width: 640rpx;
				height: 60rpx;
				line-height: 60rpx;
				box-sizing: border-box;
				border-radius: 0rpx 0rpx 25rpx 25rpx;
				background: rgba(0, 0, 0, 0.5);
				padding-left: 20rpx;
				color: #FFFFFF;
				// border: 1px solid red;
			}
		}
	}
</style>
