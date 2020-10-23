import {getStore} from "../../utils/storage"
import {removeToken} from "@/utils/token"
import Storage from '@/utils/storage2'
let storage = new Storage();
const state={
     menuId:getStore("menuid") || 1,
      //userinfo:getStore("ynyuserinfo") || '',
      userinfo:storage.getItem("ynyuserinfo") || ''
}
const getters={
    menuId:state=>state.menuId,
    userinfo:state=>state.userinfo
}
const actions={ 
    CHECKTHEME({commit},id){
          commit("SETMENUID",id)  
    },
    CHECKUSER({commit},userinfo){
         commit("SETUSER",userinfo)
    },
    REMOVEUSER({commit}){
        // removeStore("ynyuserinfo")
        storage.removeItem('ynyuserinfo')
         removeToken()
         commit("LOGOUT")
    }
}
const  mutations={
     SETMENUID(state,id){
          state.menuId=id;
     },
     SETUSER(state,info){
          state.userinfo=info
     },
     LOGOUT(state){
          state.userinfo=''
     }
}
export default{
     state,
     getters,
     actions,
     mutations
}