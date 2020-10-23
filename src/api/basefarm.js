import request from '@/utils/request';

export const lineChart=(data)=>request({
     url:'/api/web/farm/statistics-line-chart',
     method:'get',
     params:data
})
export const tableChart=(data)=>request({
     url:'/api/web/farm',
     method:'get',
     params:data
})
export const baiduMaps=(data)=>request({
      url:'/api/web/farm/map',
      method:'get',
      params:data
})
export const detail=(data)=>request({
     url:`/api/web/farm/${data}`,
     method:'get',
     params:{}
})
export const zone=(data)=>request({  //有权限获取省市区数据
     url: '/api/zone',
     method: 'GET',
     params:data
 })
 export const provinceAndcity=(data)=>request({  //不需要权限获取省市区数据
      url: '/api/zone/children',
      method: 'GET',
      params:data
  })
