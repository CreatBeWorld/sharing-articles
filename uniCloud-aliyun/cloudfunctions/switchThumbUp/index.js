'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const {userId,articleId} = event
	const user = await db.collection('user').doc(userId).get()
	const thumbs_up_article_ids = user.data[0].thumbs_up_article_ids
	let tempArr = null
	let msg = ''
	let num = null
	if(thumbs_up_article_ids.includes(articleId)){
		msg = '取消点赞'
		tempArr = dbCmd.pull(articleId)
		num = -1
	}else{
		msg = '点赞成功'
		tempArr = dbCmd.push(articleId)
		num = 1
	}
	// 更新用户信息
	await db.collection('user').doc(userId).update({
		thumbs_up_article_ids:tempArr
	})
	// 更新文章信息
	await db.collection('article').doc(articleId).update({
		thumbs_up_count:dbCmd.inc(num)
	})
	//返回数据给客户端
	return {
		code:0,
		data:{
			msg
		}
	}
};
