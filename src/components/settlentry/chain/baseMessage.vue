<template>
    <div>
       <Subhead :title="title"></Subhead>
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
                       <el-upload :action="businessLicense" class='business' :headers='header' :limit="1"
                           :on-success='businessuccessful' :on-remove='removebusiness' :file-list='salearr'>
                             <el-button size='medium' type='info'>上传营业执照照片</el-button>
                      </el-upload>
                 </el-form-item>
                 <el-form-item>
                     <el-upload :action="uploadUrl" class='business' :headers='header' :limit="1"
                         :on-success='licensesuccessful' :on-remove='removelicense' :file-list='licensearr'>
                         <el-button size='medium' type='info'>{{licensename}}</el-button>
                     </el-upload>
                  </el-form-item>                                
            </el-form>
    </div>
</template>
<script>
import Subhead from "@/components/settlentry/subhead"
import config from '@/config'
export default {
     props:['licensename'],
     components:{
          Subhead
     },
     data(){
         return{
             title:"01：主体信息登记",
             uploadUrl:config.uploadUrl,
             businessLicense:config.businessLicense,
             header:config.header,
             licensearr:[],
             salearr:[],
             form:{
               name:'',
               businessLicenseNo:"",
               businessLicenseUrl:'',
               licenseUrl:'',
             }
         }
     },
     methods:{
        businessuccessful(res,file){
              let {code,data,msg}=res
            if(code==200){
                if(data.success && data.reg_num){
                   this.form.businessLicenseUrl=file.response.data
                   this.form.businessLicenseNo=data.reg_num
                }else{
                     this.form.businessLicenseUrl=''
                     this.salearr=[];
                     this.$msg({msg:'请上传正确的营业执照'})
                }
            }else{
                this.$msg({msg})
            }
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
        clear(){
            this.form={
               name:'',
               businessLicenseNo:"",
               businessLicenseUrl:'',
               licenseUrl:'',
            }
            this.licensearr=[]
            this.salearr=[]
        }
     }
}
</script>
<style lang="scss">
@import "../../../styles/entry";
</style>