<template>
	<view class="mycontainer">
		<!-- 導航欄 -->
		<nav-bar>
			<view class="search-container">
				<input placeholder="請輸入樓盤名稱" placeholder-class="search-holder" confirm-type="search" @confirm="search" />
			</view>
		</nav-bar>
		<!-- 請求參數 -->
		<view class="tab_container">
			<view class="tab_fixed">
				<view @click="choiseArea()">
					<text>{{list.DistrictName}}</text>
				</view>
				<view @click="areaName()">{{list.PropertyTitle}}</view>
				<view>全部期數</view>
			</view>
		</view>
		<!-- 弹窗选择區域 -->
		<view v-show="districtshow" class="district">
			<template v-for="(item,index) in area">
				<view class="items" @click="changePlace(item.ID)">{{item.Name}}</view>
			</template>
		</view>
		<!-- 彈窗選擇地點 -->
		<view v-show="localshow" class="local">
			<template v-for="(item,index) in place">
				<view @click="changeplace(item.BookID)" class="panel">{{item.PropertyTitle}}</view>
			</template>
		</view>
		<!-- 輪播封面 -->
		<view class="contianer">
			<view style="width: 100%;display: flex;justify-content: center;">
				<image class="picimg" :src="list.ImgList[0].Path+'?watermark=smallSizegroup_center&w=400'"></image>
			</view>
			<view style="width: 95%;display: flex;justify-content: center;flex-wrap: wrap;">
				<view class="title">{{newsList.PropertyTitle}}</view>
				<view class="other_title">地區：<text>{{newsList.DistrictName}}</text></view>
				<view class="other_title_right">地區：<text>{{newsList.AreaName}}</text></view>
				<view class="other_title">地址：<text>{{newsList.Address}}</text></view>
				<view class="other_title_right">座期：<text>{{newsList.CountZ}}</text></view>
				<view class="other_title">單位數：<text>{{newsList.CountU}}</text></view>
				<view class="other_title_right">層數：<text>{{newsList.LayerHeight}}</text></view>
				<view class="other_title">開發商：<text>{{newsList.DistrictName}}</text></view>
				<view class="other_title_right">入夥日期：<text>{{newsList.InDate}}</text></view>
				<view class="introduction">
					<view class="title">簡介</view>
					<view class="remark">{{newsList.Description}}</view>
				</view>
			</view>
			<view class="question-line"></view>
			<!-- 平面图內容切換 -->
			<view class="pictype">{{ImgType}}</view>
			<scroll-view scroll-x="true" style="width: 100%;height: auto;overflow: hidden;white-space: nowrap;">
				<view class="allpic" @click="allKind">所有({{count}})</view>
				<template v-for="(item,index) in LabelList">
					<view class="TabBar_active" v-if="item.Label!==null" @click="changeFloorPlan(item.Label)">{{item.Label}}</view>
				</template>
			</scroll-view>
			<!-- 平面圖 -->
			<scroll-view scroll-x="true" class="pic" style="width: 100%;height: auto;overflow:hidden;white-space:nowrap;box-sizing: border-box;">
				<view class="img_wrapper" v-for="(item,index) in FloorPlanFilter" :key="index">
					<image :src="item.Path+'?watermark=smallSizegroup_center&w=300'"></image>
				</view>
			</scroll-view>
			<!-- end 平面图 -->
			<view style="width: 100%;display: flex;flex-wrap: wrap;">
				<!-- 屋苑圖 默認顯示  -->
				<!-- ImgType2 屋苑圖 選擇   -->
				<!-- ImgType1 周边设施图  選擇   -->
				<view :class="EstateShow?'Estate_active':'Estate'" @click="houseType(ImgType2)">{{ImgType2}}</view>
				<view :class="FacilitiesShow?'Surrounding_active':'Surrounding'" @click="houseType(ImgType1)">{{ImgType1}}</view>
				<scroll-view v-show="EstateShow" scroll-x="true" class="pic" style="width:100%;height: auto;overflow: hidden;white-space: nowrap;">
					<view class="img_wrapper" v-for="(item,index) in EstateMap" :key="index">
						<image :src="item.Path"></image>
					</view>
				</scroll-view>
				<!-- end 屋苑圖 -->

				<!-- 周边设施图 -->
				<scroll-view v-show="FacilitiesShow" scroll-x="true" class="pic" style="width: 100%;height: auto;overflow:hidden;white-space:nowrap;">
					<view class="img_wrapper" v-for="(item,index) in Facilitiesmap" :key="index">
						<image :src="item.Path+'?watermark=smallSizegroup_center&w=300'"></image>
					</view>
				</scroll-view>
				<!-- end 周边设施图 -->
			</view>
			<!-- 地理位置 -->
			<view class="Geographic">地理位置</view>
			<!-- 附近poi -->
			<scroll-view scroll-x="true" style="width: 100%;height: 90rpx; white-space: nowrap;display: flex;">
				<template v-for="(item,index) in nearpoi">
					<view style="width:152rpx;margin-left: 30rpx; height: 58rpx;background-color: #f8f1f1;border-radius: 26px;display: inline-block;text-align: center;line-height: 58rpx;">{{item.name}}</view>
				</template>
			</scroll-view>
			<!-- 地图 -->
			<view style="width:95%;height:389rpx;display: flex;">
				<map style="width: 100%;height: 100%;border-radius: 20rpx;background-color: #c2c1c1;" :latitude="latitude"
				 :longitude="longitude" :markers="covers"></map>
			</view>
			<!-- end-地图 -->
			<view class="mytransaction">
				<text>樓市成交</text>
			</view>
			<view style="width: 150%;overflow-x: scroll;">
				<!-- <scroll-view class="xsms-scroll" scroll-x="true"> -->
				<view class="advancearea">
					<view class="tbl">
						<view class="cell">性質</view>
						<view class="cell">樓宇名稱</view>
						<view class="cell">單位</view>
						<view class="cell">建築面積(呎)</view>
						<view class="cell">成交價</view>
						<view class="cell">平均呎價</view>
						<view class="cell">市場</view>
						<view class="cell">成交月份</view>
					</view>
					<view class="tbl" v-if="PropertyTrans.length ==0">
						暫無數據
					</view>
					<view class="tbl" style="display: block;">

						<view style="width: 100%;display: flex;align-items: center; border-bottom: 1px solid;" v-for="(item,index) in PropertyTrans">
							<view class="cell">{{item.FileType}}</view>
							<view class="cell">{{item.Name}}</view>
							<view class="cell">{{item.PropName}}</view>
							<view class="cell">{{item.BuiltArea | formatdigital}}呎</view>
							<view class="cell" v-if="!item.Total==null">售 ${{item.Total | formatdigital}}</view>
							<view class="cell" v-else></view>
							<view class="cell">{{item.AvgPrice | formatdigital}}</view>
							<view class="cell">{{item.SourceFrom}}</view>
							<view class="cell">{{item.TxDate | formatDate}}</view>
						</view>
					</view>
					<view class="pagenation">
						<view class="page_item">首頁</view>
						<view class="page_item">上一頁</view>
						<view class="page_item">1</view>
						<view class="page_item">2</view>
						<view class="page_item">3</view>
						<view class="page_item">4</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	var wxMarkerData = [];
	export default {
		data() {
			return {
				list: {},
				newsList: {},
				area: '',
				districtshow: false,
				localshow: false,
				place: '',
				ID: '',
				FloorPlan: '', //平面图
				FloorPlanlabel: '',
				ImgType: '', //图片类型
				ImgType1: '', //周边设施图
				ImgType2: '', //屋苑圖
				count: '', //图片总数量
				Facilitiesmap: '', //周边设施
				FacilitiesShow: false, //默認不顯示周邊設施圖
				EstateShow: true, //默認顯示 屋苑圖
				markerList: [],
				Pox: '',
				Poy: '',
				covers: [],
				nearpoi: [{
					name: '樓盤'
				}, {
					name: '學校'
				}, {
					name: '醫院'
				}, {
					name: '公交'
				}, {
					name: '商場'
				}, {
					name: '附近樓盤'
				}],
				/* 地图相关属性 */
				latitude: '',
				longitude: '',
				markers: [],
				rgcData: {},
				LabelList: [],
				FloorPlanFilter: [], //過濾之後的內容
				EstateMap: [], //屋苑圖
				//FloorPlanAll:'' // 過濾之前全部內容
				PropertyTrans: '', //樓市成交數據
				PropertyTransAll:'' ,//需要分頁的總數據
				pagination:{
					totalRows:0, //總條數
					pageSize:20, //每頁顯示條數
					pageNumber:1
				}
			}
		},
		onLoad(data) {
			this.list = JSON.parse(decodeURIComponent(data.data))
			console.log('打印出內容')
			console.log(data.District);
			this.ID=data.District;
			this.$request({
				method: 'get',
				url: '/Api/EstatesBook/GetDetail',
				data: {
					pageIndex: this.page,
					pageSize: this.pagesize,
					District: this.list.District,
					BookID: this.list.BookID
				}
			}).then((res) => {
				console.log('res this list')
				// console.log(res.data);
				this.newsList = res.data.BookDetail;
				console.log(this.newsList)
				/* 初始化加載數據 */
				this.place = res.data.BookList;
				/*this.FloorPlan = */
				let Floor = res.data.BookPicList // 平面圖

				// 平面图
				let indexAvg = Floor.findIndex(item => item.ImgType == "平面圖")
				// 封面图
				this.FloorPlan = res.data.BookPicList[indexAvg].ImgList //未過濾封面圖
				this.FloorPlanFilter = res.data.BookPicList[indexAvg].ImgList //初始狀態封面圖

				this.LabelList = res.data.BookPicList[indexAvg].ImgList

				this.ImgType = res.data.BookPicList[indexAvg].ImgType // 图片类型

				this.count = this.FloorPlan.length;
				// end 平面图

				//周邊設施圖
				let inside_index = Floor.findIndex(item => item.ImgType == "周邊設施圖")

				this.Facilitiesmap = res.data.BookPicList[inside_index].ImgList // 周邊設施
				this.ImgType1 = res.data.BookPicList[inside_index].ImgType // 图片类型
				// end 周邊設施圖

				// 屋苑圖
				let myindex = Floor.findIndex(item => item.ImgType == "屋苑圖")
				this.EstateMap = res.data.BookPicList[myindex].ImgList // 屋苑圖
				console.log('屋苑圖 this.EstateMap');
				console.log(this.EstateMap)
				this.ImgType2 = res.data.BookPicList[myindex].ImgType // 图片类型
				// end 屋苑圖

				/* 经纬度 */
				let latitude = res.data.BookDetail.Latitude; //纬度
				let longitude = res.data.BookDetail.Longitude; //经度

				//经度纬度
				let position = [];
				position.push(latitude);
				position.push(longitude);
				let result = position.join(',');
				let _that = this;
				uni.request({
					method: 'GET',
					url: 'http://api.map.baidu.com/geoconv/v1/',
					data: {
						coords: result,
						from: 6,
						to: 3,
						ak: 'pGdXn68CF3x3R2bezz3VUvPxorsutHCt'
					},
					success: function(res) {
						console.log('定位')
						console.log(_that.latitude = res.data.result[0].x); //经度
						console.log(_that.longitude = res.data.result[0].y); //纬度
						console.log(_that.latitude);
						console.log(_that.longitude);
					}
				})


				this.covers = [{
					latitude: this.latitude,
					longitude: this.longitude,
					iconPath: '/static/currentposition.png',
					width: '20',
					height: '30'
				}]
			})
			/* 地图相关事务 */

			/* 樓市成交 */
			// this.$request({
			// 	method: 'get',
			// 	url: '/api/TransactionData/GetList',
			// 	data: {
			// 		name: this.list.PropertyTitle
			// 	}
			// }).then(res => {
			// 	console.log('樓市成交');
			// 	this.PropertyTrans = res.InnerList;
			// 	//樓市成交分頁
			// 	let length=this.PropertyTrans.length; //長度
				
			// 	console.log(res)
			// })
			this.$minApi.PropertyList({
				name: this.list.PropertyTitle
			}).then(res=>{
				this.PropertyTrans = res.InnerList;
				//樓市成交分頁
				let length=this.PropertyTrans.length; //長度
			})

			/* end 樓市成交 */

		},
		filters: {
			//時間日期過濾器
			formatDate: function(value) {
				let date = new Date(value); //獲取當前日期
				let year = date.getFullYear(); //獲取年
				let month = date.getMonth() + 1; //獲取月
				let day = date.getDay(); //獲取日
				let mydate = year + '年' + month + '月' + day + '日'
				return mydate;
			},
			// 格式化數字
		   formatdigital:function(value){
			   let myvalue=value == null ? value : value.toLocaleString();
			   return myvalue;
		   }
		},
		methods: {
			/* 樓盤天書區域列表 */
			choiseArea() {
				this.districtshow = !this.districtshow
				this.localshow = false
				// this.$request({
				// 	method: 'get',
				// 	url: '/Api/EstatesBook/GetBookAreaList'
				// }).then(res => {
				// 	this.area = res.InnerList
				// })

				this.$minApi.EstatesBookPartitionlist().then(res=>{
					this.area = res.InnerList
				})
			},
			changePlace(item) {
				/* 打印出區域ID */
				this.ID = item
				// this.$request({
				// 	method: 'get',
				// 	url: '/Api/EstatesBook/GetDetail',
				// 	data: {
				// 		District: this.ID
				// 	}
				// }).then(res => {
				// 	this.place = res.data.BookList
				// 	this.newsList = res.data.BookDetail
				// 	this.list = res.data.BookDetail
				// })

				this.$minApi.EstatesBookDetail({
						District: this.ID
				}).then(res=>{
					this.place = res.data.BookList
					this.newsList = res.data.BookDetail
					this.list = res.data.BookDetail
				})
			},
			areaName() {
				this.localshow = !this.localshow
				this.districtshow = !this.districtshow
			},
			changeplace(BookID) {
				// this.$request({
				// 	method: 'get',
				// 	url: '/Api/EstatesBook/GetDetail',
				// 	data: {
				// 		District: this.ID,
				// 		BookID: BookID
				// 	}
				// }).then(res => {
				// 	this.newsList = res.data.BookDetail
				// 	this.list = res.data.BookDetail
				// })

				this.$minApi.EstatesBookDetail({
				   District: this.ID,
				   BookID: BookID
				}).then(res=>{
					this.newsList = res.data.BookDetail
					this.list = res.data.BookDetail
				})
			},
			onViewClick(params) {
				this.dataIndex = params.dataIndex
			},
			/* 過濾之後的內容 */
			changeFloorPlan(Label) {
				// 顯示區域
				/* 判斷是否點擊 */
				///this.FloorPlanAll=this.FloorPlan

				if (Label !== null && Label !== undefined) {
					// 內容過濾
					this.FloorPlanFilter = this.FloorPlan.filter(item => item.Label === Label)
				}
				// 返回對應的數據
				// 顯示所有內容
				///this.FloorPlan=this.FloorPlanAll
				this.FloorPlan;
			},
			/* 顯示所有內容 */
			allKind() {
				this.FloorPlanFilter = this.FloorPlan;
			}
			/* 根據類型顯示各種圖片 */
			,
			houseType(type) {
				if (type == '周邊設施圖') {
					this.FacilitiesShow = true;
					this.EstateShow = false;
					// 設置顏色選中樣式

				} else {
					this.FacilitiesShow = false;
					this.EstateShow = true;
					// 設置顏色選中樣式
				}
			},
			// 搜索結果
			search(result) {
				/* 頁面跳轉 並傳遞參數*/
			    uni.navigateTo({
					url:"RealEstateBook?search="+result.detail.value+"&District="+this.ID
			    })
			}
		}
	}
