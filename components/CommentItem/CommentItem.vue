<template>
  <view class="comment-item-container">
		<view class="comment-item">
			<view class="comment-item-header">
				<view class="image-box">
					<image :src="commentData.author.avatar" mode="aspectFill"></image>
				</view>
				<view class="desc">
					<view class="author" v-if="!commentData.to">
						{{commentData.author.author_name}}
					</view>
					<view class="author" v-else>
						{{commentData.author.author_name}}
						<text class="reply">回复</text>
						{{commentData.to}}
					</view>
					<uni-dateformat :date="commentData.create_time" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
				</view>
			</view>
			<view class="comment-content">{{commentData.comment_content}}</view>
			<view class="reply-btn" @click="commentReply({comment:commentData,is_reply})">回复</view>
		</view>
		<!-- 回复的子评论 -->
		<view class="comment-item-child" v-for="item in commentData.replyArr" :key="item.comment_id">
			<CommentItem :is_reply="true" :commentData="item" @commentReply="commentReply"></CommentItem>
		</view>
	</view>
</template>
<script>
  export default {
    name:'CommentItem'
  }
</script>
<script setup>
	import CommentItem from '/components/CommentItem/CommentItem.vue'
	// 组件属性
	const props = defineProps({
		commentData:{
			type:Object,
			default:()=>({})
		},
		is_reply:{
			type:Boolean,
			default:false
		}
	})
	const $emit = defineEmits(['commentReply'])
	// 方法
	// 监听回复按钮的点击   难点
	const commentReply = (data)=>{
		if(data.is_reply){
			// 子回复进行处理
			data.comment.reply_id = data.comment.comment_id
			data.comment.comment_id = props.commentData.comment_id			
		}
		$emit('commentReply',data)
	}
</script>

<style scoped lang="scss">
	@import './styles/commentItem.scss'
</style>