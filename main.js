import App from './App'
import Vue from 'vue'
import module from './ajax/api/index.js'
import userLogin from './common/commonLogin/commonLogin.js'
import userMixin from './common/userInfo/userInfo.js'
import store from './store/index.js'
import {
	router,
	RouterMount
} from './router.js' //路径换成自己的
Vue.use(router)
Vue.use(userMixin)
Vue.use(userLogin)
Vue.config.productionTip = false
Vue.prototype.$http = module
App.mpType = 'app'
const app = new Vue({
	...App,
	store
})
// app.$mount()

// #ifdef H5
RouterMount(app, router, '#app')
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
