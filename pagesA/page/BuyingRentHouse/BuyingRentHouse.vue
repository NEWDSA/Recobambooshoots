<template>
	<view class="contianer">
		<!-- tab選項卡 -->
		<scroll-view class="scroll-h" :scroll-x="true" :scroll-left="scrollLeft">
			<view style="display: flex;justify-content: space-around;">
				<view v-for="(tab, index) in tabBars" :key="tab.id" class="tab-items" :class="{ current: index == tabCurrentIndex }"
				 :id="tab.id" :data-current="index" @click="changeTab">
					<text>{{ tab.name }}</text>
				</view>
			</view>
		</scroll-view>
		<!-- 搜索框 -->
		<view style="display: flex;justify-content: center;margin-top: 20rpx;width: 100%;">
			<view class="search">
				<uni-icons color="#999999" size="25" type="search" />
				<input type="text" placeholder="請輸入心儀的樓盤名稱" placeholder-class="search_word" confirm-type="search" @confirm="searchhouse" />
			</view>
			<view class="cancel" @click="cancel"><text>取消</text></view>
		</view>
		<!-- 内容区域 -->
		<view class="content">
			<!-- 歷史記錄 -->
			<view class="history">
				<view style="width: 90%;padding-left: 30rpx;">
					<text>歷史記錄</text>
				</view>
				<view style="width: 10%;padding-right: 5rpx;">
					<image src="http://10.68.2.9/CenMacauCMS2/static/icon-trash@2x.png"></image>
				</view>
			</view>
			<!-- 判斷是否存在歷史記錄 -->
			<template v-if="hasHistory">

			</template>
			<template v-else>
				<view class="nodate">
					<view>
						<image src="http://10.68.2.9/CenMacauCMS2/static/noData@2x.png"></image>
						<view style="width: 100%;text-align: center;"><text>暫無數據</text></view>
					</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 切换菜单项
				tabBars: [{
					name: "買樓",
					SellType: '放售',
					id: "1",

				}, {
					name: "租房",
					SellType: '放租',
					id: "2"
				}],
				scrollLeft: 0, //頂部選項卡左滑距離
				tabCurrentIndex: 0, //当前tabindex
				hasHistory: false,
				pageIndex:1,
				pageSize:10
			}
		},
		methods: {
			// 點擊切換tab項
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
				
				// console.log(e)
			},
			searchhouse(event){
				console.log(event.detail.value);
				// this.$request({
				// 		method:'GET',
				// 		url:'Api/Building/GetList',
				// 		Params:{
				// 			pageIndex:this.pageIndex,
				// 			pageSize:this.pageSize,
				// 			IsHotNum:1,
				// 			pltemType:住宅部,
				// 			SaleType:放售,
				// 			Parking:不限,
				// 			Price:不限,
				// 			Rent:不限,
				// 			OrderBy:默認
				// 		}
				// 	}).then((res)=>{
				// 		console.log('输出内容')
				// 		console.log(res)
				// 	})
				let Build=event.detail.value
				let obs=JSON.stringify(Build)
				
				console.log(encodeURIComponent(obs))
				// let objs=JSON.stringify(Build)
				// console.log(objs)
				// 页面跳转
				uni.navigateTo({
					url:'../BuyHouse/BuyHouse?Building='+encodeURIComponent(obs),
					
				})
			},
			// confirmTap:function(e){
			 
			// console.log(e);
			 
			// },
			// 搜索内容
			
			// searchhouse:function(){
			// 	console.log(event.detail.value)
			// 	this.$request({
			// 		method:'GET',
			// 		url:'Api/Building/GetList',
			// 		Params:{
			// 			pageIndex,
			// 			pageSize,
			// 			IsHotNum:1,
			// 			pltemType:住宅部,
			// 			SaleType:放售,
			// 			Parking:不限,
			// 			Price:不限,
			// 			Rent:不限,
			// 			OrderBy:默認
			// 		}
			// 	}).then((res)=>{
			// 		console.log('输出内容')
			// 		console.log(res)
			// 	})
			// },
			cancel() {
				uni.navigateBack({
					delta: 1,
					animationType: 'pop-out',
					animationDuration: 200
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contianer {
		position: relative;

		width: 100%;
		height: 100%;

		.scroll-h {
			position: relative;
			width: 750rpx;
			height: 70rpx;

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
					content: "";
					width: 0;
					height: 0;
					border-bottom: 4upx solid #aa0000;
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					transition: 0.3s;
				}
			}

			.current {
				color: #aa0000;

				&:after {
					// width: 50%;
					width: 13%;
				}
			}
		}

		.search {
			display: flex;
			align-items: center;
			width: 80%;
			height: 70rpx;
			box-sizing: border-box;
			background-color: #f7f7f7;
			border-radius: 20rpx;

			/deep/ .search_word {
				font-size: 25rpx;
				color: #c1c1c6;
			}

			uni-icons {
				margin-left: 20rpx;
			}

			input {
				width: 100%;
				height: 100%;
			}
		}

		.cancel {
			display: flex;
			align-items: center;
			box-sizing: border-box;
			padding-left: 20rpx;
			color: #555555;
		}

		.content {
			// display: flex;
			// align-items: center;
			// flex-wrap: wrap;
			width: 100%;
			// height: 100%;
			height: calc(100% - 160rpx);
			box-sizing: border-box;
			// border: 1px solid pink;

			.history {
				position: relative;
				top: 50rpx;
				display: flex;
				align-items: center;

				text {
					color: #8b8b8b;
				}

				image {
					width: 20rpx;
					height: 30rpx;
				}
			}
			
			.nodate {
				position: relative;
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: calc(100% - 50rpx);
				
				box-sizing: border-box;
				// border: 1rpx solid yellow;
				// border: 1rpx solid #8F8F94;
				image {
					width: 150rpx;
					height: 120rpx;
				}
			}
			
		}


		// .nodate {
		// 	position: relative;
		// 	display: flex;
		// 	flex-wrap: wrap;
		// 	justify-content: center;
		// 	align-items: center;
		// 	width: 100%;
		// 	height: calc(100% - 175rpx);
		// 	box-sizing: border-box;

		// 	// border: 1rpx solid #8F8F94;
		// 	image {
		// 		width: 150rpx;
		// 		height: 120rpx;
		// 	}
		// }

	}
</style>
