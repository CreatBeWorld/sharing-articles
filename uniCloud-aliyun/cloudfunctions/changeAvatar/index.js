'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {userId,avatar} = event
		const userList = await db.collection('user').doc(userId).get()
		const id = userList.data[0].id
	// 删除云存储中的已经存储的用户头像信息
	try{
		const oldAvatar = userList.data[0].avatar
		await uniCloud.deleteFile({
			fileList:[oldAvatar]
		})
	}catch(e){
		console.log(e)
	}
	// 更新用户头像信息
	await db.collection('user').doc(userId).update({
		avatar
	})
	// 更新文章的作者的头像信息
	await db.collection('article').where({
		'author.id':id
	})
	.update({
		'author.avatar':avatar
	})
	return {
		code:0,
		msg:'',
		data:{
			msg:"修改头像成功"
		}
	}
};
