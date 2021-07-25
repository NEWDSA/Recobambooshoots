<template>
	<view class="contianer">
		<nav-bar title="中插槽-搜索框">
			<view class="search_box">
				<uni-icons color="#999999" size="18" type="search" />
				<input type="text" class="prompt" placeholder="好房源,上中原" v-model="buildname" confirm-type="search" @confirm="search">
			</view>
		</nav-bar>
		<!-- tab選項 -->
		<view class="tab" style="z-index: 200;">
			<view class="content">
				<view class="contianer">
					<template v-for="(item,index) in tabData">
						<view :class="index === tabIndex ? 'tabselect':''" style="position: relative; width: 20%;text-align: center;padding-left: 20rpx;"
						 @click="district(item)">
							{{item.text}}
							<image style="width: 25rpx;height: 25rpx;" src="http://10.68.2.9/CenMacauCMS2/static/down.png"></image>
						</view>
					</template>
				</view>
			</view>
		</view>
		
		<!-- 區域內容 -->
			<view v-if="showdistrict" class="district">
				<view class="districtarea" style="z-index: 200;overflow: hidden;">
					<view style="width: 30%;height: 400rpx;">
						<template v-for="(item,index) in Area">
							<view :class="index === myindex ? 'isActive':''" style="padding: 20rpx 20rpx;" @click="changeArea(item)">{{item.Area}}</view>
						</template>
					</view>
					<view style=" width: 70%;height: 400rpx;overflow-y: scroll;overflow-x: hidden;">
						<!-- 單選 -->
						<view style="width: 100%;display: flex;padding: 20rpx 20rpx;" v-for="(item,index) in District">
							<!-- 如果index等於0 -->
							<template v-if="index ===0">
								<view style="width: 75%;">{{item[index].name}}</view>
								<checkbox-group name="allCheck" @change="changeAll">
									<checkbox name="check" :value="item[index].value" :checked="item[index].allCheck"></checkbox>
								</checkbox-group>
							</template>
							<template v-if="index>0">
								<view style="width:75%;">{{item[index]}}</view>
								<checkbox :value="item" :checked="item.checked"></checkbox>
							</template>
						</view>
					</view>
					<!-- 選擇區域 -->
					<view class="sortbtn">
						<button class="reset" size="mini">重置</button>
						<button class="confirm" size="mini" @click="searchDistrict">確定</button>
					</view>
				</view>
			</view>
		
		<!-- 價格 -->
		<view class="price-con" v-if="showprice">
			<view class="price-container">
				<template v-for="(item,index) in priceData">
					<view :class="index === priceIndex ? 'priceselect':'noselect'">{{item.text}}</view>
				</template>
				<view style="width: 100%;display: flex;align-items: center;padding: 10rpx 5rpx;">
					<view style="box-sizing: border-box;border: 1rpx solid #808080;width: 200rpx;margin-left: 20rpx;">
						<input placeholder="最低價格" v-model="lowprice" />
					</view>
					<text>-</text>
					<view style="box-sizing: border-box;border: 1rpx solid #808080;width: 200rpx;">
						<input placeholder="最高價格" v-model="hightprice" />
					</view>
					<button size="mini">確認</button>
				</view>
			</view>
			
		</view>
		
		<!-- 面積 -->
		<view class="area-con" v-if="showarea">
			<view class="area-contianer">
				<view style="width: 100%;background-color:#FFFFFF;">
					<template v-for="(item,index) in areaData">
						<view :class="index === priceIndex ? 'areaselect':'fearea-select'">{{item.text}}</view>
					</template>
					<view style="width: 100%;display: flex;align-items: center;padding: 10rpx 5rpx;">
						<view style="box-sizing: border-box;border: 1rpx solid #808080;width: 200rpx;margin-left: 20rpx;">
							<input placeholder="最小面積" v-model="lowprice" />
						</view>
						<text>-</text>
						<view style="box-sizing: border-box;border: 1rpx solid #808080;width: 200rpx;">
							<input placeholder="最大面積" v-model="hightprice" />
						</view>
						<button size="mini">確認</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 更多 -->
		<view class="more-con" v-if="showmore">
			<view class="more-container">
				<template v-for="(item,index) in moreData">
					<view class="title">{{item.title}}</view>
					<view class="typebtn">
						<template v-for="(im,indx) in item.options">
							<template v-if="indx ===0">
								<button class="fisrtbtn" size="mini">{{im.text}}</button>
							</template>
							<template v-if="indx>0">
								<button class="otherbtn" size="mini">{{im.text}}</button>
							</template>
						</template>
					</view>
				</template>
				<view class="sortbtn">
					<button class="reset" size="mini">重置</button>
					<button class="confirm" size="mini">確定</button>
				</view>
			</view>
		</view>
		<!-- 排序 -->
		<view class="sortcontianer" v-if="showsort">
			<view style="width: 100%;background-color: #FFFFFF;">
				<template v-for="(item,index) in sortData">
					<view :class="index===sortIndex ? 'sortselect':'fe-sortselect'">{{item.text}}</view>
				</template>
			</view>
		</view>
		
		<!-- 楼盘显示区域 -->
		<view class="build">
			<template v-for="(item,index) in room">
				<view class="pic">
					<view style="position: absolute;top: 0;">
						<image :src="item.Imgs[0].Path | formatImg" @click="builddetail(item)"></image>
					</view>
					<view style="position: relative;">
						<!-- 判斷是否為筍盤 -->
						<template v-if="item.IsHot">
							<image style="width: 50rpx;height: 50rpx;" src="http://10.68.2.9/CenMacauCMS2/static/icon_2.png"></image>
						</template>
					</view>
				</view>
				<view class="build-content">
					<!-- 楼盘名 -->
					<view class="build_name"><text>{{item.Building}}</text></view>
					<!-- 售价hk -->
					<view class="salehk"><text>售 HK ${{item.Price}}萬</text></view>
					<!-- 售价mac -->
					<view class="salema"><text>(售 MOP ${{item.Price | formatMoney}}萬)</text></view>
					<!-- 楼盘编号 -->
					<view class="propertyId"><text>楼盘编号 #{{item.PropertyNo}}</text></view>
					<!-- 面積 -->
					<view class="area">
						<!-- 平方呎 -->
						<view class="size"><text>{{item.BuildingArea}}平方呎</text></view>

						<view class="room">
							<!-- 房 -->
							<view><text>{{item.CountF}}房</text></view>
							<!-- 廳 -->
							<view><text>{{item.CountT}}廳</text></view>
						</view>
					</view>
					<!-- 月供金額 -->
					<view class="monthly">
						<view>
							<text>月供 ${{item.MonthlyPrice}}</text>
							<image src="../../static/calculator_icon@2x.png"></image>
							<text>按揭計算器</text>
						</view>
					</view>

				</view>
				<view class="share">
					<view class="btn">
						<button class="shareme" type="default">分享我</button>
						<!-- <button class="kol" type="default">KOL视频</button> -->
					</view>
					<view>
					</view>
				</view>
			</template>

		</view>
		<!-- 计算器 -->
		<view class="calculator" @click="calculator"></view>
	</view>
