<template>
	<view class="article-list-container">
		<swiper class="swiper-list-content" @change="getCurrentPages" :current="activeIndex">
			<swiper-item class="swiper-content" v-for="(item,index) in labelList" :key="item._id">
				<view class="swiper-item">
					<ListLitem :stateData="load" @loadMoreArticle="getArticleMore"
						:articleList="articleListData[activeIndex]||[]">
					</ListLitem>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name: "ArticleList",
		props: {
			labelList: Array,
			activeIndex: Number
		},
		created() {
			this.labelList.length && this.getArticleList(this.activeIndex)
		},
		watch: {
			labelList(newVal, oldVal) {
				if (JSON.stringify(newVal) === JSON.stringify(oldVal)) return
				this.articleListData = {}
				this.alreadyList = {}
				this.getArticleList(this.activeIndex)
			}
		},
		data() {
			return {
				articleListData: {},
				alreadyList: {},
				pageSize: 6,
				load: false
			}
		},
		methods: {
			getCurrentPages(e) {
				const index = e.detail.current
				this.$emit('setCurrentPages', index);
				if (!this.articleListData[index] || !this.articleListData[index].length) {
					this.getArticleList(index)
				}
			},
			async getArticleList(index) {
				if (!this.alreadyList[index]) {
					this.alreadyList[index] = {
						page: 1,
						loading: 'loading',
						total: 0
					}
				}
				const {
					articleList,
					total
				} = await this.$http.get_article_list({
					classify: this.labelList[index].name,
					page: this.alreadyList[index].page,
					pageSize: this.pageSize
				})
				const oldList = this.articleListData[index] || []
				oldList.push(...articleList)
				this.$set(this.articleListData, index, oldList)
				this.alreadyList[index].total = total
			},
			getArticleMore() {
				if (this.alreadyList[this.activeIndex].total === this.articleListData[this.activeIndex].length) {
					this.load = true
					this.$forceUpdate()
					return
				}
				this.alreadyList[this.activeIndex].page++

				this.getArticleList(this.activeIndex)
			}
		}
	}
</script>

<style lang="scss">
	.article-list-container {
		height: 100%;

		.swiper-list-content {
			height: 100%;

			.swiper-content {
				height: 100%;
				overflow: hidden;

				.swiper-item {
					height: 100%;
				}
			}
		}
	}
</style>
