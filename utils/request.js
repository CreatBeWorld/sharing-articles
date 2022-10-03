/**
 * name {String} 云函数名
 */
export default (name,data={})=>{
	return new Promise((resolve,reject)=>{
		uni.showLoading({}) // 显示loading提示框
		// 调用云函数
		uniCloud.callFunction({
			name,
			data,
			success({result}) {
				if(result.code===0){
					resolve(result.data)
				}else{
					uni.showToast({ //显示消息提示框
						title:result.msg,
						icon:"none"// 不显示图标
					})
				}
			},
			fail(err) {
				reject(err)
			},
			complete(){
				uni.hideLoading() //隐藏loading提示框
			}
		})
	})
}