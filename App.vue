<script>
	// import routerIntercept from './permission.js'
	export default {
		// 当uni-app 初始化完成时触发（全局只触发一次）
		onLaunch: function() {
			// 进行路由拦截相当于router.beforeEach功能
			// routerIntercept()
		},
		// onShow: function() {
		// 	console.log('App Show')
		// },
		// onHide: function() {
		// 	console.log('App Hide')
		// }
	}
</script>

<style lang="scss">
	// 非h5端中不支持*通配符
	// *{
	// 	margin: 0;
	// 	padding: 0;
	// 	box-sizing: border-box;
	// }
	// 在app中必须设置，不然，后面index.vue页面中的.list-container高度会设置错误
	#app{
		height: 100%;
	}
</style>
