/* 该模块用于封装登录状态判断 */
import {useStore} from 'vuex'
import {computed} from "vue"
export default function userLoginStore(){
	const store = useStore()
	return {
		checkIsLogin:async ()=>store.dispatch('user/checkIsLogin'),
		userInfo:computed(()=>(store.state.user.userInfo)),
		updateUserInfo:userInfo=>{store.commit('user/setUserInfo',userInfo)},
		getUserInfo: _id=>store.dispatch('user/getUserInfo',_id)
	}
}