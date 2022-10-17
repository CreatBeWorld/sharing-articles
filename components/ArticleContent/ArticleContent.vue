<template>
	<scroll-view scroll-y="true" class="article-content-container" @scrolltolower="loadMore">
		<ArticleCard v-for="item in articleList" :key="item._id" :articleCardData="item" @saveHistory="$emit('saveHistory')"></ArticleCard>
		<uni-load-more :status="loadingData.status" v-if="isShowLoadMore&&(articleList.length===0||articleList.length>=pageSize)"></uni-load-more>
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
		},
		isShowLoadMore:{
			type:Boolean,
			default:true
		}
	})
	const $emit = defineEmits(['loadMore','saveHistory'])
	/* 方法 */
	const loadMore = ()=>{
		$emit('loadMore')
	}
</script>

<style scoped lang="scss">
	.article-content-container{
		height: 100%;
		overflow: hidden;
	}
</style>