import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		iselect:[],
		iDisrct:[],
		count:''
	},
	mutations:{
		add(state,playground){
			state.iselect=playground
		},
		editDisrct(state,playground){
			state.iDisrct=playground
		},
		areaCount(state,playground){
			state.count=playground
		},
		// 移除数组
		remove(state,playground){
			state.iselect=playground
		}
	},
	
})

export default store