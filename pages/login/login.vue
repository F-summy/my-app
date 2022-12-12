<template>
	<view class="login-container">
		<image src="../../static/img/login_bg.png" class="banner-bg" mode=""></image>
		<!-- 导航 -->
		<view class="login-nav">
			<view class="nav-item" @click="changeType('account')" :class="{'active':type==='account'}">
				账号登录
			</view>
			<view class="nav-item" @click="changeType('phone')" :class="{'active':type !=='account'}">
				手机登录
			</view>
		</view>
		<!-- 表单部分 -->
		<uni-forms class="form" ref="form" :modelValue="formData" :rules="userRules">
			<view class="" v-if="type !='phone'">
				<uni-forms-item label="账号" name="loginName">
					<input placeholder-class="placeholder" class="form-input" type="text" placeholder="请输入账号"
						v-model="formData.loginName" />
				</uni-forms-item>
				<uni-forms-item label="密码" name="password">
					<uni-easyinput :inputBorder="false" placeholder-class="placeholder" class="form-input"
						type="password" placeholder="请输入密码" v-model="formData.password"></uni-easyinput>
				</uni-forms-item>
			</view>
			<view class="" v-else>
				<uni-forms-item label="手机号" name="phone">
					<input placeholder-class="placeholder" class="form-input" type="number" placeholder="请输入手机号"
						v-model="formData.phone" />
				</uni-forms-item>
				<uni-forms-item label="验证码" name="vCode">
					<input placeholder-class="placeholder" class="form-input" type="text" placeholder="请输入密码"
						v-model="formData.vCode" />
					<SendCode @sendCode="ruleCode=$event" @getCodeNum="getCode" :form="$refs.form"
						class="code-component"></SendCode>
				</uni-forms-item>
			</view>

			<button class="login-btn" @click="submitLogin">立即登录</button>
		</uni-forms>
		<view class="footer-select-container">
			<text>注册</text>
			<text>忘记密码</text>
		</view>
	</view>
</template>

<script>
	// import {
	// 	mapMutations
	// } from 'vuex';
	export default {

		onReady() {
			this.$refs.form.setRules(this.userRules)
		},
		data() {
			return {
				type: 'account',
				ruleCode: null,
				formData: {
					loginName: '',
					password: '',
					phone: '',
					vCode: '',
				}
			}
		},
		methods: {
			async submitLogin() {
				const res = await this.$refs.form.validate()
				this.getUserInfo({
					...res,
					type: this.type
				})
			},
			changeType(item) {
				this.type = item
				this.$refs.form.clearValidate([])
			},
			async getUserInfo(data) {
				const userInfo = await this.$http.get_userInfo(data)
				if (userInfo) {
					this.upDataUserInfo(userInfo)
					uni.showToast({
						title: "用户登录成功",
					})
					setTimeout(() => {
						// #ifdef H5
						uni.switchTab({
							url: '/pages/index/index'
						})
						// #endif
						// #ifndef H5
						uni.navigateBack()
						// #endif
					}, 1500)
				}
			},
			// ...mapMutations(['upDataUserInfo']),
			//向组件传递数据
			getCode(fn) {
				fn && fn(this.$refs.form)
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}

	@import "./css/login.scss"
</style>
