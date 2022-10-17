export default {
	namespaced:true,
	state:{
		userInfo:uni.getStorageSync('userInfo')||null,
		searchHistory:uni.getStorageSync('searchHistory')||[],
		labelList:uni.getStorageSync('labelList')||[]
	},
	mutations:{
		setUserInfo(state,payload){
			uni.setStorageSync('userInfo',payload)
			state.userInfo = payload
		},
		// 设置搜索历史
		setSearchHistory(state,payload){
			let list = state.searchHistory
			if(list.includes(payload)){
				list = list.filter(l=>l!==payload)
			}
			list.unshift(payload)
			uni.setStorageSync('searchHistory',list)
			state.searchHistory = list
		},
		// 清空搜索历史
		clearHistory(state){
			state.searchHistory = []
			uni.removeStorageSync('searchHistory')
			uni.showToast({
			  title: "搜索历史已清空",
			  icon: "success"
			})
		},
		// 设置labelList
		setLabelList(state,payload){
			uni.setStorageSync('labelList',payload)
			state.labelList = payload
		}
	},
	actions:{
		// 检验是否登录
		checkIsLogin({state}){
			return new Promise(resolve=>{
				if(state.userInfo){
					resolve()
				}else{
					uni.navigateTo({
						url:'/pages/user/login/login'
					})
				}
			})
		},
		async getUserInfo({commit},_id){
			const res = await uni.$http.getUserInfoById({_id})
			commit('setUserInfo',res)
		}
	},
}