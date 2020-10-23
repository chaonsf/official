import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI, { Loading } from 'element-ui';
import VCharts from 'v-charts'
import BaiduMap from 'vue-baidu-map'
import 'element-ui/lib/theme-chalk/index.css';
import Vant from 'vant';
import 'vant/lib/index.css';
import '@/styles/index.scss'
import 'lib-flexible'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(ElementUI);
Vue.use(VueQuillEditor, /* { default global options } */)
Vue.use(VCharts)
Vue.use(Vant)
Vue.use(BaiduMap,{
  ak:'MadA7qq4Ye1LPxNyc2prRDsaHIcacCld'
})

Vue.prototype.$load='';
Vue.prototype.showLoad=()=>{
  Vue.prototype.$load=Loading.service({
     title:"拼命加载中。。。"
  })
  setTimeout(() => {
     if(Vue.prototype.$load){
        Vue.prototype.$load.close()
     }
  }, 6000);
}
Vue.prototype.hideLoad=()=>{
  if(Vue.prototype.$load){
     Vue.prototype.$load.close()
  }
 
}
Vue.prototype.$msg=(obj)=>{
   Vue.prototype.$message({
       message:obj.msg,
       type:obj.type?obj.type:'error',
        duration:2000
    })
}
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
