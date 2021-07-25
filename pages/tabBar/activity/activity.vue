<template>
	<view class="ac_flex">
		<!-- <nav-bar :back="false">活動</nav-bar> -->
		<template v-for="(content,index) in move">
			<view class="l_img" v-if="content.ActivityImg" v-show="content.ActivityImg.length>0" @click="details(move[index].ActivityTimeKey)">
				<image mode="widthFix" :src="content.ActivityImg[0]" @error="imgerror($event,index)"></image>
				<view class="l_title"><text>{{content.Title}}</text></view>
			</view>
		</template>
		<!-- 上拉加载更多 -->
		<uni-load-more :status="loadStatus" />
		
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more';
	export default {
		data() {
			return {
				move: [],
				page: 1,
				pagesize: 20,
				loadStatus: 'loading',
				isLoadMore: false
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.pageIndex++;
			console.log('下拉刷新')
			setTimeout(() => {
					this.$request({
						url: '/Api/Activities/GetList?',
						data: {
							"pageIndex": this.page,
							"pageSize": this.pagesize
						}
					}).then((res) => {
						
						if(res.InnerList.length==0){
							this.isLoadMore=false
							this.loadStatus="normal"
							
						}else{
							var results=res.InnerList;
							console.log(res)
							this.isLoadMore = true
							this.loadStatus = "loading"
							for(var item in res){
								console.log(item)
									let obj={};
									obj["ActivityAddress"]=res[item].ActivityAddress;
									obj["ActivityId"]=res[item].ActivityId;
									obj["ActivityImg"]=res[item].ActivityImg;
									obj["ActivityTimeKey"]=res[item].ActivityTimeKey;
									obj["ActivityTimeList"]=res[item].ActivityTimeList;
									obj["Content"]=res[item].Content;
									obj["Digest"]=res[item].Digest;
									obj["Hotline"]=res[item].Hotline;
									obj["Id"]=res[item].Id;
									obj["IsSignup"]=res[item].IsSignup;
									obj["StaffId"]=res[item].StaffId;
									obj["Title"]=res[item].Title;
									this.move.push(obj)
									
								}
						}
						console.log(this.move)
						uni.stopPullDownRefresh();
						
					})
			}, 1000)
			
			
		},
		/* 加载时请求数据 */
		async onLoad() {
			// this.$request({
			// 	url: '/Api/Activities/GetList?',
			// 	data: {
			// 		"pageIndex": this.page,
			// 		"pageSize": this.pagesize
			// 	}
			// }).then((res) => {
			// 	this.move= res.InnerList;
			// 	console.log('初始化加载')
			// 	console.log(this.move)
			// })

			this.$minApi.activeList({
				pageIndex:this.page,
				pageSize:this.pagesize
			}).then(res=>{
				this.move=res.InnerList;
			})

		},
		/* 上拉加载更多 */
		onReachBottom() {
			this.isLoadMore = true
			this.page += 1
		
			this.loadData()
		},
		methods: {
			/* 打开详情 */
			details(a) {
				// uni.navigateTo({
				// 	url: `/pages/detail/detail?data=` + a
				// })
				uni.navigateTo({
					url:`../../../pagesA/page/detail/detail?data=`+a
				})


			},
			/* 处理图片错误 */
			imgerror(e, index) {
				this.move['0']["ActivityImg"].splice(0, 0, 'http://10.68.2.9/CenMacauCMS2/static/noImg@2x.png')
				this.move[index]["ActivityImg"].splice(0, 0, 'http://10.68.2.9/CenMacauCMS2/static/noImg@2x.png')
			},
			/* 加载更多内容 */
			loadData() {
				this.$minApi.activeList({
					pageIndex:this.page,
					pageSize:this.pagesize
				}).then(result=>{
					if(result.InnerList.length==0){
						this.isLoadMore=false
						this.loadStatus="normal"
						
					}else{
						var results=result.InnerList;
						console.log(results)
						this.isLoadMore = true
						this.loadStatus = "loading"
						for(var item in results){
							console.log(item)
								let obj={};
								obj["ActivityAddress"]=results[item].ActivityAddress;
								obj["ActivityId"]=results[item].ActivityId;
								obj["ActivityImg"]=results[item].ActivityImg;
								obj["ActivityTimeKey"]=results[item].ActivityTimeKey;
								obj["ActivityTimeList"]=results[item].ActivityTimeList;
								obj["Content"]=results[item].Content;
								obj["Digest"]=results[item].Digest;
								obj["Hotline"]=results[item].Hotline;
								obj["Id"]=results[item].Id;
								obj["IsSignup"]=results[item].IsSignup;
								obj["StaffId"]=results[item].StaffId;
								obj["Title"]=results[item].Title;
								this.move.push(obj)
								
							}
					}
				})
				// this.$request({
				// 	url: '/Api/Activities/GetList?',
				// 	data: {
				// 		"pageIndex": this.page,
				// 		"pageSize": this.pagesize
				// 	}
				// }).then((result) => {
				// 	console.log(result.InnerList.length==0)
				// 	if(result.InnerList.length==0){
				// 		this.isLoadMore=false
				// 		this.loadStatus="normal"
						
				// 	}else{
				// 		var results=result.InnerList;
				// 		console.log(results)
				// 		this.isLoadMore = true
				// 		this.loadStatus = "loading"
				// 		for(var item in results){
				// 			console.log(item)
				// 				let obj={};
				// 				obj["ActivityAddress"]=results[item].ActivityAddress;
				// 				obj["ActivityId"]=results[item].ActivityId;
				// 				obj["ActivityImg"]=results[item].ActivityImg;
				// 				obj["ActivityTimeKey"]=results[item].ActivityTimeKey;
				// 				obj["ActivityTimeList"]=results[item].ActivityTimeList;
				// 				obj["Content"]=results[item].Content;
				// 				obj["Digest"]=results[item].Digest;
				// 				obj["Hotline"]=results[item].Hotline;
				// 				obj["Id"]=results[item].Id;
				// 				obj["IsSignup"]=results[item].IsSignup;
				// 				obj["StaffId"]=results[item].StaffId;
				// 				obj["Title"]=results[item].Title;
				// 				this.move.push(obj)
								
				// 			}
				// 	}
				// })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ac_flex {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		box-sizing: border-box;

		.l_img {
			position: relative;
			width: 750rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-bottom: 30rpx;

			image {
				width: 640rpx;
				border-radius: 25rpx;
				box-sizing: border-box;
			}

			.l_title {
				position: absolute;
				bottom: 0;
				width: 640rpx;
				height: 60rpx;
				line-height: 60rpx;
				box-sizing: border-box;
				border-radius: 0rpx 0rpx 25rpx 25rpx;
				background: rgba(0, 0, 0, 0.5);
				padding-left: 20rpx;
				color: #FFFFFF;

				text {
					display: inline-block;
					width: 635rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
	}
</style>
