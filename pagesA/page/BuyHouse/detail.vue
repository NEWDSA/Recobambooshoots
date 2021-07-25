<template>
	<view class="contianer">
		<scroll-view style="height: 95vh;" scroll-y>
			<!-- 轮播图 -->
			<swiper class="swiper" :style="{height:picHeight+'rpx'}" :duration="300" indicator-dots="true">
				<swiper-item v-for="(item,index) in items.Imgs" :key="item.id">
					<image id="cover" :style="{height:picHeight+'rpx'}" :src="item.Path"></image>
				</swiper-item>
			</swiper>
			<!-- 3660看樓、KOL視頻 -->
			<view class="item">
				<view>
					<image src="http://10.68.2.9/CenMacauCMS2/static/360See-Icon@2x.png"></image>
					<text>360睇樓</text>
				</view>
				<view>
					<image src="http://10.68.2.9/CenMacauCMS2/static/360See-Icon@2x.png"></image>
					<text>KOL視頻</text>
				</view>
				<view class="like" @click="favorit">
					<image :src="likesrc"></image>
				</view>
			</view>
			<view class="build">
				<view class="build_name">
					<text>{{items.Building}}</text>
				</view>
				<!-- 售價 -->
				<view class="sale_price">
					<text>售 HK ${{items.Price}}萬</text>
					<text>(售 MOP ${{items.MoPrice}}萬)</text>
					<view style="color: #333333;font-size: 25rpx;"><text>約 HK ${{items.AvgPrice}}元/平方呎</text></view>
				</view>
				<!-- 房屋面積 -->
				<view class="build_area">
					<view class="house_type">
						<text>{{items.CountF}}房</text>
						<text>{{items.CountT}}廳</text>
						<view><text>戶型</text></view>
					</view>
					<view class="area">
						<text>{{items.BuildingArea}}平方呎</text>
						<view>建築面積</view>
					</view>
					<view class="seat_direct">
						<text>暫無</text>
						<view>座向</view>
					</view>
					<view class="other">
						<view>
							<!-- 地區 -->
							<view style="width: 50%;">
								<text>地 區：</text>
								<view class="addr">
									<text>{{items.Bigdistnam}}-{{items.District}}</text>
								</view>
							</view>
							<!-- 類型 -->
							<view style="width: 50%;">
								<text>類型:</text><text>{{items.PropertyType2}}</text>
							</view>
							<!-- 車位 -->
							<view>
								<text>車位:</text><text>無</text>
							</view>
							<!-- 租/售 -->
							<view style="width: 50%;">
								<text>租 / 售：</text><text>{{items.SellType}}</text>
							</view>
							<!-- 樓盤編號 -->
							<view style="width: 50%;">
								<text>樓盤編號</text><text>#63376</text>
							</view>
							<view>
							</view>
						</view>

					</view>
				</view>
				<!-- 房貸參考 -->
				<view class="mortgage">
					<view><text>房貸參考</text></view>
					<view class="ext"><text>例子以澳門居民首次置業計算</text></view>
					<view style="width: 100%;height: 500rpx;">
						<l-echart ref="chart"></l-echart>
					</view>
				</view>
				<!-- 地理位置 -->
				<!-- <view class="geograp">
					<map style="width: 700rpx;height: 400rpx;" :latitude="latitude" :longitude="longitude" :markers="covers" scale="25">
					</map>
				</view> -->
			</view>
			<!-- 楼市成交 -->
			<view class="housemark">
				<view class="ex"><text>楼市成交</text></view>
			</view>
		</scroll-view>

		<!-- 聯繫人 -->
		<view class="contact">
			<view class="contact_info">

				<view class="head">
					<image :src="items.Staff.HeadImg"></image>
				</view>
				<view>
					<view>
						<text>{{items.Staff.Name}}</text>
						<text>{{items.Staff.EnglishName}}</text>
					</view>
					<view>
						<text>{{items.Staff.Telephone}}</text>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import * as echarts from '@/components/l-echart/echarts';
	export default {
		data() {
			return {
				items: {},
				latitude: '',
				longitude: '',
				url: '',
				covers: [],
				dom: '',
				list: '',
				likesrc: 'http://10.68.2.9/CenMacauCMS2/static/like_unselected_icon@2x.png',
				picHeight: '',
				swiperheight: '',
				option: {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							// 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						},
						confine: true
					},
					legend: {
						data: ['热度', '正面', '负面']
					},
					grid: {
						left: 20,
						right: 20,
						bottom: 15,
						top: 40,
						containLabel: true
					},
					xAxis: [{
						type: 'value',
						axisLine: {
							lineStyle: {
								color: '#999999'
							}
						},
						axisLabel: {
							color: '#666666'
						}
					}],
					yAxis: [{
						type: 'category',
						axisTick: {
							show: false
						},
						data: ['汽车之家', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎'],
						axisLine: {
							lineStyle: {
								color: '#999999'
							}
						},
						axisLabel: {
							color: '#666666'
						}
					}],
					series: [{
							name: '热度',
							type: 'bar',
							label: {
								normal: {
									show: true,
									position: 'inside'
								}
							},
							data: [300, 270, 340, 344, 300, 320, 310],
							itemStyle: {
								// emphasis: {
								//   color: '#37a2da'
								// }
							}
						},
						{
							name: '正面',
							type: 'bar',
							stack: '总量',
							label: {
								normal: {
									show: true
								}
							},
							data: [120, 102, 141, 174, 190, 250, 220],
							itemStyle: {
								// emphasis: {
								//   color: '#32c5e9'
								// }
							}
						},
						{
							name: '负面',
							type: 'bar',
							stack: '总量',
							label: {
								normal: {
									show: true,
									position: 'left'
								}
							},
							data: [-20, -32, -21, -34, -90, -130, -110],
							itemStyle: {
								// emphasis: {
								//   color: '#67e0e3'
								// }
							}
						}
					]
				}
			}
			},
			onLoad(options) {
					this.items = options.data;
					this.items = JSON.parse(decodeURIComponent(options.data));
					this.url = "http://10.68.2.9/testmacau/Project/PieEacharts?v=" + this.items.Id;
					this.latitude = this.items.PosY;
					this.longitude = this.items.PosX;
					// 接入地圖數據
					let obj = [{
							latitude: this.items.PosY
						},

						{
							longitude: this.items.PosX
						}
					]
					this.covers = obj;
				},
				mounted() {
					console.log('打印图片高度')
					const query = uni.createSelectorQuery().select("#cover")
					query.boundingClientRect(data => {
						this.picHeight = data.height
						console.log(this.picHeight)
						this.picHeight * 0.56
					}).exec()
					//获取swiper高度
					const queryswiper = uni.createSelectorQuery().select(".swiper")
					queryswiper.boundingClientRect(data => {
						this.swiperheight = data.height
						console.log('计算后高度');
						console.log(this.swiperheight)
					}).exec()
					this.$refs.chart.init(config => {
						const {
							canvas
						} = config;
						const chart = echarts.init(canvas, null, config);
						canvas.setChart(chart);
						chart.setOption(this.option);
						// 需要把 chart 返回
						return chart;
					});
				},
				methods: {
					//喜愛
					favorit() {
						// 改變喜愛顏色
						this.likesrc == "http://10.68.2.9/CenMacauCMS2/static/like_unselected_icon@2x.png" ? this.likesrc =
							"../../static/like_selected_icon@2x.png" : this.likesrc = "http://10.68.2.9/CenMacauCMS2/static/like_unselected_icon@2x.png",
							// 添加到我的喜愛
							// this.$request({
							// 	methods: 'POST',
							// 	url: '/Member/Api/BuildingFavorite/AddFavorite',
							// 	data: {
							// 		UserKeyId: '',
							// 		PropertyId: ''
							// 	}
							// }).then((res) => {
							// 	this.bamboo = res.InnerList;
							// })
							this.$minApi.favorite({
								UserKeyId: '',
								PropertyId: ''
							}).then(res=>{

							})

					}
				}
		}
