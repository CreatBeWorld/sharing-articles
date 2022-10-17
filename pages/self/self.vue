<template>
	<view class="self-container">
		<view class="have-logined" v-if="userInfo">
			<view class="big-image-box">
				<image :src="userInfo.avatar" mode="aspectFill"></image>
			</view>
			<view class="others">
				<view class="top">
					<view class="small-image-box" @click="changeAvatar">
						<image :src="userInfo.avatar" mode="aspectFill"></image>
					</view>
					<view class="username">{{userInfo.author_name}}</view>
				</view>
				<view class="bottom">
					<view class="item">
						<text>被关注</text>
						<text class="num">{{userInfo.follow_count}}</text>
					</view>
					<view class="item">
						<text>粉丝</text>
						<text class="num">{{userInfo.fans_count}}</text>
					</view>
					<view class="item">
						<text>积分</text>
						<text class="num">{{userInfo.integral_count||0}}</text>
					</view>
				</view>
			</view>
		</view>

		<view class="self-base-container">
			<view class="base-item" v-if="!userInfo" @click="toLoginPage">
				<view class="image-box">
					<image src="../../static/img/logo.jpeg" mode="aspectFill"></image>
				</view>
				<view class="desc">
					<text>HI,您尚未登录，请点击登录</text>
					<uni-icons type="right" size="14" color="#666"></uni-icons>
				</view>
			</view>
			<view class="base-item" @click="toMyArticlePage">
				<uni-icons type="contact" size="16" color="#666" class="icons"></uni-icons>
				<view class="desc">
					<text>我的文章</text>
					<uni-icons type="right" size="14" color="#666"></uni-icons>
				</view>
			</view>
			<view class="base-item" @click="toFeedBackPage">
				<uni-icons type="help" size="16" color="#666" class="icons"></uni-icons>
				<view class="desc">
					<text>意见反馈</text>
					<uni-icons type="right" size="14" color="#666"></uni-icons>
				</view>
			</view>
			<!-- #ifdef APP-PLUS -->
			<view class="base-item">
				<uni-icons type="paperclip" size="16" color="#666" class="icons"></uni-icons>
				<view class="desc">
					<view class="version-container">
						<view class="left">
							当前版本
							<text class="new-version-tip" v-if="haveNewVersion" @click="getNewVersion">(点击下载最新版本)</text>
						</view>
					</view>
					<view>
						<text class="version">{{currentVersion}}</text>
						<uni-icons type="right" size="14" color="#666"></uni-icons>
					</view>
				</view>
			</view>
			<!-- #endif -->
		</view>
		<button type="warn" v-if="userInfo" class="logout-btn" @click="loginOut">退出</button>
	</view>
</template>

<script setup>
	import {
		useStore
	} from 'vuex'
	import {
		ref,
		computed
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	onLoad(() => {
		// !判断是否有新版本进行下载及获取当前的版本
		// #ifdef APP-PLUS
		uni.getSystemInfo({
			success: (res) => {
				if (res.platform === "android") {
					plus.runtime.getProperty(plus.runtime.appid, wgtinfo => {
						currentVersion.value = wgitinfo;
						checkVersion();
					})
				}
			}
		})
		// #endif
	})
	const store = useStore()
	const userInfo = computed(() => {
		return store.state.user.userInfo
	})
	const haveNewVersion = ref(false)
	const currentVersion = ref('')
	const downLoadLinkUrl = ref('')
	// 跳转到登录页
	const toLoginPage = () => {
		uni.navigateTo({
			url: '/pages/user/login/login'
		})
	}
	// 退出登录
	const loginOut = () => {
		store.commit('user/setUserInfo', null)
		uni.switchTab({
			url: '/pages/index/index'
		})
	}
	// 跳转到我的文章页面
	const toMyArticlePage = () => {
		uni.navigateTo({
			url: '/pages/myArticle/myArticle'
		})
	}
	// App中进行版本检测
	const checkVersion = async () => {
		const {
			version,
			downLoadLinkUrl
		} = await uni.$http.getCurrentVersion();
		if (version > currentVersion) {
			haveNewVersion.value = true;
			downLoadLinkUrl.value = downLoadLinkUrl
		}
	}

	const getNewVersion = () => {
		uni.showLoading({
			title: '下载中，请稍后'
		});
		var dtask = plus.downloader.createDownload(downLoadLinkUrl.value, {}, function(d, status) {
			// 下载完成  
			uni.hideLoading({})
			if (status === 200) {
				plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, {}, function(error) {
					uni.showToast({
						title: '安装失败',
						duration: 1500,
						icon: 'none'
					});
				})
			} else {
				uni.showToast({
					title: '更新失败',
					duration: 1500,
					icon: 'none'
				});
		 }
		});
		dtask.start();
	}
	const toFeedBackPage = ()=>{
		uni.navigateTo({
			url:'/pages/feedBack/feedBack'
		})
	}
	// 修改头像
	const changeAvatar = ()=>{
		uni.chooseImage({
			count:1,
			success:async res=>{
	
				// 将图片上传至云存储
				const {fileID} = await uniCloud.uploadFile({
					// #ifdef H5
						cloudPath:res.tempFiles[0].name,
					// #endif
					// #ifndef H5
						cloudPath:Date.now().toString()+res.tempFilePaths[0].substring(res.tempFilePaths[0].lastIndexOf('.')),
					// #endif
					filePath:res.tempFilePaths[0]
				})
				// 修改用户和文章信息
				const {msg} = await uni.$http.changeAvatar({userId:userInfo.value._id,avatar:fileID})
				uni.showToast({
					title:msg,
					icon:'none'
				})
				store.commit('user/setUserInfo',{...userInfo.value,avatar:fileID})
			}
		})
	}
</script>

<style lang="scss">
	@import './styles/index.scss'
</style>
