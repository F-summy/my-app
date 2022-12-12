import App from './App'
import Vue from 'vue'
import module from './ajax/api/index.js'
import userLogin from './common/commonLogin/commonLogin.js'
import userMixin from './common/userInfo/userInfo.js'
import store from './store/index.js'
Vue.use(userMixin)
Vue.use(userLogin)
Vue.config.productionTip = false
Vue.prototype.$http = module
App.mpType = 'app'
const app = new Vue({
	...App,
	store
})
app.$mount()
