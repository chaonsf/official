import request from '@/utils/request';

export const statistics=(data)=>request({
    url:'/api/web/poverty/statistics',
    method:'get',
    params:data
})