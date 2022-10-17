import uniCrazyRouter from "uni-crazy-router";
import store from '../store/index.js'
export function setupRouter(app) {
	// 接收vue3的实例，并注册uni-crazy-router
	app.use(uniCrazyRouter)
}
const redList = [
	'pages/follow/follow',
	'pages/myArticle/myArticle',
	'pages/feedBack/feedBack'
]
uniCrazyRouter.beforeEach(async (to, from, next) => {
	if (redList.includes(to.url) && !store.state.user.userInfo) {
		uniCrazyRouter.afterNotNext(() => {
			// 拦截路由，并且跳转去其他页面
			uni.navigateTo({
				url: '/pages/user/login/login'
			})
		})
		return // 拦截路由，不执行next
	}
	next()
})

uniCrazyRouter.afterEach((to, from) => {
	// 如果没有登录，在h5端如果通过在浏览器地址栏中输入follow页面路径进入follow页面后，重定向到登录页
	// 并且在微信小程序中，在未登录的情况下，beforeEach拦截失败，
	//故在微信小程序中在未登录的情况下进入follow页面会重定向到登录页
	if(redList.includes(to.url) && !store.state.user.userInfo){
		uni.redirectTo({
			url: '/pages/user/login/login'
		})
	}
})

uniCrazyRouter['on' + 'Error']((to, from) => {
	// 逻辑代码
})
