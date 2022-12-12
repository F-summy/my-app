<template>
	<view class="article-detail-container">
		<view class="detail-title">
			{{articleData.title}}
		</view>
		<view class="detail-header">
			<view class="detail-logo">
				<image :src="articleData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="detail-header-content">
				<view class="detail-header-content-title">
					{{articleData.author.author_name}}
				</view>
				<view class="detail-header-content-info">
					<text>{{articleData.create_time}}</text>
					<text>{{articleData.browse_count}} 浏览</text>
					<text>{{articleData.thumbs_up_count}} 赞</text>
				</view>
			</view>
			<button type="default" class="detail-header-button"
				@click="followAuthor">{{isFollowAuthor?'取消关注':'关注'}}</button>
		</view>
		<view class="detail-content-container">
			<view class="detail-html">
				<u-parse :content="article" />
			</view>
			<view class="detail-comment">
				<view class="comment-title">最新评论</view>
				<view class="comment-content-container" v-for="item in commentList" :key="item.comment_id">
					<commentList @commentReply="commentReply" :commentData="item"></commentList>
				</view>
				<view class="no-data" v-if="!commentList.length">暂无评论</view>
			</view>
		</view>

		<!-- 评论组件 -->
		<view class="detail-bottom">
			<view class="input-container" @click="changeState">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#f07373"></uni-icons>
			</view>
			<view class="detail-bottom-icons">
				<view class="detail-bottom-icon-box">
					<uni-icons type="chat" size="22" color="#f07373"></uni-icons>
				</view>
				<view class="detail-bottom-icon-box">
					<SaveLikes :articleId="articleData._id" size="24"></SaveLikes>
				</view>
				<view class="detail-bottom-icon-box">
					<uni-icons type="hand-up" size="24" color="#f07373"></uni-icons>
				</view>
			</view>
		</view>
		<comment @sendCommentData="sendComment" :showPopup="isShowPopup" @closePopupMasker="isShowPopup=$event">
		</comment>
	</view>
</template>

<script>
	import marked from 'marked';
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		components: {
			uParse
		},
		onLoad(options) {
			this.articleData = (JSON.parse(options.params));
			this.getArticleDetail()
			this.getCommentList()
		},
		data() {
			return {
				articleData: null,
				isShowPopup: false,
				commentList: [],
				replyData: {}
			}
		},
		methods: {
			async getArticleDetail() {
				const {
					content
				} = await this.$http.get_article_detail({
					articleId: this.articleData._id
				})
				this.articleData = content

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
					articleId: this.articleData._id,
					content,
					...this.replyData
				})
				uni.showToast({
					title: msg
				})
				this.isShowPopup = false
				this.replyData = {}
				this.getCommentList()
			},
			async getCommentList() {
				const res = await this.$http.get_comment_list({
					articleId: this.articleData._id
				})
				this.commentList = res
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
			async followAuthor() {
				await this.checkLogin()
				const {
					msg,
					user
				} = await this.$http.updata_follow_author({
					authorId: this.articleData.author.id,
					userId: this.userInfo._id
				})
				uni.showToast({
					title: msg,
					icon: 'none'
				})
				this.upDataUserInfo(user)
			}
		},
		computed: {
			article() {
				try {
					return marked(this.articleData.content)
				} catch (e) {
					return null
				}
			},
			isFollowAuthor() {
				return this.userInfo && this.userInfo.author_likes_ids.includes(this.articleData.author.id)
			}
		}
	}
</script>

<style lang="scss">
	@import './css/articleDetail.scss'
</style>
