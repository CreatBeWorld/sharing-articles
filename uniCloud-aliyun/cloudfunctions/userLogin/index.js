'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('user')
	const {loginName,password,phone,type} = event
	const {affectedDocs,data} = await collection.aggregate()
	.match(type==='account'?{loginName,password}:{phone})
	.project({password:0})
	.end()
	if(affectedDocs>0){
		return {
			code:0,
			msg:'',
			data:data[0]
		}
	}
	return {
		code:1,
		msg:type==='account'?'账号或密码不正确':'该手机号不存在'
	}
};
