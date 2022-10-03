<template>
  <view class="nav-bar-container">
		<view class="nav-bar-top">
			<!-- 微信及APP应用实现状态栏高度占位处理-->
			<view :style="{height:statusHeight+'rpx'}"></view>
			<view class="nav-bar-content" :style="{marginRight:marginRight+'rpx'}" @click="goSearchPage">
				<uni-icons type="search"></uni-icons>
				<view class="nav-bar-content-text">输入文章标题进行搜索</view>
			</view>
		</view>
		<!-- 导航栏底部垫片 -->
		<view :style="padHeight"></view>
	</view>
</template>
<script>
	export default{
		name:'NavBar'
	}
</script>
<script setup>
	import {ref,computed} from "vue"
	// 定义响应式数据
	const statusHeight = ref(0)
	const marginRight = ref(0) // navBarContent的marginRight值
	const padHeight = computed(()=>{
		return {
			height:80+statusHeight.value+'rpx'
		}
	})
	/* 定义方法 */
	// 获取设备信息
	const getSystemInfo = ()=>{
		const info = uni.getSystemInfoSync() // 获取设备信息
		statusHeight.value = info.statusBarHeight?info.statusBarHeight*2:20 // 设置状态栏高度
		// #ifdef MP-WEIXIN
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect() // 获取微信小程序下的胶囊按钮的布局位置信息
			marginRight.value = menuButtonInfo.width * 2
			statusHeight.value = menuButtonInfo.top * 2
		// #endif	
	}
	// 路由跳转到搜索页面
	const goSearchPage = ()=>{
		uni.navigateTo({
			url:'/pages/search/search'
		})
	}
	// 方法调用
	getSystemInfo()
</script>

<style scoped lang="scss">
	@import "./styles/navBar.scss";
</style>