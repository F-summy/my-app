<template>
	<view class="save-icons" @click.stop="saveArticle">
		<uni-icons color="#ff6600" :type="isLike ? 'heart-filled':'heart'" size="20"></uni-icons>
	</view>
</template>

<script>
	export default {
		name: "SaveLikes",
		props: {
			articleId: String,
			size: {
				type: String,
				default: "20"
			}
		},
		data() {
			return {}
		},
		methods: {
			async saveArticle() {
				await this.checkLogin()

				const {
					newUserInfo,
					msg
				} = await this.$http.save_like_article({
					userId: this.userInfo._id,
					articleId: this.articleId
				})
				uni.$emit('updataFollow')
				uni.showToast({
					title: msg,
					icon: 'none'
				})
				this.upDataUserInfo({
					...this.userInfo,
					...newUserInfo
				})
			}

		},
		computed: {
			isLike() {
				return this.userInfo && this.userInfo.article_likes_ids.includes(this.articleId)

			}
		}
	}
</script>

<style lang="scss">

</style>
