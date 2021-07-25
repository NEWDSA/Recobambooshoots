<template>
	<view class="container">
		<!-- 條件搜索框 -->
		<nav-bar>
			<view class="search-container">
				<input placeholder="請輸入樓盤名稱" placeholder-class="search-holder" confirm-type="search" @confirm="search" />
			</view>
		</nav-bar>
		<!-- 循環出地區信息 -->
		<view class="tab">
			<scroll-view class="scroll-h" :scroll-x="true">
				<view v-for="(item,index) in District" :key="item.id" class="tab-items" :class="{ current: index == tabCurrentIndex }"
				 @click="changeTab" :id="item.id" :data-current="index">
					<text>{{item.Name}}</text>
				</view>
			</scroll-view>
		</view>
		<!-- end 循環地區信息 -->
		<view class="lunbo">
			<template v-for="(item,index) in menuDistrict">
				<view class="external-box" @click="district(item)">
					<view class="boxborder">
						<view class="imgcover">
							<!-- 加水印控制圖片大小 -->
							<image style="width: 100%;height: 100%;object-fit: contain;" :src="item.ImgList[0].Path+'?watermark=smallgroup_center&w=400'"></image>
							<!-- end 加水印控制圖片大小 -->
						</view>
						<!-- 標題 -->
						<view class="img_title">{{item.PropertyTitle}}</view>
						<!--  -->
						<view class="item_list">
							<image class="pic_img" src="http://10.68.2.9/CenMacauCMS2/static/location_icon@2x.png"></image>
							{{item.Address}}
						</view>
					</view>
				</view>
			</template>
		</view>
		<!-- 滾動區域 -->
		<!-- 上拉加载更多 -->
		<!-- 需要接口 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				District: [],
				menuDistrict: [],
				tabCurrentIndex: 0, //当前tabindex
				pageIndex: 1,
				pageSize: 20,
				ID: '',
				loadStatus: 'loading',
				isLoadMore: false,
				HistoryTrans: ""
			}
		},
		onLoad(option) {
			// 判斷object對象是否為空
			if (JSON.stringify(option) !== '{}') {
				// console.log('進入查詢');
				// console.log(option)
				// this.$request({
				// 	method: 'get',
				// 	url: '/Api/EstatesBook/GetBookList',
				// 	data: {
				// 		pageIndex: this.pageIndex, //當前頁
				// 		pageSize: this.pageSize, //顯示頁
				// 		District: option.District,
				// 		PropertyTitle: option.search
				// 	}
				// }).then(res => {
				// 	this.menuDistrict = res.InnerList;
				// 	this.$request({
				// 		method: 'get',
				// 		url: '/Api/EstatesBook/GetBookAreaList',
				// 		data: {
				// 			pageIndex: this.pageIndex,
				// 			pageSize: this.pageSize,
				// 			District: option.District
				// 		}
				// 	}).then(res=>{
				// 		console.log(this.District = res.InnerList)
				// 	})
				// })

				this.$minApi.EstatesBooklist({
						pageIndex: this.pageIndex, //當前頁
						pageSize: this.pageSize, //顯示頁
						District: option.District,
						PropertyTitle: option.search
				}).then(res=>{
					this.menuDistrict = res.InnerList;
					this.$minApi.EstatesBookPartitionlist({
							pageIndex: this.pageIndex,
							pageSize: this.pageSize,
							District: option.District
					}).then(res=>{
						this.District = res.InnerList
					})
				})

			} else {

				// this.$request({
				// 	method: 'get',
				// 	url: '/Api/EstatesBook/GetBookAreaList'
				// }).then((res) => {
				// 	this.District = res.InnerList;
				// 	let Dist = res.InnerList[0].ID; // 選擇區域
				// 	this.ID = Dist;
				// 	// 获取楼盘天书列表
				// 	this.$request({
				// 		method: 'get',
				// 		url: '/Api/EstatesBook/GetBookList',
				// 		data: {
				// 			pageIndex: this.pageIndex,
				// 			pageSize: this.pageSize,
				// 			District: Dist
				// 		}
				// 	}).then((res) => {
				// 		console.log(this.menuDistrict = res.InnerList)
				// 	})
				// });

				this.$minApi.EstatesBookPartitionlist().then(res=>{
					this.District = res.InnerList;
					let Dist = res.InnerList[0].ID; // 選擇區域
					this.ID = Dist;
					// 獲取樓盤天書列表
					this.$minApi.EstatesBooklist({
						pageIndex: this.pageIndex,
						pageSize: this.pageSize,
						District: Dist
					}).then(res=>{
						this.menuDistrict = res.InnerList
					})
				})


			}

			let _that = this
			// uni.request({
			// 	url: 'http://mo.centanet.com/Transaction',
			// 	data: {
			// 		isFrame: true,
			// 		Name: '擎天匯'
			// 	},
			// 	success: function(res) {
			// 		_that.HistoryTrans = res.data;

			// 	}
			// });

		},
		// 下拉刷新
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000)
		},
		methods: {
			changeTab(e) {
				let index = e.currentTarget.dataset.current
				this.ID = this.District[index].ID
				this.tabCurrentIndex = index
				//切换数据显示
				// this.$request({
				// 	method: 'get',
				// 	url: '/Api/EstatesBook/GetBookList',
				// 	data: {
				// 		pageIndex: this.pageIndex,
				// 		pageSize: this.pageSize,
				// 		District: this.ID
				// 	}
				// }).then((res) => {
				// 	this.menuDistrict = res.InnerList
				// })

				this.$minApi.EstatesBooklist({
					pageIndex: this.pageIndex,
					pageSize: this.pageSize,
					District: this.ID
				}).then(res=>{
					this.menuDistrict = res.InnerList
				})
			},
			// 頁面跳轉
			district(item) {
				//傳遞頁面參數
				let params = JSON.stringify(item);

				uni.navigateTo({
					url: '/pages/RealEstateBook/detail?data=' + encodeURIComponent(params) + '&District=' + this.ID,
					animationType: 'pop-out',
					animationDuration: 200
				})
			},
			search(e) {
				// this.$request({
				// 	method: 'get',
				// 	url: '/Api/EstatesBook/GetBookList',
				// 	data: {
				// 		pageIndex: this.pageIndex,
				// 		pageSize: this.pageSize,
				// 		District: this.ID,
				// 		PropertyTitle: e.detail.value

				// 	}
				// }).then((res) => {
				// 	this.menuDistrict = res.InnerList
				// })
			    this.$minApi.EstatesBooklist({
					pageIndex: this.pageIndex,
					pageSize: this.pageSize,
					District: this.ID,
					PropertyTitle: e.detail.value
				}).then(res=>{
					this.menuDistrict = res.InnerList
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100%;
	}

	/deep/.header_content {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		padding-right: 190rpx;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		width: 750rpx;
		-webkit-box-align: end;
		-webkit-align-items: flex-end;
		align-items: flex-end;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-webkit-flex-direction: row;
		flex-direction: row;
		height: 88rpx;
		position: relative;
	}

	/deep/ .header_title_center {
		position: absolute;
		bottom: 0rpx;
		left: 300rpx;
		-webkit-transform: translateX(-50%);
		transform: translateX(-50%);
	}

	.search-container {
		display: flex;
		align-items: center;
		width: 400rpx;

		height: 60rpx;
		border-radius: 50rpx;
		box-sizing: border-box;
		border-radius: 32rpx;
		background-color: #f2f2f2;

		input {
			padding-left: 15rpx;
			border-radius: 32rpx;
		}
	}

	/deep/ .search-holder {
		font-size: 28rpx;
		color: #a7a7af;
	}

	.tab {
		position: relative;
		background-color: #f8f8f8;
		width: 100%;
		height: 92rpx;

		.scroll-h {
			position: fixed;
			width: 750rpx;
			height: 90rpx;
			white-space: nowrap;
			background-color: #f8f8f8;
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
	}

	.lunbo {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		width: 100%;
		// height: 100%;
		overflow-y: scroll;

		.external-box {
			display: flex;
			width: 50%;
			flex-wrap: wrap;
			box-sizing: border-box;

			.boxborder {
				width: 100%;
				height: fit-content;
				box-sizing: border-box;
				margin: 10rpx;
				border-radius: 10rpx;
				box-sizing: border-box;
				box-shadow: 0rpx 1rpx 5rpx #909090; // 添加阴影效果
				background-color: #FFFFFF;

				.imgcover {
					width: 100%;
					height: 300rpx;
					border-top-left-radius: 10rpx;
					border-top-right-radius: 10rpx;

					image {
						border-top-left-radius: 10rpx;
						border-top-right-radius: 10rpx;
					}
				}

				.img_title {
					margin-left: 10rpx;
				}

				.item_list {
					display: flex;
					height: 80rpx;
					align-items: center;

					.pic_img {
						width: 30rpx;
						height: 30rpx;
						object-fit: contain;
						margin-left: 10rpx;
						margin-right: 10rpx;
					}
				}

			}
		}
	}

	.cont_area {
		width: 725rpx;
		height: calc(100% - 70rpx);

		margin: 0 auto;
		box-sizing: border-box;

		.external-box {
			display: flex;
			width: 50%;
			flex-wrap: wrap;
			box-sizing: border-box;

			.boxborder {
				width: 100%;
				height: fit-content;
				box-sizing: border-box;
				margin: 10rpx;
				border-radius: 10rpx;
				box-sizing: border-box;
				box-shadow: 0rpx 1rpx 5rpx #909090; // 添加阴影效果
				background-color: #FFFFFF;

				.imgcover {
					width: 100%;
					height: 300rpx;
					border-top-left-radius: 10rpx;
					border-top-right-radius: 10rpx;

					image {
						border-top-left-radius: 10rpx;
						border-top-right-radius: 10rpx;
					}

					// 顶部 radius
				}
			}
		}

		.panel-scroll-box {
			position: relative;
			display: flex;
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			border: 1rpx solid pink;
		}
	}
</style>
