import {ref} from 'vue'
let codeRef = ref('')
// 该方法用于用户表单校验
const phoneValidateFunction = (rule,value,data,callback)=>{
	const phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
	if(!phoneReg.test(value)){
		callback('手机号码格式不正确')
	}
	return true
}
// 该方法用于验证码的校验
const codeValidateFunction = (rule,value,data,callback)=>{
	if(codeRef.value === 'invalid'){
		uni.showToast({
			title:'验证码已失效，请重新发送验证码',
			icon:'none'
		})
		codeRef.value=''
		return false
	}
	if(value===codeRef.value){
		codeRef.value='' // 校验成功，把验证码清空
		return true
	}
	callback('验证码不正确')
}


export function getUserRules(mobileCodeRef){
	codeRef = mobileCodeRef
	return {
	loginName:{
		rules:[
			{required:true,errorMessage:"账号不能为空"},
			{minLength:6,errorMessage:'账号的长度不能低于6'}
		]
	},
	password:{
		rules:[
			{required:true,errorMessage:"密码不能为空"}
		]
	},
	phone:{
		rules:[
			{required:true,errorMessage:"手机号不能为空"},
			{validateFunction:phoneValidateFunction}
		]
	},
	vCode:{
		rules:[
				{required:true,errorMessage:"验证码不能为空"},
				{validateFunction:codeValidateFunction}
		]
	}
}
}
