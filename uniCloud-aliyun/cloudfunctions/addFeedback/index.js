'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {userId,content,imageUrlList} = event
	await db.collection('feedback').add({
		userId,
		content,
		imageUrlList
	})
	return {
		code:0,
		msg:'',
		data:{
			msg:'提交反馈成功'
		}
	}
};
