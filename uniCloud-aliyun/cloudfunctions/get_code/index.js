'use strict';
exports.main = async (event, context) => {
	const {
		phone
	} = event

	const numCode = Math.random().toString().substring(2, 6)

	try {
		const res = await uniCloud.sendSms({
			appid: '__UNI__B39903B',
			smsKey: '78b82469cc2691887fcf7848a509b586',
			smsSecret: 'b3a01c956a321f9e0d704115de86da79',
			phone,
			templateId: '16231', // 请替换为自己申请的模板id
			data: {
				code: numCode,
				expMinute: '1',
			}
		})
		// 调用成功，请注意这时不代表发送成功
		return {
			code: 0,
			data: {
				code: numCode,
				msg: '验证码发送成功',
			}

		}
	} catch (err) {
		// 调用失败
		console.log(err);
		return {
			code: err.errCode,
			msg: err.errMsg
		}
	}
};
