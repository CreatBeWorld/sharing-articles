'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const {userId,authorId} = event
	const user = await db.collection('user').doc(userId).get()
	const author_likes_ids = user.data[0].author_likes_ids
	let authorIds = null
	let msg = ''
	if(author_likes_ids.includes(authorId)){
		msg = '取消关注成功'
		authorIds = dbCmd.pull(authorId)
	}else{
		msg = '关注成功'
		authorIds = dbCmd.push(authorId)
	}
	await db.collection('user').doc(userId).update({
		author_likes_ids:authorIds
	})
	//返回数据给客户端
	return {
		code:0,
		data:{
			msg
		}
	}
};
