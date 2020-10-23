<template>
    <div>
                                <el-form label-width="102px">
                                  <el-form-item label="机构全称:" class='require'>
                                      <el-input v-model='form.name'></el-input>
                                  </el-form-item>  
                                  <el-form-item label="管理员姓名:" class='require'>
                                      <el-input v-model='form.adminName'></el-input>
                                  </el-form-item>  
                                   <el-form-item label="手机号:" class='require'>
                                      <el-input v-model='form.phone'></el-input>
                                   </el-form-item>
                                   <Verify :phone='form.phone'  @codemsg='codemsg' class='require' ref='yanzheng'></Verify>                                                                                             
                                </el-form>                       
                         <el-form label-width="102px" class='mt30'>
                              <el-form-item label="登录密码:" class='require'>
                                 <el-input v-model='form.pwd' type='password'></el-input>
                              </el-form-item>     
                             <el-form-item label="重复密码:" class='require'>
                                 <el-input v-model='form.repeatPwd' type='password'></el-input>
                             </el-form-item>                                  
                        </el-form>
<!--                         <div class='regist'>
                            <div>
                                 <span class='black'>认证公函(加盖彩色公章)：</span>
                                 <a href='' download>下载模板</a>
                            </div>
                        </div>
                        <el-form class='mt10' label-width="102px" >
                             <el-form-item>
                                    <el-upload :action="uploadUrl" class='business' :headers='header' :limit="1"
                                    :on-success='licensesuccessful2' :on-remove='removelicense2'>
                                        <el-button size='medium' type='info'>上传认证公函</el-button>
                                    </el-upload>
                             </el-form-item>
                        </el-form>         -->
    </div>
</template>
<script>
import config from '@/config'
import Verify from "@/components/settlentry/verifity"
export default {
    components:{
        Verify,
       },
        data(){
           return{
              title3:'03：管理员信息登记',
              checked:false,
              uploadUrl:config.uploadUrl,
              header:config.header,
               form:{
                 name:'',
                adminName:"",
                phone:"",
                code:"",
                pwd:'',
                repeatPwd:'',
               // certificationLetter:'',

             }
           } 
        },
        methods:{
        codemsg(code){
            this.form.code=code
        },
        clear(){
            this.form={
                name:'',
                adminName:"",
                phone:"",
                code:"",
                pwd:'',
                repeatPwd:'',
            }
            this.$refs.yanzheng.clear()
        }
     /*    licensesuccessful2(res,file){
           this.form.certificationLetter=file.response.data
        },
        removelicense2(){
             this.form.certificationLetter=''
        } */
     }
}
</script>
<style lang="scss">
@import "../../../styles/entry";

</style>