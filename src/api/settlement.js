import request from '@/utils/request';

export const provinceAndcity=(data)=>request({  //获取省市区数据
    url: '/api/zone/children',
    method: 'GET',
    params:data
})

export const farmerEntry=(data)=>request({  //养殖户入驻
     url:'/api/mkxLocate/locate/indi-farmer',
     method:"post",
     params:data
})
export const farmEntry=(data)=>request({  //养殖场入驻
     url:'/api/mkxLocate/locate/farm',
     method:'post',
     params:data
})
export const feedEntry=(data)=>request({  //饲料生产机构入驻
     url:'/api/mkxLocate/locate/feed-provider',
     method:'post',
     params:data
})
export const vaccineEntry=(data)=>request({
       url:'/api/mkxLocate/locate/vaccine-provider',
       method:'post',
       params:data
})
export const veterinarianEntry=(data)=>request({
     url:'/api/mkxLocate/locate/veterinarian',
     method:'post',
     params:data
})
export const insuranceEntry=(data)=>request({
      url:'/api/mkxLocate/locate/insurance',
      method:'post',
      params:data
})
export const financeEntry=(data)=>request({
     url:'/api/mkxLocate/locate/finance',
     method:'post',
     params:data
})
export const govEntry=(data)=>request({
     url:'/api/mkxLocate/locate/gov',
     method:'post',
     params:data
})
export const newslist=(data)=>request({
     url:'/api/web/business-console',
     method:'get',
     params:data
})
export const newsdetail=(data)=>request({
     url:'/api/web/business-console/detail',
     method:'get',
     params:data
})