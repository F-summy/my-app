'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const {
		userId,
		articleId
	} = event
	const user = await db.collection('user').doc(userId).get()
	const thumbsList = user.data[0].thumbs_up_article_ids

	let msg = ''
	let arr = null
	let num = 0
	if (thumbsList.includes(articleId)) {
		msg = '取消点赞'
		arr = dbCmd.pull(articleId)
		num = -1
	} else {
		msg = '点赞成功'
		num = 1
		arr = dbCmd.addToSet(articleId)
	}
	await db.collection('user').doc(userId).update({
		thumbs_up_article_ids: arr
	})
	await db.collection('article').doc(articleId).update({
		thumbs_up_count: dbCmd.inc(num)
	})
	const article = await db.collection('article').doc(articleId).get()

	const UserInfo = await db.collection('user').doc(userId).get()
	//返回数据给客户端
	return {
		code: 0,
		data: {
			msg,
			user: UserInfo.data[0],
			count: article.data[0].thumbs_up_count,
		}
	}
};
