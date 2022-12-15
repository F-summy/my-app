'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		updateImage,
		userId,
		content
	} = event

	await db.collection('feedback').add({
		updateImage,
		userId,
		content
	})

	//返回数据给客户端
	return {
		code: 0,
		data: {
			msg: "反馈成功！"
		}
	}
};
