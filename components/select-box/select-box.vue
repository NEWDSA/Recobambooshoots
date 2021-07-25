<template>
  <div>
    <div class="check">
      <div>
        <span v-model="text" class="spanstyle">{{text}}</span>
        <img
          @click="showbox"
          class="imgstyle"
          :style="{ width: size + 'px', height: size + 'px' }"
          :src="fold ? arrowup : arrowdown"
        />
      </div>
      <div v-show="fold" class="dropbox">
        <span
          @click="check(item)"
          v-for="(item, index) in select"
          :key="index"
          class="select"
          >{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:['select'],
  data() {
    return {
      text:this.select[0].name,
      fold: false,
      border: true,
      size: 18,
      arrowdown: require('../asset/arrow/down.png'),
      arrowup: require("../asset/arrow/up.png")
    };
  },
  methods: {
    showbox() {
      this.fold = !this.fold
    },
    check(item) {
        this.text=item.name
        this.fold = !this.fold;
        this.$emit('selectbox',item.number)
    }
  }
};
</script>
<style scoped>
.check {
	
  /* width: 190rpx; */
  height: 40rpx;
  font-size: 30rpx;
  padding: 4rpx 10rpx 12rpx 16rpx;
  text-align: center;
  /* border: 2rpx solid #d9d9d9; */
  /* border-radius: 10rpx; */
}
.imgstyle {
  position: relative;
  top: 5rpx;
}
.dropbox {
  position: relative;
  top: 12rpx;
  height: 160rpx;
  border: 2rpx solid #F7F7F7;
  /* box-shadow:0 4px 3px rgb(0 0 0 / 3%); */
  background-color: #f1f1f1;
  border-radius: 0 0 10rpx 10rpx;
  overflow-y: scroll;
  z-index: 11;
}
.select {
  display: block;
  width: 100%;
  height: 50rpx;
  line-height: 50rpx;
}
.spanstyle{
    color: #ccc;
    display: inline-block;
    width: 170rpx;
}
</style>