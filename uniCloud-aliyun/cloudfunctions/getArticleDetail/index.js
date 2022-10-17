'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const {_id} = event
	// 文章浏览量加1
	await db.collection('article').doc(_id).update({
		browse_count:dbCmd.inc(1)
	})
	const {data} = await db.collection('article').aggregate().match({_id}).project({comments:0}).end()
	return {
		code:0,
		msg:'',
		data:data[0]
	}
};
