<template>
  <view class="container">
    <!-- 滑動視圖 -->
    <scroll-view class="scroll" scroll-y>
      <!-- 活动轮播图 -->
      <swiper
        class="swiper"
        :duration="300"
        :current="tabCurrentIndex"
        indicator-dots="true"
      >
        <swiper-item
          v-for="(content, index) in Activity.ActivityImg"
          :key="content.id"
        >
          <image :src="content" @error="imgerror($event, index)"></image>
        </swiper-item>
      </swiper>
      <!-- 活动详情 -->
      <view class="active">
        <view class="l_title">
          <text class="title">{{ Activity.Title }}</text>
        </view>
        <view
          v-if="Activity.ActivityTimeList.length == '0' ? false : true"
          style="display: flex; justify-items: center; align-items: center"
        >
          <view style="width: 100%">
            <view v-for="(item, index) in Activity.ActivityTimeList">
              <template v-if="index === 0">
                <!-- 开始时间 -->
                <view class="start-time" style="margin-left: 20rpx">
                  <image
                    style="width: 25rpx; height: 25rpx"
                    src="http://10.68.2.9/CenMacauCMS2/static/time_icon@2x.png"
                  ></image>
                  <text class="label">开始时间:</text>
                  <text :class="item.ActBeginDate < time & item.ActEndDate < time ? '' : 'fred'">{{
                    item.ActBeginDate
                  }}</text>
                </view>
              </template>
              <template v-else>
                <view class="start-time" style="margin-left: 45rpx">
                  <text class="label">开始时间:</text>
                  <text :class="item.ActBeginDate < time & item.ActEndDate < time  ? '' : 'fred'">{{
                    item.ActBeginDate
                  }}</text>
                </view>
              </template>

              <!-- 结束时间 -->
              <view class="end-time" style="margin-left: 45rpx">
                <text class="label">结束时间:</text>
                <text :class="item.ActEndDate < time ? '' : 'fred'">{{
                  item.ActEndDate
                }}</text>
              </view>
            </view>
          </view>

          <!-- 活动是否结束 -->
          <view style="width: 50%" v-if="ActivePic">
            <image

              style="
                width: 150rpx;
                height: 150rpx;
                float: right;
                margin-right: 40rpx;
              "
			  src="../../static/end_picture@2x.png"
            ></image>
          </view>
        </view>
        <view class="location">
          <!-- <image
            style="width: 25rpx; height: 25rpx"
            src="../../../static/active_location.png"
            mode="scaleToFill"
          /> -->
		  <image style="width: 25rpx;height: 25rpx;" src="../../static/active_location.png"></image>
          <text class="mark">地點:</text>
          <text class="content">{{ Activity.ActivityAddress }}</text>
        </view>
        <view class="reserve">
			<image style="width: 25rpx;height: 25rpx;" src="../../static/active_tel.png"></image>
         <!-- <image
            style="width: 25rpx; height: 25rpx"
            src="../../../static/active_tel.png"
            mode="scaleToFill"
          /> -->
          <text class="label">預約熱綫:</text>
          <text class="content">{{ Activity.Hotline }}</text>
        </view>
      </view>
      <!-- 联系人信息 -->
      <view class="active" v-if="staffs">
        <view class="l_title">
          <template v-if="staffs">
            <!-- 聯繫人 -->
            <view class="contact">聯繫人</view>
            <view class="contact_info">
              <!-- 顯示用戶頭像區域 -->
              <template v-if="staffs.HeadImg">
                <view>
                  <!-- 聯繫人頭像 -->
                  <image :src="staffs.HeadImg+'?w=100'" />
                </view>
              </template>
              <template v-else>
                <view>
				  <image src="../../static/noHeaderImg@2x.png"></image>
                </view>
              </template>
              <view>
                <!-- 聯繫人姓名-->
                <view
                  ><text v-if="staffs.Name">{{ staffs.Name }}</text
                  ><text v-if="staffs.EnglishName">{{
                    staffs.EnglishName
                  }}</text></view
                >
                <template v-if="staffs.MobilePhone">
                  <view>{{ staffs.MobilePhone }}</view>
                </template>
                <template v-else>
                  <view class="nophone">電話:暫無電話</view>
                </template>
              </view>
              <!-- 聯繫人二維碼 -->
              <template v-if="staffs.QRCodeImg">
                <view>
                  <image
                    class="qrcode"
					src="../../static/noImg@2x.png"
                  />
                  <text class="qrtitle">掃一掃與我聯繫</text>
                </view>
              </template>
              <template v-else>
                <view>
                  <image class="qrcode" :src="staffs.QRCodeImg" />
                  <text class="qrtitle">掃一掃,與我聯繫</text>
                </view>
              </template>
            </view>
          </template>
        </view>
      </view>
      <!-- 活动信息详情 -->
      <view class="active_detail">
        <view class="active_info">活動信息</view>
        <!-- 內嵌網頁 -->
        <view style="width: 90%; margin: 0 auto" user-select>
          <rich-text :nodes="ActivityPic"></rich-text>
        </view>
      </view>
    </scroll-view>
    <!-- 立即报名 -->
    <template v-if="ActiveStatus == true">
      <view class="siginput">
        <view style="position: fixed"> </view>
        <button type="warn" @click="siginup">立即报名</button>
      </view>
    </template>
    <!-- end 立即报名 -->
    <template v-else>
      <view class="nosiginput">
        <button type="default" disabled="true">立即报名</button>
      </view>
    </template>
  </view>