</template>

<script>
export default {
  // 請求加載數據
  onLoad(option) {
    // this.$request({
    //   method: "POST",
    //   url: "/Api/Building/GetList",
    //   data: {
    //     pageIndex: 1,
    //     pageSize: 20,
    //     IsHotNum: 0,
    //     pItemType: "住宅部",
    //     SaleType: "售",
    //     show: false,
    //   },
    // }).then((res) => {
    //   this.room = res.InnerList;
    // });
    this.$minApi.LitingsList({
      pageIndex: 1,
      pageSize: 20,
      IsHotNum: 0,
      pItemType: "住宅部",
      SaleType: "售",
      show: false,
    }).then(res=>{
      this.room = res.InnerList;
    })
  },
  data() {
    return {
      room: {}, //房屋信息
      showdistrict: false,
      showprice: false,
      showarea: false,
      showmore: false,
      showsort: false,
      buildname: "",
      tabIndex: "",
      priceIndex: 0,
      sortIndex: 0,
      lowprice: "",
      hightprice: "",
      tabData: [
        {
          text: "區域",
        },
        {
          text: "價格",
        },
        {
          text: "面積",
        },
        {
          text: "更多",
        },
        {
          text: "排序",
        },
      ],
      priceData: [
        {
          text: "不限",
        },
        {
          text: "200萬或以下",
        },
        {
          text: "200萬至300萬",
        },
        {
          text: "300萬至500萬",
        },
        {
          text: "500萬至800萬",
        },
        {
          text: "800萬至,1200萬",
        },
        {
          text: "1,200萬以上",
        },
      ],
      areaData: [
        {
          text: "不限",
        },
        {
          text: "500呎或以下",
        },
        {
          text: "500呎至800呎",
        },
        {
          text: "800呎至1,200呎",
        },
        {
          text: "1,200呎至2,000呎",
        },
        {
          text: "1,500呎至2,000呎",
        },
        {
          text: "2,000呎以上",
        },
      ],
      moreData: [
        {
          title: "是否筍盤",
          options: [
            {
              text: "不限",
            },
            {
              text: "是",
            },
            {
              text: "否",
            },
          ],
        },
        {
          title: "類型",
          options: [
            {
              text: "不限",
            },
            {
              text: "售",
            },
            {
              text: "租",
            },
          ],
        },
        {
          title: "車位",
          options: [
            {
              text: "不限",
            },
            {
              text: "有",
            },
            {
              text: "無",
            },
          ],
        },
      ],
      sortData: [
        {
          text: "默認",
        },
        {
          text: "總價從低往高",
        },
        {
          text: "總價從高往低",
        },
        {
          text: "呎價從低往高",
        },
        {
          text: "呎價從高往低",
        },
        {
          text: "面積從低往高",
        },
        {
          text: "面積從高往低",
        },
      ],
      macauCheck: {
        name: "全選",
        value: "all",
        checked: false,
      },

      District: [],
      Area: [],
      defaultIndex: [0, 0, 0, 0, 0],
      Build: "",
      myregion: "",
      myindex: 0,
      count: 0,
    };
  },

  filters: {
    // 过滤图片
    formatImg(img) {
      let imgs = img + "?" + "watermark=smallgroup_center";
      return imgs;
    },
    // 格式化金额
    formatMoney(money) {
      //乘以澳門匯率
      let MOPRate = 1.0315;
      let moneys = parseInt(money * MOPRate).toFixed(0);
      return moneys;
    },
  },
  methods: {
    calculator() {
      // uni.navigateTo({
      //   url: "/pages/buyingtools/buyingtools",
      // });
	  
	  uni.navigateTo({
	  	url:"../../../pagesA/page/buyingtools/buyingtools"
	  })
    },
    // 根據樓盤名查詢數據
    search() {
      // this.$request({
      //   method: "POST",
      //   url: "/Api/Building/GetList?",
      //   data: {
      //     pageIndex: 1,
      //     pageSize: 20,
      //     // IsHotNum: 0,
      //     // pItemType: "住宅部",
      //     Building: this.buildname,
      //   },
      // }).then((res) => {
      //   this.room = res.InnerList;
      // });
      this.$minApi.LitingsList({
        pageIndex: 1,
        pageSize: 20,
        Building: this.buildname
      }).then(res=>{
        this.room = res.InnerList;
      })
    },
    // 樓盤詳情
    builddetail(item) {
      uni.navigateTo({
        url: `../../../pagesA/page/BuyHouse/detail?data=${encodeURIComponent(
          JSON.stringify(item)
        )}`,
      });
    },
    dialog() {
      // 隐藏内容显示
      this.show = !this.show;
    },
    district(item) {
      // 區域判斷
	  this.District=[];
      let index = this.tabData.map((item) => item.text).indexOf(item.text); // 獲取數據對應的下標
      console.log("對應下標");
      console.log(index);
      this.tabIndex = index;
      // 區域
      if (item.text === "區域") {
        this.showprice = false;
        this.showarea = false;
        this.showmore = false;
        this.showsort = false;
        // this.$request({
        //   method: "get",
        //   url: "/Api/Building/GetDistricts",
        // }).then((res) => {
        //   this.Area = res.InnerList;
        //   let Dist = res.InnerList[0].Districts;
        //   // 聲明一個對象
        //   let check = {
        //     allCheck: false,
        //     name: "全選",
        //     value: "all",
        //   };
        //   Dist = Array.from(new Set(Dist));
        //   // 頭部添加數據
        //   Dist.unshift(check);
        //   Dist = Array.from(new Set(Dist));
        //   let tempDistrict = { ...Dist }; // 扩展
        //   let list = []; // 拆分为单独对象
        //   for (var key in tempDistrict) {
        //     var temp = {};
        //     temp[key] = tempDistrict[key];
        //     this.District.push(temp);
        //   }
        //   // 增加选中状态
        //   this.District.map((item) => this.$set(item, "checked", false)); //設置為全部選中
        //   this.District = Array.from(new Set(this.District));
        //   this.showdistrict = !this.showdistrict;
        // });

        this.$minApi.CityZoneData().then(res=>{
          this.Area = res.InnerList;
          let Dist = res.InnerList[0].Districts;
          // 聲明一個對象
          let check = {
            allCheck: false,
            name: "全選",
            value: "all",
          };
          Dist = Array.from(new Set(Dist));
          // 頭部添加數據
          Dist.unshift(check);
          Dist = Array.from(new Set(Dist));
          let tempDistrict = { ...Dist }; // 扩展
          let list = []; // 拆分为单独对象
          for (var key in tempDistrict) {
            var temp = {};
            temp[key] = tempDistrict[key];
            this.District.push(temp);
          }
          // 增加选中状态
          this.District.map((item) => this.$set(item, "checked", false)); //設置為全部選中
          this.District = Array.from(new Set(this.District));
          this.showdistrict = !this.showdistrict;
        })
      }
      if (item.text === "價格") {
        this.showdistrict = false;
        this.showprice = !this.showprice;
        this.showarea = false;
        this.showmore = false;
        this.showsort = false;
      }
      if (item.text === "面積") {
        this.showdistrict = false;
        this.showprice = false;
        this.showmore = false;
        this.showarea = !this.showarea;
        this.showsort = false;
      }
      if (item.text === "更多") {
        this.showdistrict = false;
        this.showprice = false;
        this.showarea = false;
        this.showmore = !this.showmore;
        this.showsort = false;
      }
      if (item.text === "排序") {
        this.showdistrict = false;
        this.showprice = false;
        this.showmore = false;
        this.showarea = false;
        this.showsort = !this.showsort;
      }
    },
    changeArea(item) {
      this.District = [];
      var index = this.Area.map((items) => items.Area).indexOf(item.Area);
      let Dist = [];
      Dist = this.Area[index].Districts; //选取区域出现问题
      Dist = Array.from(new Set(Dist));
      // Dist=[]
      //聲明一個對象
      let check = {
        allCheck: false,
        name: "全選",
        value: "all",
      };

      Dist.unshift(check);
      // ES6去除重複
      Dist = Array.from(new Set(Dist));
      let tempDistrict = { ...Dist }; // 扩展

      let list = []; // 拆分为单独对象
      for (var key in tempDistrict) {
        var temp = {};
        temp[key] = tempDistrict[key];
        this.District.push(temp);
      }

      this.myindex = index;
    },
    // 查询房源信息
    searchDistrict() {
      // this.$request({
      //   method: "get",
      //   url: "/Api/Building/GetList",
      //   data: {
      //     Area: this.District,
      //   },
      // }).then((res) => {
      //   console.log("打印出内容");
      //   console.log(res);
      // });
      this.$minApi.LitingsList({
        Area: this.District
      }).then(res=>{
		
      })
    },
    // 全選操作
    changeAll(e) {
      if (e.detail.value.length == 0) {
        this.District.map((item) => this.$set(item, "allCheck", false));
        this.District.map((item) => this.$set(item, "checked", false)); //未選中狀態
      } else {
        this.District.map((item) => this.$set(item, "allCheck", true)); //修改選中狀態
        this.District.map((item) => this.$set(item, "checked", true)); //設置為全部選中
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.contianer {
  width: 100%;
  // height: 100%;
  overflow: hidden;

  image {
    width: 100%;
    display: block;
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
      font-size: 28upx;
      color: #cccccc;
    }

    .icon_search {
      background-image: url(http://10.68.2.9/CenMacauCMS2/static/map_ic_search.png);
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      width: 29upx;
      height: 25upx;
      margin-right: 20upx;
    }
  }

  .tab {
    position: relative;
    width: 100%;
    box-sizing: border-box;

    .content {
      position: relative;
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      height: 100rpx;
      background-color: #ffffff;

      .contianer {
        width: 100%;
        position: fixed;
        height: 100rpx;
        background-color: #ffffff;
        border-bottom: 1rpx solid;
        z-index: 111;
        display: flex;
        justify-content: center;

        .tabselect {
          color: red;
        }
      }

      view {
        display: flex;
        align-items: center;
        width: fit-content;
        margin: 0 10rpx;
        font-size: 20rpx;

        .regin-icon,
        .price-icon,
        .area-icon,
        .more-icon {
          width: 20rpx;
          height: 10rpx;
          background-image: url(http://10.68.2.9/CenMacauCMS2/static/icon_MoreArrow@2x.png);
          background-repeat: no-repeat;
          background-size: 20rpx 10rpx;
        }

        .sort-icon {
          width: 20rpx;
          height: 10rpx;
          background-image: url(http://10.68.2.9/CenMacauCMS2/static/sort_icon@2x.png);
          background-repeat: no-repeat;
          background-size: 20rpx 10rpx;
        }
      }
    }
  }
  .district {
    width: 100%;
    position: fixed;
    width: 100%;
    height: 667px;
    z-index: 111;
    overflow: hidden;
    // 為盒子添加陰影
    background-color: rgba(0, 0, 0, 0.3);
    box-shadow: 0rpx 1rpx 5rpx #909090;
    .districtarea {
      display: flex;
      flex-wrap: wrap;
      width: 100%;

      z-index: 111;
      background-color: #ffffff;
      .sortbtn {
        display: flex;
        align-items: center;
        width: 750rpx;
        height: 121rpx;
        background-color: #ffffff;
        box-shadow: 0rpx 0rpx 10rpx 0rpx rgba(130, 119, 119, 0.2);

        .reset {
          background-color: #fbeeee;
          border-radius: 8rpx;
          border: solid 1rpx #d91616;
          color: #d91616;
          width: 255rpx;
          height: 69rpx;
        }

        .confirm {
          background-color: #d91616;
          border-radius: 8rpx;
          color: #ffffff;
          width: 416rpx;
          height: 69rpx;
        }
      }
    }
  }

  .isActive {
    color: red;
  }

  .noActive {
    color: blue;
  }

  .price-con {
    position: fixed;
    width: 100%;
    height: 667px;
    z-index: 111;
    background-color: rgba(0, 0, 0, 0.3);
    // 為盒子添加陰影
    box-shadow: 0rpx 1rpx 5rpx #909090;
    .price-container {
      // position: relative;

      width: 100%;
      z-index: 111;
      background-color: #ffffff;
      // 為盒子添加陰影
      box-shadow: 0rpx 1rpx 5rpx #909090;

      .priceselect {
        padding: 10rpx 5rpx;
        color: red;
        box-sizing: border-box;
        border-bottom: 1rpx solid #808080;
        margin-left: 20rpx;
      }

      .noselect {
        padding: 10rpx 5rpx;
        box-sizing: border-box;
        border-bottom: 1rpx solid #808080;
        margin-left: 20rpx;
      }

      button {
        background-color: #d91616;
        color: #ffffff;
      }
    }
  }
  .area-con {
    position: fixed;
    width: 100%;
    height: 667px;
    z-index: 111;
    background-color: rgba(0, 0, 0, 0.3);
    // 為盒子添加陰影
    box-shadow: 0rpx 1rpx 5rpx #909090;
    .area-contianer {
      // position: relative;
      position: fixed;
      width: 100%;
      z-index: 111;
      /*background-color: #FFFFFF;*/
      // 為盒子添加陰影
      box-shadow: 0rpx 1rpx 5rpx #909090;

      .areaselect {
        padding: 10rpx 5rpx;
        color: red;
        box-sizing: border-box;
        border-bottom: 1rpx solid #808080;
        margin-left: 20rpx;
      }

      .fearea-select {
        padding: 10rpx 5rpx;
        box-sizing: border-box;
        border-bottom: 1rpx solid #808080;
        margin-left: 20rpx;
      }

      button {
        background-color: #d91616;
        color: #ffffff;
      }
    }
  }

  .more-con {
    position: fixed;
    width: 100%;
    height: 667px;
    z-index: 111;
    background-color: rgba(0, 0, 0, 0.3);
    // 為盒子添加陰影
    box-shadow: 0rpx 1rpx 5rpx #909090;
    .more-container {
      width: 100%;
      z-index: 111;
      background-color: #ffffff;
      // 為盒子添加陰影
      box-shadow: 0rpx 1rpx 5rpx #909090;

      .typebtn {
        width: 100%;
        margin: 10rpx auto;
      }

      .fisrtbtn {
        width: 144rpx;
        height: 59rpx;
        background-color: #f9eded;
        border-radius: 4rpx;
        margin-left: 30rpx;
        color: #f94040;
      }

      .otherbtn {
        width: 144rpx;
        height: 59rpx;
        margin-left: 24rpx;
        background-color: #f5f6f7;
        border-radius: 4rpx;
      }

      .sortbtn {
        display: flex;
        align-items: center;
        width: 750rpx;
        height: 121rpx;
        background-color: #ffffff;
        box-shadow: 0rpx 0rpx 10rpx 0rpx rgba(130, 119, 119, 0.2);

        .reset {
          background-color: #fbeeee;
          border-radius: 8rpx;
          border: solid 1rpx #d91616;
          color: #d91616;
          width: 255rpx;
          height: 69rpx;
        }

        .confirm {
          background-color: #d91616;
          border-radius: 8rpx;
          color: #ffffff;
          width: 416rpx;
          height: 69rpx;
        }
      }

      .title {
        padding: 10rpx 5rpx;
      }

      .moreselect {
        padding: 10rpx 5rpx;
        color: red;
        box-sizing: border-box;
        border-bottom: 1rpx solid #808080;
        margin-left: 20rpx;
      }

      .fmore-select {
        padding: 10rpx 5rpx;
        box-sizing: border-box;
        border-bottom: 1rpx solid #808080;
        margin-left: 20rpx;
      }
    }
  }

  .sortcontianer {
    position: fixed;
    width: 100%;
    height: 667px;
    z-index: 111;
    overflow: hidden;
    // 為盒子添加陰影
    background-color: rgba(0, 0, 0, 0.3);
    box-shadow: 0rpx 1rpx 5rpx #909090;

    .sortselect {
      padding: 10rpx 5rpx;
      color: red;
      box-sizing: border-box;
      border-bottom: 1rpx solid #808080;
      margin-left: 20rpx;
      background-color: #ffffff;
    }

    .fe-sortselect {
      padding: 10rpx 5rpx;
      box-sizing: border-box;
      border-bottom: 1rpx solid #808080;
      margin-left: 20rpx;
      background-color: #ffffff;
    }
  }

  .filter {
    display: flex;
    width: 100%;
    flex-wrap: wrap;

    view:nth-child(1) {
      width: 40%;
      margin: 0 25rpx;
    }

    view:nth-child(2) {
      display: flex;
      width: 50%;
      // margin: 0 20rpx;
      padding-left: 200rpx;
    }
  }

  .build {
    display: flex;
    flex-wrap: wrap;
    // height: 1334rpx;
    height: auto;
    overflow-y: scroll;

    .pic {
      position: relative;
      width: 45%;
      box-sizing: border-box;
      padding-left: 30rpx;

      image {
        width: 280rpx;
        height: 200rpx;
        border-radius: 10rpx;
      }
    }

    .build-content {
      width: 50%;
      box-sizing: border-box;
      font-size: 20rpx;

      .build_name {
        font-size: 30rpx;
        margin-bottom: 10rpx;
      }

      .salehk {
        font-size: 25rpx;
        color: #a34949;
      }

      .salema {
        font-size: 20rpx;
        color: #a34949;
      }

      .propertyId {
        margin: 10rpx auto;
        color: #7c7474;
      }

      .area {
        display: flex;
        margin-bottom: 10rpx;

        .size {
          width: fit-content;
          box-sizing: border-box;
          border: 1rpx solid #999999;
          padding: 5rpx 5rpx;
          margin-right: 10rpx;
        }

        .room {
          display: flex;
          width: fit-content;
          box-sizing: border-box;
          border: 1rpx solid #999999;
          padding: 5rpx 5rpx;
        }
      }

      .monthly {
        display: flex;
        align-items: center;
        font-size: 20rpx;

        view {
          display: flex;
          align-items: center;
          width: fit-content;
          box-sizing: border-box;
          border: 1rpx solid rgba(112, 112, 112, 0.1);
          padding: 5rpx 5rpx;
          background-color: rgba(124, 124, 124, 0.1);

          image {
            width: 20rpx;
            height: 20rpx;
            margin-left: 5rpx;
            margin-right: 5rpx;
          }
        }
      }
    }

    .share {
      display: flex;
      flex-wrap: wrap;
      margin: 10rpx 10rpx;
      width: 100%;

      .btn {
        display: flex;
        margin-bottom: 10rpx;

        .shareme {
          width: 130rpx;
          height: 50rpx;
          border-radius: 20rpx;
          font-size: 20rpx;
          margin-left: 20rpx;
          margin-right: 20rpx;
        }

        .kol {
          width: 170rpx;
          height: 50rpx;
          border-radius: 20rpx;
          font-size: 20rpx;
        }

        /deep/button[type="default"] {
          color: #000;
          background-color: rgba(247, 233, 233, 0.25);
        }
      }

      view:nth-child(2) {
        width: 100%;
        border-bottom: 1rpx solid rgba(124, 116, 116, 0.5);
      }
    }
  }

  .calculator {
    position: fixed;
    bottom: 100rpx;
    right: 10rpx;
    width: 70rpx;
    height: 70rpx;
    border-radius: 100%;
    box-sizing: border-box;
    box-shadow: 0 0 10rpx #a2a2a2;
    background-color: #ffffff;
    background-image: url(http://10.68.2.9/CenMacauCMS2/static/calculatorBtn_icon@2x.png);
    background-position: center center;
    background-size: cover;
  }
}
</style>
