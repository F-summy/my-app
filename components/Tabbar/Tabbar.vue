<template>
	<view class="tab-bar-container">
		<scroll-view :scroll-with-animation="true" :scroll-into-view="currentId" class="tab-scroll" scroll-x="true">
			<view class="scroll-item">
				<view class="tab-scroll-item" @click="getActiveIndex(index)" :id="`item${index}`"
					:class="{active:activeIndex==index}" v-for="(item,index) in labelList" :key="index">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<view class="tab-icons" @click="goSettingPage">
			<uni-icons class="icons" type="gear" size="24"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		name: "Tabbar",
		props: {
			labelList: Array,
			activeIndex: Number
		},
		data() {
			return {
				currentId: 'item0'
			};
		},
		watch: {
			activeIndex(index) {
				this.currentId = `item${index}`
			}
		},
		methods: {
			async goSettingPage() {
				await this.checkLogin()
				uni.navigateTo({
					url: '/pages/setting/setting'
				})
			},
			getActiveIndex(index) {
				this.$emit('setActiveIndex', index)
			}
		}
	}
</script>

<style lang="scss">
	@import './css/Tabbar.scss'
</style>
