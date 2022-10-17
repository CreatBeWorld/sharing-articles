<template>
	<scroll-view scroll-y="true" class="author-list-container">
		<view class="author-list-item" v-for="item in authorList" :key="item._id">
			<view class="avatar-box">
				<image :src="item.avatar"></image>
			</view>
			<view class="author-info">
				<view class="info-title">{{item.author_name}}</view>
				<view class="info-bottom">
					<view>{{item.professional}}</view>
					<view class="notes">
						<view class="note-item">
							发帖 {{item.article_ids.length}}
						</view>
						<view class="note-item">
							粉丝 {{item.fans_count}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>
<script>
  export default {
    name:'AuthorList'
  }
</script>
<script setup>
	const props = defineProps({
		authorList:{
			type:Array,
			default:()=>[]
		}
	})
</script>

<style scoped lang="scss">
	.author-list-container{
		height: 100%;
		.author-list-item{
			border-bottom: 1px solid #f5f5f5;
			padding: 20rpx;
			@include flex(flex-start);
			align-items: flex-start;
			.avatar-box{
				width: 80rpx;
				height: 80rpx;
				flex-shrink: 0;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.author-info{
				flex: 1;
				margin-left: 20rpx;
				@include flex(flex-start,column);
				align-items: flex-start;
				.info-title{
					 font-size: 28rpx;
					 font-weight: bold;
					 color: #333333;
					 line-height:1.2;
					 margin-bottom:10rpx;
				}
				.info-bottom{
					width: 100%;
					@include flex;
					line-height:1.5;
					font-size: 24rpx;
					color: #666;
					.notes{
						@include flex(flex-start);
						.note-item{
							margin-left: 20rpx;
						}
					}
				}
			}
		}
	}
</style>