'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate; // 获取一个聚合的操作符
exports.main = async (event, context) => {
	const {userId} = event
	const userList = await db.collection('user').doc(userId).get()
	const author_likes_ids = userList.data[0].author_likes_ids
	const res = await db.collection('user')
	.aggregate()
	.addFields({	
		is_like:$.in(['$id', author_likes_ids])
	})
	.match({
		is_like:true
	})
	.project({password:0,phone:0})
	.end()
	console.log(res)
	return {
		code:0,
		msg:'',
		data:res.data
	}
};
