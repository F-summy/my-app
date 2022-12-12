'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		articleId
	} = event

	const {
		data
	} = await db.collection('article')
		.aggregate()
		.match({
			_id: articleId
		})
		.end()

	//返回数据给客户端
	return {
		code: 0,
		msg: '文章详情获取成功',
		data: {
			content: data[0]
		}
	}
};
