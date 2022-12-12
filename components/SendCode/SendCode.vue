<template>
	<view class="send-code-conatiner">
		<view @click="getCode" class="text">
			{{state?`${time}秒 发送成功`:'获取验证码'}}
		</view>
	</view>
</template>

<script>
	export default {
		name: "SendCode",
		data() {
			return {
				state: false,
				time: 60,
				timeId: null
			};
		},
		methods: {
			getCode() {
				if (this.state) return
				this.$emit('getCodeNum', this.sendCode)
			},
			async sendCode(form) {
				const {
					phone
				} = await form.validateField(['phone'])
				this.setTime()
				const {
					code,
					msg
				} = await this.$http.get_code_num({
					phone
				})
				uni.showToast({
					title: msg,
					icon: 'none'
				})
				this.$emit('sendCode', code)
			},
			setTime() {
				this.timeId = setInterval(() => {
					if (this.time === 1) {
						clearInterval(this.timeId)
						this.timeId = null
						this.time = 60
						this.state = false
						return
					}
					this.state = true
					this.time--
				}, 1000)
			}
		},
		//销毁组件时清除计时器
		beforeDestroy() {
			clearInterval(this.timeId)
			this.timeId = null
			this.time = 60
			this.state = false
		}
	}
</script>

<style lang="scss">
	.send-code-conatiner {
		flex-shrink: 0;
		background-color: $base-color;
		padding: 18rpx 20rpx;
		color: #f5f5f5;
		box-sizing: border-box;
		border-radius: 10rpx;
	}
</style>
