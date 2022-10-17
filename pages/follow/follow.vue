<template>
  <view class="follow-container">
		<view class="follow-tab-container">
			<view class="follow-tab-item" :class="{active:currentIndex===0}" @click="currentIndex=0">文章</view>
			<view class="follow-tab-item" :class="{active:currentIndex===1}" @click="currentIndex=1">作者</view>
		</view>
		<swiper class="follow-content-container" :current="currentIndex" @change="currentIndex = $event.detail.current">
			<swiper-item>
				<ArticleContent class="article-content"  :articleList="articleList" :isShowLoadMore="false" v-if="articleList.length>0"></ArticleContent>
				<view class="no-data" v-else>暂时没有收藏的文章</view>
			</swiper-item>
			<swiper-item>
				<AuthorList v-if="authorList.length>0" :authorList="authorList"></AuthorList>
				<view class="no-data" v-else>暂时没有关注的作者</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup>
	import {ref} from 'vue'
	import {onLoad} from '@dcloudio/uni-app'
	import {useStore} from 'vuex'
	onLoad(()=>{
		getFollowedArticles(true)
		getFollowedAuthors(true)
		uni.$on('updateArticleFollowedStatus',()=>{
			getFollowedArticles(false)
		})
		uni.$on('switchFollowAuthor',()=>{
			getFollowedAuthors(false)
		})
	})
	const articleList = ref([])
	const authorList = ref([])
	const currentIndex = ref(0)
	const store = useStore()
	const userInfo = store.state.user.userInfo
	// 方法
	// 获取收藏的文章的数据
	const getFollowedArticles = async (isShowLoading)=>{
		articleList.value = await uni.$http.getFollowedArticles({userId:userInfo._id},isShowLoading)
	}
	// 获取关注的作者的数据
	const getFollowedAuthors = async (isShowLoading)=>{
		authorList.value = await uni.$http.getFollowedAuthors({userId:userInfo._id},isShowLoading)
	}
</script>

<style lang="scss">
	@import './styles/follow.scss'
</style>
