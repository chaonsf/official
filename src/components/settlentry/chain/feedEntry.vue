<template>
<div class="all">
     <div class='cont'>
            <Subhead :title="title1"></Subhead>
            <el-form  label-width="102px">
                 <el-form-item label="企业名称:" class='require'>
                     <el-input v-model='form.name'></el-input>
                 </el-form-item>
                 <el-form-item label="" class="desc">
                        <p>严格按照营业执照填写</p>
                  </el-form-item>
                 <el-form-item label="营业执照注册号:" class='require max'>
                     <el-input v-model='form.businessLicenseNo'></el-input>
                 </el-form-item>
                 <el-form-item label="" class="desc">
                        <p>请输入15位营业执照注册号或18位的统一社会信用代码</p>
                  </el-form-item> 
                 <el-form-item class='require'>
                       <el-upload :action="uploadUrl" class='business' :headers='header' :limit="1"
                           :on-success='businessuccessful' :on-remove='removebusiness'>
                             <el-button size='medium' type='info'>上传营业执照照片</el-button>
                      </el-upload>
                 </el-form-item>
                 <el-form-item>
                     <el-upload :action="uploadUrl" class='business' :headers='header' :limit="1"
                         :on-success='licensesuccessful' :on-remove='removelicense'>
                         <el-button size='medium' type='info'>上传生产资料许可证照片</el-button>
                     </el-upload>
                  </el-form-item>                                   
            </el-form>
            <div class='location'>
                 <div class="label">公司地址:</div>
                 <div class="san">
                    <Location ref='location5'></Location>
                    <el-input class="detail" placeholder="请输入详细地址" v-model='form.address'></el-input>
                 </div> 
            </div>
             <!-- 第二部分 -->
             <Legal ref='legal'></Legal>
            <!-- 第三部分 -->
            <Admin ref='admin'></Admin>
             <el-button @click='feedsubmit'>
                    申请入驻
              </el-button>
     </div>
</div>
</template>
<script>
import Subhead from "@/components/settlentry/subhead"
import config from '@/config'
import Location from '@/components/settlentry/location'
import Admin from '@/components/settlentry/chain/Admin'
import Legal from '@/components/settlentry/chain/Legal'
import{isMobile} from '@/utils/validate'
import {feedEntry} from '@/api/settlement'
export default {
    components:{
       Subhead,Location,Admin,Legal
    },
     data(){
         return{
             title1:'01:主体信息登记',
             uploadUrl:config.uploadUrl,
             header:config.header,
             form:{
               name:'',
               businessLicenseNo:"",
               businessLicenseUrl:'',
               licenseUrl:'',
               address:'',
             }
         }
     },
     methods:{
        businessuccessful(res,file){
             this.form.businessLicenseUrl=file.response.data
        },
        removebusiness(){
            this.form.businessLicenseUrl=''
        },
        licensesuccessful(res,file){
             this.form.licenseUrl=file.response.data
        },
        removelicense(){
             this.form.licenseUrl=''
        },

        feedsubmit(){
             let admin=this.$refs.admin
             let legal=this.$refs.legal
             let companyAdress=this.$refs.location5
             this.form=Object.assign({},this.form,legal.form,admin.form,{
                   province:parseInt(companyAdress.provinceId),
                   city:parseInt(companyAdress.cityId),
                   county:parseInt(companyAdress.countyId)
             });
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
                   this.$msg({msg:'请上传生产资料许可证'});
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
              feedEntry(this.form).then(res=>{
                   let {code,msg}=res.data;
                   if(code==200){
                       this.$msg({
                            message:'申请入驻成功',
                            type:'success'
                       })
                       this.$emit("dialogclose")
                       this.form={
                           name:'',
                           businessLicenseNo:"",
                           businessLicenseUrl:'',
                           licenseUrl:'',
                           address:'',
                       }
                       legal.form={
                          lpName:'',
                           phone:'',
                           idCard:'',
                          idCardFront:'',
                          idCardBack:'',
                          code:''
                       }
                       admin.form={
                          adminName:"",
                          adminPhone:"",
                          adminCode:"",
                           adminIdCard:'',
                         adminIdCardFront:'',
                       adminIdCardBack:'',
                        pwd:'',
                        repeatPwd:'',
                       certificationLetter:'',
                       }

                   }
              })
             
        }
     }
}
</script>
<style lang="scss" scoped>

</style>