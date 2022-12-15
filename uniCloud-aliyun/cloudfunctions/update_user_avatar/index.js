'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		file,
		userId
	} = event
	const userData = await db.collection('user').doc(userId).get()
	const oldAvatar = userData.data[0].avatar
	const id = userData.data[0].id

	try {
		await uniCloud.deleteFile({
			fileList: [oldAvatar]
		})
	} catch (e) {
		console.log(e);
	}

	await db.collection('user').doc(userId).update({
		avatar: file
	})
	await db.collection('article').where({
		'author.id': id
	}).update({
		'author.avatar': file
	})
	const {
		data
	} = await db.collection('user').doc(userId).get()
	//返回数据给客户端
	return {
		code: 0,
		data: {
			msg: "修改成功！",
			user: data[0]
		}
	}
};
