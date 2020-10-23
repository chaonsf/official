<template>
    <div>
                        <Subhead :title="title3" class='ttwo'>
                                 <div class='subheadright'>
                                      <el-checkbox v-model="checked">设置法人为管理员</el-checkbox>
                                 </div>
                          </Subhead>
                          <template v-if='!checked'>
                                <el-form label-width="102px">
                                  <el-form-item label="管理员姓名:">
                                      <el-input v-model='form.adminName'></el-input>
                                  </el-form-item>  
                                   <el-form-item label="手机号:">
                                      <el-input v-model='form.adminPhone'></el-input>
                                   </el-form-item>
                                   <Verify :phone='form.adminPhone' ref='yanzheng' @codemsg='codemsg'></Verify>    
                                   <el-form-item label="身份证号:">
                                      <el-input v-model='form.adminIdCard'></el-input>
                                   </el-form-item> 
                                   <el-form-item class='float'>
                         <el-row>
                             <el-col :span='11'>
                      <el-upload :action="fronturl" class="idCardupload card " list-type="picture-card" :headers='header'
                        :on-success='idCardFrontSuccess3' :on-remove="removeFront3" :file-list='idcardfront'>
                               <span>上传身份证正面</span>
                       </el-upload>
                             </el-col>
                             <el-col :span='11' :offset='2'>
                       <el-upload :action="uploadUrl" class="idCardupload" :headers='header' list-type="picture-card"
                         :on-success='idCardBackSuccess3' :on-remove="removeBack3" :file-list='idcardback'>
                                   <span>上传身份证反面</span>
                       </el-upload>
                             </el-col>
                         </el-row>
                                   </el-form-item>                                                                                        
                                </el-form>                            
                          </template>
                         <el-form label-width="102px" class='mt30'>
                              <el-form-item label="登录密码:">
                                 <el-input v-model='form.pwd' type='password' show-password></el-input>
                              </el-form-item>     
                             <el-form-item label="重复密码:">
                                 <el-input v-model='form.repeatPwd' type='password' show-password></el-input>
                             </el-form-item>                                  
                        </el-form>
                        <div class='regist'>
                            <div>
                                 <span class='black'>认证公函(加盖彩色公章)：</span>
                                 <a href='' download>下载模板</a>
                            </div>
                        </div>
                        <el-form class='mt10' label-width="102px" >
                             <el-form-item>
                                    <el-upload :action="uploadUrl" class='business' :headers='header' :limit="1"
                                    :on-success='licensesuccessful2' :on-remove='removelicense2' :file-list='licensearr'>
                                        <el-button size='medium' type='info'>上传认证公函</el-button>
                                    </el-upload>
                             </el-form-item>
                        </el-form>
                              
    </div>
</template>
<script>

import Subhead from "@/components/settlentry/subhead"
import config from '@/config'
import Verify from "@/components/settlentry/verifity"
export default {
    components:{
        Subhead,Verify,
       },
       props:{
          boff:{
              default:false
          }
       },
        data(){
           return{
              title3:'03：管理员信息登记',
              checked:this.boff,
              uploadUrl:config.uploadUrl,
              fronturl:config.fronturl,
              header:config.header,
              idcardfront:[],
              idcardback:[],
              licensearr:[],
               form:{
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
        },
        methods:{
        idCardFrontSuccess3(res,file){
            //this.form.adminIdCardFront=file.response.data
          let {code,data,msg}=res
            if(code==200){
                if(data && data.num){
                   this.form.adminIdCardFront=file.response.data
                   this.form.adminIdCard=data.num
                }else{
                     this.form.adminIdCardFront=''
                     this.idcardfront=[];
                     this.$msg({msg:'请上传身份证正面'})
                }
            }else{
                this.$msg({msg})
            }
        },
        removeFront3(){
             this.form.adminIdCardFront=''
        },
        idCardBackSuccess3(res,file){
            this.form.adminIdCardBack=file.response.data
        },
        removeBack3(){
            this.form.adminIdCardBack=''
        },
        licensesuccessful2(res,file){
            this.form.certificationLetter=file.response.data
        },
        removelicense2(){
             this.form.certificationLetter=''
        },
        codemsg(code){
            this.form.adminCode=code
        },
        clear(){
            this.form={
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
            this.idcardfront=[]
             this.idcardback=[],
             this. licensearr=[]
             if(!this.checked){
               this.$refs.yanzheng.clear()
             }
         

        }
     }
}
</script>
<style lang="scss" scoped>
.mt30{
    margin-top: 30px;
}
.black{
    color: #fff;
}
.regist{
    color: #fff;
}
.mt10{
    margin-top: 10px;
}
</style>