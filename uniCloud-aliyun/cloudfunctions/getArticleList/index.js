'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {classify,page=1,pageSize=10} = event
	const collection = db.collection('article')
	let matchObject = {}
	if(classify!=='all'){
		matchObject = {classify}
	}
	// 根据条件获取文章数据
	const {data} = await collection.aggregate() // 开启聚合
	.match(matchObject) // 进行条件过滤:仅查询记录中classify字段等于指定的值
	.skip(pageSize*(page-1)) // 跳过对应数量的记录
	.limit(pageSize) // 限制输出的记录条数
	.project({content:0}) // 每条记录舍弃content字段
	.end() // 聚合结束
	// 获取分页查询的总记录数
	const {total} = await collection.where(matchObject).count()
	return {
		code:0,
		msg:'',
		data:{
			articleList:data,
			total
		}
	}
};
