<template>
    <div class='gov'>
         <div class='content'>
                <Newhead></Newhead>
                <div class='second'>
                     <h5>机构服务入驻</h5>
                     <p class='smtitle'>Institutional service settlement</p>
                     <div class='entry'>
                          <el-form label-width="102px" ref='form' :model="form" :rules='rules'>
                              <el-form-item label='机构全称:' prop='name'>
                                     <el-input v-model='form.name'></el-input>
                              </el-form-item>
                                  <el-form-item label="姓名:" prop='lpName'>
                                      <el-input v-model='form.lpName'></el-input>
                                  </el-form-item>
                                  <el-form-item label="职务:" prop='duty'>
                                      <el-input v-model='form.duty'></el-input>
                                  </el-form-item>  
                                   <el-form-item label="身份证号:" prop='idCard'>
                                      <el-input v-model='form.idCard'></el-input>
                                   </el-form-item>
                                   <el-form-item class='float'>
                         <el-row>
                             <el-col :span='11'>
                      <el-upload :action="fronturl" class="idCardupload card " list-type="picture-card" :headers='header'
                        :on-success='idCardFrontSuccess' :on-remove="removeFront" :file-list='idcardfront'>
                               <span>上传身份证正面</span>
                       </el-upload>
                             </el-col>
                             <el-col :span='11' :offset='2'>
                       <el-upload :action="uploadUrl" class="idCardupload" :headers='header' list-type="picture-card"
                         :on-success='idCardBackSuccess' :on-remove="removeBack" :file-list='idcardback'>
                                   <span>上传身份证反面</span>
                       </el-upload>
                             </el-col>
                         </el-row>
                                   </el-form-item>
                                   <el-form-item label="手机号:" prop='phone'>
                                      <el-input v-model='form.phone'></el-input>
                                   </el-form-item>
                                   <Verify :phone='form.phone'  @codemsg='codemsg' class='require' ref='yanzheng'></Verify>   
                                  <el-form-item  label="登录密码:" prop='pwd'>
                                          <el-input v-model='form.pwd' type='password' show-password></el-input>
                                  </el-form-item>
                                 <el-form-item label="重复密码:">
                                      <el-input v-model='form.repeatPwd' type='password' show-password></el-input>
                                 </el-form-item>  
                          </el-form>
                        <div class='regist'>
                            <div>
                                 <span class='black' style='color:#fff'>认证公函(加盖彩色公章)：</span>
                                 <a href='' download>下载模板</a>
                            </div>
                        </div>
                        <el-form class='mt10' label-width="102px" >
                             <el-form-item>
                                    <el-upload :action="uploadUrl" class='business' :headers='header' :limit="1"
                                    :on-success='licensesuccessful' :on-remove='removelicense' :file-list='licensearr'>
                                        <el-button size='medium' type='info'>上传认证公函</el-button>
                                    </el-upload>
                             </el-form-item>
                        </el-form>
                       <el-button @click='submit'>提交</el-button>
                     </div>
                </div>
         </div>
    </div>
</template>
<script>
import Newhead from '@/components/header/newhead'
import {removeStore} from "@/utils/storage"
import store from "@/store"
import config from '@/config'
import Verify from "@/components/settlentry/verifity"
import{cardid,isvalidatemobile,isMobile} from '@/utils/validate'
import {govEntry} from '@/api/settlement'
  const validatePhone = (rule, value, callback) => {
      if (isvalidatemobile(value)[0]) {
        callback(new Error(isvalidatemobile(value)[1]));
      } else {
        callback();
      }
    };
    const vaiidateCard=(rule, value, callback)=>{
         if(cardid(value)[0]){
             callback(new Error(cardid(value)[1]));
         }else{
             callback()
         }
    }
export default {
    components:{
        Newhead,Verify
    },
    data(){
        return{
            idcardfront:[],
            idcardback:[],
            licensearr:[],
              uploadUrl:config.uploadUrl,
              fronturl:config.fronturl,
              header:config.header,
               form:{
                 name:'',
                 duty:'',
                lpName:"",
                phone:"",
                code:"",
                pwd:'',
                repeatPwd:'',
                idCard:'',
                idCardFront:'',
                idCardBack:'',
               certificationLetter:'',
             },
             rules:{
                 name:[
                        { required: true, message: '请输入机构全称', trigger: 'blur' },
                       { min: 4, max: 25, message: '长度在 4 到 25 个字符', trigger: 'blur' }
                 ] ,
                 lpName:[
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                       { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                  ],
                  duty:[
                       { required: true, message: '请输入职务', trigger: 'blur' },
                       { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                  ],
                 idCard:[
                     { required: true, trigger: "blur", validator: vaiidateCard,message:"请输入正确的身份证号码" }
                 ],
                 pwd:[
                      { required: true, message: '请输入密码', trigger: 'blur' },
                       { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
                 ],
                 phone:[
                      { required: true, trigger: "blur", validator: validatePhone,message:"请输入手机号码" }
                 ],
             }
        }
    },
    methods:{
        idCardFrontSuccess(res,file){
          let {code,data,msg}=res
            if(code==200){
                if(data && data.num){
                   this.form.idCardFront=file.response.data
                }else{
                     this.form.idCardFront=''
                     this.idcardfront=[];
                     this.$msg({msg:'请上传身份证正面'})
                }
            }else{
                this.$msg({msg})
            }
        },
        removeFront(){
             this.form.idCardFront=''
        },
        idCardBackSuccess(res,file){
            this.form.idCardBack=file.response.data
        },
        removeBack(){
            this.form.idCardBack=''
        },
        codemsg(code){
            this.form.code=code
        },
        licensesuccessful(res,file){
            this.form.certificationLetter=file.response.data
        },
        removelicense(){
             this.form.certificationLetter=''
        },
        submit(){
            if(this.form.pwd != this.form.repeatPwd){
                this.$msg({
                    msg:'两次密码输入不一致'
                })
                return
            }else if(!this.form.code){
                 this.$msg({
                     msg:'请输入验证码'
                 })
            }
            this.$refs.form.validate((valid)=>{
                 if(valid){
                     this.showLoad();
                    govEntry(this.form).then(res=>{
                         this.hideLoad()
                         let {code}=res.data;
                         if(code==200){
                              this.$msg({
                                  msg:'入驻申请成功',
                                  type:'success'
                              })
                              this.clear()
                         }
                    })
                 }else{
                     this.$msg({msg:'请填写完整信息'})
                 }
            })
        },
        clear(){
            this.form={
                 name:'',
                 duty:'',
                lpName:"",
                phone:"",
                code:"",
                pwd:'',
                repeatPwd:'',
                idCard:'',
                idCardFront:'',
                idCardBack:'',
               certificationLetter:'',
            }
            this.$refs.yanzheng.clear()
            this.idcardfront=[]
            this.idcardback=[]
            this.licensearr=[]
        }
    }
}
</script>
<style lang="scss">
@import "../../styles/base";
@import "../../styles/entry";
.gov{
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