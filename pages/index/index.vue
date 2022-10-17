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
	import {ref,computed} from "vue"
	import {useStore} from 'vuex'
	/* 定义数据 */
	const activeIndex = ref(0) // 传递给TabBar、ArticleList组件的属性
	const store = useStore()
	const userInfo = computed(()=>{
		return store.state.user.userInfo
	})
	const labelList = computed(()=>{
		// 如果用户已登录，则根据用户信息返回labelList的数据
		if(userInfo.value&&userInfo.value.label_ids.length>0){
			return [store.state.user.labelList[0],...store.state.user.labelList.filter(l=>userInfo.value.label_ids.includes(l._id))]
		}
		return store.state.user.labelList
	})
	/* 生命周期钩子函数 */
	onLoad(()=>{
		fetchTabBarData()
	})
	/* 定义方法 */
	// 获取顶部TabBar组件数据
	const fetchTabBarData = async()=>{
		if(store.state.user.labelList.length>0){
			return
		}
		const res = await uni.$http.getLabelList()
		store.commit('user/setLabelList',[{_id:Symbol('_id'),name:'全部'},...res])
	}
</script>

<style lang="scss">
	page{
		height: 100%;
	}
	.home-container{
		height: 100%;
		@include flex(flex-start,column);
		overflow: hidden;
		align-items: inherit;
	}
	.list-container{
		flex: 1;
	}
	
</style>

