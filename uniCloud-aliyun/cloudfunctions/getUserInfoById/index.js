'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {_id} = event
	const {data} = await db.collection('user').doc(_id).get()
	//返回数据给客户端
	return {
		code:0,
		data:{...data[0],password:''}
	}
};
