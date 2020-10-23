<template>
    <div class='finance'>
         <div class='content'>
              <Newhead></Newhead>
              <div class='second'>
                   <h5>金融机构入驻</h5>
                    <p class='smtitle'>Settlement of financial institutions</p>
                    <div class='entry'>
                          <Demo ref='demo'></Demo>
                                       <el-button @click='submit'>申请入驻 </el-button>
                    </div>
              </div>
         </div>
    </div>
</template>
<script>
import Newhead from '@/components/header/newhead'
import {removeStore} from "@/utils/storage"
import store from "@/store"
import Demo from "@/components/settlentry/government/demo"
import {financeEntry} from '@/api/settlement'
export default {
    components:{
         Newhead,Demo
    },
    created(){
         removeStore("menuid",'') 
          store.dispatch("CHECKTHEME","")
    },
    methods:{
        submit(){
            let form=this.$refs.demo.form;
            if(!form.name){
               this.$msg({msg:"请填写机构名称"});
                 return
            }else if(!form.adminName){
                this.$msg({msg:"请填写管理员姓名"});
                return
            }else if(!form.phone){
                 this.$msg({msg:"请填写手机号"});
                 return
            }else if(!form.code){
                this.$msg({msg:"请填写验证码"});
                return
            }else if(!form.pwd||!form.repeatPwd){
                  this.$msg({msg:"请填写密码"});
                  return
            }else if(form.pwd.length<4|| form.pwd.length>20){
                this.$msg({msg:'密码长度在 4 到 20 个字符之间'})
                return
            }else if(form.pwd!=form.repeatPwd){
                this.$msg({msg:"两次密码输入不一致"});
                return 
            }
            financeEntry(form).then(res=>{
                   let {code,msg}=res.data;
                   if(code==200){
                       this.$msg({
                            msg:"申请入驻成功",
                            type:'success'
                       })
                       this.clear()  
                   }
              })
        },
        clear(){
            this.$refs.demo.clear()
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../styles/base";
@import "../../styles/entry";
.finance{
  @extend .otherhtml;
    &::-webkit-scrollbar{
       display: none;
    }
    .content{
         @extend .width;
         .second{
             padding-top: 126px;
             h5{
                  @extend .h4
             }
             
         }
    }
}
</style>