<template>
	<view class="content">
		<!-- tab選項卡 -->
		<view class="tab">
			<scroll-view class="scroll-h" :scroll-x="true" :scroll-left="scrollLeft">
				<view v-for="(tab, index) in tabBars" :key="tab.id" class="tab-items" :class="{ current: index == tabCurrentIndex }"
				 :id="tab.id" :data-current="index" @click="changeTab">
					<text>{{ tab.name }}</text>
				</view>
			</scroll-view>
		</view>
		<!-- 輪播切換內容 -->
		<swiper class="cont_area" id="swiper" :duration="300" :current="tabCurrentIndex" @change="onchangeTab">
			<swiper-item v-for="tabItem in newsList" :key="tabItem.id">
				<scroll-view scroll-y @scrolltolower="loadmore" class="panel-scroll-box">
					<view v-for="(item, index) in newsList" :key="index" class="l_text" @click="getNewsdetail(item)">
						<!-- 标题 -->
						<text class="l-text">{{ item.Title }}</text>
						<!-- 编辑日期 -->
						<text class="l-modify">{{ item.ModifiedAt | formatDate }}</text>
					</view>
					<uni-load-more :status="loadStatus"></uni-load-more>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	let scrollTimer = false
	export default {
		data() {
			return {
				// 切換菜單項
				tabBars: [{
						name: "中原獨家研究",
						id: "1",
						types: "EX",
					},
					{
						name: "工商鋪市場分析",
						id: "2",
						types: "GSP",
					},
					{
						name: "橫琴市況分析",
						id: "3",
						types: "HQ",
					},
				],
				type: 'EX',
				newsList: [],
				tabCurrentIndex: 0, //当前tabindex
				scrollLeft: 0, //顶部选项卡左滑距离,
				page: 1,
				pagesize: 20,
				loadStatus: 'loading',
				isLoadMore: false
			};
		},
		//页面初始加载
		async onLoad() {
			// this.$request(({
			// 	method: 'POST',
			// 	url: '/Api/Article/GetListWithNoStyle',
			// 	data: {
			// 		pageIndex: this.page,
			// 		pageSize: this.pagesize,
			// 		type: this.type
			// 	}
			// })).then((res) => {
			// 	this.newsList = res.InnerList;
			// })
			this.$minApi.newsList({
				pageIndex: this.page,
				pageSize: this.pagesize,
				type: this.type
			}).then(res=>{
				this.newsList = res.InnerList;
			})

		},
		//下拉刷新
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000)
		},
		//上拉触底
		onReachBottom() {
			// console.log('上拉触底')
			if (!this.isLoadMore) {
				this.isLoadMore = true
				this.page += 1
				this.getDate()

			}
		},
		// 格式化日期
		filters: {
			formatDate(value) {
				// ios日期处理  formatDate
				if (value != "" && value != null) {
					var date = new Date(Date.parse(value.replace(/-/g, "/")));
					
					var month = date.getMonth() + 1;
					var time = date.getFullYear() + "-" + month + "-" + date.getDate();
					return time;
				}

			}
		},
		methods: {
			//tab切换
			changeTab(e) {
				let index = e.target.dataset.current || e.currentTarget.dataset.current;
				//判斷是否為tab切換
				//獲取 tabars 條目數
				var length = this.tabBars.length - 1;
				//下標越界處理
				if (index > length) {
					index = 0;
				}
				this.tabCurrentIndex = index;
			},
			//ONtab切换
			onchangeTab(e) {
				let index = e.target.current || e.detail.current;
				var length = this.tabBars.length - 1;
				if (index > length) {
					index = 0;
				}
				this.tabCurrentIndex = index
				this.type = this.tabBars[index].types;
				this.switchTab();
			},
			// 加载更多数据
			loadmore() {
				if (!this.isLoadMore) {
					this.isLoadMore = true
					this.page += 1
					this.getDate()

				}
			},
			//切换tab
			async switchTab() {
				// this.$request({
				// 	method: 'POST',
				// 	url: '/Api/Article/GetListWithNoStyle',
				// 	data: {
				// 		pageIndex: this.page,
				// 		pageSize: this.pagesize,
				// 		type: this.type
				// 	}
				// }).then((res) => {
				// 	this.newsList = res.data.InnerList;
				// })
				this.$minApi.newsList({
					pageIndex: this.page,
					pageSize: this.pagesize,
					type: this.type
				}).then(res=>{
					this.newsList = res.data.InnerList;
				})
			},
			// 查看资讯详情
			getNewsdetail(item) {
				let obs = JSON.stringify(item);
				console.log(obs);
				uni.navigateTo({
					url: '../../../pagesA/page/newsdetail/newsdetail?data=' + encodeURIComponent(obs),
					animationType:'pop-out',
					animationDuration:200
				})
			},
			//获取数据
			getDate() {
				// this.$request({
				// 	method: 'POST',
				// 	url: '/Api/Article/GetListWithNoStyle',
				// 	data: {
				// 		pageIndex: this.page,
				// 		pageSize: this.pageSize,
				// 		type: this.type
				// 	}
				// }).then((res) => {
				// 	this.newsList = res.InnerList;
				// 	if (res.InnerList.length < this.pagesize) {
				// 		this.isLoadMore = true;
				// 		this.loadStatus = 'nomore'
				// 	} else {
				// 		this.isLoadMore = true
				// 		this.loadStatus = 'nomore'
				// 	}
				// })
				this.$minApi.newsList({
					pageIndex: this.page,
					pageSize: this.pageSize,
					type: this.type
				}).then(res=>{
					this.newsList = res.InnerList;
					if (res.InnerList.length < this.pagesize) {
						this.isLoadMore = true;
						this.loadStatus = 'nomore'
					} else {
						this.isLoadMore = true
						this.loadStatus = 'nomore'
					}
				})
			}

		}
	}
</script>

<style lang='scss'>
	page,
	.content {
		background-color: #f8f8f8;
		height: 100%;
	}
	page,
	.tabs {
		background-color: #f8f8f8;
		height: 100%;
		.scroll-h {
			width: 750rpx;
			height: 90rpx;
			white-space: nowrap;
			border-bottom: 2rpx solid #c0c0c0;

			.tab-items {
				width: 200rpx;
				display: inline-block;
				margin: 10rpx 25rpx;
				font-size: 32rpx;
				line-height: 60rpx;
				text-align: center;
				color: #808080;
				position: relative;
				&:after {
					content: "";
					width: 0;
					height: 0;
					border-bottom: 4upx solid #aa0000;
					position: absolute;
					left: 50%;
					bottom: -20rpx;
					transform: translateX(-50%);
					transition: 0.3s;
				}
			}
			.current {
				height: 61rpx;
				color: #ce1b1b;
				&:after {
					width: 88rpx;
					height: 4rpx;
				}
			}
		}
		.cont_area {
			width: 725rpx;
			height: calc(100% - 70rpx);

			margin: 0 auto;
			box-sizing: border-box;
			.l_text {
				display: flex;
				flex-direction: column;
				justify-content: center;
				font-size: 32rpx;
				color: #333333;
				height: fit-content;
				border-bottom: 1rpx solid #c0c0c0;
				.l-text{
					margin-top: 31rpx;
					margin-left: 30rpx;
					margin-right: 49rpx;
					margin-bottom: 23rpx;
					letter-spacing:3rpx;
					color: #333333;
				}
				.l-modify{
					margin-left: 30rpx;
					margin-bottom: 33rpx;
					color: #999999;
					
				}
			}
			.panel-scroll-box {
				height: 100%;
			}
		}
	}
</style>
