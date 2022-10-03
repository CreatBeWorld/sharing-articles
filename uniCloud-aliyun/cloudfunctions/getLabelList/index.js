'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const col = db.collection('label')
	const res = await col.get()
	//返回数据给客户端
	return {
		code:0,
		msg:'',
		data:res.data
	}
};
