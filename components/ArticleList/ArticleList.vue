<template>
 <swiper class="article-list-container" :current="activeIndex" @change="changeActiveIndex">
		<swiper-item v-for="(item,index) in labelList" :key="item._id">
			<ArticleContent class="article-content" :pageSize="pageSize" :articleList="articleData[index]" @loadMore="loadMore" :loadingData="loadingData[index]"></ArticleContent>
		</swiper-item>
	</swiper>
</template>
<script>
  export default {
    name:'ArticleList'
  }
</script>
<script setup>
	import {ref,watch} from "vue"
	// 定义属性
	const props = defineProps({
		labelList:{
			type:Array,
			default:()=>[]
		},
		activeIndex:{
			type:Number,
			default:0
		}
	})
	const $emit = defineEmits(['update:activeIndex'])
	// 定义数据
	const articleData = ref({}) // 文章数据
	/* 
	所有滑块的loading数据，每个滑块对应loadingData的一个属性数据，属性数据的格式如下
		{
			page:1,滑块请求第几页的数据
			status:'loading',滑块中uni-load-more组件loading的状态
			total:0 该滑块中分页查询的总记录数
		}
	*/
	const loadingData = ref({}) 
	const pageSize = ref(6) //滑块每页显示多少条数据
	// 监听数据变化,完成全部文章数据的获取
	watch(()=>props.labelList,()=>{
		fetchArticleData(0)
	})
	// 定义方法
	// current改变时change事件的处理函数
	const changeActiveIndex = e=>{
		const index = e.detail.current //即将滑入的滑块的Index
		$emit('update:activeIndex',index)
		// 滑入的滑块的index发生变化时，获取新的文章数据
		if(!articleData.value[index]){
			fetchArticleData(index)
		}		
	}
	// 获取文章数据
	const fetchArticleData = async (currentIndex)=>{
		if(!loadingData.value[currentIndex]){
			loadingData.value[currentIndex] = {
				page:1,
				status:'loading',
				total:0
			}
		}
		 const {articleList,total}= await uni.$http.getArticleList({
			classify:currentIndex===0?'all':props.labelList[currentIndex].name,
			page:loadingData.value[currentIndex].page,
			pageSize:pageSize.value
		})
		loadingData.value[currentIndex].total = total 
		if(!articleData.value[currentIndex]){
			articleData.value[currentIndex] = articleList
			return
		}
		articleData.value[currentIndex].push(...articleList)
	}
	// 滚动条触底加载更多
	const loadMore = ()=>{
		const index = props.activeIndex
		if(articleData.value[index].length===loadingData.value[index].total){
			loadingData.value[index].status = 'noMore'
			return
		}
		loadingData.value[index].page++
		fetchArticleData(index)
	}
</script>

<style scoped lang="scss">
	.article-content{
		height: 100%;
		overflow: hidden;
	}
</style>