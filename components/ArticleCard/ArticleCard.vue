<template>
  <view class="article-card-container">
		<!-- 每一个文章卡片根据显示模式（mode可以取值为base、column、image）的不同而进行相应的显示 -->
		<!-- mode:base -->
		<view class="article-card" v-if="articleCardData.mode==='base'">
			<view class="image-container">
				<image :src="articleCardData.cover[0]?articleCardData.cover[0]:'../../static/img/logo.jpeg'" mode="aspectFill"></image>
			</view>
			<view class="article-card-content">
				<view class="article-card-content-text">
					<text>{{articleCardData.title}}</text>
					<SaveLikes></SaveLikes>
				</view>
				<view class="article-card-content-desc">
					<view class="article-type">{{articleCardData.classify}}</view>
					<view class="article-bc">{{articleCardData.browse_count}}浏览</view>
				</view>
			</view>
		</view>
		<!-- mode:column -->
		<view class="article-card mode-column" v-if="articleCardData.mode==='column'">
			<view class="article-card-content-text">
				<text>{{articleCardData.title}}</text>
				<SaveLikes></SaveLikes>
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
		<view class="article-card mode-image" v-if="articleCardData.mode==='image'">
			<view class="big-image-container">
				<image :src="articleCardData.cover[0]" mode="aspectFill"></image>
			</view>
			<view class="article-card-content-text">
				<text>{{articleCardData.title}}</text>
				<SaveLikes></SaveLikes>
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
	defineProps({
		articleCardData:{
			type:Object,
			default:()=>({})
		}
	})
</script>

<style scoped lang="scss">
	@import './styles/articleCard.scss'
</style>