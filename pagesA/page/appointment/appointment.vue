<template>
  <view class="container">
    <view style="width: 100%; height: 100%; overflow: hidden">
      <view
        style="
          width: 100%;
          background-color: #ffffff;
          display: flex;
          align-items: center;
        "
      >
        <text class="choose">已選樓盤</text>
      </view>
      <!-- 選擇樓盤時顯示 -->
      <view class="haschoise" v-if="iselect.length > 0">
        <template v-for="(item, index) in iselect">
          <view class="title" @click="remove(item)">{{ item.Title }}</view>
        </template>
      </view>
      <!-- 沒選擇樓盤時顯示 -->
      <view class="nochiose" v-else>
        <image mode="aspectFit" src="../../static/noData@2x.png"></image>
        <view class="property">
          <text style="font-size: 26rpx">請選擇樓盤</text>
        </view>
      </view>
      <!-- 選擇區域 -->
      <view class="region"> 可跨區選擇多個樓盤 </view>
      <!-- 選擇區域標題 -->
      <view class="mregion">
        <view class="wregion">
          <template v-for="(item, index) in FoucsNews">
            <view
              :class="index === id ? 'yregion' : 'iregion'"
              @click="chosearea(item.Region)"
              >{{ item.Region }}</view
            >
          </template>
        </view>
        <!-- 显示更多数据 -->
        <view class="wlregion">
          <view style="width: 100%">
            <!-- 需使用多选框 -->
            <view
              style="display: flex; flex-wrap: wrap; align-items: center"
              v-for="(item, index) in District"
            >
              <view
                style="
                  width: 75%;
                  padding: 20rpx 20rpx;
                  color: #555555;
                  font-size: 30rpx;
                "
                >{{ item.Title }}</view
              >
              <view>
                <checkbox
                  :data-id="item.id"
                  :value="item.Title"
                  @click="checkboxChange($event, item)"
                  :checked="item.checked"
                ></checkbox>
              </view>
            </view>
          </view>
        </view>
        <view class="bottom">
          <view class="confirm">
            <!-- <button>確定</button> -->
            <view
              style="
                box-sizing: border-box;
                margin-top: 10rpx;
                display: flex;
                align-items: center;
              "
            >
              <text>已選擇{{ count }}個樓盤</text>
              <button
                style="width: 60%; background-color: #be3128; color: #e7ffff"
                @click="goPage"
              >
                確定
              </button>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      FoucsNews: [],
      District: this.$store.state.iDisrct,
      id: 0,
      iselect: this.$store.state.iselect,
      myselect: [],
      count: this.$store.state.count,
      myregion: "",
      localregion: "",
    };
  },
  onLoad() {
    // this.$request({
    //   method: "POST",
    //   url: "/Api/Article/GetAllFocusOneHand",
    // }).then((res) => {
    //   this.FoucsNews = res.InnerList;
    //   // 使用三目运算符进行判断
    //   this.District.length === 0
    //     ? (this.District = this.FoucsNews[0].ArticleList)
    //     : (this.District = this.District);
    //   this.myregion = this.FoucsNews[0].Region; //设置选定区域初始值
    //   this.localregion = this.FoucsNews[0].Region;
    // });
	this.$minApi.FocusNews().then(res=>{
		this.FocusNews=res.InnerList;
		// 使用三目运算符进行判断
      this.District.length === 0
        ? (this.District = this.FoucsNews[0].ArticleList)
        : (this.District = this.District);
      this.myregion = this.FoucsNews[0].Region; //设置选定区域初始值
      this.localregion = this.FoucsNews[0].Region;

	})
  },
  methods: {
    // 切换数组下标
    chosearea(region) {
      this.myregion = region;
      var index = this.FoucsNews.map((item) => item.Region).indexOf(region);
      this.id = index;
      // 根据数组下标切换数据
      this.FoucsNews.forEach((item, index) => {
        if (item.Region == region) {
          // console.log(index)
          this.District = this.FoucsNews[index].ArticleList;
        }
      });
    },
    checkboxChange(e, item) {
      console.log("華容道");
      item.checked = !item.checked;
      if (item.checked) {
        this.iselect.push(item);
        this.count++;
        // 调用store方法
        this.$store.commit("add", this.iselect);
        this.$store.commit("editDisrct", this.District);
        this.$store.commit("areaCount", this.count);
      } else {
        this.iselect.splice(
          this.iselect.findIndex((itemr) => itemr.Title === item.Title),
          1
        );
        this.count--;
        // 移除内容
        this.$store.commit("remove", this.iselect);
      }
    },
    // 移除checkbox选中
    remove(content) {
      console.log("移除項目");
      console.log(content);
      // 移除項目
      this.iselect.splice(
        this.iselect.findIndex((item) => item.Title === content.Title),
        1
      );
      content.checked = false;
      // var items = this.District;
      // var values = content
      // for (var i = 0, lenI = items.length; i < lenI; i++) {
      // 	const item = items[i]
      // 	if (values.includes(item.Title)) {
      // 		this.$set(item, 'checked', false)
      // 	}
      // }
    },
    goPage() {
      uni.navigateTo({
        url: "../reservation/reservation",
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
  box-sizing: border-box;
  overflow: hidden;
  .choose {
    margin-left: 20rpx;
    color: #7f7f7f;
    box-sizing: border-box;
    font-size: 26rpx;

  }

  .nochiose {
    margin-top: 20rpx;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    height: 276rpx;
    justify-content: center;

    image {
      width: 200rpx;
      height: 200rpx;
      box-sizing: border-box;
    }

    .property {
      width: 100%;
      text-align: center;
      color: #7b7b7b;
    }
  }

  .haschoise {
    width: 100%;
    height: 276rpx;
    overflow-y: scroll;
    padding-right: 34rpx;
    box-sizing: border-box;
    border: 1rpx solid blue;

    .title {
      box-sizing: border-box;
      border: 1rpx solid #a3393b;
      width: fit-content;
      display: inline-block;
      padding-top: 10rpx;
      padding-bottom: 10rpx;
      padding-left: 10rpx;
      padding-right: 30rpx;
      margin: 5rpx 5rpx;
      color: #a3393b;


      &::after {
        position: relative;
        left: 20rpx;
        font-size: 35rpx;
        content: "x";
        color: red;
      }
    }
  }

  .region {
    margin-top: 20rpx;
    width: 100%;
    height: 80rpx;
    text-align: left;
    padding-left: 20rpx;
    background-color: #f5e5e5;
    font-size: 30rpx;
    line-height: 80rpx;
    color: #ab403a;
    font-size: 26rpx;
  }

  .mregion {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .wregion {
      width: 30%;
      box-sizing: border-box;
      background-color: #f7f7f7;

      .iregion {
        color: #878787;
        padding: 10rpx 20rpx;
      }

      .yregion {
        color: #a74c53;
        padding: 10rpx 20rpx;

        &::before {
          position: absolute;
          content: "";
          display: block;
          background-color: red;
          width: 10rpx;
          height: 40rpx;
          left: 0rpx;
        }
      }
    }

    .wlregion {
      width: 70%;
      height: 640rpx;
      box-sizing: border-box;
      border: 1rpx solid pink;
      overflow-y: scroll;
    }
    // 手机平台
    /* #ifdef APP-PLUS */
    .wlregion {
      width: 70%;
      // height: 600rpx;
      box-sizing: border-box;
      border: 1rpx solid yellow;
      overflow-y: scroll;
    }
    /* #endif */
  }

  .bottom {
    width: 100%;
    height: 200rpx;
    box-sizing: border-box;
    .confirm {
      height: 200rpx;
      background-color: #f7f7f7;
    }
  }

  // 手机平台

  /* #ifdef APP-PLUS */
  .bottom {
    position: fixed;
    width: 100%;
    height: 200rpx;
    bottom: var(--window-bottom);

    .confirm {
      height: 200rpx;
      background-color: #f7f7f7;
    }
  }

  /* #endif */
}
</style>
