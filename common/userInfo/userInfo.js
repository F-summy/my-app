export default {
	install(Vue) {
		Vue.mixin({
			data() {
				return {
					telNumber: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
					userRules: {
						loginName: {
							rules: [{
									required: true,
									'errorMessage': "账户名不能为空"
								},
								{
									validateFunction: (rule, val, data, callback) => {
										switch (true) {
											case val.length < 6:
												callback('用户名长度不正确')
												break;
											default:
												return true
										}
									}
								} // 自定义验证规则
							]
						},
						password: {
							rules: [{
									required: true,
									'errorMessage': '密码不能为空'
								},
								{
									validateFunction: (rule, val, data, callback) => {
										switch (true) {
											case val.length < 6:
												callback('用户名长度不正确')
												break;
											default:
												return true
										}
									}
								}
							]
						},
						phone: {
							rules: [{
									required: true,
									'errorMessage': '手机号不能为空'
								},
								{
									validateFunction: (rule, val, data, callback) => {
										switch (true) {
											case !this.telNumber.test(val):
												callback('手机号码格式不正确')
												break;
											default:
												return true
										}
									}
								}
							]
						},
						vCode: {
							rules: [{
									required: true,
									'errorMessage': '验证码不能为空'
								},
								{
									validateFunction: (rule, val, data, callback) => {
										switch (true) {
											case val.length < 4:
												callback('验证码不正确')
												break;
											default:
												return true
										}
									}
								}, {
									validateFunction: (rule, val, data, callback) => {
										switch (true) {
											case val != this.ruleCode:
												callback('验证码不正确')
												break;
											default:
												return true
										}
									}
								}
							]
						}
					}
				}
			}
		})
	}
}
