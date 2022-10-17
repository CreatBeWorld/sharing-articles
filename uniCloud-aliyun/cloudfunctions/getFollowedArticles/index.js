'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate; // 获取一个聚合的操作符
exports.main = async (event, context) => {
	const {userId} = event
	const userList = await db.collection('user').doc(userId).get()
	const article_likes_ids = userList.data[0].article_likes_ids
	const res = await db.collection('article')
	.aggregate()
	.addFields({	// 判断这个文章的数组是否包含文章的_id ,$_id 指的是文章列表里面的_id,如果包含，返回true，否则，返回false，在这个里面是过滤查询的每一条记录值
		is_like:$.in(['$_id', article_likes_ids])
	})
	.match({
		is_like:true
	})
	.project({content:0})
	.end()
	console.log(res)
	return {
		code:0,
		msg:'',
		data:res.data
	}
};
