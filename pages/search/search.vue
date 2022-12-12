<template>
	<view class="search-container">
		<NavBar @sendSearch="sendSearch" :parentVal="parentVal" @updataVal="parentVal=$event" :isShow="true"></NavBar>
		<view v-if="isHistory" class="search-wrapper">
			<!-- 没有进行搜索的操作 -->
			<view class="search-history-container">
				<!-- 头部 -->
				<view class="search-header">
					<text class="history-text">搜索历史</text>
					<text @click="clearHistoryList" class="history-clean">清空</text>
				</view>
				<!-- 内容部分 -->
				<view class="search-history-content" v-if="historyList.length">
					<view class="history-content-item" @click="searchItem(item)" v-for="(item,index) in historyList"
						:key="index">{{item}}</view>
				</view>

				<view v-else class="no-data">当前没有搜索历史</view>
			</view>

			<!-- 开始进行搜索的操作 -->
		</view>
		<view v-else class="search-list-container">
			<ListLitem @saveHistory="saveHistory" :isShowMore="false" :articleList="searchList"
				v-if="searchList.length"></ListLitem>
			<view v-else class="no-data">没有搜索到相关数据</view>
		</view>
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
				searchList: [],
				parentVal: '',
				isHistory: true
			}
		},
		methods: {
			async sendSearch() {
				this.isHistory = false
				if (!this.parentVal) {
					this.isHistory = true
					this.searchList = []
					return
				}
				const {
					articleList
				} = await this.$http.get_search_list({
					val: this.parentVal
				})
				this.searchList = articleList
			},
			saveHistory() {
				this.upDataHistory(this.parentVal);
			},
			clearHistoryList() {
				this.clearHistory()
			},
			searchItem(item) {
				this.parentVal = item
				this.sendSearch()
			},
			...mapMutations(['upDataHistory', 'clearHistory'])
		},
		computed: {
			...mapState(['historyList'])
		}
	}
</script>

<style lang="scss">
	@import './css/search.scss'
</style>
