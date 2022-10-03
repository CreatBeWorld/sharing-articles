<template>
	<!-- 水平滚动区域 -->
  <view class="tab-bar-container">
		<scroll-view class="tab-bar-scroll" scroll-x="true">
			<view class="scroll-content">
				<view v-for="(item,index) in labelList" :key="item._id" class="scroll-content-item" :class="{active:index===activeIndex}">
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
	import {toRef,ref} from "vue"
	// 获取父组件传递过来的属性数据
	defineProps({
		labelList:{
			type:Array,
			default:()=>[]
		}
	})
	// 自定义数据
	const activeIndex = ref(0)
</script>

<style scoped lang="scss">
	@import "./styles/tabBar.scss";
</style>