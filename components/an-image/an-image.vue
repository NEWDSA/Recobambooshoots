<template>
	<view class="l_cover">
		<image :src="src" :mode="mode" @error="imgError" :style="'width:'+(width<1?width*100+'%':width+'rpx')+'; height: '+(height<1?height*100+'%':height+'rpx')+'; background-image: url('+alt+'); background-size:'+(width<1?width*100+'%':width+'rpx')+' '+(height<1?height*100+'%':height+'rpx')+';'+'border-radius:'+(radius<1?radius*100+'%':radius+'rpx')">
		</image>
	</view>
</template>

<script>
	export default {
		props: {
			src: {
				type: String,
				default: ''
			},
			alt: {
				type: String,
				default: ''
			},
			mode: {
				type: String,
				default: 'scaleToFill'
			},
			width: {
				type: Number,
				default: 320
			},
			height: {
				type: Number,
				default: 240
			},
			radius:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				url: '',
				myss:this.radius
			};
		},
		mounted() {
			console.log(this.myss)
		},
		methods: {
			imgError() {
				this.url = this.alt;
				console.log(this.url)
			}
		}
	}
</script>

<style lang="scss">
	.l_cover{
		display: flex;
		justify-content: center;
		align-items: center;
		// image{
		// 	border-radius: 25rpx;
		// }
	}
</style>
