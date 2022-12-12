import {
	mapState,
	mapMutations
} from 'vuex'
export default {
	install(Vue) {
		Vue.mixin({
			methods: {
				checkLogin() {
					return new Promise((resolve) => {
						if (this.userInfo) {
							resolve()
						} else {
							uni.navigateTo({
								url: '/pages/login/login',
							});
						}
					})
				},
				...mapMutations(['upDataUserInfo'])
			},
			computed: {
				...mapState(['userInfo'])
			}
		})
	}
}
