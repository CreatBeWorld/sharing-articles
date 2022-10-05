<template>
	<!-- 水平滚动区域 -->
  <view class="tab-bar-container">
		<scroll-view class="tab-bar-scroll" scroll-x="true" :scroll-with-animation="true" :scroll-into-view="currentIndex">
			<view class="scroll-content">
				<view :id="`item${index}`" v-for="(item,index) in labelList" :key="item._id" class="scroll-content-item" :class="{active:index===activeIndex}" @click="changeActiveIndex(index)">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<!-- 设置图标 -->
		<view class="tab-bar-icon">
			<uni-icons type="gear" size="26" color="#666"></uni-icons>
		</view>
	</view>
</template>
<script>
  export default {
    name:'TopTabBar'
  }
</script>
<script setup>
	import {toRef,ref,watch} from "vue"
	// 获取父组件传递过来的属性数据
	const props= defineProps({
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
	const currentIndex = ref('item0')
	// 监听属性数据变化（也可以使用computed）
	watch(()=>props.activeIndex,()=>{
		currentIndex.value = 'item'+props.activeIndex
	})
	// const currentIndex = computed(()=>{
	// 	console.log(props.activeIndex)
	// 	return `item${props.activeIndex}`
	// })
	// 方法
	const changeActiveIndex = index=>{
		$emit('update:activeIndex',index)
	}
</script>

<style scoped lang="scss">
	@import "./styles/tabBar.scss";
</style>