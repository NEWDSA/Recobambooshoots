<template>
	<view>
		<!-- <nav-bar :back="false">资讯详情</nav-bar> -->
		<!-- 輪播圖 -->
		<swiper class="swiper" style="height: 400rpx;" :indicator-dots="indicatorDots" :interval="interval" :duration="duration">
			<swiper-item>
				<image mode="widthFix" :src="list.Images"></image>
			</swiper-item>
		</swiper>
		<!-- 分享按钮 -->
		
		<!-- end 分享按钮 -->
		<!-- 顯示內容 -->
		<view class="content">
			<!-- 標題 -->
			<view class="title">{{list.Title}}</view>
			<!-- 創建時間 -->
			<view class="time">{{list.CreateAt | formatDate}}</view>
			<!-- 文章內容 -->
			<text class="article">{{list.ArContent}}</text>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				list:{},
				indicatorDots: true,  //顯示點
				interval: 2000,
				duration: 500
			}
		},
		onLoad(data) {
			this.list= JSON.parse(decodeURIComponent(data.data));  //解碼編碼格式
		},
		filters: {
			formatDate(value) {
				// ios日期处理  formatDate
				// replace(/-/g, "/")
				if (value != "" && value != null) {
					var date = new Date(value);
					var month = date.getMonth() + 1;
					var time = date.getFullYear() + "-" + month + "-" + date.getDate();
					time.replace(/-/g, "/");
					return time;
				}
			
			}
		},
		methods: {
		  
		}
	}
</script>

<style lang="scss" scoped>
	view{
		width: 100%;
		
		// height: 100%;
		.swiper{
			width: 100%;
			image{
				width: 100%;
				height:400rpx !important;
			}

		}
		.content{
			width: 90%;
			margin: 0 auto;
			.title{
				margin-top: 20rpx;
				margin-bottom: 10rpx;
				line-height: 30rpx;
				font-size: 30rpx;
				
			}
			.time{
				font-size: 20rpx;
				color: #c0c0c0;;
			}
			.article{
				font-size: 25rpx;
			}
		}
	}
</style>
