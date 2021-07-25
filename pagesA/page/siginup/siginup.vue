<template>
	<view class="container">
		<view class="col-1"><text>姓名</text><input v-model="name" placeholder="請輸入姓名" /></view>
		<view class="col-2"><text>手提號碼</text>
			<!-- 选择电话码控件 -->
			<select-box @selectbox="selectbox" :select="array"></select-box>
			<input type="number" v-model="phone" placeholder="請輸入手提號碼" />
		</view>
		<view class="col-3"><text>電子郵件</text><input v-model="email" placeholder="請輸入電子郵件" /></view>
		<view class="col-4"><text>出席人數</text><input v-model="Attendance" type="number" placeholder="請輸入出席人數" /></view>
		<!-- 日期控件 -->
		<view class="col-5"><text>報名日期</text>
			<picker mode="date" :value="date" :start="startDate" :end="endData" @change="bindDateChange">
				<view>{{date}}</view>
			</picker>
		</view>
		<!-- 報名 -->
		<view class="siginput">
			<button type="warn" @click="siginput">立即報名</button>
		</view>
		<!-- 注意事項 -->
		<view class="note">
			<text>
				*項必須填寫，這次所收集的個人資料將絕對保密，僅供預約睇樓報名及聯絡之用，將有工作人員盡快與你聯絡
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				date: currentDate,
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
				name: '',
				phone: '',
				email: '',
				Attendance: '',
				ojct: {},
				show_business_change: true,
				area:''

			}
		},
		onLoad(ob) {
			this.ojct= JSON.parse(decodeURIComponent(ob.ob));
			console.log(this.ojct);
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			selectbox(data) {
				console.log(data);
				// data=0 +86 data =1 +852 data =3 +853
				this.area=data
			},
			bindDateChange() {

			},
			// 活動報名
			siginput() {
				//檢查姓名是否為空
				if (this.name == '' || this.name == null) {
					uni.showToast({
						title: '請輸入姓名',
						image: 'http://10.68.2.9/CenMacauCMS2/static/promt.png',
						position: 'center',
						duration: 2000
					})
					return;
				}
				if (this.phone=='' || this.phone == null) {
					uni.showToast({
						title: '請輸入手提號碼',
						image: 'http://10.68.2.9/CenMacauCMS2/static/promt.png',
						position: 'center',
						duration: 2000
					})
					return;
				}
				// 驗證手機號碼位數(大陸11位)
				if( this.area==0 && this.phone.length< 11){
					uni.showToast({
						title: '請檢查手提號碼',
						image: 'http://10.68.2.9/CenMacauCMS2/static/promt.png',
						position: 'center',
						duration: 2000
					})
					return;
				}
				// 驗證手機號碼位數(澳門8位)
				if( this.area==1 && this.phone.length< 8){
					uni.showToast({
						title: '請檢查手提號碼',
						image: 'http://10.68.2.9/CenMacauCMS2/static/promt.png',
						position: 'center',
						duration: 2000
					})
					return;
				}
				// 驗證手機號碼位數(香港8位)
				if( this.area==2 && this.phone.length< 8){
					uni.showToast({
						title: '請檢查手提號碼',
						image: 'http://10.68.2.9/CenMacauCMS2/static/promt.png',
						position: 'center',
						duration: 2000
					})
					return;
				}

				//檢查電子郵件是否為空
				if(this.email == '' || this.email == null){
					uni.showToast({
						title: '請輸入電子郵件',
						image: 'http://10.68.2.9/CenMacauCMS2/static/promt.png',
						position: 'center',
						duration: 2000
					})
					return;
				}
				//檢查出席人數是否為空
				if(this.Attendance == '' || this.Attendance == null){
					uni.showToast({
						title: '請輸入出席人數',
						image: 'http://10.68.2.9/CenMacauCMS2/static/promt.png',
						position: 'center',
						duration: 2000
					})
					return;
				}
				//檢查報名日期是否為空
				if(this.Attendance == '' || this.Attendance == null){
					uni.showToast({
						title: '請輸入出席人數',
						image: 'http://10.68.2.9/CenMacauCMS2/static/promt.png',
						position: 'center',
						duration: 2000
					})
					return;
				}
				// 測試環境
				uni.request({
					method: 'POST',
					// 	// 測試服務器
					// url: 'http://10.68.2.9/CenMacauCMS2/Api/Registration/AddUserRegistration',
					// 	// 正式服務器
						url:'https://mo.centanet.com/CenMacauCMS/Api/Api/Registration/AddUserRegistration',

					// 提交參數
					data: {
						"AcId": this.ojct.ActivityId,
						"Title": this.ojct.Title,
						"Address": this.ojct.ActivityAddress,
						"Name": this.name,
						"Phone": this.phone,
						"Email": this.email,
						"UsNumber": this.Attendance,
						"ActivityDate": this.date,
						"ActivityTimeId": this.ojct.ActivityTimeList[0].ActivityTimeId

					},
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.container {
		font-size: 30rpx;
		width: 100%;
		height: 100%;
		.col {
			&-1 {
				display: flex;
				align-items: center;
				box-sizing: border-box;
				border-top: 1rpx solid #c0c0c0;
				border-bottom: 1rpx solid #c0c0c0;
				padding-left: 40rpx;
				height: 100rpx;

				text {
					font-size: 30rpx;
					margin-right: 100rpx;
				}

				&::after {
					content: '*';
					width: 10rpx;
					position: absolute;
					left: 20rpx;
					color: red;
				}
			}

			&-2 {
				display: flex;
				align-items: center;
				box-sizing: border-box;
				border-bottom: 1rpx solid #c0c0c0;
				padding-left: 40rpx;
				height: 100rpx;

				text {
					font-size: 30rpx;
					// margin-right: 30rpx;
				}

				&::after {
					content: '*';
					width: 10rpx;
					position: absolute;
					left: 20rpx;
					color: red;
				}
			}

			&-3 {
				display: flex;
				align-items: center;
				box-sizing: border-box;
				border-bottom: 1rpx solid #c0c0c0;
				padding-left: 40rpx;
				height: 100rpx;

				text {
					font-size: 30rpx;
					margin-right: 40rpx;
				}

				&::after {
					content: '*';
					width: 10rpx;
					position: absolute;
					left: 20rpx;
					color: red;
				}
			}

			&-4 {
				display: flex;
				align-items: center;
				box-sizing: border-box;
				border-bottom: 1rpx solid #c0c0c0;
				padding-left: 40rpx;
				height: 100rpx;

				text {
					font-size: 30rpx;
					margin-right: 40rpx;
				}

				&::after {
					content: '*';
					width: 10rpx;
					position: absolute;
					left: 20rpx;
					color: red;
				}
			}

			&-5 {
				display: flex;
				align-items: center;
				box-sizing: border-box;
				border-bottom: 1rpx solid #c0c0c0;
				padding-left: 40rpx;
				height: 100rpx;

				text {
					font-size: 30rpx;
					margin-right: 40rpx;
				}

				&::after {
					content: '*';
					width: 10rpx;
					position: absolute;
					left: 20rpx;
					color: red;
				}
			}
		}

		.siginput {
			display: flex;
			justify-items: center;
			margin-top: 40rpx;

			button {
				height: 70rpx;
				line-height: 70rpx;
				width: 90%;
			}
		}

		.note {
			display: flex;
			justify-items: center;
			width: 100%;
			height: 100%;

			text {
				font-size: 25rpx;
				width: 90%;
				margin: 40rpx auto;
				color: #999999;
			}
		}
	}
</style>
