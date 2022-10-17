'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {title} = event
	const col = db.collection('article')
	const res = await col.aggregate().match({
		 // 使用正则表达式进行模糊匹配，只要是包含，就进行返回操作
		title:new RegExp(title)
	}).project({
		content:0
	}).end()
	return {
		code:0,
		msg:'',
		data:res.data
	}
};
