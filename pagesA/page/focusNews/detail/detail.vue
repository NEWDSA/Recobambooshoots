<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			// this.$request({
			// 	method:'get',
			// 	url:'Api/Article/GetFocusOneHandDetail',
			// 	data:{
			// 		UserKeyId:'',
			// 		code:''
			// 	}
				
			// })
			this.$minApi.FocusNewsDetails({
				UserKeyId:'',
				code:''
			}).then(res=>{

			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
