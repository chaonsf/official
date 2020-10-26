import Vue from 'vue'
import VueRouter from 'vue-router'
import { getScreen} from '../utils/admin'
const web=(name)=>()=>import(`../views/pc/${name}`)
const mobile=(name)=>()=>import(`../views/mobile/${name}`)
const width=getScreen()
const both=width==1?mobile:web
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

export const constantRoutes=[
      {
         path:'/',
        component:both('index')
      },
      {
        path:"/insurance",
        component:both('insurance'),
      },
      {
        path:"/material",
        meta:{
           title:'农资'
        },
        component:both('material')
      },
      {
        path:"/finance",
        meta:{
          title:"金融"
        },
        component:both('finance')
      },
      {
        path:'/policy',
        component:both('policy')
      },
      {
         path:'/equipment',
         meta:{
           title:'终端设备'
         },
         component:()=>import('../views/pc/equipment.vue')
      },
      {
        path:'/equipment/:id',
        meta:{
          title:'终端设备'
        },
        component:()=>import('../views/pc/equipment.vue')
      },
      {
        path:'/about',
        component:both('about')
      },
      {
        path:'/hybrid',  //供安卓使用
        component:()=>import('../views/hybrid/index')
      },
      {
        path:'/platform',
        meta:{
          title:'平台'
        },
        component:both('base')
      },
      {
        path:'/basentry',
        meta:{
           title:'基地入驻'
        },
        component:()=>import('../views/newentry/baseentry')
      },
      {
          path:'/platform/:id',
          component:()=>import('../views/pc/detail.vue')
      },
      {
        path:'/insurancentry',
        meta:{
           title:'保险入驻',
        },
        component:()=>import('../views/newentry/insurance')
      },
      {
        path:'/people',
        meta:{
          title:'个人养殖户'
        },
        component:()=>import('../views/newentry/people')
      },
      {
        path:'/farm',
        meta:{
          title:'养殖场'
        },
        component:()=>import('../views/newentry/farm')
      },
      {
        path:'/financentry',
        meta:{
          title:'金融入驻',
        },
        component:()=>import('../views/newentry/finance')
      },
      {
        path:'/agricultural',
        meta:{
          title:'农资服务入驻',
        },
        component:()=>import('../views/newentry/agricultural')
      },
      {
        path:'/feed',
        meta:{
          title:'饲料企业入驻'
        },
        component:()=>import('../views/newentry/feed')
      },
      {
        path:'/vaccine',
        meta:{
          title:'疫苗企业入驻'
        },
        component:()=>import('../views/newentry/vaccines')
      },
      {
        path:'/veterinary',
        meta:{
          title:'兽医企业入驻'
        },
        component:()=>import('../views/newentry/veterinary')
      },
      {
        path:'/gov',
        meta:{
           title:'政府机构'
        },
        component:()=>import('../views/newentry/gov')
      },
      {
        path:'/news/:id',
        component:()=>import('../views/mobile/news')
      },
      {
        path:'/mobiequip',
        component:()=>import('../views/mobile/equipment.vue')
      },
      {
        path:'/mobiequip/:id',
        component:()=>import('../views/mobile/equipment.vue')
      },
      {
        path:'/video',
        meta:{
            title:'九宫格摄像监控'
        },
        component:()=>import('../views/multi/index')
      },
      {
         path:'/trace/:id',
         meta:{
            title:'溯源',
         },
         component:()=>import('../views/multi/trace.vue')
      }
]

const router = new VueRouter({
    routes:constantRoutes
  })
  
  export default router