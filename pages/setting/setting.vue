<template>
	<view class="label-container">
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">我的标签</view>
				<view class="label-edit" @click="startEdit">{{isEdit? '完成' :'编辑'}}</view>
			</view>
			<view class="label-content">
				<view class="label-content-item" v-for="(item,index) in selfList" :key="item._id">
					{{item.name}}
					<uni-icons v-if="isEdit" @click="pullLabel(item._id)" class="icon-close" type="clear" size="20"
						color="red"></uni-icons>
				</view>
				<view v-if="selfList.length==0" class="no-data">当前没有数据</view>
			</view>
		</view>
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">标签推荐</view>
			</view>
			<view class="label-content">
				<view class="label-content-item" @click="addLabel(item._id)" v-for="(item,index) in recomList"
					:key="item._id">
					{{item.name}}
				</view>
				<view v-if="recomList.length==0" class="no-data">当前没有数据</view>
			</view>
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
				isEdit: false,
				labelIds: []
			}
		},
		watch: {
			userInfo: {
				immediate: true,
				handler(newVal, oldVal) {
					this.labelIds = this.userInfo.label_ids
				}
			}
		},
		methods: {
			// 编辑按钮事件
			startEdit() {
				this.isEdit = !this.isEdit;
				!this.isEdit && this.updateLabel();
			},
			// 修改标签
			async updateLabel() {
				const articleId = this.labelIds
				const {
					msg,
					user
				} = await this.$http.updata_label_list({
					userId: this.userInfo._id,
					articleId
				})
				uni.showToast({
					title: msg
				})
				this.upDataUserInfo(user)
			},
			addLabel(id) {
				if (!this.isEdit) return
				this.labelIds.push(id)
			},
			pullLabel(id) {
				this.labelIds = this.labelIds.filter(item => item != id)
			},
			...mapMutations(['upDataUserInfo'])
		},
		computed: {
			...mapState(['labelList']),
			selfList() {
				return this.labelList.filter(item => this.labelIds.includes(item._id))
			},
			recomList() {
				return this.labelList.filter(item => !this.labelIds.includes(item._id) && (item.name != '全部'))
			}
		}
	}
</script>

<style lang="scss">
	@import './css/setting.scss'
</style>
