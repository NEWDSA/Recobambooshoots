<template>
	<view>
		<web-view :src="link"></web-view>
	</view>
</template>

<script>
	export default {
		name:'Mortgage',
		props:{
			link:{
				type:String,
				default:''
			}
		},
		onLoad() {
			console.log(this.url);
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>