</script>
<style lang="scss" scoped>
	.mycontainer {
		width: 100%;
		height: 100%;

		.search-container {
			display: flex;
			align-items: center;
			width: 370rpx;
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

		.tab_container {
			position: relative;
			display: flex;
			width: 100%;
			height: 70rpx;
			background-color: #FFFFFF;

			.tab_fixed {
				position: fixed;
				display: flex;
				align-items: center;
				justify-content: space-around;
				width: 100%;
				height: 70rpx;
				background-color: #FFFFFF;
				box-sizing: border-box;
				border-bottom: 1rpx solid #e6e6e6;
				z-index: 111;
			}
		}

		.contianer {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			margin-top: 30rpx;
			width: 100%;

			.title {
				font-weight: bold;
				margin-top: 10rpx;
				margin-bottom: 10rpx;
				width: 100%;
			}

			.other_title {
				width: 50%;
				color: #999999;
				line-height: 60rpx;
				font-size: 30rpx;

				text {
					color: #333333;
				}
			}

			.other_title_right {
				width: 50%;
				color: #999999;
				line-height: 60rpx;
				font-size: 30rpx;
				float: right;
			}

			.picimg {
				width: 95%;
				height: 388rpx;
				background-color: #c2c1c1;
				border-radius: 20rpx;
				box-sizing: border-box;
			}

			.question-line {
				width: 100%;
				height: 16rpx;
				font-size: 0rpx;
				background: #f5f6f8;
			}

			.pictype {
				width: 95%;
				padding: 10rpx;
				text-align: left;
				font-weight: bold;
			}

			.allpic {
				/*width: 95%;*/
				width: fit-content;
				display: inline-block;
				padding: 10rpx;
				color: #ce1c1c;
				text-align: left;
			}

			.mytransaction {
				width: 100%;
				padding: 10rpx;
				font-weight: bold;
			}

			/* 屋苑圖 */
			.Estate {
				padding: 10rpx;
				text-align: left;
			}

			/* 屋苑圖選中狀態 */
			.Estate_active {
				padding: 10rpx;
				text-align: left;
				color: #ce1b1b;
			}

			/* 周边设施图 */
			.Surrounding {
				padding: 10rpx;
				text-align: left;
				color: #ce1b1b;
			}

			/* 周邊設施圖選中 */
			.Surrounding_active {
				padding: 10rpx;
				text-align: left;
				color: #ce1b1b;
			}

			.Geographic {
				width: 95%;
				padding: 10rpx;
				text-align: left;
			}

			.sunrounding {
				width: 100%;
				height: 90rpx;
				box-sizing: border-box;
				border: 1rpx solid;
			}

			.introduction {
				width: 100%;

				.title {
					font-weight: bold;
				}

				.remark {
					line-height: 60rpx;
				}
			}

			.nearbyProperties {}

			.TabBar_active {
				display: inline-block;
				width: fit-content;
				height: auto;
				box-sizing: border-box;
				font-size: 32rpx;
				margin-left: 10rpx;
				margin-right: 20rpx;
				color: #666666;
			}

			.TabBar {}

			.pic {
				width: 100%;
				height: 90rpx;

				.img_wrapper {
					width: 190rpx;
					height: 150rpx;
					margin-right: 15rpx;
					display: inline-block;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.advancearea {
				display: flex;
				flex-direction: column;
				width: 150%;
				height: 150%;
				.tbl {
					width: 100%;
					/*height: 100px;*/
					/*使用Flex布局，默认为水平方向布局*/
					display: flex;
					border-left: red solid 1px;
					border-right: red solid 1px;
					border-bottom: red solid 1px;

					&:first-child {
						background-color: #ef524d;
						color: #fce2e1;
					}
				}


				.cell {
					/*其实这里也可以将宽度设置为2%、5%、10%等，因为页面要展示7列，100 / 7 约等于14%，所以这里的宽度最好不超过14%(不过超过了，在页面展示上貌似也没什么问题，不知道会不会有潜在的问题)*/
					/*因为是约等于14%，所以还会剩余一些空间，我在下面定义了flex-grow的值为1，即剩余的空间，会被这7列平分*/
					/*如果这里没有设置宽度，那么当文本内容过多时，该列的宽度会自动扩大*/
					width: 1%;
					height: 100%;
					/*定义项目的放大比例，如果值为1，则所有的项目将等分剩余的空间*/
					/*因为当前是水平方向布局，所以等分的是剩余的width*/
					flex-grow: 1;
					display: flex;
					/*水平居中、垂直居中*/
					justify-content: center;
					align-items: center;
					font-size: 20rpx;
			        white-space: nowrap;
				}
				.pagenation{
					width: 100%;
					display: flex;
					margin-top: 5rpx;
				.page_item{
					width: fit-content;
					padding:2rpx;
					box-sizing: border-box;
					border: 1px solid;
					font-size: 20rpx;
				}
				}

			}
		}

		.district {
			position: fixed;
			/*top: 246rpx;*/
			left: 0rpx;
			width: 200rpx;
			/*height: 50rpx;*/
			background-color: #FFFFFF;
			box-sizing: border-box;
			text-align: center;
			box-shadow: 0rpx 0rpx 5rpx #909090;

			.items {
				width: 90%;
				padding: 10rpx;
				overflow: hidden;
				text-align: center;
				white-space: nowrap;
				text-overflow: ellipsis;
				font-size: 30rpx;
				margin: 10rpx auto;
				border-bottom: 1rpx solid #999999;
			}
		}

		.local {
			/* position: absolute;
			top: 246rpx; */
			position: fixed;
			/*top: 200rpx;*/
			left: 240rpx;
			width: 200rpx;
			height: 300rpx;
			font-size: 32rpx;
			background-color: #FFFFFF;
			/* box-sizing: border-box; */
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow-y: scroll;
			box-shadow: 0rpx 0rpx 5rpx #909090;
			z-index: 111;

			.panel {
				width: 90%;
				padding: 10rpx;
				overflow: hidden;
				text-align: center;
				white-space: nowrap;
				text-overflow: ellipsis;
				font-size: 30rpx;
				margin: 10rpx auto;
				border-bottom: 1rpx solid #999999;
			}
		}

	}
</style>
