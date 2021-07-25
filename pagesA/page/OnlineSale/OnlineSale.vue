<template>
	<view class="contianer">
		<nav-bar :back="false"></nav-bar>
		<view class="bg">
			<view class="content">
				<view class="onlinelisting">
					<text>網上放盤</text>
				</view>
				<view @click="showdialog">
					<text class="perinfo">個人資料</text>
				</view>
				<view>
					<!-- 姓名 -->
					<view class="username">
						<text class="name">姓名:</text>
						<view class="input_area">
							<input type="text" placeholder="請輸入姓名" placeholder-class="myinput" />
						</view>
					</view>
					<!-- 電話 -->
					<view class="tel">
						<text class="tels">電話:</text>
						<view class="tel_info">
							<input type="text" />
						</view>
					</view>
					<!-- 聯繫方式 -->
					<view class="contact">
						<text>聯繫方式:</text>
						<view>
							<label class="radio">
								<radio value="r1">WhatsApp</radio>
							</label>
							<label class="radio">
								<radio value="r2">微信</radio>
							</label>
							<view class="contact_input">
								<input type="text" value="" placeholder="請輸入WhatsApp" placeholder-class="contact_style" />
							</view>
						</view>
					</view>

				</view>
				<view class="owner">
					<text>業主:</text>
					<radio value="r2">是</radio>
					<radio value="r3">否</radio>
				</view>
				<view>
					<view>
						<text>物業信息</text>
					</view>
					<view>
						<text>地區:</text>
						<input type="text" @click="Change" />
						<dropdown v-show="true" :list="list" @select="select"></dropdown>
					</view>
				</view>
			</view>
		</view>
		<e-modal :visible.sync="visible" @cancel="handleCancel">
			<view style="height: 600rpx;">
				<view style="margin-top: 20rpx; margin-left: 20rpx; margin-bottom: 20rpx;">
					<text>選地區</text>
				</view>
				<view>
					<radio-group>
					<view style="width: 100%; margin-left: 20rpx;margin-top: 50rpx;">
						<label class="radio">
							<radio value="r2">澳門(+853)</radio>
						</label>
					</view>
					<view style="width: 100%; margin-left: 20rpx; margin-top: 50rpx;">
						<label class="radio">
							<radio value="r2">香港(+852)</radio>
						</label>
					</view>
					<view style="width: 100%; margin-left: 20rpx; margin-top: 50rpx;">
						<label class="radio">
							<radio value="r2">大陸(+86)</radio>
						</label>
					</view>
					<view style="width: 100%; margin-left: 20rpx; margin-top: 50rpx;">
						<label class="radio">
							<radio value="r2">其它(+)</radio>
						</label>
					</view>
					</radio-group>
				</view>
			</view>
			<view style="display: flex;justify-content: flex-end;margin-left: 20rpx;">
				<view style="margin-left: 20rpx;">
					<text>取消</text>
				</view>
				<view style="margin-left: 20rpx;">
					<text>確定</text>
				</view>
			</view>
		</e-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				visible: '',
				show:true,
				list:[{
					name:'請選擇',
					value:0
				},{
					name:'澳門',
					value:1
				},{
					name:'氹仔',
					value:2
				},{
					name:'路環',
					value:3
				}]
			}
		},
		methods: {
			handleCancel() {
				console.log('cancel')
			},
			showdialog() {
				this.visible = true;
			},
			Change(){
				this.show= !this.show;
			},
			select(e){
				console.log(e);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contianer {
		width: 100%;
		height: 100%;

		.bg {
			display: flex;
			justify-content: center;
			width: 100%;
			height: 300rpx;
			background-image: url(http://10.68.2.9/CenMacauCMS2/img/OnlineSaleBg@2x.png);
			background-size: cover;
			box-sizing: border-box;
			border: 1rpx solid pink;

			.content {
				margin-top: 30rpx;
				width: 90%;
				background-color: #ffffff;

				.onlinelisting {
					display: flex;
					align-items: center;
					height: 70rpx;
					border-bottom: 1rpx solid #e0e0e0;
				}

				.perinfo {
					width: fit-content;

					&::before {
						content: "1";
						width: 70rpx;
						height: 100rpx;
						color: #ce1b1b;
					}
				}

				.username {
					display: flex;
					justify-content: flex-end;
					padding-right: 20rpx;
					margin: 30rpx 0;
					.name {
						letter-spacing: 10rpx;

						&::before {
							content: '*';
							width: fit-content;
							color: #ce1b1b;
						}
					}

					.input_area {
						height: auto;
						box-sizing: border-box;
						border: 1rpx solid #e0e0e0;

						/deep/.myinput {
							padding-left: 20rpx;
							font-size: 25rpx;
							color: #c7c7cc;
						}
					}
				}

				.checked {
					background-color: #d91616;
				}

				.tel {
					display: flex;
					justify-content: flex-end;
					padding-right: 20rpx;

					.tels {
						letter-spacing: 10rpx;

						&::before {
							content: '*';
							width: fit-content;
							color: #ce1b1b;
						}
					}

					.tel_info {
						// letter-spacing: 10rpx;
						box-sizing: border-box;
						border: 1rpx solid #e0e0e0;
					}
				}

				.contact {
					display: flex;
					justify-content: flex-end;
					padding-right: 20rpx;

					.contact_input {
						box-sizing: border-box;
						border: 1rpx solid #999999;

						.contact_style {
							font-size: 20rpx;
						}
					}
					
				}
				.owner{
					display: flex;
					justify-content: flex-end;
					padding-right: 200rpx;
					
				}
				
			}
		}

	}
</style>
