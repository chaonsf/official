
import request from '@/utils/request';
import qs from 'qs'

export const testData=(data)=>request({
    url:`/api/web/env/monitor`,
    method:'get',
    params:data
})
export const cameraslist=(data)=>request({
    url:`/api/web/gov/cameras/${data}`,
    method:'get',
    params:{}
})
export const getToken = () => {
    return request({
      url: '/ys7/lapp/token/get',
      method: 'post',
      params: {
        appKey: "1ea8a5815b1b4e86b6ae33123b893b77",
        appSecret: "d38c5fcdd75f20204a011dd714e48f8d",
      }
    })
  }
export const huourl=(data)=>request({
    url:'/ys7/lapp/live/address/limited',
    method:'post',
    data:qs.stringify(data)
})