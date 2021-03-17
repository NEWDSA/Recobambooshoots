<template>
	<view class="content">
		<scroll-view class="scroll-h" :scroll-x="true" :scroll-into-view="scrollInfo">
			<view v-for="(tab,index) in tabBars" :key="tab.id" class="tab-items" :class="{current: index === tabCurrentIndex}"
			 :id="tab.id" :data-current="index" @click="changeTab(index)">
				<text>{{tab.name}}</text>
			</view>
		</scroll-view>
		<!-- 内容显示-->
		<swiper class="cont_area" id="swiper" :duration="300" :current="tabCurrentIndex" @change="changeTab">
			<swiper-item v-for="tabItem in newsList" :key="tabItem.id">
				<scroll-view  show-scrollbar="false" :scroll-y="enableScroll" @scrolltoupper="loadMore">
					<view v-for="(item, index) in newsList" :key="index" class="l_text">
						<text class="l-text">{{item.Title}}</text>
						<text>{{item.ModifiedAt}}</text> <!-- 格式化时间-->
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<uni-load-more :status="status" :content-text="contentText" color="#007aff" />
	</view>
</template>
<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more';
	export default {
		data() {
			return {
				tabBars: [{
					name: '中原獨家研究',
					id: '1',
					type: 'EX'
				}, {
					name: '工商鋪市場分析',
					id: '2',
					type: 'GSP'
				}, {
					name: '橫琴市況分析',
					id: '3',
					type: 'HQ'
				}],
				newsList: [],
				scrollInfo: "",
				tabCurrentIndex: 0,
				page: 1,
				enableScroll: true,
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
		components: {
			//mixLoadMore
			// mixPulldownRefresh
		},
		async onLoad() {

			uni.request({
				// url: 'http://10.68.2.9/CenMacauCMS2/Api/Article/GetListWithNoStyle',
				url:'http://mo.centanet.com/CenMacauCMS/Api/Article/GetListWithNoStyle',
				method: 'POST',
				data: {
					"pageIndex": 1,
					"pageSize": 20,
					"type": "EX"
				},
				success: (res) => {
					this.newsList = res.data.InnerList;
				}
			})
		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function() {
				//设置数据刷新
				uni.request({
					// url: 'http://10.68.2.9/CenMacauCMS2/Api/Article/GetListWithNoStyle',
					url:'https://mo.centanet.com/CenMacauCMS/Api/Article/GetListWithNoStyle',
					method: 'POST',
					data: {
						"pageIndex": 1,
						"pageSize": 20,
						"type": "EX"
					},
					success: (res) => {
						this.newsList = res.data.InnerList;
					}
				})
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom() {
			console.log('aaaaaa')
			let _self=this;
			this.status='loading',
			uni.showNavigationBarLoading()
			setTimeout(function() {
				//设置数据刷新
				uni.request({
					// url: 'http://10.68.2.9/CenMacauCMS2/Api/Activities/GetList?',
					url:'https://mo.centanet.com/CenMacauCMS/Api/Activities/GetList?',
					data: {
						"pageIndex": 1,
						"pageSize": 20
					},
					success: (res) => {
						this.newsList = res.data.InnerList;
					}
				})
				_self.status='more',
				uni.hideNavigationBarLoading()
			}, 1000);
		},
		methods: {
			async changeTab(e) { // tab 切換
				let index;

				var _this = this;
				if (typeof e === 'object') {
					let type;
					var l_index = this.tabCurrentIndex = e.detail.current;
					this.tabBars.forEach(function(item) {
						if (l_index == item.index) {
							type = item.type;
							// console.log(type)
						}
					})
					_this.changeCont(type)
				} else {
					let type
					this.tabCurrentIndex = e;
					this.tabBars.forEach(function(item) {
						if (l_index == item.index) {
							type = item.type;
						}
					})
					_this.changeCont(type)
				}

			},
			async changeCont(type) {
				uni.request({
					// url: 'https://10.68.2.9/CenMacauCMS2/Api/Article/GetListWithNoStyle',
					url:'https://mo.centanet.com/CenMacauCMS/Api/Article/GetListWithNoStyle',
					method: 'POST',
					data: {
						"pageIndex": 1,
						"pageSize": 20,
						"type": type
					},
					success: (res) => {
						this.newsList = res.data.InnerList;
					}
				})
			},
			async loadMore() {
				
				console.log('aaaaaa')
				let _self=this;
				this.status='loading',
				uni.showNavigationBarLoading()
				setTimeout(function() {
					//设置数据刷新
					uni.request({
						// url: 'http://10.68.2.9/CenMacauCMS2/Api/Activities/GetList?',
						url:'https://mo.centanet.com/CenMacauCMS/Api/Activities/GetList?',
						data: {
							"pageIndex": 1,
							"pageSize": 20
						},
						success: (res) => {
							this.newsList = res.data.InnerList;
						}
					})
					_self.status='more',
					uni.hideNavigationBarLoading()
				}, 1000);
			},
			setEnableScroll(enable) {
				if (this.enableScroll !== enable) {
					this.enableScroll = enable;
				}
			}

		}
	}
</script>

<style lang='scss'>
	page,
	.content {
		background-color: #f8f8f8;
		height: 100%;
		overflow: hidden;
	}

	page,
	.tabs {
		background-color: #f8f8f8;
		height: 100%;
		overflow: hidden;

		.scroll-h {
			position: relative;
			width: 750rpx;
			height: 70rpx;
			white-space: nowrap;
			border-bottom: 2rpx solid #C0C0C0;

			.tab-items {
				width: 200rpx;
				display: inline-block;
				margin: 10rpx 20rpx;
				font-size: 25rpx;
				line-height: 60rpx;
				text-align: center;
				color: #808080;
				position: relative;

				&:after {
					content: '';
					width: 0;
					height: 0;
					border-bottom: 4upx solid #aa0000;
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					transition: .3s;
				}
			}

			.current {
				color: #aa0000;

				&:after {
					width: 50%;
				}
			}
		}

		.panel-content {
			/* position: absolute; */
			/* top: 10rpx; */
		}

		.cont_area {
			/* position: relative; */
			width: 725rpx;
			height: 100%;
			/* height: calc(100% - 75rpx); */
			margin: 0 auto;
			box-sizing: border-box;
			/* border: 1px solid #0000FF; */

			.l_text {
				display: flex;
				flex-direction: column;
				justify-content: center;
				font-size: 25rpx;
				height: 90rpx;
				/* line-height: 90rpx; */
				border-bottom: 1rpx solid #C0C0C0;
			}

			scroll-view ::-webkit-scrollbar {

				width: 0;

				height: 0;

				background-color: transparent;

			}
		}
	}
</style>
