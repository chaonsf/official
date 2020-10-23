<template>
    <div>
            <Subhead :title="title2" class='ttwo'></Subhead>
            <el-form label-width="102px">
                 <el-form-item label="法人姓名:" class='require'>
                     <el-input v-model='form.lpName'></el-input>
                 </el-form-item>
                               <el-form-item label="手机号:" >
                                    <el-input v-model='form.phone'></el-input>
                               </el-form-item>
                               <Verify :phone='form.phone'   @codemsg='codemsg' ref='yanzheng'></Verify>
                                   <el-form-item label="身份证号:">
                                      <el-input v-model='form.idCard'></el-input>
                                   </el-form-item>
                                <el-form-item class='float'>
                        <el-row>
                            <el-col :span='11'>
                      <el-upload :action="fronturl" class="idCardupload card" list-type="picture-card" :headers='header'
                        :on-success='idCardFrontSuccess2' :on-remove="removeFront2" :limit="1" :file-list='idcardfront'>
                               <span>上传身份证正面</span>
                       </el-upload>
                            </el-col>
                            <el-col :span='11' :offset='2'>
                       <el-upload :action="uploadUrl" class="idCardupload" :headers='header' list-type="picture-card"
                         :on-success='idCardBackSuccess2' :on-remove="removeBack2" :limit="1" :file-list='idcardback'>
                                   <span>上传身份证反面</span>
                       </el-upload>
                            </el-col>
                        </el-row>

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
        Subhead,Verify
    },
    data(){
        return{
            title2:'02:法人信息登记',
            uploadUrl:config.uploadUrl,
            fronturl:'/api/alioss/idcard-upload',
            header:config.header,
            idcardfront:[],
            idcardback:[],
            form:{
              lpName:'',
               phone:'',
               idCard:'',
               idCardFront:'',
               idCardBack:'',
               code:''
            }
        }
    },
    methods:{
        idCardFrontSuccess2(res,file){
          // this.form.idCardFront=file.response.data
          let {code,data,msg}=res
            if(code==200){
                if(data && data.num){
                   this.form.idCardFront=file.response.data
                   this.form.idCard=data.num
                }else{
                     this.form.idCardFront=''
                     this.idcardfront=[];
                     this.$msg({msg:'请上传身份证正面'})
                }
            }else{
                this.$msg({msg})
            }
        },
       removeFront2(){
            this.form.idCardFront=""
        },
        idCardBackSuccess2(res,file){
            this.form.idCardBack=file.response.data
        },
        removeBack2(){
            this.form.idCardBack=''
        },
         codemsg(code){
             this.form.code=code
         },
         clear(){
            this.form={
               lpName:'',
               phone:'',
               idCard:'',
               idCardFront:'',
               idCardBack:'',
               code:''
            }
            this.idcardfront=[]
            this.idcardback=[]
            this.$refs.yanzheng.clear()
         }
    }

    
}
</script>
<style lang="scss" scoped>

</style>