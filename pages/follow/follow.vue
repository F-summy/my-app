<template>
	<view class="follow-container">
		<view class="follow-tab">
			<view class="follow-tab-box">
				<view class="follow-tab-item" :class="{active:currentIndex===0}" @click="currentIndex=0">文章</view>
				<view class="follow-tab-item" :class="{active:currentIndex===1}" @click="currentIndex=1">作者</view>
			</view>
		</view>
		<!-- 内容切换区域 -->
		<view class="follow-list-container">
			<swiper class="follow-list-swiper" :current="currentIndex" @change="currentIndex=$event.detail.current">
				<swiper-item>
					<ListLitem v-if="articleList.length" :isShowMore="false" :articleList="articleList"></ListLitem>
					<view v-else class="no-data">暂无收藏的文章</view>
				</swiper-item>
				<swiper-item>
					<authorList :authorList="authorList"></authorList>
					<!-- <view v-else class="no-data">暂无关注的作者</view> -->
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			// #ifdef MP-WEIXIN
			if (!this.userInfo) {
				uni.redirectTo({
					url: '/pages/login/login'
				})
				return
			}
			// #endif
			uni.$on('updataFollow', () => {
				this.getFollowArticle()
			})
			uni.$on('updataAuthor', () => {
				this.getFollowAuthor()
			})
			this.getFollowArticle()
			this.getFollowAuthor()
		},
		data() {
			return {
				articleList: [],
				currentIndex: 0,
				authorList: []
			}
		},
		methods: {
			async getFollowArticle() {
				const res = await this.$http.get_follow_article({
					userId: this.userInfo._id
				})
				this.articleList = res
			},
			async getFollowAuthor() {
				const res = await this.$http.get_follow_author({
					userId: this.userInfo._id
				})
				this.authorList = res
			}
		}
	}
</script>

<style lang="scss">
	@import './css/follow.scss'
</style>
