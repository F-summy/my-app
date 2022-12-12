<template>
	<view class="list-item-container">
		<scroll-view scroll-y="true" @scrolltolower="loadMore" class="list-content">
			<view>
				<ListCard @saveHistory="$emit('saveHistory')" :item="item" v-for="(item,index) in articleList"
					:key="item._id"></ListCard>
			</view>
			<uni-load-more v-if="isShowMore&&(articleList.length==0||articleList.length>7)"
				:status="stateData.loading||'loading'">
			</uni-load-more>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "ListLitem",
		props: {
			articleList: Array,
			stateData: {
				type: Object,
				default: () => {
					return {
						loading: 'loading'
					}
				}
			},
			isShowMore: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {

			};
		},
		methods: {
			loadMore() {
				this.$emit('loadMoreArticle')
			}
		}
	}
</script>

<style lang="scss">
	.list-item-container {
		height: 100%;

		.list-content {
			overflow: hidden;
			height: 100%;
			box-sizing: border-box;
		}
	}
</style>
