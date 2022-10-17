'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const {userId} = event
	const userList = await db.collection('user').doc(userId).get()
	const article_ids = userList.data[0].article_ids
	const res = await db.collection('article')
											.aggregate()
											.project({
												content:0,
												comments:0
											})
											.match({
												// 查询筛选操作符，表示要求值在给定的数组内
												id:dbCmd.in(article_ids)
											})
											.end()
	return {
		code:0,
		msg:'',
		data:res.data
	}
};
