export default {
	upDataUserInfo(state, userInfo) {
		uni.setStorageSync('userInfo', userInfo)
		state.userInfo = userInfo
	},
	upDataHistory(state, val) {
		const list = state.historyList
		if (!list.includes(val)) {
			list.unshift(val)
			uni.setStorageSync('historyList', list)
			state.historyList = list
		}
	},
	clearHistory(state) {
		uni.removeStorageSync('historyList')
		state.historyList = []
	},
	setLabelList(state, val) {
		uni.setStorageSync('labelList', val)
		state.labelList = val
	}
}
