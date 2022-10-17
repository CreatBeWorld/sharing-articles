<template>
  <view class="send-code-container">
		<view class="btn" @click="sendCode">
			{{isStarting?`${countTime}s后重新获取`:'获取验证码'}}
		</view>
	</view>
</template>
<script>
  export default {
    name:'SendCode'
  }
</script>
<script setup>
	import {ref,onBeforeUnmount} from 'vue'
	/* 组件属性 */
	const props = defineProps({
		form:{ // 表单
			type:Object
		},
		count:{ //计时时间，单位:s
			type:Number,
			default:60
		},
		validateTime:{// 验证码有效时间
			type:Number,
			default:60 // 单位:s
		}
	})
	const $emit = defineEmits(['setMobileCode','codeInvalid'])
	/* 数据 */
	let timerId = null // 倒计时计时器id
	let codeValidateTimerId = null //验证码指定时间内有效，计时器id
	const countTime = ref(props.count) // 倒计时计时时间
	const isStarting = ref(false) // 是否正在计时
	const validateTime = ref(props.validateTime) //验证码有效时间
	/* 方法调用 */
	// 发送验证码
	const sendCode = async()=>{
		if(isStarting.value){ //正在计时，则取消发送验证码
			return
		}
		try{
			const {phone} = await props.form.validateField(['phone'])
			startingTimer()
			// 调用云函数向用户手机发送验证码
			const {mobileCode,msg} = await uni.$https.getCode({phone,expMinute:(props.count/60).toString()})
			uni.showToast({
				title:msg,
				icon:'none'
			})
			$emit('setMobileCode',mobileCode)
			codeValidateStartingTimer()
		}catch(e){}
	}
	// 开启验证码倒计时
	const startingTimer = ()=>{
		isStarting.value = true //开始计时
		timerId = setInterval(()=>{
			if(countTime.value===1){
				clearTimer()
				return
			}
			countTime.value--
		},1000)
	}
	// 关闭验证码倒计时
	const clearTimer = ()=>{
		clearInterval(timerId)
		timerId = null
		isStarting.value = false
		countTime.value = props.count
	}
	// 验证码指定时间内有效，开始倒计时
	const codeValidateStartingTimer = ()=>{
		codeValidateTimerId = setInterval(()=>{
			if(validateTime.value===1){
				clearCodeValidateTimer()
				$emit('codeInvalid') // 通知父组件验证码无效
				return
			}
			validateTime.value--
		},1000)
	}
	// 验证码指定时间内有效，关闭倒计时
	const clearCodeValidateTimer = ()=>{
		clearInterval(codeValidateTimerId)
		codeValidateTimerId=null
		validateTime.value = props.validateTime
	}
	/* 生命周期钩子函数 */
	onBeforeUnmount(()=>{
		// 组件卸载之前清空倒计时计时器，以及清空验证码指定时间内有效的计时器
		clearTimer()
		clearCodeValidateTimer()
	})
</script>

<style scoped lang="scss">
	.send-code-container{
		flex-shrink: 0;
		.btn{
			color: #fff;
			padding: 20rpx;
			border-radius: 10rpx;
			background-color: $base-color;
			opacity: 0.8;
		}
	}
</style>