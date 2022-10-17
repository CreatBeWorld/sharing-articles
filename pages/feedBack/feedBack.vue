<template>
  <view class="feedback-container">
		<view class="feedback-content">
			<view class="title">意见反馈：</view>
			<textarea placeholder="请输入您要反馈的问题" class="feedback-textarea" v-model="content"></textarea>
		</view>
		<view class="feedback-images">
			<view class="title">反馈图片：</view>
			<view class="images-container">
				<view class="image-item" v-for="(item,index) in imageList" :key="index">
					<view class="close-icon" @click="cancelAddImage(index)">
						<uni-icons type="closeempty" size="18" color="#fff"></uni-icons>
					</view>
					<view class="image-box">
						<image :src="item.url" mode="aspectFill"></image>
					</view>
				</view>
				<view class="image-item" @click="addImage" v-if="imageList.length<5">
					<view class="plus-container">
						<uni-icons type="plusempty" size="50" color="#eee"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		<button type="warn" @click="submitFeedBack" class="feedback-btn">提交反馈意见</button>
	</view>
</template>
<script setup>
	import {ref} from 'vue'
	import {useStore} from 'vuex'
	const content = ref('')
	const imageList = ref([])
	const store = useStore()
	
	//添加图片
	const addImage = ()=>{
		const count = 5-imageList.value.length
		// 从本地相册选择图片
		uni.chooseImage({
			count,
			success:res=>{
				res.tempFilePaths.forEach((item,index)=>{
					if(index<count){
						imageList.value.push({
							url:item,
							// #ifdef H5
							name:res.tempFiles[index].name
							// #endif
							// #ifndef H5
							name:Date.now().toString()+item.substring(item.lastIndexOf('.'))
							// #endif
							
						})
					}
				})
			}
		})
	}
	// 取消添加图片
	const cancelAddImage = index=>{
		imageList.value.splice(index,1)
	}
	// 提交反馈意见
	const submitFeedBack = async ()=>{
		if(!content.value){
			uni.showToast({
				title:'请输入要反馈的问题',
				icon:'none'
			})
			return
		}
		// 将图片上传到uniCloud的云存储中并得到图片的路径
		uni.showLoading()
		const imageUrlList = await Promise.all(uploadFile())
		uni.hideLoading()
		// 将反馈意见和图片路径存储到云数据库中
		const {msg} = await uni.$http.addFeedback({
			userId:store.state.user.userInfo._id,
			imageUrlList,
			content:content.value
		})
		uni.showToast({
			title:msg,
			icon:'none'
		})
		setTimeout(()=>{
			uni.switchTab({
				url:'/pages/self/self'
			})
		},1500)
	}
	// 上传图片
	const uploadFile=  ()=>{
		return imageList.value.map(img=>{
			return new Promise(async resolve=>{
				const res = await uniCloud.uploadFile({
					filePath:img.url,
					cloudPath:img.name
				})
				resolve(res.fileID)
			})
		})
	}
</script>

<style scoped lang="scss">
	@import './styles/index.scss'
</style>
