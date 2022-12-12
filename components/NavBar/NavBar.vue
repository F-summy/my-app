<template>
	<view class="nav-bar">
		<view class="nav-bar-top">
			<view class="content-temp" :style="{height:stateHeight+'rpx'}"></view>
			<view class="icons-nav" @click="goBack" v-if="isShow" :style="{top:stateHeight+'rpx'}">
				<uni-icons type="back" size="22" color="#f5f5f5"></uni-icons>
			</view>
			<view class="nav-bar-content" @click="goSearch"
				:style="{marginRight:right+'rpx',marginLeft:isShow?'20rpx':'0rpx'}">
				<uni-icons type="search" color="#999"></uni-icons>
				<view v-if="!isShow" class="nav-bar-text">
					输入搜索内容，进行搜索！
				</view>
				<input v-else v-model.trim="setVal" class="search-content-text" @confirm="inputValue"
					confirm-type="search" placeholder="输入搜索内容，进行搜索！" type="text">
			</view>
		</view>
		<view :style="{height:stateHeight+80+'rpx'}">
		</view>
	</view>
</template>

<script>
	export default {
		name: "NavBar",
		props: {
			isShow: {
				type: Boolean,
				default: false
			},
			parentVal: String
		},
		data() {
			return {
				stateHeight: 20,
				right: 0
			};
		},
		created() {
			this.getDataInit()
		},
		methods: {
			getDataInit() {
				const data = uni.getSystemInfoSync()
				this.stateHeight += data.statusBarHeight
				// #ifdef MP-WEIXIN
				const buttom = uni.getMenuButtonBoundingClientRect()
				this.stateHeight = buttom.top * 2
				this.right = buttom.width * 2
				// #endif
			},
			goSearch() {
				if (this.isShow) return
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			goBack() {
				// #ifdef H5
				uni.switchTab({
					url: '../../pages/index/index'
				})
				// #endif
				// #ifndef H5
				uni.navigateBack()
				// #endif
			},
			inputValue() {
				this.$emit('sendSearch')
			}
		},
		computed: {
			setVal: {
				get() {
					return this.parentVal
				},
				set(val) {
					this.$emit('updataVal', val)
					if (!val) {
						this.$emit('sendSearch')
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "./css/NavBar.scss"
</style>
