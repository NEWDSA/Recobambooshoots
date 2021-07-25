<template>
	<view class="container">
		<view class="head">
			<!-- 循环出菜单内容 -->
			<template v-for="(item,index) in menu">
				<!-- class设置绑定样式 -->
				<view class="menu" @click="Tab_Change">
					<text :class="item.name==='分行網絡'?'active':'title'">{{item.name}}</text>
				</view>
				<!-- end class设置绑定样式 -->
			</template>
			<!-- end 循环菜单内容 -->
		</view>
		<!-- 分行站点及联展站 -->
		<view class="tabs">
			<scroll-view class="scroll-h" :scroll-x="true" :scroll-left="scrollLeft">
				<view v-for="(tab, index) in branch" :key="tab.id" class="tab-items" :class="{ current: index == tabCurrentIndex }"
				 :id="tab.id" :data-current="index" @click="changeTab(index)">
					<text>{{ tab.name }}</text>
				</view>
			</scroll-view>
		</view>
		<!-- end 分行站点及联展站 -->

		<!-- 默認顯示大灣區聯展站 -->
		<view v-if="tabCurrentIndex===2" style="width:100%;display: flex;justify-content: center;margin-top: 20rpx;flex-wrap: wrap;">
			<view class="union_station">
				<template v-for="(item,index) in unionStation">
					<!-- 獲取選中的值 -->
					<view @click="Tab_station(index)" :class="index===StationIndex & StationIndex===0 ?'active_item_first': index === StationIndex & StationIndex===1  ? 'active_item_second': index === StationIndex & StationIndex===2 ? 'active_item_last':'item'">{{item.name}}</view>
				</template>
			</view>
			<view>
				<view class="current-list" v-for="(item,index) in DaWanStation">
					<image :src="item.Img+'?watermark=smallgroup_center&w=400'" @error="imgerror($event,index)"></image>
					<view class="currency-bambooShoot-lists">
						<view class="title">{{item.Name}}</view>
						<view class="adress_tel">
							<view>{{item.Address}}</view>
							<view class="tel_phone">{{item.Tel}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- end 大灣區聯展站 -->
		<!-- 显示分行网络数据 -->
		<!-- 澳门及横琴分行站点 -->
		<view>
			<view class="branch_macau_hq">
				<view class="currency-flex" v-for="(item,index) in MACAU_HQ">
					<image :src="item.BranchImg.Path+'?watermark=smallgroup_center&w=400'" @error="imgerror($event,index)"></image>
					<view class="news_list">
						<view class="title">{{item.BranchName}}</view>
						<view class="clamp">
							<view>{{item.AddressCh}}</view>
							<view v-if="item.AddressEn!==null">{{item.AddressEn}}</view>
							<view>{{item.Telephone}}</view>
							<view v-if="item.Fax!==null">{{item.Fax}}</view>
						</view>
						<view>查看地图</view>
					</view>
				</view>
			</view>
		</view>
		<!-- end 澳门分行站点 -->
		<!-- end 显示分行网络数据 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menu: [{
					name: '關於中原'
				}, {
					name: '中原動態'
				}, {
					name: '分行網絡'
				}, {
					name: '加入中原'
				}, {
					name: '培訓學院'
				}, {
					name: '學院文章'
				}],
				//分行网络标题
				branch: [{
					name: '澳門分行站點'
				}, {
					name: '橫琴分行站點'
				}, {
					name: '大灣區聯展站'
				}],
				unionStation: [{
					name: '香港分站',
					type: 'HK'
				}, {
					name: '澳門分站',
					type: 'MO'
				}, {
					name: '橫琴分站',
					type: 'HQ'
				}], //大灣區聯展站導航
				MACAU_HQ: '', //澳门及横琴分行网络显示数据
				DaWanStation: '', // 大灣區聯展站
				StationIndex: 0, //默認選中
				tabCurrentIndex: 2, //分行網絡默認選中的內容
				latitude:'',
				longitude:'',
				myl:'',
				myy:'',
				covers: []

			}
		},
		// 頁面加載時顯示的內容
		onLoad() {
			//默認請求澳門分站的數據
			// this.$request({
			// 	method: 'get',
			// 	url: '/Api/Exhibition/GetExhibitionList',
			// 	data: {
			// 		Type: 'HK'
			// 	}
			// }).then(res => {
			// 	// 返回數據
			// 	this.DaWanStation = res.InnerList;
			// })

			this.$minApi.DWStation({
				Type: 'HK'
			}).then(res=>{
					// 返回數據
				this.DaWanStation = res.InnerList;
			})
		},
		methods: {
			Tab_station(index) {
				this.StationIndex = index; //通过下标查找对应的分站
				let myindex = index //定义局部index
				//分展站
				var result = this.unionStation.filter((item, index) => {
					if (index === myindex) {
						return item.name;
					}
				})
				result = result[0].type;
				// 请求联展站各区数据
				// this.$request({
				// 	method: 'get',
				// 	url: '/Api/Exhibition/GetExhibitionList',
				// 	data: {
				// 		Type: result
				// 	}
				// }).then(res => {
				// 	this.DaWanStation = res.InnerList;
				// })

				this.$minApi.DWStation({
					Type: result
				}).then(res=>{
					this.DaWanStation = res.InnerList;
				})
			},
			// 切换选项卡 分行网络切换d
			changeTab(index) {

				this.tabCurrentIndex = index;
				/* 进行内容盘点
				 *如果是横琴分行网络则没有测试地址
				 * 横琴分行网络用index1 代替
				 */

				/* 进行分行网络数据区分
				如果是澳门数据 用index0
				 */

				if (index === 0) {
					// this.$request({
					// 	method: 'get',
					// 	url: '/Api/BranchNetwork/GetList',
					// }).then(res => {
					// 	this.MACAU_HQ = res // 切换数据显示
					// })

					this.$minApi.MacauNetwork().then(res=>{
						this.MACAU_HQ = res // 切换数据显示
					})
				}
				if (index === 1) {
					// uni.request({
					// 	url: 'http://hq.centaline.com.cn/Api/BranchNetwork/GetList',
					// 	success: (res) => {
					// 		this.MACAU_HQ = res.data
					// 	}
					// })
					this.$minApi.HQNetwork().then(res=>{
						this.MACAU_HQ = res.data
					})
				}

			},
			Tab_Change(){
				
			},
			/* 处理图片错误 */
			imgerror(e, index) {
				// 循环处理图片错误信息
				console.log('打印图片出错事件及下标');
				console.log(e);
				console.log(index);
				this.DaWanStation[index].Img = "http://10.68.2.9/CenMacauCMS2/static/noImg@2x.png"

				// 针对BranchImg对象为空情况进行判断
				if (this.MACAU_HQ.BranchImg == null) {
					this.MACAU_HQ[index].BranchImg = {
						"Path": 'http://10.68.2.9/CenMacauCMS2/static/noImg@2x.png'
					}

				} else {
					this.MACAU_HQ[index].BranchImg.Path = "http://10.68.2.9/CenMacauCMS2/static/noImg@2x.png"
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100%;

		.head {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			width: 100%;
			background-color: #edeff2;

			.menu {
				width: 30%;
				padding: 5rpx;
				flex-wrap: wrap;
				/*box-shadow:  0 0 1rpx 1rpx rgba(0, 0, 0, 0.5);*/
				margin-top: 10rpx;
				margin-bottom: 10rpx;
				font-size: 20rpx;
				text-align: center;
			}

			.title {
				display: inline-block;
				width: 85%;
				line-height: 20px;
				height: 40rpx;
				box-shadow: 0 0 1rpx 1rpx rgba(0, 0, 0, 0.5);
			}

			.active {
				display: inline-block;
				width: 85%;
				box-shadow: 0 0 1rpx 1rpx rgba(0, 0, 0, 0.5);
				text-align: center;
				background-color: #f91d04;
				line-height: 20px;
				height: 40rpx;
				color: #FFFFFF;

			}
		}

		.tabs {
			width: 100%;
			background-color: #f8f8f8;

			.scroll-h {
				width: 750rpx;
				height: 90rpx;
				white-space: nowrap;
				// border-bottom: 2rpx solid #c0c0c0;

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
						bottom: -10rpx;
						transform: translateX(-50%);
						transition: 0.3s;
					}
				}

				.current {
					height: 61rpx;
					color: #ce1b1b;

					&:after {
						width: 80rpx;
						height: 4rpx;
					}
				}
			}
		}

		.union_station {
			display: flex;
			width: 95%;
			justify-content: center;
			background-color: #b3b3b3;
			box-sizing: border-box;
			border-radius: 10rpx;
			text-align: center;

			.item {
				width: 35%;
				color: #FFFFFF;
				box-sizing: border-box;
				font-size: 30rpx;
				height: 50rpx;
				line-height: 50rpx;
			}

			.active_item_first {
				width: 35%;
				color: #FFFFFF;
				box-sizing: border-box;
				font-size: 30rpx;
				height: 50rpx;
				line-height: 50rpx;
				background-color: #d91616;
				border-top-left-radius: 10rpx;
				border-bottom-left-radius: 10rpx;
			}

			.active_item_second {
				width: 35%;
				color: #FFFFFF;
				box-sizing: border-box;
				font-size: 30rpx;
				height: 50rpx;
				line-height: 50rpx;
				background-color: #d91616;
			}

			.active_item_last {
				width: 35%;
				color: #FFFFFF;
				box-sizing: border-box;
				font-size: 30rpx;
				height: 50rpx;
				line-height: 50rpx;
				background-color: #d91616;
				border-top-right-radius: 10rpx;
				border-bottom-right-radius: 10rpx;
			}
		}

		.current-list {
			padding: 10px 0;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			justify-content: center;

			image {
				width: 240rpx;
				max-width: 240rpx;
				max-height: 180rpx;
				min-height: 180rpx;
			}

			.currency-bambooShoot-lists {
				width: calc(100% - 323rpx);
				margin-left: 20rpx;
				font-size: 26rpx;
				// min-height: 180rpx;
				min-height: 180rpx;

				.title {
					color: black;
					font-weight: 600;
					-webkit-line-clamp: 1;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					margin-bottom: .3rem;
					font-size: 16px;
					font-weight: 800;
				}

				.adress_tel {
					-webkit-line-clamp: 4;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					margin-bottom: .3rem;

					.tel_phone {
						margin-top: 10rpx;
					}
				}
			}
		}

		.branch_macau_hq {
			padding: 0 24rpx;
			width: calc(100% - 48rpx);

			.currency-flex {
				padding: 20rpx 0;
				-webkit-box-align: center;
				align-items: center;
				display: flex;
				/*flex-wrap: wrap;*/
				min-height: 224rpx;
				width: 100%;
				justify-content: center;
				border-bottom: 2rpx solid rgb(230, 230, 230);

				image {
					max-width: 260rpx;
					min-height: 180rpx;
					max-height: 180rpx;
					height: 220rpx;
					vertical-align: unset;
				}

				.news_list {
					color: rgb(102, 102, 102);
					font-size: 12px;
					width: calc(100% - 226rpx);
					margin-left: 20rpx;
					min-height: 180rpx;

					.title {
						color: black;
						font-weight: 600;
						-webkit-line-clamp: 1;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						margin-bottom: .3rem;
						font-size: 16px;
						font-weight: 800;
					}

					.clamp {
						-webkit-line-clamp: 4;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
					}
				}
			}
		}
	}
</style>
