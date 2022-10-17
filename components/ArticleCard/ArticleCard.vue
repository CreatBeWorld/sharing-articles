<template>
  <view class="article-card-container">
		<!-- 每一个文章卡片根据显示模式（mode可以取值为base、column、image）的不同而进行相应的显示 -->
		<!-- mode:base -->
		<view class="article-card" v-if="articleCardData.mode==='base'" @click="articleCardClicked">
			<view class="image-container">
				<image :src="articleCardData.cover[0]?articleCardData.cover[0]:'../../static/img/logo.jpeg'" mode="aspectFill"></image>
			</view>
			<view class="article-card-content">
				<view class="article-card-content-text">
					<text>{{articleCardData.title}}</text>
					<SaveLikes :articleId="articleCardData._id"></SaveLikes>
				</view>
				<view class="article-card-content-desc">
					<view class="article-type">{{articleCardData.classify}}</view>
					<view class="article-bc">{{articleCardData.browse_count}}浏览</view>
				</view>
			</view>
		</view>
		<!-- mode:column -->
		<view class="article-card mode-column" v-if="articleCardData.mode==='column'" @click="articleCardClicked">
			<view class="article-card-content-text">
				<text>{{articleCardData.title}}</text>
				<SaveLikes :articleId="articleCardData._id"></SaveLikes>
			</view>
			<view class="images-container">
				<image v-for="(img,index) in articleCardData.cover.slice(0,3)" :key="index" :src="img" mode="aspectFill"></image>
			</view>
			<view class="article-card-content-desc">
				<view class="article-type">{{articleCardData.classify}}</view>
				<view class="article-bc">{{articleCardData.browse_count}}浏览</view>
			</view>
		</view>
		<!-- mode:image -->
		<view class="article-card mode-image" v-if="articleCardData.mode==='image'" @click="articleCardClicked">
			<view class="big-image-container">
				<image :src="articleCardData.cover[0]" mode="aspectFill"></image>
			</view>
			<view class="article-card-content-text">
				<text>{{articleCardData.title}}</text>
				<SaveLikes :articleId="articleCardData._id"></SaveLikes>
			</view>
			<view class="article-card-content-desc">
				<view class="article-type">{{articleCardData.classify}}</view>
				<view class="article-bc">{{articleCardData.browse_count}}浏览</view>
			</view>
		</view>
	</view>
</template>
<script>
  export default {
    name:'ArticleCard'
  }
</script>
<script setup>
	const props = defineProps({
		articleCardData:{
			type:Object,
			default:()=>({})
		}
	})
	const $emit = defineEmits(['saveHistory'])
	// 方法
	const articleCardClicked = ()=>{
		const {_id} = props.articleCardData
		uni.navigateTo({
			url:`/pages/articleDetail/articleDetail?id=${_id}`
		})
		$emit('saveHistory')
	}
</script>

<style scoped lang="scss">
	@import './styles/articleCard.scss'
</style>