</template>
<script>
import anImage from "../../../components/an-image/an-image.vue";
export default {
  components: { anImage },
  data() {
    return {
      staffs: {},
      Activity: {},
      ActivityPic: {},
      ShareUrl: {},
      title: "",
      scroll_height: 0,
      tabCurrentIndex: 0,
      time: new Date().toISOString().slice(0, 10),
      //活動Id
      ActiveStatus: false,
	  ActivePic:true
    };
  },
  async onLoad(a) {
    // uni.request({
    // 	// 測試環境
    // 	url: 'http://10.68.2.9/CenMacauCMS2/Api/Activities/GetActivityDetail?ActivityTimeKey=' + a.data,
    // 	// 正式環境
    // 	// url: 'https://mo.centanet.com/CenMacauCMS/Api/Activities/GetActivityDetail?ActivityTimeKey=' + a.data,
    // 	success: (res) => {
    // 		this.staffs = res.data.Staff;
    // 		this.Activity = res.data.Activity;
    // 		// 判斷活是否已結束
    // 		let TimeList = this.Activity.ActivityTimeList
    // 		TimeList.forEach(item => {
    // 			this.ActiveImg = item.ActBeginDate < this.time ? false : true || item.ActEndDate < this.time ? false : true;
    // 		})

    // 		this.ActivityPic = res.data.Activity.Content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" '); //設置圖片
    // 		this.ShareUrl = res.data.ShareUrl;
    // 	}

    // })

    //activeDetails

    this.$minApi
      .activeDetails({
        ActivityTimeKey: a.data,
      })
      .then((res) => {
        this.staffs = res.Staff;
        this.Activity = res.Activity;
        console.log("this Activity");
        console.log(this.Activity);
        // 判斷活是否已結束
        let TimeList = this.Activity.ActivityTimeList;
        if (TimeList.length === 0) {
          this.ActiveStatus = true;
		  this.ActivePic=true
        } else {
          // TimeList.forEach((item,index) => {
          //  this.ActiveStatus =
          //     item[index].ActBeginDate < this.time? false : item[index].ActEndDate < this.time
          //       ? false
          //       : true;
          // });
		 this.ActiveStatus= TimeList.filter(item=>item.ActBeginDate > this.time || item.ActEndDate > this.time);
		 if(this.ActiveStatus[0].ActBeginDate > this.time || this.ActiveStatus[0].ActEndDate > this.time){
			 this.ActiveStatus=true
			 this.ActivePic=false
		 }
        }
		 //設置圖片
        this.ActivityPic = res.Activity.Content.replace(
          /\<img/gi,
          '<img referrer="no-referrer|origin|unsafe-url" style="max-width:100%;height:auto" '
        );
		// this.ActivityPic=res.Activity.Content;
        this.ShareUrl = res.ShareUrl;
      });
  },
  // 設置頁面標題
  onReady() {
    uni.setNavigationBarTitle({
      title: "活動詳情",
    });
  },
  methods: {
    //报名
    siginup() {
      let obs = JSON.stringify(this.Activity);
      console.log(obs);
      console.log("活動展示");
      uni.navigateTo({
        url: "../siginup/siginup?ob=" + encodeURIComponent(obs),
      });
    },
    // 图片发生错误时处理办法
    imgerror(e, index) {
      this.Activity.ActivityImg.splice(index, 1);
      this.Activity.ActivityImg.splice(
        index,
        0,
        "http://10.68.2.9/CenMacauCMS2/static/noImg@2x.png"
      );
    },
    // 用戶頭像
    Headerror(e, index) {
      console.log(e);
      this.staffs.HeadImg.splice(index, 1);
      this.staffs.HeadImg.splice(
        index,
        0,
        "http://10.68.2.9/CenMacauCMS2/static/noImg@2x.png"
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  font-size: 20rpx;
  background: #f1f1f1;
  // 滾動視圖區域
  .scroll {
    height: 85vh;

    .swiper {
      width: 100%;
      margin-top: 20rpx;

      image {
        width: 100%;
        height: 100%;
      }
    }

    .active {
      width: 100%;
      box-sizing: border-box;
      margin-top: 20rpx;
      margin-bottom: 20rpx;
      background: #ffffff;

      .fred {
        color: red;
      }
      .location {
        display: flex;
        align-items: center;
        margin-left: 20rpx;
        margin-top: 10rpx;
        margin-bottom: 10rpx;
        .mark {
          margin-left: 20rpx;
        }
        .content {
        }
      }
      .l_title {
        box-sizing: border-box;
        display: inline-block;
        // width: 100%;
        margin: 10rpx 20rpx;

        .title {
          font-size: 30rpx;
          font-weight: bold;
        }

        .contact {
          font-size: 30rpx;
          font-weight: bold;
          line-height: 70rpx;
        }
      }
      .reserve {
		box-sizing: border-box;
        margin-left: 20rpx;
        margin-top: 10rpx;
        margin-bottom: 10rpx;
		.label{
			color: #999999;
			margin-left: 20rpx;
		}
		.content{
			margin-left: 15rpx;
			color: #DD524D;
		}
      }
      .start-time {
        display: flex;
        .label {
          color: #999999;
        }
        text {
          margin-left: 20rpx;
        }
      }

      .end-time {
        display: flex;
        .label {
          color: #999999;
        }
        text {
          margin-left: 20rpx;
        }
      }

      .nophone {
        width: 100%;
        font-weight: bold;
        color: #dd524d;
      }

      .l_line {
        color: #dd524d;
      }

      .l_addres {
        width: auto;
        display: inline-block;
        margin: 0 10rpx;
      }
    }

    .active_detail {
      width: 100%;
      background: #ffffff;

      .active_info {
        font-size: 30rpx;
        font-weight: bold;
        padding: 20rpx 20rpx;
      }

      rich-text {
        width: 100%;
        margin: 10rpx 20rpx;
        user-select: text;
        -webkit-user-select: text;
      }
    }

    .contact {
      width: 100%;
    }

    .contact_info {
      display: flex;
      align-items: center;

      view > image {
        width: 125rpx;
        height: 125rpx;
        border-radius: 50%;
        margin-right: 10rpx;
      }

      view:nth-child(3) {
        position: relative;
        left: 240rpx;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
      }

      .qrcode {
        width: 120rpx;
        height: 120rpx;
        border-radius: 5%;
      }

      .qrtitle {
        float: right;
      }

      .l_title {
        width: 100%;
      }
    }
  }

  .siginput {
    // position: fixed;
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 95rpx;
    border-top: 1rpx solid #c0c0c0;

    button {
      height: 70rpx;
      line-height: 70rpx;
      width: 90%;
    }
  }

  .nosiginput {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 95rpx;
    border-top: 1rpx solid #c0c0c0;

    button {
      background-color: rgb(245, 209, 209);
      height: 70rpx;
      line-height: 70rpx;
      width: 90%;
    }
  }
}
</style>
