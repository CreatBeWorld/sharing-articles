<template>
	<view class="home-container">
		<!-- 导航栏 -->
		<NavBar></NavBar>
		<!-- 顶部选项卡 -->
		<TabBar :labelList="labelList"></TabBar>
	</view>
</template>

<script setup>
	import {onLoad} from "@dcloudio/uni-app";
	import {ref} from "vue"
	/* 定义数据 */
	const labelList = ref([]) // 传递给TabBar组件的属性
	/* 生命周期钩子函数 */
	onLoad(()=>{
		fetchTabBarData()
	})
	/* 定义方法 */
	// 获取顶部TabBar组件数据
	const fetchTabBarData = async()=>{
		const res = await uni.$http.getLabelList()
		labelList.value = res
	}
</script>

<style scoped lang="scss">
	
</style>
