'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		val
	} = event;

	const list = await db.collection('article')
		.aggregate()
		.match({
			title: new RegExp(val)
		})
		.project({
			content: 0
		})
		.end()
	return {
		code: 0,
		data: {
			articleList: list.data,
		}
	}
};
