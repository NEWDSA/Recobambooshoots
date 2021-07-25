<template>
	<view>
		<!-- <web-view :src="url"></web-view> -->
		<web-view src="https://hk.centanet.com/greater-bay-area/?lang=zh"></web-view>
	</view>
</template>

<script>
	export default {
		data() {

			return {
				url: {}
			}
		},
		onLoad(weburl) {
			this.url=weburl.link;
			console.log('this.url')
			console.log(this.url)
			
		},
		methods: {

		}
	}
</script>

<style>

</style>
