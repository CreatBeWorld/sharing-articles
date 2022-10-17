<template>
  <view class="nav-bar-container">
		<view class="nav-bar-top">
			<!-- 微信及APP应用实现状态栏高度占位处理-->
			<view :style="{height:statusHeight+'rpx'}"></view>
			<!-- 当NavBar组件为Search页面的子组件时，需要显示一个回退按钮 -->
			<view class="back" v-if="isSearch" :style="{top:statusHeight+'rpx'}" @click="backPreviousPage">
				<uni-icons type="back" color="#fff" size="20"></uni-icons>
			</view>
			<view class="nav-bar-content" :style="{marginRight:marginRight+'rpx',marginLeft:isSearch?'20rpx':''}" @click="goSearchPage">
				<uni-icons type="search"></uni-icons>
				<view class="nav-bar-content-text" v-if="!isSearch">输入文章标题进行搜索</view>
				<input type="text" v-else class="search-input" placeholder="请输入文章标题进行搜索" v-model.trim="inputVal" confirm-type="search" @confirm="handleConfirm">
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
	// 组件属性数据
	const props = defineProps({
		// 当前组件是否在搜索页面
		isSearch:{
			type:Boolean,
			default:false
		},
		// 父组件传递过来input框的数据
		parentVal:{
			type:String,
			default:''
		}
	})
	const $emit = defineEmits(['changeParentVal','sendSearchText'])
	// 定义响应式数据
	const statusHeight = ref(0)
	const marginRight = ref(0) // navBarContent的marginRight值
	// 垫片的高度
	const padHeight = computed(()=>{
		return {
			height:80+statusHeight.value+'rpx'
		}
	})
	// input框v-model绑定的数据
	const inputVal = computed({
		get(){
			return props.parentVal
		},
		set(val){
			$emit('changeParentVal',val)
			if(!val){
				handleConfirm()
			}
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
		if(props.isSearch){
			return
		}
		uni.navigateTo({
			url:'/pages/search/search'
		})
	}
	const backPreviousPage = ()=>{
		// #ifdef H5
			//防止h5端页面刷新后，不能回到首页 
			uni.switchTab({
				url:'/pages/index/index'
			})
		// #endif
		// #ifndef H5
			uni.navigateBack()
		// #endif
	}
	const handleConfirm = ()=>{
		$emit('sendSearchText')
	}
	// 方法调用
	getSystemInfo()
</script>

<style scoped lang="scss">
	@import "./styles/navBar.scss";
</style>