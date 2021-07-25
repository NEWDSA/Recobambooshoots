<template>
	<view class="page">
		<view class="body">
			<uni-combox label="大陸(+86)" labelWidth="70rpx" :candidates="candidates"></uni-combox>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				candidates: ['大陸(+86)', '香港(+852)', '澳門(+853)'],
				city: ''
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	page{
		width: 100%;
		height: 100%;
		.body{
			width: 350rpx;
			// font-size: 30rpx;
		}
	}

</style>