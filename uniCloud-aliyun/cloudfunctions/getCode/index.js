'use strict';
exports.main = async (event, context) => {
	const {phone,expMinute} = event
	const code = Math.random().toString().substring(2,8) // 验证码
	try {
	  const res = await uniCloud.sendSms({
	    appid: '__UNI__35A4FCC',
	    smsKey: 'aef5604e0380e344e01559ecd3dc0880',
	    smsSecret: '3d41dcb4fcd3549fcca65d763b51256d',
	    phone,
	    templateId: '15881', // 请替换为自己申请的模板id
	    data:{
	      code,
	      expMinute,// 过期时间，字符串 如:'1'表示1分钟
	    }
	  })
		console.log(res)
	  // 调用成功，请注意这时不代表发送成功
	  return {
			code:0,
			data:{
				mobileCode:code,
				msg:'请在手机注意查收验证码,验证码60秒内有效'
			}
		}
	} catch(err) {
		console.log(err)
	  // 调用失败
	  return {
	    code: 1,
	    msg: '短信验证码发送失败'
	  }
	}
};
