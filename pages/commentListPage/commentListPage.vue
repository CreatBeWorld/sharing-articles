<template>
  <view class="comment-list-page-container">
		<view class="comment-list-item" v-for="item in commentList" :key="item.comment_id">
			<CommentItem :commentData="item" @commentReply="commentReply"></CommentItem>
		</view>
		<!-- 评论输入组件 -->
		<CommentInput :isPopupShow="isPopupShow" @cancelPublishComment="handleCancelPublishComment" @publishComment="publishComment"></CommentInput>
		<uni-load-more :status="loading" v-if="commentList.length===0||commentList.length>5" :contentText="{contentnomore:'没有更多评论了'}"></uni-load-more>
	</view>
</template>
<script setup>
	import {onLoad,onReachBottom} from '@dcloudio/uni-app'
	import {ref} from 'vue'
	import userLoginStore from '/common/userCommon.js'
	const articleId = ref(null)
	const commentList = ref([])
	const page = ref(1)
	const pageSize =ref(5)
	const replyData = ref({})
	const loading = ref('loading')
	const isPopupShow = ref(false)
	const {checkIsLogin,userInfo,getUserInfo} = userLoginStore()
	onLoad((options)=>{
			articleId.value = options.articleId
			getCommentList()
	})
	// 监听页面滚动到底部
	onReachBottom(()=>{
		if(loading.value==='noMore'){
			return
		}
		page.value++
		getCommentList()
	})
	/* 方法 */
	// 获取文章列表
	const getCommentList = async ()=>{
		const res = await uni.$http.getCommentList({articleId:articleId.value,page:page.value,pageSize:pageSize.value})
		if(res.length===0){
			loading.value= 'noMore'
			return
		}
		commentList.value.push(...res)
	}
	const commentReply = data=>{
		replyData.value = {
			comment_id:data.comment.comment_id,
			is_reply:data.is_reply
		}
		// 子回复时添加reply_id
		data.comment.reply_id && (replyData.value.reply_id = data.comment.reply_id )
		commentInputAreaPopup()
	}
	// 弹出评论输入框
	const commentInputAreaPopup = async ()=>{
		await checkIsLogin() // 检验是否已登录
		isPopupShow.value = true
	}
	// 取消发布评论
	const handleCancelPublishComment = ()=>{
		isPopupShow.value = false
	}
	// 发布评论
	const publishComment = async (content,cb)=>{
		const {msg} = await uni.$http.updateComment({
			articleId:articleId.value,
			userId:userInfo.value._id,
			content,
			...replyData.value
		})
		uni.showToast({
			title:msg,
			icon:'none'
		})
		isPopupShow.value = false
		cb()
		replyData.value = {}
		page.value = 1
		loading.value = 'loading'
		commentList.value = []
		getCommentList()
	}
</script>

<style scoped lang="scss">
.comment-list-item{
	padding: 0 30rpx;
}
</style>
