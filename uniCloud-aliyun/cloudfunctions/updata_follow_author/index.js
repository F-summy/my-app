'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		authorId,
		userId
	} = event

	const list = await db.collection('user').doc(userId).get()
	const authorList = list.data[0].author_likes_ids

	let msg = ''
	let temp = null

	if (authorList.includes(authorId)) {
		msg = '取消关注'
		temp = dbCmd.pull(authorId)
	} else {
		msg = '关注成功'
		temp = dbCmd.addToSet(authorId)
	}
	await db.collection('user').doc(userId).update({
		author_likes_ids: temp
	})
	const {
		data
	} = await db.collection('user').doc(userId).get()
	//返回数据给客户端
	return {
		code: 0,
		data: {
			msg,
			user: data[0]
		}
	}
};
