import axios from 'axios'
import {getToken} from '@/utils/token'
import { Message} from 'element-ui'
import {Base64} from 'js-base64';
import website from '@/config'
import {serialize} from './commom'


axios.defaults.withCredentials = true;

axios.interceptors.request.use(config=>{
    const meta = (config.meta || {});
    const isToken = meta.isToken === false;
    config.headers['Authorization'] = `Basic ${Base64.encode(`${website.clientId}:${website.clientSecret}`)}`;
    if (getToken() && !isToken){
        config.headers['Blade-Auth'] ='bearer '+ getToken();
    }
    if (config.method === 'post' && meta.isSerialize === true) {
        config.data = serialize(config.data);
      }
    return config
},err=>{
    return Promise.reject(err)
})
axios.interceptors.response.use(res=>{
     if(res.data.code&&res.data.code !=200){
           Message({
              message: res.data.msg,
              type: 'error',
              duration:2000
           })
     }
     return res
},(err)=>{
    Message({
        message: err.message,
        type: 'error',
        duration:2000
      });
    //响应数据错误
   return Promise.reject(err) 
})
export default axios