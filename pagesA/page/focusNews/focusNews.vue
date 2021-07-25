<template>
	<view class="contianer">
		<nav-bar>
			<view class="search_box">
				<text class="icon_search"></text>
				<input type="text" class="prompt" v-model="search" placeholder="請輸入樓盤名稱" placeholder-class="search_word" @confirm="searchNow($event)" confirm-type="search"></text>
			</view>
		</nav-bar>
		<!-- 地區选择 -->
		<view style="height: 90rpx;">
			<view class="direction">
				<scroll-view scroll-x="true" style="width: 100%;">
					<view class="tab_block">
						<view v-for="(item,index) in FoucsNews" @click="region(item.Region)" :class="index===iindex?'zblock':'block'">
							<text>{{item.Region}}</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 地区信息 -->
		<view class="district" style="display: flex;  width: 100%; flex-wrap: wrap;box-sizing: border-box;">
			<view style="width: calc(50% - 20rpx);margin-top: 20rpx; margin-left: 10rpx; margin-right: 10rpx; box-sizing: border-box;border-radius: 10rpx; box-shadow: 0 0 5rpx #000000;" v-for="(item,index) in District">
					<image mode="aspectFill"  :src="item.LargePic" @error="imgerror($event,index)"></image>
				<view style="white-space: nowrap; text-align: left;font-size: 30rpx;text-overflow: ellipsis;overflow: hidden;box-sizing: border-box;"><text>{{item.Title}}</text></view>
			</view>
		</view>
		<view class="reservation" @click="reservation">
			<view class="circle">
				<view class="mtext"><text>預約睇樓</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				FoucsNews: [],
				District: [],
				iindex: 0,
				errimg: [],
				search:''

			}
		},
		onLoad() {
			// this.$request({
			// 	method: 'POST',
			// 	url: '/Api/Article/GetAllFocusOneHand'
			// }).then((res) => {
			// 	this.FoucsNews = res.InnerList;
			// 	this.District = this.FoucsNews[0].ArticleList
			// })
			

			this.$minApi.FocusNews().then(res=>{
				this.FoucsNews = res.InnerList;
				this.District = this.FoucsNews[0].ArticleList
			})


		},
		methods: {
			// 点击显示地区
			region(region) {
				this.FoucsNews.forEach((item, index) => {
					if (item.Region == region) {
						console.log(index)
						this.iindex = index
						this.District = this.FoucsNews[index].ArticleList
					}
				})
			},
			//处理错误图片
			imgerror(e, index) {
				let myindex = this.iindex
				this.FoucsNews[myindex].ArticleList[index].LargePic = "http://10.68.2.9/CenMacauCMS2/static/noImg@2x.png";
			},
			searchNow(event){
				
			},
			reservation(){
				uni.navigateTo({
					url:'../reservation/reservation'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page,
	.contianer {
		width: 100%;
		height: 100%;
		image{
			width: calc(375rpx - 20rpx );
			height: calc(375rpx - 20rpx );
		}
		.search_box {
			margin-right: 30upx;
			width: 300upx;
			height: 64upx;
			background-color: #f5f5f5;
			border-radius: 32upx;
			display: flex;
			align-items: center;
			padding: 0upx 40upx;

			/deep/ .search_word {
				font-size: 25rpx;
				color: #c1c1c6;
			}

			.prompt {
				width: 200rpx;
				font-size: 28upx;
				color: #333333;
			}
			.icon_search {
				background-image: url(http://10.68.2.9/CenMacauCMS2/static/map_ic_search.png);
				background-position: center center;
				background-repeat: no-repeat;
				background-size: cover;
				width: 29upx;
				height: 28upx;
				margin-right: 20upx;
			}
		}

		.direction {
			position: fixed;
			width: 100%;
			box-sizing: border-box;
			
			.tab_block {
				display: flex;
				justify-content: flex-start;
				box-sizing: border-box;
				width: 100%;
				background-color: #ffffff;

				.block {
					width: fit-content;
					margin: 20rpx 20rpx;
					box-sizing: border-box;
					background-color: #FFFFFF; // 普通背景颜色
					font-size: 26rpx;
					color: #575757;
					padding: 5rpx 5rpx;
					box-shadow: 0rpx 0rpx 5rpx #909090;
				}

				.zblock {
					width: fit-content;
					margin: 20rpx 20rpx;
					box-sizing: border-box;
					background-color: #be3128; // 普通背景颜色
					font-size: 26rpx;
					color: #FFFFFF;
					padding: 5rpx 5rpx;
					box-shadow: 0rpx 0rpx 5rpx #909090;
				}
			}
			
		}
		.reservation{
			position:fixed;
			display: flex;
			right: 10rpx;
			bottom: 160rpx;
			box-sizing: border-box;
			.circle{
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				background-color: #c83223;
				box-shadow: 0 0 5rpx #007AFF;
				font-size: 20rpx;
				.mtext{
					width:50rpx;
					box-sizing: border-box;
					text-align: center;
					color: #FFFFFF;
				}
			}
		}
	}
</style>
