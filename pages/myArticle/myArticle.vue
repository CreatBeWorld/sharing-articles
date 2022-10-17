<template>
  <view class="my-article-container">
		<ArticleCard :articleCardData="item" v-for="item in articleList" :key="item._id"></ArticleCard>
		<view class="no-data" v-if="noDataShow">您还没有发布文章</view>
	</view>
</template>
<script setup>
	import {onLoad} from '@dcloudio/uni-app'
	import {computed,ref} from 'vue'
	import {useStore} from 'vuex'
	const store = useStore()
	const userInfo = computed(()=>{
		return store.state.user.userInfo
	})
	const articleList = ref([])
	const noDataShow = ref(false)
	onLoad(()=>{
		getMyArticles()
	})
	// 获取文章数据
	const getMyArticles = async()=>{
		articleList.value = await uni.$http.getMyArticles({userId:userInfo.value._id})
		if(articleList.value.length===0){
			noDataShow.value = true
		}
	}
</script>

<style scoped lang="scss">
	.no-data{
		height: 400rpx;
		line-height: 400rpx;
		text-align: center;
		font-size: 24rpx;
		color: #666;
	}
</style>
