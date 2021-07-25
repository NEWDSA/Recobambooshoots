<template>
	<view class="container">
		<!-- 顶部搜索 -->
		<nav-bar title="中插槽-搜索框">
			<view class="search_box">
				<text class="icon_search"></text>
				<input type="text" class="prompt" placeholder="好房源,上中原" placeholder-class="search_word" @click="goPage"></text>
			</view>
		</nav-bar>
		<!-- 輪播圖 -->
		<swiper class="carsoul" :indicator-dots="indicatorDots" :interval="interval" :duration="duration">
			<swiper-item v-for="(item,index) in banner" @click="goOther(item)">
				<image mode="widthFix" :src="item.Paths"></image>
			</swiper-item>
		</swiper>
		<!-- 导航项 -->
		<view class="menu">
			<!-- 焦點新盤 -->
			<view @click="GofoucsNews">
				<!-- 测试环境 -->
				<image src="http://10.68.2.9/CenMacauCMS2/static/MainMenu-newdish@2x.png" />
				<view>
					<text>焦點新盤</text>
				</view>
			</view>
			<!-- 買樓 -->
			<view @click="buyHouse">
				<image src="http://10.68.2.9/CenMacauCMS2/static/MainMenu-BuyHouse@2x.png" />
				<view>
					<text>買樓</text>
				</view>
			</view>
			<!-- 租房 -->
			<view @click="buyHouse">
				<image src="http://10.68.2.9/CenMacauCMS2/static/MainMenu-rent@2x.png" />
				<view>
					<text>租房</text>
				</view>
			</view>
			<!-- 視頻搵樓 -->
			<view>
				<image src="http://10.68.2.9/CenMacauCMS2/static/MainMenu-360@2x.png" />
				<view>
					<text>視頻搵樓</text>
				</view>
			</view>
			<!-- 經紀人搵樓 -->
			<view>
				<image src="http://10.68.2.9/CenMacauCMS2/static/MainMenu-broker@2x.png" />
				<view>
					<text>經紀人搵樓 </text>
				</view>
			</view>
			<!-- 樓盤天書 -->
			<view @click="goRealEstateBook">
				<image src="http://10.68.2.9/CenMacauCMS2/static/MainMenu-RealEstateBook@2x.png" />
				<view>
					<text>樓盤天書</text>
				</view>
			</view>
			<!-- 網上放盤 -->
			<view>
				<image class="active" src="http://10.68.2.9/CenMacauCMS2/static/icon_New@2x.png"></image>
				<image src="http://10.68.2.9/CenMacauCMS2/static/MainMenu-Onlinelisting@2x.png" />
				<view><text>網上放盤</text></view>
			</view>
			<!-- 活動報名 -->
			<view>
				<image src="http://10.68.2.9/CenMacauCMS2/static/MainMenu-active@2x.png" />
				<view>
					<text>活動報名</text>
				</view>

			</view>
		</view>
		<!-- 最新商機 -->
		<view class="business">
			<view class="content">
				<!-- 標題 -->
				<view class="title"><text>最新商機</text></view>
				<view class="active">
					<!-- 中原動態 -->
					<view class="centaline">
						<image src="http://10.68.2.9/CenMacauCMS2/static/CentralPlainsNews@2x.png"></image>
					</view>
					<!-- 市場成交 -->
					<view class="market_trans">
						<image src="http://10.68.2.9/CenMacauCMS2/static/MarketTransaction@2x.png"></image>
						<!-- 大灣區聯展站 -->
						<image src="http://10.68.2.9/CenMacauCMS2/static/DawanStation@2x.png" @click="Area()"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 成交分析 -->
		<view class="transition">
			<view class="title"><text>成交分析</text>
				<view style="float: right; width:80%;">
					<image class="right" src="http://10.68.2.9/CenMacauCMS2/static/right_icon@2x.png"></image>
				</view>
			</view>
			<!-- 成交分析數據 -->
			<view class="transdata">
				<view style="width: 50%;">
					<!-- 4月份 -->
					<view class="monthly">{{transanay['2']}}月份參考均價</view>
					<!-- 樓房單價 -->
					<view class="rule"><text>{{transanay['0'] | formatMoney}}</text>(元/呎)</view>
				</view>
				<view style="width: 50%;">
					<!-- 增長率 -->
					<view class="monthly-raise">環比上月增長</view>
					<view><text>{{transanay['1']}}%</text></view>
				</view>
			</view>
		</view>
		<!-- 筍盤推介 -->
		<view class="Bamboo">
			<view class="title">筍盤推薦</view>
			<view class="content" v-for="(item,index) in bamboo">
				<view class="item">
					<!-- 房屋信息 -->
					<view class="Housing">
						<!-- 樓盤名 -->
						<text class="Property">{{item.Building}}</text>
						<!-- 樓盤編號 -->
						<text class="PropertyId">樓盤編號{{item.PropertyNo}}</text>
						<!-- 房 CountF -->
						<view class="room-info" style="display: flex;align-items: center;">
							<view style="width: fit-content;background-color:rgb(247,247,247);font-size: 25rpx;margin: 10rpx 10rpx;color: rgb(128,128,128);">
								<text class="room">{{item.CountF}}房</text><text class="hall">{{item.CountT}}廳</text>
							</view>
							<!-- 房屋呎 -->
							<view style="width: fit-content;background-color:rgb(247,247,247);font-size: 20rpx;color: rgb(128,128,128);">
								<text>{{item.GrossArea}}</text>
							</view>
						</view>
					</view>
					<!-- 租金 -->
					<view class="rent">
						<view style="width: 100%;color: rgb(206,27,27);font-size: 25rpx;"><text>租 HK${{item.Rent | formatMoney}}元</text></view>
						<view style="width: 100%;color: rgb(206,27,27);font-size: 25rpx;"><text>(租 MOP${{item.MoRent | formatMoney}})</text></view>
					</view>
				</view>
			</view>
		</view>
		<!-- 關於中原 -->
		<view class="about">
			<view class="cn">
				中原澳門企業有限國公司、中原（澳門）地產代理有限公司、中原（澳門）測量師有限公司、
				中原澳門集團有限公司、中原澳門物業顧問有限公司-版權所有-未經同意不得轉載《免責聲明》《使用條款》

			</view>
			<view class="en">
				© Copyright 2006 CENTALINE MACAU ENTERPRISE LIMITED、CENTALINE (MACAU) PROPERTY AGENCY LIMITED、CENTALINE (MACAU)
				SURVEYORS LIMITED、CENTALINE MACAU GROUP LIMITED、CENTALINE MACAU PROPERTY CONSULTANCY LIMITED. All Rights Reserved.
				粤ICP备16080050号
				UA-132187825-1
			</view>
		</view>
		<!-- 中原大灣區指數 -->
		<view class="Area" @click="goArea">
			<image mode="widthFix" src="http://10.68.2.9/CenMacauCMS2/static/dw_inlet.png"></image>
		</view>
	</view>
