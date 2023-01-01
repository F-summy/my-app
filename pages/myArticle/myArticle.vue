<template>
	<view class="my-article-list">
		<ListCard v-if="myArticleList.length" :item="item" v-for="item in  myArticleList" :key="item._id"></ListCard>
		<view v-else class="no-data">暂无收藏的文章</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.getMyArticle()
		},
		props: {
			item: Object
		},
		data() {
			return {
				myArticleList: []
			};
		},
		methods: {
			async getMyArticle() {
				const res = await this.$http.get_my_article({
					userId: this.userInfo._id
				})
				this.myArticleList = res
			}
		}
	}
</script>

<style lang="scss">
	.my-article-list {

		.no-data {
			height: 400rpx;
			line-height: 400rpx;
			width: 100%;
			text-align: center;
			font-size: 24rpx;
			color: #666;
		}
	}
</style>
