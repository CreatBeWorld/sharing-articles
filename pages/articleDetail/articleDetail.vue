<template>
  <view class="article-detail-container">
		<view class="detail-header">
			<view class="title">{{articleData.title}}</view>
			<view class="detail-head-bottom">
				<image :src="articleData.author?articleData.author.avatar:''" mode="aspectFill"></image>
				<view class="intro">
					<view class="author">{{articleData.author?articleData.author.author_name:''}}</view>
					<view class="sub">
						<text>{{articleData.create_time}}</text>
						<text>{{articleData.browse_count}}浏览</text>
						<text>{{articleData.thumbs_up_count}}赞</text>
					</view>
				</view>
				<button class="cancel-btn" @click="switchFollowAuthor">
					{{isFollowAuthor?'取消关注':'关注'}}
				</button>
			</view>
		</view>
		<view class="detail-content">
			<view class="html-content-container">
				<mp-html :content="content"  :markdown="true" />
			</view>
			<!-- 评论列表 -->
			<view class="comment-list-container">
				<view class="title">最新评论</view>
				<view class="comment-list-item" v-for="item in commentList" :key="item.comment_id">
					<CommentItem :commentData="item" @commentReply="commentReply"></CommentItem>
				</view>
				<view class="no-data" v-if="!commentList.length">
					没有评论数据
				</view>
			</view>
		</view>
		<view class="detail-bottom">
			<view class="input-container" @click="commentInputAreaPopup">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#f07373"></uni-icons>
			</view>
			<view class="icons-container">
					<uni-icons type="chat" size="22" color="#f07373" class="icon-item" @click="toCommentListPage"></uni-icons>
					<SaveLikes :articleId="articleData._id" size="22" class="icon-item"></SaveLikes>
					<!-- <uni-icons type="heart" size="22" color="#f07373" class="icon-item"></uni-icons> -->
					<uni-icons :type="isHandedUp?'hand-up-filled':'hand-up'" size="22" color="#f07373" class="icon-item" @click="switchThumbUp"></uni-icons>
			</view>
		</view>
		<!-- 评论输入组件 -->
		<CommentInput :isPopupShow="isPopupShow" @cancelPublishComment="handleCancelPublishComment" @publishComment="publishComment"></CommentInput>
	</view>
</template>
<script setup>
	import {onLoad} from '@dcloudio/uni-app'
	import {ref,computed} from 'vue'
	import mpHtml from '../../components/mp-html/components/mp-html/mp-html.vue'
	import userLoginStore from '../../common/userCommon.js'
	/* 数据 */
	const articleData = ref({})
	const content = computed(()=>{
		return articleData.value.content||null
	})
	const commentList = ref([]) // 评论列表
	const isPopupShow = ref(false)
	const {checkIsLogin,userInfo,getUserInfo} = userLoginStore()
	const replyData = ref({}) // 回复评论的数据
	const isFollowAuthor = computed(()=>{
		try{
			return userInfo.value && userInfo.value.author_likes_ids.includes(articleData.value.author.id)
		}catch(e){
			return false
		}
		
	})
	const isHandedUp = computed(()=>{
		try{
			return userInfo.value && userInfo.value.thumbs_up_article_ids.includes(articleData.value._id)
		}catch(e){
			return false
		}
	})
	/* 监听页面加载 */
	onLoad(({id})=>{
		articleData.value._id = id
		getArticleDetail()
		getCommentList()
	})
	/* 方法 */
	// 获取文章详情
	const getArticleDetail = async ()=>{
		articleData.value = await uni.$http.getArticleDetail({_id:articleData.value._id})		
	}
	// 获取文章列表
	const getCommentList = async ()=>{
		const res = await uni.$http.getCommentList({articleId:articleData.value._id})
		commentList.value = res
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
			articleId:articleData.value._id,
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
		getCommentList()
		replyData.value = {}
	}
	// 回复评论
	const commentReply = data=>{
		replyData.value = {
			comment_id:data.comment.comment_id,
			is_reply:data.is_reply
		}
		// 子回复时添加reply_id
		data.comment.reply_id && (replyData.value.reply_id = data.comment.reply_id )
		commentInputAreaPopup()
	}
	// 关注/取消关注文章的作者
	const switchFollowAuthor = async()=>{
		await checkIsLogin()
		const {msg} = await uni.$http.switchFollowAuthor({userId:userInfo.value._id,authorId:articleData.value.author.id})
		uni.showToast({
			title:msg,
			icon:'none'
		})
		getUserInfo(userInfo.value._id)
		uni.$emit('switchFollowAuthor')
	}
	// 文章点赞或取消点赞
	const switchThumbUp = async()=>{
		await checkIsLogin()
		const {msg} = await uni.$http.switchThumbUp({userId:userInfo.value._id,articleId:articleData.value._id})
		uni.showToast({
			title:msg
		})
		// 处理文章的点赞数量
		if(userInfo.value.thumbs_up_article_ids.includes(articleData.value._id)){
			articleData.value.thumbs_up_count--
		}else{
			articleData.value.thumbs_up_count++
		}
		// 更新用户信息
		getUserInfo(userInfo.value._id)
	}
	// 跳转到评论列表页面
	const toCommentListPage = ()=>{
		uni.navigateTo({
			url:`/pages/commentListPage/commentListPage?articleId=${articleData.value._id}`
		})
	}
</script>

<style scoped lang="scss">
	@import './styles/articleDetail.scss'
</style>