</script>

<style lang="scss" scoped>
	.contianer {
		width: 100%;
		height: 100%;

		.swiper {
			width: 100%;

			// height: calc(100% * this.picHeight);
			image {
				width: 100%;
				// height: 100%;

			}
		}

		.item {
			display: flex;
			align-items: center;
			width: 100%;
			box-sizing: border-box;
			margin: 10rpx 0 10rpx 0rpx;

			.like {
				position: absolute;
				right: 15rpx;

				image {
					width: 50rpx;
					height: 50rpx;
				}
			}

			// border: 1rpx solid pink;
			view:nth-child(1) {
				display: flex;
				align-items: center;
				margin-left: 20rpx;
				box-sizing: border-box;
				background-color: rgba(125, 125, 125, 0.25);
				font-size: 20rpx;
				line-height: 50rpx;
				height: 50rpx;
				padding: 10rpx 20rpx;
				border-radius: 20rpx;
				color: #dc11ff;

				image {
					width: 35rpx;
					height: 35rpx;
				}
			}

			view:nth-child(2) {
				display: flex;
				align-items: center;
				margin-left: 20rpx;
				box-sizing: border-box;
				background-color: rgba(125, 125, 125, 0.25);
				font-size: 20rpx;
				line-height: 50rpx;
				height: 50rpx;
				padding: 10rpx 20rpx;
				border-radius: 20rpx;
				color: #007AFF;

				image {
					width: 35rpx;
					height: 35rpx;
				}
			}
		}

		.build {
			width: 100%;

			.build_name {
				font-size: 25rpx;
				margin-left: 20rpx;
				margin-bottom: 10rpx;
			}

			.sale_price {
				font-size: 30rpx;
				margin-left: 20rpx;
				color: rgb(206, 27, 27);
			}

			.build_area {
				display: flex;
				flex-wrap: wrap;
				width: 100%;

				.house_type,
				.area,
				.seat_direct {
					width: 200rpx;
					height: fit-content;
					margin-left: 20rpx;
					box-sizing: border-box;
					padding-left: 10rpx;
					line-height: 50rpx;
					background-color: #f7e9e9;
					border-radius: 10rpx;
					// border: 1rpx solid pink;

					view:nth-child(2),
					view:nth-child(3) {
						font-size: 20rpx;
						box-sizing: border-box;
						// border: 1rpx solid green;
					}
				}

				.other {
					width: 100%;
					margin-left: 20rpx;
					font-size: 30rpx;

					.addr {
						width: 200rpx;
						word-wrap: break-word;
					}

					view:nth-child(1) {
						display: flex;
						flex-wrap: wrap;
					}

					text:nth-child(1) {
						letter-spacing: 10rpx;
					}
				}
			}

			.mortgage {
				width: 100%;

				view {
					margin-left: 20rpx;
				}

				.ext {
					display: flex;
					align-items: center;
					width: 100%;
					height: 40rpx;
					background-color: #fcf4c7;
					color: #dd665d;
					padding-left: 10rpx;
					font-size: 30rpx;
				}
			}

			.geograp {
				display: flex;
				justify-content: center;

				.map {
					width: 100%;
					height: 300px;
				}
			}

		}

		.housemark {
			display: flex;
			justify-content: center;
			width: 100%;
			height: 300rpx;

			view {
				width: 90%;
				box-sizing: border-box;
				border: 1rpx solid pink;
			}
		}

		.contact {
			position: relative;
			// bottom: 100rpx;
			width: 100%;
			height: 140rpx;
			display: flex;
			align-items: center;
			// height: 100rpx;
			border-top: 1rpx solid #999999;

			.contact_info {
				display: flex;
				align-items: center;

				.head {
					position: relative;

					image {
						width: 90rpx;
						height: 90rpx;
						box-sizing: border-box;
						border: 1rpx solid #999999;
						border-radius: 100%;
					}
				}
			}




		}
	}
</style>
