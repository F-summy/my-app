<template>
	<view class="comments-container">
		<view class="comment-content-container" v-for="item in commentList" :key="item.comment_id">
			<commentList @commentReply="commentReply" :commentData="item"></commentList>
		</view>
		<uni-load-more :contentText="{contentnomore:'没有更多评论了'}" v-if="commentList.length===0||commentList.length>5"
			:status="loading"></uni-load-more>
		<comment @sendCommentData="sendComment" :showPopup="isShowPopup" @closePopupMasker="isShowPopup=$event">
		</comment>
	</view>
</template>

<script>
	export default {
		onLoad(item) {
			this.articleId = item.id;
			this.getPageComments()
		},
		onReachBottom() {
			if (this.loading == 'noMore') return
			this.page++
			this.getPageComments()
		},
		data() {
			return {
				articleId: '',
				commentList: [],
				page: 1,
				pageSize: 5,
				loading: "loading",
				isShowPopup: false,
				replyData: {}
			}
		},
		methods: {
			async getPageComments() {
				const res = await this.$http.get_comment_list({
					page: this.page,
					pageSize: this.pageSize,
					articleId: this.articleId
				})
				if (res.length == 0) {
					this.loading = 'noMore'
					return
				}
				let oldList = JSON.parse(JSON.stringify(this.commentList))
				oldList.push(...res)
				this.commentList = oldList
			},
			commentReply(data) {
				this.replyData = {
					comment_id: data.comment.comment_id,
					is_reply: data.isReply
				}
				data.comment.reply_id && (this.replyData.reply_id = data.comment.reply_id)
				this.isShowPopup = true
				this.changeState()
			},
			async changeState() {
				await this.checkLogin()
				this.isShowPopup = true
			},
			async sendComment(content) {
				const {
					msg
				} = await this.$http.get_comment_content({
					userId: this.userInfo._id,
					articleId: this.articleId,
					content,
					...this.replyData
				})
				uni.showToast({
					title: msg
				})
				this.isShowPopup = false
				this.replyData = {}
				this.page = 1
				this.commentList = []
				this.loading = 'loading'
				this.getPageComments()
			}
		}
	}
</script>

<style lang="scss">
	.comments-container {
		padding: 30rpx;
		height: 100%;
		overflow: hidden;

	}
</style>