</template>

<script>
export default {
  data() {
    return {
      banner: [],
      transanay: [], //成交分析
      bamboo: [], //筍盤推薦
      weburl: "https://hk.centanet.com/greater-bay-area/?lang=zh",
      autoplay: true,
      interval: 2000,
      indicatorDots: true,
      duration: 500,
    };
  },
  // 格式化金額
  filters: {
    formatMoney(item) {
      return Number(item).toLocaleString();
    },
  },
  onLoad() {
    //輪播圖
    // this.$request({
    //   url: "/Api/HomePager/CoverImages",
    // }).then((res) => {
    //   this.banner = res.InnerList;
    // });
    this.$minApi.Banner().then((res) => {
      console.log("轮播图内容");
      console.log(res.InnerList);
      this.banner = res.InnerList;
	  console.log(this.banner)
    });
    //成交分析
    // uni.request({
    //   method: "GET",
    //   url: "https://mo.centanet.com/MODataCharts/Api/TransactionData/GetAvgPrice",
    //   data: {
    //     PropType: "S",
    //     FileType: "住宅",
    //   },
    //   success: (res) => {
    //     this.transanay = res.data;
    //     console.log(res);
    //   },
    // });

    this.$minApi
      .DataAnalysis({
        PropType: "S",
        FileType: "住宅",
      })
      .then((res) => {
        this.transanay = res;
      });
    // 筍盤推薦
    // this.$request({
    //   method: "POST",
    //   url: "/Api/Building/GetList",
    //   data: {
    //     pageIndex: 1,
    //     pageSize: 5,
    //     IsHotNum: 1,
    //     pltemType: "住宅部",
    //     SaleType: "不限",
    //     Parking: "不限",
    //     Price: "不限",
    //     Rent: "不限",
    //     OrderBy: "默認",
    //   },
    // }).then((res) => {
    //   this.bamboo = res.InnerList;
    //   console.log(this.bamboo);
    // });
    this.$minApi.LitingsList({
      pageIndex: 1,
      pageSize: 5,
      IsHotNum: 1,
      pltemType: "住宅部",
      SaleType: "不限",
      Parking: "不限",
      Price: "不限",
      Rent: "不限",
      OrderBy: "默認"
    }).then((res) => {
      this.bamboo = res.InnerList;
    });
  },
  methods: {
    // 大灣區指數
    goArea() {
      uni.navigateTo({
        url: "../../web-view/web-view?link=" + this.weburl,
      });
    },
    //大湾区联展站
    Area() {
      uni.navigateTo({
        url: "../../../pagesA/unionpage/unionpage",
      });
    },
    // 買樓
    buyHouse() {
      uni.navigateTo({
        url: "../../../pagesA/page/BuyHouse/BuyHouse",
      });
    },
    // 租房
    renting() {},
    GofoucsNews() {
      uni.navigateTo({
        url: "../../../pagesA/page/focusNews/focusNews",
      });
    },
    // 頁面跳轉
    goPage() {
      uni.navigateTo({
        url: "../../../pagesA/page/BuyingRentHouse/BuyingRentHouse",
      });
    },
    // 轮播跳转
    goOther(item) {
      console.log(item);
      //顯示原生頁面
      if (item.Name == "網上放盤") {
        uni.navigateTo({
          url: "",
        });
      } else if (item.Name == "中原動態") {
        uni.navigateTo({
          url: "",
        });
      } else if (item.Name == "視頻搵樓") {
        uni.navigateTo({
          url: "",
        });
      } else {
        // 跳轉webview
        uni.navigateTo({
          url: `../../../pagesA/page/web-view/web-view?link=${item.WebUrl}`,
        });
      }
    },
    // 樓盤天書
    goRealEstateBook() {
      uni.navigateTo({
        url: "../../../pagesA/page/RealEstateBook/RealEstateBook",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
page,
.container {
  width: 100%;
  height: 100%;

  .location {
    width: 20rpx;
    height: 20rpx;
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

    .prompt {
      width: 200rpx;
      font-size: 28upx;
      color: #cccccc;
    }

    .icon_search {
      background-image: url(http://10.68.2.9/CenMacauCMS2/static/map_ic_search.png);
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      width: 29upx;
      height: 28upx;
      margin-right: 20upx;

      /deep/ .search_word {
        font-size: 25rpx;
        color: #c1c1c6;
      }
    }
  }

  .carsoul {
    margin-top: 10rpx;
    margin-bottom: 10rpx;
    width: 100%;
    height: 300rpx;

    swiper-item {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      transform: translate(0%, 0px) transZ(0px);

      image {
        width: 694rpx;
        height: 300rpx !important;
        height: auto;
        background-color: #ffffff;
        border-radius: 20rpx;
      }
    }
  }

  .menu {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-around; //两边对齐

    .active {
      position: absolute;
      // top: 0;
      width: 65rpx !important;
      height: 25rpx !important;
      animation: movetop 5s infinite; // 動畫
    }

    // 關鍵幀動畫
    @keyframes movetop {
      from {
        top: auto;
      }

      to {
        top: -5rpx;
      }
    }

    view {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 25%;
      height: 100%;
      box-sizing: border-box;

      image {
        // width: 90rpx;
        // height: 90rpx;
        width: 100rpx;
        height: 100rpx;
        // 顺序是上右边、下、左
        margin: 39rpx 20rpx 20rpx 20rpx;
      }

      view {
        display: flex;
        justify-content: center;
        width: 100%;
        font-size: 25rpx;

        text {
          font-size: 26rpx;
          font-weight: normal;
          color: #333333;
        }
      }
    }
  }

  .business {
    display: flex;
    width: 100%;

    .content {
      width: 100%;

      .title {
        margin-left: 30rpx;
        margin-top: 59rpx;
        margin-bottom: 30rpx;
        font-size: 40rpx;
        color: #333333;
      }

      .active {
        display: flex;
        width: 100%;
        box-sizing: border-box;

        .centaline {
          width: 50%;
          margin-left: 20rpx;
          margin-right: 10rpx;

          image {
            width: 100%;
            height: 310rpx;
          }
        }

        .market_trans {
          width: 50%;
          margin-right: 20rpx;

          image {
            width: 100%;
            height: 150rpx;
          }
        }
      }
    }
  }

  .transition {
    width: 100%;

    .title {
      display: flex;
      align-items: center;
      margin-top: 62rpx;
      margin-left: 30rpx;
      margin-bottom: 36rpx;
      // height: 70rpx;

      text {
        font-size: 40rpx;
        width: 170rpx;
        color: #333333;
      }

      view {
        float: right;
        width: 80%;

        .right {
          width: 25rpx;
          height: 25rpx;
          float: right;
          margin-right: 30rpx;
        }
      }
    }

    .transdata {
      display: flex;
      align-items: center;
      margin-left: 30rpx;
      margin-right: 30rpx;
      height: 120rpx;
      font-size: 20rpx;
      color: rgb(161, 155, 155);
      background-image: url(http://10.68.2.9/CenMacauCMS2/static/Transactionanalysis@2x.png);
      background-size: cover;
      view:nth-child(1) {
        margin-left: 20rpx;
        font-weight: bold;

        text {
          font-weight: bold;
          font-size: 30rpx;
        }
      }
      view:nth-child(2) {
        margin-left: 20rpx;
        font-weight: bold;
        text {
          font-size: 30rpx;
          color: rgb(206, 27, 27);
        }
      }
    }
  }

  .Bamboo {
    width: 100%;

    .title {
      margin-top: 59rpx;
      margin-bottom: 30rpx;
      display: block;
      margin-left: 30rpx;
      font-size: 40rpx;
      color: #333333;
    }

    .content {
      display: flex;
      justify-content: center;

      .item {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 180rpx;
        margin-left: 30rpx;
        margin-right: 30rpx;
        margin-top: 20rpx;
        box-sizing: border-box;
        border-radius: 10rpx;
        box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);

        .Housing {
          display: flex;
          flex-direction: column;
          width: 60%;
          margin-left: 30rpx;
          margin-top: 30rpx;
          font-size: 25rpx;

          .Property {
            .PropertyId {
              font-size: 20rpx;
            }
          }
        }
      }

      .rent {
        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        width: 40%;
        font-size: 20rpx;
      }
    }
  }

  .about {
    width: 100%;
    font-size: 20rpx;

    .cn {
      display: flex;
      margin-top: 30rpx;
      margin-left: 30rpx;
      margin-right: 30rpx;
    }

    .en {
      margin-left: 30rpx;
      margin-right: 30rpx;
    }
  }

  .Area {
    position: fixed;
    right: 10rpx;
    bottom: 140rpx;

    image {
      width: 120rpx;
      height: 120rpx;
    }
  }
}
</style>
