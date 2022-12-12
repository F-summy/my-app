<template>
	<view class="comment-box">
		<view class="comment-header">
			<view class="comment-header-logo">
				<image :src="commentData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="comment-header-info">
				<view class="title" v-if="!commentData.is_reply">
					{{commentData.author.author_name}}
				</view>
				<!-- 当评论为指定评论的时候，进行为谁回复的提示信息 -->
				<view v-else class="title">
					{{commentData.author.author_name}}
					<text class="reply-text">回复</text>
					{{commentData.to}}
				</view>
				<view class="">
					<uni-dateformat :date="commentData.create_time" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
				</view>
			</view>
		</view>
		<!-- 内容部分 -->
		<view class="comment-content">
			<view class="">
				{{commentData.comment_content}}
			</view>
			<view class="comment-info">
				<view class="comment-button" @click="commentReply({comment:commentData,isReply})">
					回复
				</view>
			</view>
			<view class="reply-list" v-for="item in commentData.replyArr" :key="item.comment_id">
				<commentList :isReply="true" :commentData="item" @commentReply="commentReply"></commentList>
			</view>
		</view>
	</view>
</template>

<script>
	import commentList from '@/components/commentList/commentList.vue'
	export default {
		name: "commentList",
		props: {
			commentData: Object,
			isReply: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			commentReply(data) {
				if (data.isReply) {
					data.comment.reply_id = data.comment.comment_id
					data.comment.comment_id = this.commentData.comment_id
				}
				this.$emit('commentReply', data)
			}
		}
	}
</script>

<style lang="scss">
	@import './css/commentList.scss'
</style>
