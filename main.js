import Vue from 'vue'
import App from './App'
import store from './store'
import MinRequest from './utils//MinRequest'
import minApi from './api/index.js'
Vue.prototype.$store=store
Vue.use(MinRequest)

/*import request from './utils/api/api.js'*/

// import store from './store/index.js'
// Vue.prototype.$request=request
Vue.config.productionTip = false

App.mpType = 'app'
//注册全局组件
import zhouWeiNavBar from "@/components/zhouWei-navBar";
Vue.component("nav-bar", zhouWeiNavBar);
const app = new Vue({
    ...App,
	store,
    minApi
})

app.$mount()
