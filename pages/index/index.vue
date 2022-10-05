<template>
	<view class="home-container">
		<!-- 导航栏 -->
		<NavBar></NavBar>
		<!-- 顶部选项卡 -->
		<TabBar :labelList="labelList" v-model:activeIndex="activeIndex"></TabBar>
		<ArticleList :labelList="labelList" class="list-container" v-model:activeIndex="activeIndex"></ArticleList>
	</view>
</template>

<script setup>
	import {onLoad} from "@dcloudio/uni-app";
	import {ref} from "vue"
	/* 定义数据 */
	const labelList = ref([]) // 传递给TabBar组件的属性
	const activeIndex = ref(0) // 传递给TabBar、ArticleList组件的属性
	/* 生命周期钩子函数 */
	onLoad(()=>{
		fetchTabBarData()
	})
	/* 定义方法 */
	// 获取顶部TabBar组件数据
	const fetchTabBarData = async()=>{
		const res = await uni.$http.getLabelList()
		labelList.value = [{_id:Symbol('_id'),name:'全部'},...res]
	}
</script>

<style lang="scss">
	page{
		height: 100%;
		display: flex;
	}
	.home-container{
		flex: 1;
		@include flex(flex-start,column);
		overflow: hidden;
		align-items: inherit;
	}
	.list-container{
		flex: 1;
	}
	
</style>
