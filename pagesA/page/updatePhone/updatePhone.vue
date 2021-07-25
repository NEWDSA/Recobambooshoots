<template>
	<view class="contianer">
		<nav-bar :back="true">
		</nav-bar>
		<view class="phonenumber">
			<text>修改號碼</text>
		</view>
		<view class="phone_area">
			<!-- 选取电话控件 -->
			<select-box @selectbox="selectbox" :select="array"></select-box>
			<input type="text" placeholder="请输入手提号码" />

		</view>
		<view class="code_area">
			<view style="width: 170rpx;margin-left: 20rpx;">
				<text style="letter-spacing: 20rpx;">验证码</text>
			</view>
			<input type="text" placeholder="请输入验证码" v-model="code" />
			<view class="code"><text>获取验证码</text></view>
		</view>

		<!-- 验证码不为空时显示 -->
		<template v-if="code">
			<view class="confirm">
				<button class="hascode" type="default">確認</button>
			</view>
		</template>
		<!-- 验证码未空时显示 -->
		<template else>
			<view class="confirm">
				<button class="nocode" type="default" disabled="true">確認</button>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				array: [{
					name: "大陆(+86)",
					number:'+86',
					value: "0"
				}, {
					name: "香港(+852)",
					number:'+852',
					value: "1"
				}, {
					name: "澳门(+853)",
					number:'+853',
					value: "2"
				}],
				area: '',
				code:''
			}
		},
		methods: {
			selectbox(data) {
				console.log(data)
				this.area = data;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contianer {
		width: 100%;
		height: 100%;

		.phonenumber {
			display: flex;
			align-items: center;
			margin-left: 20rpx;
			font-weight: bold;
			width: 100%;
			height: 70rpx;
		}

		.phone_area {
			display: flex;
			align-items: center;
			margin: 0 20rpx;
			height: 90rpx;
			border-bottom: 1rpx solid #C0C0C0;

			/deep/.check {
				height: 40rpx;
				font-size: 30rpx;
				padding: 4rpx 0rpx 12rpx 0rpx;
				text-align: center;
			}

			/deep/.spanstyle {
				color: #000000;
				display: inline-block;
				width: 170rpx;
			}
		}

		.code_area {
			display: flex;
			align-items: center;
			margin: 0 20rpx;
			height: 90rpx;
			border-bottom: 1rpx solid #C0C0C0;

			.code {
				font-size: 20rpx;
				width: fit-content;
				padding: 5rpx 5rpx;
				box-sizing: border-box;
				border: 1rpx solid #999999;
			}
		}

		.confirm {
			margin-top: 40rpx;
			height: 80rpx;
			width: 100%;
			.hascode{
				width: 90%;
				height: 100%;
				color: #ffffff;
				background-color: #ce1b1b;
			}
			.nocode{
				width: 90%;
				height: 100%;
				color: #f9f9f9;
				background-color: #efcbcb;
			}
		}
	}
</style>
