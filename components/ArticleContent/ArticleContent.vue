<template>
	<scroll-view scroll-y="true" class="article-content-container" @scrolltolower="loadMore">
		<ArticleCard v-for="item in articleList" :key="item._id" :articleCardData="item"></ArticleCard>
		<uni-load-more :status="loadingData.status" v-if="articleList.length===0||articleList.length>=pageSize"></uni-load-more>
	</scroll-view>
</template>
<script>
  export default {
    name:'ArticleContent'
  }
</script>
<script setup>
	// 定义属性
	defineProps({
		articleList:{
			type:Array,
			default:()=>[]
		},
		loadingData:{
			type:Object,
			default:()=>({status:'loading'})
		},
		pageSize:{
			type:Number,
			default:6
		}
	})
	const $emit = defineEmits(['loadMore'])
	/* 方法 */
	const loadMore = ()=>{
		$emit('loadMore')
	}
</script>

<style scoped lang="scss">
</style>