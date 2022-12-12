'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		articleId,
		page = 1,
		pageSize = 10
	} = event

	const {
		data
	} = await db.collection('article')
		.aggregate()
		.match({
			_id: articleId
		})
		.unwind('$comments')
		.project({
			_id: 0,
			comments: 1
		})
		.replaceRoot({
			newRoot: '$comments'
		})
		.skip(pageSize * (page - 1))
		.limit(pageSize)
		.end()
	//返回数据给客户端
	return {
		code: 0,
		msg: '评论成功',
		data: data
	}
};
