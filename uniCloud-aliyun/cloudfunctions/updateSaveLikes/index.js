'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const {articleId,userId} = event
	const col = db.collection('user')
	const {data} = await col.doc(userId).get()
	const articleLikeIds = data[0].article_likes_ids
	let articleArr = null
	let msg = ''
	if(articleLikeIds.includes(articleId)){
		// 取消收藏
		articleArr = dbCmd.pull(articleId)
		msg = '取消收藏成功'
	}else{
		// 收藏文章
		articleArr = dbCmd.addToSet(articleId)
		msg= '添加收藏成功'
	}
	await col.doc(userId).update({
		article_likes_ids:articleArr
	})
	// 获取用户信息
	const res = await col.doc(userId).get()
	//返回数据给客户端
	return {
		code:0,
		data:{
			userInfo:res.data[0],
			msg
		}
	}
};
