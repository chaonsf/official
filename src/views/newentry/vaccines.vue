<template>
    <div class='feed'>
        <div class='content'>
            <Newhead></Newhead>
            <div class='second'>
                  <h5>疫苗企业入驻</h5>
                  <p class='smtitle'>Settlement of vaccine enterprises</p>
                  <div class='entry'>
                       <BaseMessage :licensename='licensename' ref='base'></BaseMessage>
                        <el-form label-width="102px">
                            <el-form-item label='公司地址:'>
                                    <Location ref='location'></Location>
                                    <el-input class="detail mt30" placeholder="请输入详细地址" v-model='form.address'></el-input>
                            </el-form-item>
                        </el-form>
                         <Legal ref='legal'></Legal>
                         <Admin ref='admin'></Admin>
                                      <el-button @click='submit'>申请入驻</el-button>
                  </div>
            </div>
        </div>
    </div>
</template>
<script>
import Newhead from '@/components/header/newhead'
import {removeStore} from "@/utils/storage"
import store from "@/store"
import Location from '@/components/settlentry/location'
import Legal from '@/components/settlentry/chain/Legal'
import Admin from '@/components/settlentry/chain/Admin'
import BaseMessage from "@/components/settlentry/chain/baseMessage"
import{isMobile} from '@/utils/validate'
import {vaccineEntry} from '@/api/settlement'
export default {
    components:{
        Newhead,BaseMessage,Location,Legal,Admin
    },
    data(){
        return{
             licensename:'上传动物诊疗许可证照片',
            form:{
                 address:'',
            }
        }
    },
    created(){
         removeStore("menuid",'') 
          store.dispatch("CHECKTHEME","")
    },
    methods:{
        submit(){
             let base=this.$refs.base;
             let companyAdress=this.$refs.location
             let legal=this.$refs.legal
             let admin=this.$refs.admin
             this.form=Object.assign({},this.form,legal.form,admin.form,base.form,{
                   province:parseInt(companyAdress.provinceId),
                   city:parseInt(companyAdress.cityId),
                   county:parseInt(companyAdress.countyId)
             })
              let checked=admin.checked;
              if(checked){
                 this.form=Object.assign({},this.form,{
                        adminName:legal.lpName,
                        adminPhone:legal.phone,
                        adminCode:legal.code,
                        adminIdCard:legal.idCard,
                         adminIdCardFront:legal.idCardFront,
                         adminIdCardBack:legal.idCardBack
                 })
              }
              //判断值是否为空
              if(!this.form.name){
                  this.$msg({msg:"请填写企业名称"});
                  return
              }else if(!this.form.businessLicenseNo){
                   this.$msg({msg:'请填写营业执照注册号'});
                   return
              }else if(!this.form.businessLicenseUrl){
                   this.$msg({msg:'请上传营业执照'});
                   return
              }else if(!this.form.licenseUrl){
                   this.$msg({msg:'请上传疫苗经营许可证'});
                   return
              }else if(!this.form.address){
                   this.$msg({msg:"请填写公司地址"});
                   return
              }else if(!this.form.lpName){
                   this.$msg({msg:'请填写法人姓名'});
                   return;
              }else if(!this.form.idCard){
                   this.$msg({msg:'请填写法人身份证号'});
                   return
              }else if(!this.form.phone){
                   this.$msg({msg:'请填写手机号'});
                   return;
              }else if(!this.form.code){
                    this.$msg({msg:'请填写验证码'});
                    return
              }else if(!this.form.idCardFront){
                   this.$msg({msg:'请上传法人身份证正面'})
                   return 
              }else if(!this.form.idCardBack){
                   this.$msg({msg:'请上传法人身份证反面'})
                   return
              }else if(this.form.pwd){
                   if(this.form.pwd.length<4 || this.form.length>20){
                         this.$msg({msg:'密码长度在 4 到 20 个字符之间'})
                         return
                   }
                   if(this.form.pwd!=this.form.repeatPwd){
                        this.$msg({msg:'两次密码输入不一致'})
                        return
                   }
              }
             vaccineEntry(this.form).then(res=>{
                   let {code,msg}=res.data;
                   if(code==200){
                       this.$msg({
                            msg:'申请入驻成功',
                            type:'success'
                       })
                      this.clear()
                       
                   }
              })
        },
        clear(){
            this.form={
                 address:'',
            }
            this.$refs.base.clear()
            this.$refs.location.clear()
            this.$refs.legal.clear()
            this.$refs.admin.clear()

        }
    }
}
</script>
<style lang="scss">
@import "../../styles/base";
@import "../../styles/entry";
.feed{
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