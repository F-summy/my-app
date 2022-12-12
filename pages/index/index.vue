<template>
	<view class="home-container">
		<NavBar></NavBar>
		<Tabbar :labelList="labelList" @setActiveIndex="setActiveIndex" :activeIndex="activeIndex"></Tabbar>
		<ArticleList @setCurrentPages="setActiveIndex" class="article-list" :labelList="labelList"
			:activeIndex="activeIndex"></ArticleList>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				title: 'Hello',
				activeIndex: 0
			}
		},
		onLoad() {
			this.getLabelList()
		},
		methods: {
			async getLabelList() {
				if (this.labelList.length) return
				const {
					data
				} = await this.$http.get_label_list()
				this.setLabelList([{
					name: "全部",
					_id: "full"
				}, ...data])

			},
			setActiveIndex(index) {
				this.activeIndex = index;
			},
			...mapMutations(['setLabelList'])
		},
		computed: {
			labelList() {
				if (this.userInfo) {
					this.activeIndex = 0;
					return [...this.$store.state.labelList.slice(0, 1), ...this.$store.state.labelList.filter(item => this
						.userInfo.label_ids.includes(item._id))]
				} else {
					return this.$store.state.labelList
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		display: flex;
		height: 100%;
	}

	.home-container {
		flex: 1;
		overflow: hidden;
		box-sizing: border-box;
		@include flex(flex-start, column);
		align-items: inherit;

		.article-list {
			flex: 1;
			box-sizing: border-box;

		}
	}
</style>
