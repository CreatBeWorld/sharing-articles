<template>
  <view class="label-admin-container">
		<!-- 我的标签 -->
		<view class="label-box">
			<view class="label-header">
				<view class="label-txt">我的标签</view>
				<view class="label-edit" @click="editLabel">{{isEditing?'完成':'编辑'}}</view>
			</view>
			<view class="label-content">
				<view class="label-content-items" v-if="selfLabelList.length>0">
					<view class="item" v-for="item in selfLabelList" :key="item._id">
						{{item.name}}
						<uni-icons type="clear" color="red" size="20" class="clear-icon" v-if="isEditing" @click="addToRecommendLabelList(item)"></uni-icons>
					</view>
				</view>
				<view class="no-data" v-else>当前没有数据</view>
			</view>
		</view>
		<!-- 标签推荐 -->
		<view class="label-box">
			<view class="label-header">
				<view class="label-txt">标签推荐</view>
			</view>
			<view class="label-content">
				<view class="label-content-items"  v-if="recommendLabelList.length>0">
					<view class="item" v-for="item in recommendLabelList" :key="item._id" @click="addToSelfLabelList(item)">{{item.name}}</view>
				</view>
				<view class="no-data" v-else>当前没有数据</view>
			</view>
		</view>
	</view>
</template>
<script setup>
	import {ref,computed} from 'vue'
	import {onLoad} from "@dcloudio/uni-app";
	import {useStore} from 'vuex'
	/* 数据 */
	const isEditing = ref(false)
	const store = useStore()
	const userInfo = computed(()=>{
		return store.state.user.userInfo
	})
	const labelIds = ref()
	/* 监听页面加载 */
	onLoad(()=>{
		labelIds.value=userInfo.value.label_ids.length===0?
										store.state.user.labelList.filter(l=>l.name!=='全部').map(l=>l._id)
										:userInfo.value.label_ids
	})
	// 我的标签数据
	const selfLabelList = computed(()=>{
		// #ifdef MP-WEIXIN
				if(!labelIds.value){
					return []
				}
		// #endif
		return store.state.user.labelList.filter(l=>labelIds.value.includes(l._id))
	})
	// 标签推荐数据
	const recommendLabelList = computed(()=>{
	// #ifdef MP-WEIXIN
			if(!labelIds.value){
				return []
			}
	// #endif
		return store.state.user.labelList.filter(l=>!labelIds.value.includes(l._id)&&l.name!=='全部')
	})
	/* 方法 */
	/* 监听按钮的点击 */
	const editLabel = ()=>{
		isEditing.value && updateLabelIds()
		isEditing.value = !isEditing.value
	}
	// 将我的标签中的标签添加至标签推荐中
	const addToRecommendLabelList = item=>{
		labelIds.value = labelIds.value.filter(id=>item._id!==id)
	}
	// 将标签推荐中的标签添加至我的标签中
	const addToSelfLabelList = item=>{
		if(!isEditing.value){
			return
		}
		labelIds.value.push(item._id)
	}
	const updateLabelIds = async ()=>{
		const {msg} = await uni.$http.updateLabelIds({label_ids:labelIds.value,userId:userInfo.value._id})
		uni.showToast({
			title:msg,
			icon:'none'
		})
		store.dispatch('user/getUserInfo',userInfo.value._id)	
	}
</script>

<style lang="scss">
	@import './styles/labelAdmin.scss'
</style>
