<template>
  <view class="login-container">
		<image src="/static/img/login_bg.png" class="banner-img"></image>
		<!-- 导航部分 -->
		<view class="nav">
			<view class="nav-item" :class="{active:type==='account'}" @click="changeLoginType('account')">账号登录</view>
			<view class="nav-item" :class="{active:type!=='account'}" @click="changeLoginType('phone')">手机登录</view>
		</view>
		<!-- 表单部分 -->
		<uni-forms :model="loginData" ref="loginFormRef" class="form" :rules="userRules">
			<!-- 账号登录 -->
			<view v-if="type==='account'">
				<uni-forms-item name="loginName" label="账号">
					<input type="text" placeholder="请输入账号" v-model="loginData.loginName" placeholder-class="placeholder">
				</uni-forms-item>
				<uni-forms-item name="password" label="密码">
					<uni-easyinput :inputBorder="false" type="password" v-model="loginData.password" placeholder="请输入密码" :placeholderStyle="placeholderStyle"></uni-easyinput>
					<!-- <input type="password" placeholder="请输入密码" placeholder-class="placeholder" v-model="loginData.password"> -->
				</uni-forms-item>
			</view>
			<!-- 手机登录 -->
			<view v-else>
				<uni-forms-item name="phone" label="手机号">
					<input type="text" placeholder="请输入手机号"  v-model="loginData.phone" placeholder-class="placeholder">
				</uni-forms-item>
				<uni-forms-item name="vCode" label="验证码">
					<input type="text" placeholder="请输入验证码"  v-model="loginData.vCode" placeholder-class="placeholder">
					<SendCode :form="loginFormRef" @setMobileCode="setMobileCode" @codeInvalid="codeInvalid"></SendCode>
				</uni-forms-item>
			</view>
			<button class="loginBtn" @click="handleLogin">立即登录</button>
		</uni-forms>
		<view class="other-operations">
			<view class="opeartion-item">注册</view>
			<view class="opeartion-item">忘记密码</view>
		</view>
	</view>
</template>
<script setup>
	import {reactive,ref} from 'vue'
	import {getUserRules} from '../../../common/userRules.js'
	import {useStore} from 'vuex'
	// 表单引用
	const loginFormRef = ref(null)
	// 数据
	// 表单数据
	const loginData = reactive({
		loginName:'',
		password:'',
		phone:'',
		vCode:''// 验证码
	})
	const mobileCodeRef = ref('')
	const userRules = getUserRules(mobileCodeRef) // 表单校验规则
	const placeholderStyle="font-size:32rpx;color:#999"
	const type = ref('account') //登录类型
	// store
	const store = useStore()
	// 方法
	// 登录
	const handleLogin = async ()=>{
		try{
			// 先进行表单校验
			const res = await loginFormRef.value.validate() //校验成功返回表单数据
			const loginResult = await uni.$http.userLogin({...res,type:type.value})
			uni.showToast({
				title:'登录成功',
				icon:'none'
			})
			setTimeout(()=>{
				store.commit('user/setUserInfo',loginResult)
				// #ifdef H5
					back()
				// #endif
				// #ifndef H5
					 backINNotH5()
				// #endif
			},1500)
		}catch(e){
			// 表单校验失败
		}
	}
	// 切换登录类型
	const changeLoginType= loginType=>{
		type.value = loginType
	}
	// 获取SendCode组件传递过来的验证码
	const setMobileCode = code=>{
		mobileCodeRef.value = code
	}
	// 验证码失效
	const codeInvalid = ()=>{
		mobileCodeRef.value = 'invalid'
	}
	// h5端返回上一页
	const back = ()=>{
		let canNavBack = getCurrentPages();
		if(canNavBack && canNavBack.length>1) {  
		  uni.navigateBack();  
		} else {  
		  history.back();  
		}
	}
	// 非h5端返回上一页
	const backINNotH5 = ()=>{
		let canNavBack = getCurrentPages();
		if(canNavBack && canNavBack.length>1) {
		  uni.navigateBack();  
		} else {  
		  uni.switchTab({
		  	url:'/pages/index/index'
		  })  
		}
	}
</script>
<style lang="scss">
	page{
		background-color: #f5f5f5;
	}
	// 微信小程序中input的placeholder-class对应的类样式需要在非scoped style标签中设置，
	//并且uni-easyinput中无法设置placeholder-class，但是可以通过placeholder-style来设置
	.placeholder{ 
		color: #999 !important;
		font-size: 32rpx !important;
	}
</style>
<style scoped lang="scss">
	@import "./styles/login.scss";
</style>
