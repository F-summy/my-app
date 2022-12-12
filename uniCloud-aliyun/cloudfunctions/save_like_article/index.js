'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const {
		userId,
		articleId
	} = event
	const user = await db.collection('user').doc(userId).get()
	const articleList = user.data[0].article_likes_ids

	let msg = ''
	let arr = null
	if (articleList.includes(articleId)) {
		msg = '取消收藏'
		arr = dbCmd.pull(articleId)
	} else {
		msg = '收藏成功'
		arr = dbCmd.addToSet(articleId)
	}
	await db.collection('user').doc(userId).update({
		article_likes_ids: arr
	})
	const UserInfo = await db.collection('user').doc(userId).get()
	//返回数据给客户端
	return {
		code: 0,
		data: {
			msg,
			newUserInfo: UserInfo.data[0]
		}
	}
};
