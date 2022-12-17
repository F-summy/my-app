'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const res = await db.collection('label').get()
	console.log(res.data);
	//返回数据给客户端
	return {
		code: 0,
		data: {
			data: res.data
		}
	}
};
