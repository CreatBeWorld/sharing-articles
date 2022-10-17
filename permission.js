/**
 * @description 自定义路由拦截
 */

import {useStore} from 'vuex'
// 白名单
const whiteList = [
	'/', // 注意入口页必须直接写 '/'
	{ pattern: /^\/pages\/articleDetail.*/ }, // 支持正则表达式
	{ pattern: /^\/pages\/commentListPage.*/ }, // 支持正则表达式
	'/pages/search/search',
	'/pages/self/self',
	'/pages/user/login/login',
	// '/pages/labelAdminPage/labelAdminPage'
]

export default async function() {
	const store = useStore()
	const list = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab']
	// 用遍历的方式分别为,uni.navigateTo,uni.redirectTo,uni.reLaunch,uni.switchTab这4个路由方法添加拦截器
	list.forEach(item => {
		// 无法拦截h5端通过浏览器地址栏输入地址进行页面跳转
		uni.addInterceptor(item, {
			// 拦截前触发
			invoke(e) {
				// 获取要跳转的页面路径（url去掉"?"和"?"后的参数）
				const url = e.url.split('?')[0]
				// console.log('url', url,e)

				// 判断当前窗口是白名单，如果是则不重定向路由
				let pass;
				pass = whiteList.some((item) => {
					if (typeof(item) === 'object' && item.pattern) {
						return item.pattern.test(url)
					}
					return url === item
				})
				// 不是白名单并且没有用户信息
				/* 拦截uni.switchTab (opens new window)本身没有问题。
					但是在微信小程序端点击tabbar的底层逻辑并不是触发uni.switchTab，所以在微信小程序中拦截点击TabBar进行页面的跳转失败
				*/
				if (!pass && !store.state.user.userInfo) {
					uni.navigateTo({
						url: "/pages/user/login/login"
					})
					return false
				}
				return e
			},
			fail(err) { // 失败回调拦截
				console.log(err)
			}
		})
	})
}
