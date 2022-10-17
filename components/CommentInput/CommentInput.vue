<template>
  <view class="comment-input-container">
		<uni-popup ref="popup" type="bottom" class="popup">
			<view class="input-container">
				<view class="header">
					<view class="header-item" @click="cancelPublishComment">取消</view>
					<view class="header-item" @click="publishComment">发布</view>
				</view>
				<view class="bottom">
					<textarea class="bottom-input-area" maxlength="200" placeholder="请输入评论" v-model.trim="inputVal"></textarea>
					<view class="bottom-input-count">{{inputVal.length}}/200</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>
<script>
  export default {
    name:'CommentInput'
  }
</script>
<script setup>
	import {ref,watch} from 'vue'
	// 属性
	const props = defineProps({
		isPopupShow:{
			type:Boolean,
			default:false
		}
	})
	// 抛出的事件
	const $emit = defineEmits(['cancelPublishComment','publishComment'])
	// 数据
	const popup = ref(null)
	const inputVal = ref('')
	// 监听属性的变化
	watch(()=>props.isPopupShow,(newVal)=>{
		newVal && popup.value.open()
		!newVal && popup.value.close()
	})
	// 方法
	// 取消发布评论
	const cancelPublishComment = ()=>{
		$emit('cancelPublishComment')
		inputVal.value = ''
	}
	// 发布评论
	const publishComment = ()=>{
		if(!inputVal.value){
			uni.showToast({
				title:'请输入评论',
				icon:'none'
			})
			return
		}
		$emit('publishComment',inputVal.value,()=>{inputVal.value=''})
	}
</script>

<style scoped lang="scss">
.input-container{
	background-color: #fff;
	.header{
		@include flex;
		border-bottom: 1px solid #f5f5f5;
		font-size: 28rpx;
		color: #666;
		.header-item{
			height: 100rpx;
			line-height: 100rpx;
			padding: 0 30rpx;
		}
	}
	.bottom{
		padding: 30rpx;
		.bottom-input-area{
			width: 100%;
			height: 400rpx;
		}
		.bottom-input-count{
			@include flex(flex-end);
			font-size: 24rpx;
			color: $c-9;
		}
	}
}
</style>