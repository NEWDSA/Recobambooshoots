<template>
	<view class="container">
		<view class="build" @click="appointment">
			<text>樓盤</text>
			<!-- 判断内容是否过长 -->
			<template v-for="(item,index) in iselect" v-if="show === true">
				<view v-if="iselect.length<2">{{item.Title}}</view>
			</template>
			<template v-if="show === false">
				<view>請選擇約睇樓盤地區</view>
			</template>
			<template v-if="iselect.length>1">
				<view>已選擇{{count}}個樓盤</view>
			</template>
			<image style="width: 30rpx;height: 30rpx;" src="http://10.68.2.9/CenMacauCMS2/static/right_icon@2x.png"></image>
		</view>
		<view class="name">
			<text>姓名</text>
			<!-- <view>請輸入姓名</view> -->
			<input type="text" placeholder="請輸入姓名" />
		</view>
		<view class="number">
			<text>手提號碼</text>
			<input type="number" placeholder="手提號碼" />
		</view>
		<view class="email">
			<text>電郵地址</text>
			<input type="text" placeholder="電子郵件" />
		</view>
		<view class="attendance">
			<text>出席人數</text>
			<!-- <view>請選擇出席人數</view> -->
			<input type="number" placeholder="請選擇出席人數" />
		</view>
		<view class="selectdata">
			<text>選擇日期</text>
			<!-- <view>請選擇日期</view> -->
			<view>
				<uni-calendar ref="calendar" :insert="false" @confirm="confirm">
				</uni-calendar>
				<view @click="open">
					<template v-if="date==''">
						<text>請選擇日期</text> 
					</template>
					<template v-if="date!==''" >
						<text> {{date}}</text>
					</template>
					</view>
			</view>
		</view>
		<view class="reservation">
			<button type="default">立即預約</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				iselect: this.$store.state.iselect,
				show: false,
				count:'',
				date:''
			}
		},
		onLoad() {
			this.iselect.length > 0 ? this.show = true : this.show = false,
			this.count = this.iselect.length
		},
		methods: {
			// 页面跳转
			appointment() {
				uni.navigateTo({
					url: '../appointment/appointment'
				})
			},
			open(){
				this.$refs.calendar.open();
			},
			confirm(e){
				console.log(e)
				// 获取所选日期
				this.date=e.fulldate
			}
		}
	}
</script>

<style lang="scss" scoped>
	page,
	container {
		width: 100%;
		height: 100%;

		.build {
			display: flex;
			align-items: center;
			width: 90%;
			height: 70rpx;
			margin: 0 auto;
			border-bottom: 1rpx solid #e4e4e4;
			color: #525252;

			text {
				width: 30%;

				&::before {
					content: '*';
					color: #bc312c;
				}
			}

			view {
				width: 70%;
				margin-left: 20rpx;
				color: #c0c0c0;
			}
		}

		.name {
			display: flex;
			align-items: center;
			width: 90%;
			height: 70rpx;
			margin: 0 auto;
			border-bottom: 1rpx solid #e4e4e4;
			color: #525252;

			text {
				width: 30%;

				&::before {
					content: '*';
					color: #bc312c;
				}
			}

			view {
				width: 70%;
				margin-left: 20rpx;
				color: #c0c0c0;
			}
		}

		.number {
			display: flex;
			align-items: center;
			width: 90%;
			height: 70rpx;
			margin: 0 auto;
			border-bottom: 1rpx solid #e4e4e4;
			color: #525252;

			text {
				width: 30%;

				&::before {
					content: '*';
					color: #bc312c;
				}
			}

			view {
				width: 70%;
				margin-left: 20rpx;
				color: #c0c0c0;
			}
		}

		.email {
			display: flex;
			align-items: center;
			width: 90%;
			height: 70rpx;
			margin: 0 auto;
			border-bottom: 1rpx solid #e4e4e4;
			color: #525252;

			text {
				width: 30%;

				&::before {
					content: '*';
					color: #bc312c;
				}
			}

			view {
				width: 70%;
				margin-left: 20rpx;
				color: #c0c0c0;
			}
		}

		.attendance {
			display: flex;
			align-items: center;
			width: 90%;
			height: 70rpx;
			margin: 0 auto;
			border-bottom: 1rpx solid #e4e4e4;
			color: #525252;

			text {
				width: 30%;

				&::before {
					content: '*';
					color: #bc312c;
				}
			}

			view {
				width: 70%;
				margin-left: 20rpx;
				color: #c0c0c0;
			}
		}

		.selectdata {
			display: flex;
			align-items: center;
			width: 90%;
			height: 70rpx;
			margin: 0 auto;
			border-bottom: 1rpx solid #e4e4e4;
			color: #525252;

			text {
				width: 30%;

				&::before {
					content: '*';
					color: #bc312c;
				}
			}

			view {
				width: 70%;
				margin-left: 20rpx;
				color: #c0c0c0;
			}
		}

	}

	.reservation {
		position: relative;
		top: 20rpx;
		width: 90%;
		margin: 0 auto;

		button {
			background-color: #be3128;
			color: #fffbf1;
		}

	}
</style>
