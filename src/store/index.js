import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import HeadMenu from './modules/headerMenu'

const store=new Vuex.Store({
     modules:{
         HeadMenu
     }
     
})

export default store