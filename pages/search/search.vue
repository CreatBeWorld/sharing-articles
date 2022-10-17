<template>
  <view class="search-container">
  	<NavBar :isSearch="true" :parentVal="parentVal" @changeParentVal="parentVal=$event" @sendSearchText="sendSearchText"></NavBar>
		<!-- 显示搜索历史 -->
		<view class="search-history" v-if="isShowHistory">
			<view class="top">
				<text class="history-text">搜索历史</text>
				<text class="clear-history" @click="clearHistory">清空</text>
			</view>
			<view class="history-content" v-if="searchHistoryList.length>0">
				<view @click="searchByHistory(item)" class="history-item" v-for="(item,index) in searchHistoryList" :key="index">{{item}}</view>
			</view>
			<view class="no-data" v-else>当前没有搜索历史</view>
		</view>
		<!-- 显示搜索文章 -->
		<view class="search-articles-container" v-else>
			<ArticleContent v-if="articleList.length>0" :isShowLoadMore="false" :articleList="articleList" @saveHistory="saveHistory"></ArticleContent>
			<view class="no-data" v-else>没有搜索到相关数据</view>
		</view>
  </view>
</template>

<script setup>
	import {ref,computed} from 'vue'
	import {useStore} from 'vuex'
	// 数据
	const parentVal = ref('')
  const articleList = ref([])
	const isShowHistory = ref(true)
	const store = useStore()
	const searchHistoryList = computed(()=>{
		return store.state.user.searchHistory
	})
	// 方法
	/* 根据搜索文字获取文章 */
	const sendSearchText = async ()=>{
		if(!parentVal.value){
			isShowHistory.value = true
			articleList.value = []
			return
		}
		articleList.value= await uni.$http.getArticleBySearch({title:parentVal.value})
		isShowHistory.value = false
	}
	/* 保存搜索历史 */
	const saveHistory = ()=>{
		store.commit('user/setSearchHistory',parentVal.value)
	}
	/* 情况搜索历史 */
	const clearHistory = ()=>{
		store.commit('user/clearHistory')
	}
	/* 点击历史记录进行搜索 */
	const searchByHistory= item=>{
		parentVal.value = item
		sendSearchText()
	}
</script>

<style lang="scss">
	@import './styles/search.scss';
</style>
