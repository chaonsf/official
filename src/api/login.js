import request from '@/utils/request';


export const loginByuserName=(data)=>request({  //用户登录
    url: '/api/blade-auth/token',
    method: 'post',
    params:data
})
export const sendMsg=(data)=>request({  //获取验证码
     url:"/api/blade-auth/sms-code",
     method:'get',
     params:data
})
/* export const sendMsg=(data)=>request.get("/api/auth/sms-code",{
     params:data
}) */
export const loginByphone=(data)=>request({  //手机登录
     url:'',
     method:'post',
     params:data
})
export const forgetpass=(data)=>request({
       url:'/api/blade-auth/forget',
       method:'post',
       params:data
})