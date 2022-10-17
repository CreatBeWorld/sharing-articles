'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {label_ids,userId} = event
	const {updated} = await db.collection('user').doc(userId).update({
		label_ids
	})
	return {
		code:0,
		data:{
			msg:updated===1?'编辑成功':'编辑失败'
		}
	}
};
