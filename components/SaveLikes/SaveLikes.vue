<template>
  <view class="save-likes-container" @click.stop="handleSaveClick">
		<uni-icons :type="isFilled?'heart-filled':'heart'" :size="size" color="#ff6600"></uni-icons>
	</view>
</template>
<script>
  export default {
    name:'SaveLikes'
  }
</script>
<script setup>
	import userLoginStore from '../../common/userCommon.js'
	import {computed} from "vue"
	// 组件属性
	const props = defineProps({
		articleId:{
			type:String
		},
		size:{
			type:String,
			default:'20'
		}
	})
	// 数据
	const {checkIsLogin,userInfo,getUserInfo} = userLoginStore()
	const isFilled = computed(()=>userInfo.value?userInfo.value.article_likes_ids.includes(props.articleId):false) // 关注图标是否实心
	// 方法
	const handleSaveClick = async ()=>{
		// 判断是否已登录，若已登录，则进行点击收藏/取消收藏的逻辑处理
		// 未登录，则跳转到登录页面
		await checkIsLogin()
		const res = await uni.$http.updateSaveLikes({articleId:props.articleId,userId:userInfo.value._id})
		uni.showToast({
			title:res.msg,
			icon:'none'
		})
		getUserInfo(userInfo.value._id)
		uni.$emit('updateArticleFollowedStatus')
	}
</script>

<style scoped lang="scss">

</style>