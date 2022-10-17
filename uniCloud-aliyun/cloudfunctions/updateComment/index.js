'use strict';
const db = uniCloud.database()
const dbCmd = db.command
	/* 生成id */
const generateId = number=>{
		return (Math.random().toString().substring(2,number+2)+Date.now()).toString(36)
}
exports.main = async (event, context) => {
	const {userId,articleId,content,comment_id='',is_reply=false,reply_id=''} = event
	// 获取用户信息
	let user = await db.collection('user').doc(userId).get()
	user = user.data[0]
	const article = await db.collection('article').doc(articleId).get() 		// 获取文章信息
	const comments = article.data[0].comments // 该文章下的所有评论列表
	let commentObj = {
			comment_id:generateId(5),
			comment_content:content,
			create_time:Date.now(),
			is_reply,
			author:{
				author_name:user.author_name,
				avatar:user.avatar,
				author_id:user._id,
				professional: user.professional
			},
			replyArr:[]
		}
	if(!comment_id){
		// 添加评论
		commentObj = dbCmd.unshift(commentObj)
	}else{
		const targetComment = comments.find(item=>item.comment_id===comment_id)
		const commentIndex = comments.findIndex(item=>item.comment_id===comment_id)
		let commentAuthor = null;
		if(!is_reply){
			// 主回复
			commentAuthor = targetComment.author.author_name
		}else{
			// 子回复
			commentAuthor = targetComment.replyArr.find(item=>item.comment_id===reply_id).author.author_name
		}
		commentObj.to = commentAuthor
		commentObj = {
			[commentIndex]:{
				replyArr:dbCmd.unshift(commentObj)
			}
		}
	}
	const res = await db.collection('article').doc(articleId).update({
		comments:commentObj
	})
	return {
		code:0,
		data:{
			msg:'添加数据成功'
		}
	}
};
