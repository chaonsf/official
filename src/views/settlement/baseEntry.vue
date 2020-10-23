<template>
    <div class="baseEntry">
           <Basehead :show="false"></Basehead>
           <div class="content">
                 <h5>请选择入驻类型</h5>
                 <div class="select">
                       <ul>
                           <li>
                               <div class="img img1"></div>
                               <p>个人养殖户</p>
                               <el-button @click="farmer">申请入驻</el-button>
                           </li>
                           <li>
                                <div class='img img2'></div>
                               <p>养殖场地</p>
                               <el-button @click="farm">申请入驻</el-button>
                           </li>
                       </ul>
                 </div>
           </div>
           <Foot></Foot>
           <el-dialog title="养殖户入驻"  :visible.sync="box1" class="entryDialog" width="800px" :closeOnClickModal='false'>
               <div class='all'>
                   <div class='cont'>
               <Subhead :title="title1"></Subhead>
                 <el-form label-width="102px" ref='form1' :model="form1" :rules='rules1'>
                       <el-form-item label="姓名:" prop='name'>
                          <el-input v-model='form1.name'></el-input>
                       </el-form-item>
                      <el-form-item label="手机号码:" prop='phone'>
                          <el-input v-model='form1.phone'></el-input>
                       </el-form-item>
                       <Verify :phone='this.form1.phone' ref='phonecode' class='require'></Verify>
                        <el-form-item label="身份证号:" prop='idCard'>
                          <el-input v-model='form1.idCard'></el-input>
                       </el-form-item>
                 </el-form>
                 <div class="float">
                      <el-upload :action="uploadUrl" class="idCardupload card left" list-type="picture-card" :headers='header'
                        :on-success='idCardFrontSuccess' :on-remove="removeFront">
                               <span>上传身份证正面</span>
                       </el-upload>
                       <el-upload :action="uploadUrl" class="idCardupload left" :headers='header' list-type="picture-card"
                         :on-success='idCardBackSuccess' :on-remove="removeBack">
                                   <span>上传身份证反面</span>
                       </el-upload>
                 </div>
                <div class="location">
                    <div class="label">家庭住址:</div>
                     <div class="san">
                     <Location ref='location1'></Location>
                    <el-input class="detail" placeholder="请输入详细地址" v-model='form1.homeAddress'></el-input>
                     </div>
                    <div class="label">养殖住址:</div>
                     <div class="san">
                    <Location ref='location2'></Location>
                    <el-input class="detail" placeholder="请输入详细地址" v-model='form1.farmAddress'></el-input>
                     </div>
                     <div class="label2">开始养殖年份:</div>
                     <div class="san">
                          <el-date-picker  type="year" placeholder="选择年" v-model='form1.beginYear'  value-format="yyyy"  :picker-options='endtime'>
                          </el-date-picker>
                     </div>
                     <div class="mt10 fl">
                         <!-- 照片墙 -->
                         <span class="label2">上传基地照片：</span>
                         <el-upload :action="uploadUrl" list-type="picture-card" class="img"  :headers='header'
                         :on-preview="handlePictureCardPreview"   :file-list="form1.photos" :on-success='successupload'
                          :on-remove="handleRemove">
                             <i class="el-icon-plus"></i>
                         </el-upload>
                         <el-dialog :visible.sync="dialogVisible">
                                 <img width="100%" :src="dialogImageUrl" alt="">
                         </el-dialog>
                     </div>
                     <Subhead :title="title4" class='mt30'></Subhead>
                         <el-form label-width="102px" class='mt30' :rules='rules1'>
                              <el-form-item label="登录密码:" prop='pwd'>
                                 <el-input v-model='form1.pwd' type='password' minlength='4' maxlength='20'></el-input>
                              </el-form-item>     
                             <el-form-item label="重复密码:">
                                 <el-input v-model='form1.repeatPwd' type='password'></el-input>
                             </el-form-item>                                  
                        </el-form>
                     <el-button @click='people'>
                          申请入驻
                     </el-button>
                </div>
                   </div>
               </div>

           </el-dialog>
            <el-dialog title="养殖场入驻"  :visible.sync="box2" class="entryDialog" width="800px" :closeOnClickModal='false' :destroy-on-close='true'>
                <div class="all">
                     <!--  <Steps></Steps> -->
                    <div class="cont">
                         <Subhead :title="title1"></Subhead>
                         <el-form label-width="102px">
                               <el-form-item label="企业类型:" class='require'>
                                       <el-radio-group v-model="form2.type">
                                             <el-radio :label="2">企业</el-radio>
                                              <el-radio :label="3">个体工商户</el-radio>
                                       </el-radio-group>
                               </el-form-item>
                               <el-form-item label="企业名称:" class='require'>
                                    <el-input v-model='form2.name'></el-input>
                               </el-form-item>
                               <el-form-item label="" class="desc">
                                      <p>严格按照营业执照填写。如个体工商户营业执照无企业名称时(包括**,“无字号"或者空等情况，请以“个体户+经营者姓名”的形式填写。如：个体户+张三)</p>
                               </el-form-item>
                               <el-form-item label="营业执照注册号:" class='require max'>
                                   <el-input v-model='form2.businessLicenseNo'></el-input>
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
                                        <el-button size='medium' type='info'>动物防疫条件合格证</el-button>
                                    </el-upload>
                               </el-form-item>
                         </el-form>
                         <div class='location'>
                                <div class="label">养殖基地:</div>
                              <div class="san">
                                  <Location ref='location3'></Location>
                              <el-input class="detail" placeholder="请输入详细地址" v-model='form2.address'></el-input>
                               </div> 
                     <div class="label2">开始养殖年份:</div>
                     <div class="san">
                          <el-date-picker  type="year" placeholder="选择年" v-model='form2.beginYear'  value-format="yyyy" :picker-options='endtime'>
                          </el-date-picker>
                     </div>
                     <div class="mt10 fl">
                         <!-- 照片墙 -->
                         <span class="label2">上传养殖基地照片：</span>
                         <el-upload :action="uploadUrl" list-type="picture-card" class="img"  :headers='header'
                         :on-preview="handlePictureCardPreview2"    :on-success='successupload2'
                          :on-remove="handleRemove2">
                             <i class="el-icon-plus"></i>
                         </el-upload>
                         <el-dialog :visible.sync="dialogVisible2">
                                 <img width="100%" :src="dialogImageUrl2" alt="">
                         </el-dialog>
                     </div>                           
                         </div>
                         <!-- 第二部分 -->
                          <Subhead :title="title2" class='ttwo'></Subhead>
                          <el-form label-width="102px">
                               <el-form-item label="法人姓名:" class='require'>
                                    <el-input v-model='form2.lpName'></el-input>
                               </el-form-item>        
                               <el-form-item label="手机号:" class='require'>
                                    <el-input v-model='form2.phone' type='number'></el-input>
                               </el-form-item>
                                <Verify :phone='form2.phone' ref='phonecode2' class='require'></Verify>
                                 <el-form-item label="身份证号:" class='require'>
                                    <el-input v-model='form2.idCard'></el-input>
                                </el-form-item>                                                                                                 
                          </el-form>
                     <div class="float">
                      <el-upload :action="uploadUrl" class="idCardupload card left" list-type="picture-card" :headers='header'
                        :on-success='idCardFrontSuccess2' :on-remove="removeFront2">
                               <span>上传身份证正面</span>
                       </el-upload>
                       <el-upload :action="uploadUrl" class="idCardupload left" :headers='header' list-type="picture-card"
                         :on-success='idCardBackSuccess2' :on-remove="removeBack2">
                                   <span>上传身份证反面</span>
                       </el-upload>
                    </div>
                        <div class='location'>
                          <div class="label">家庭住址:</div>
                          <div class="san">
                           <Location ref='location4'></Location>
                            <el-input class="detail" placeholder="请输入详细地址" v-model='form2.homeAddress'></el-input>
                          </div>                           
                        </div> 
                        <!-- 第三部分 -->
                           <Subhead :title="title3" class='ttwo'>
                                 <div class='subheadright'>
                                      <el-checkbox v-model="checked">设置法人为管理员</el-checkbox>
                                 </div>
                          </Subhead>
                          <template v-if='!checked'>
                                <el-form label-width="102px">
                                  <el-form-item label="管理员姓名:">
                                      <el-input v-model='form2.adminName'></el-input>
                                  </el-form-item>  
                                   <el-form-item label="手机号:">
                                      <el-input v-model='form2.adminPhone' type='number'></el-input>
                                   </el-form-item>
                                   <Verify :phone='form2.adminPhone' ref='phonecode3'></Verify>    
                                   <el-form-item label="身份证号:">
                                      <el-input v-model='form2.adminIdCard'></el-input>
                                   </el-form-item>                                                                                             
                                </el-form>
                     <div class="float">
                      <el-upload :action="uploadUrl" class="idCardupload card left" list-type="picture-card" :headers='header'
                        :on-success='idCardFrontSuccess3' :on-remove="removeFront3">
                               <span>上传身份证正面</span>
                       </el-upload>
                       <el-upload :action="uploadUrl" class="idCardupload left" :headers='header' list-type="picture-card"
                         :on-success='idCardBackSuccess3' :on-remove="removeBack3">
                                   <span>上传身份证反面</span>
                       </el-upload>
                    </div>                               
                          </template>
                         <el-form label-width="102px" class='mt30'>
                              <el-form-item label="登录密码:" prop='pwd'>
                                 <el-input v-model='form2.pwd' type='password' minlength='4' maxlength='20'></el-input>
                              </el-form-item>     
                             <el-form-item label="重复密码:">
                                 <el-input v-model='form2.repeatPwd' type='password'></el-input>
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
                                    :on-success='licensesuccessful2' :on-remove='removelicense2'>
                                        <el-button size='medium' type='info'>上传认证公函</el-button>
                                    </el-upload>
                             </el-form-item>
                        </el-form>
                     <el-button @click='farmsubmit'>
                          申请入驻
                     </el-button>
                    </div>
                </div>
            </el-dialog>
    </div>
</template>
<script> 
import Basehead from "@/components/settlentry/baseHead"
import Foot from '@/components/footer'
/* import Steps from '@/components/settlentry/step' */
import Subhead from "@/components/settlentry/subhead"
import Location from '@/components/settlentry/location'
import Verify from "@/components/settlentry/verifity"
import {getToken} from "@/utils/token"
import {farmerEntry,farmEntry} from "@/api/settlement"
import{cardid,isvalidatemobile,isMobile} from '@/utils/validate'
export default {
     data(){
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
    const endtime=()=>{
            return {
                disabledDate(time){
                    return time.getTime() > Date.now() - 8.64e7 
                }
            }
    }
         return{
             box1:false,
             dialogVisible:false,
             uploadUrl:'/api/alioss/imgupload',
             header:{
                'Blade-Auth':'bearer '+ getToken()
             },
             rules1:{
                 name:[
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                       { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                 ] ,
                 phone:[
                      { required: true, trigger: "blur", validator: validatePhone,message:"请输入手机号码" }
                 ],
                 idCard:[
                     { required: true, trigger: "blur", validator: vaiidateCard,message:"请输入正确的身份证号码" }
                 ],
             },
             endtime:endtime(),
             photos:[], 
             form1:{
                name:'',
                phone:'',
                homeAddress:'',
                farmAddress:'',
                beginYear:'',
                idCardFront:'',//身份证正面
                idCardBack:'', 
                homeProvince:'',
                homeCity:'',
                homeCounty:'',
                province:'',//养殖地址省
                city:"",
                county:'',
                pwd:'',
                repeatPwd:'',
             },
             dialogImageUrl:'',//点击查看图片
             /* 弹窗2 */
             box2:false,
             title1:'01:主体信息登记',
             title2:'02:法人信息登记',
             title3:"03:管理员信息登记",
             title4:"02:管理员信息登记",
             photos2:[],
              dialogImageUrl2:'',
              dialogVisible2:false,
              checked:true,// 设置法人为管理员
             form2:{
                type:'',
                name:"",
                businessLicenseNo:'',
                businessLicenseUrl:'',
                licenseUrl:'',
                address:"",
                beginYear:'',
                lpName:'',
                phone:'',
                idCard:"",
                idCardFront:'',
                idCardBack:"",
                homeAddress:"",
                adminName:"",
                adminPhone:"",
                adminCode:"",
                adminIdCard:'',
                adminIdCardFront:'',
                adminIdCardBack:'',
                pwd:'',
                repeatPwd:'',
                certificationLetter:''
             },
         }
     },
     components:{
         Basehead,Foot,Subhead,Location,
         Verify
     },
     methods:{
         farmer(){  //养殖户入驻
            this.box1=true
         },
         farm(){  //养殖场入驻
             this.box2=true
         },
         people(){ //养殖户入驻
            let home=this.$refs.location1
            let farmer=this.$refs.location2
            let phonecode=this.$refs.phonecode
            this.form1=Object.assign({},this.form1,{
                  homeProvince:parseInt(home.provinceId),
                   homeCity:parseInt(home.cityId),
                   homeCounty:parseInt(home.countyId),
                   province:parseInt(farmer.provinceId),
                    city:parseInt(farmer.cityId),
                    county:parseInt(farmer.countyId),
                    photos:this.photos,
                    code:phonecode.code
            })
             if(!this.form1.code){
                 this.$msg({msg:"请输入验证码"})
                 return
             }else
             if(!this.form1.idCardFront){
                 this.$msg({msg:'请上传身份证正面'})
                 return
             }else if(!this.form1.idCardBack){
                 this.$msg({msg:'请上传身份证反面'})
                 return
             }else  if(! this.form1.beginYear){
                  this.$msg({msg:'请输入开始养殖年份'})
                  return
             }else if(this.form1.pwd && this.form1.pwd !=this.form1.repeatPwd){
                  this.$msg({msg:'两次密码输入不一致'})
                  return 
             }else if(this.form1.pwd){
                  if(this.form1.length<4 || this.form1.length>20){
                       this.$msg({msg:'密码长度在 4 到 20 个字符之间'})
                       return
                  }
             }
             this.form1.photos=JSON.stringify(this.form1.photos)
             this.$refs.form1.validate((valid)=>{
                  if(valid){
                     this.showLoad();
                    farmerEntry(this.form1).then(res=>{
                           this.hideLoad()
                          let {code,data}=res.data;
                          if(code==200){
                              this.$msg({
                                  msg:'入驻申请成功',
                                  type:'success'
                              })
                              this.box1=false;
                              this.form1={
                                     name:'',
                                     phone:'',
                                     homeAddress:'',
                                     farmAddress:'',
                                     beginYear:'',
                                     idCardFront:'',//身份证正面
                                     idCardBack:'', 
                                     homeProvince:'',
                                     homeCity:'',
                                     homeCounty:'',
                                     province:'',//养殖地址省
                                     city:"",
                                     county:'',
                                      pwd:'',
                                     repeatPwd:'',
                              }
                              phonecode.code='',
                              this.photos=[];
                             
                          }
                    })                       
                  }else{
                      this.$msg({msg:"请填写完必填信息在提交"})
                  }
             })

         },
         handlePictureCardPreview(file){
                        this.dialogImageUrl = file.url;
                       this.dialogVisible = true;
         },
         handleRemove(file,filelist){  //个人养殖户删除基地照片
             this.photos=[]
             for(let i=0;i<filelist.length;i++){
                  this.photos.push(filelist[i].response.data)
              }
         },
         successupload(res,file,fileList){  //个人养殖户上传成功得基地照片
               this.photos=[]
              for(let i=0;i<fileList.length;i++){
                   this.photos.push(fileList[i].response.data)
              }
         },
         idCardFrontSuccess(res,file){  //个人养殖户上传成功身份证正面
            this.form1.idCardFront=file.response.data
        
         },
         removeFront(){  //删除身份证正面
               this.form1.idCardFront=''
         },
         idCardBackSuccess(res,file){
             this.form1.idCardBack=file.response.data
         },
         removeBack(){
             this.form1.idCardBack=''
         },
         businessuccessful(res,file){  //上传营业执照
             this.form2.businessLicenseUrl=file.response.data
         },
         removebusiness(){
             this.form2.businessLicenseUrl=''
         },
         licensesuccessful(res,file){ //动物防疫条件合格证
             this.form2.licenseUrl=file.response.data
         },
         removelicense(){
             this.form2.licenseUrl=''
         },
         handlePictureCardPreview2(file){  //养殖场基地上传
             this.dialogImageUrl2 = file.url;
             this.dialogVisible2 = true;
         },
         successupload2(res,file,fileList){
               this.photos2=[]
              for(let i=0;i<fileList.length;i++){
                   this.photos2.push(fileList[i].response.data)
              }
         },
         handleRemove2(file,filelist){
             this.photos2=[]
             for(let i=0;i<filelist.length;i++){
                  this.photos2.push(filelist[i].response.data)
              }
         },
         idCardFrontSuccess2(res,file){ //法人身份证上传
             this.form2.idCardFront=file.response.data
         },
         removeFront2(){
             this.form2.idCardFront=""
         },
         idCardBackSuccess2(res,file){
             this.form2.idCardBack=file.response.data
         },
         removeBack2(){
              this.form2.idCardBack=''
         },
         idCardFrontSuccess3(res,file){ //管理员身份上传
              this.form2.adminIdCardFront=file.response.data
         },
         removeFront3(){
             this.form2.adminIdCardFront=''
         },
         idCardBackSuccess3(res,file){
              this.form2.adminIdCardBack=file.response.data
         },
         removeBack3(){
              this.form2.adminIdCardBack=''
         },
         licensesuccessful2(res,file){ //上传认证公函
              this.form2.certificationLetter=file.response.data
         },
         removelicense2(){
             this.form2.certificationLetter=''
         },
         farmsubmit(){  //养殖场申请入驻
              let base=this.$refs.location3;
              let home=this.$refs.location4
              let phonecode=this.$refs.phonecode2
             
              this.form2=Object.assign({},this.form2,{
                    province:parseInt(base.provinceId),
                    city:parseInt(base.cityId),
                    county:parseInt(base.countyId),
                    homeProvince:parseInt(home.provinceId),
                    homeCity:parseInt(home.cityId),
                    homeCounty:parseInt(home.countyId),
                    code:phonecode.code,
                    photos:this.photos2
              })
              //必填值不能为空
              if(!this.form2.type){
                  this.$msg({msg:"请选择企业类型"});
                  return 
              }else if(!this.form2.name){
                  this.$msg({msg:"请填写企业名称"});
                  return
              }else if(!this.form2.businessLicenseNo){
                   this.$msg({msg:'请填写营业执照注册号'});
                   return
              }else if(!this.form2.businessLicenseUrl){
                   this.$msg({msg:'请上传营业执照'});
                   return
              }else if(!this.form2.licenseUrl){
                   this.$msg({msg:'请上传动物防疫条件合格证'});
                   return
              }else if(!this.form2.address){
                   this.$msg({msg:"请填写养殖地址"});
                   return
              }else if(!this.form2.beginYear){
                   this.$msg({msg:'请选择开始养殖年份'});
                   return
              }else if(this.form2.photos.length==0){
                    this.$msg({msg:'请上传养殖场地照片'});
                    return
              }else if(!this.form2.lpName){
                   this.$msg({msg:'请填写法人姓名'});
                   return;
              }else if(!this.form2.idCard){
                   this.$msg({msg:'请填写法人身份证号'});
                   return
              }else if(!this.form2.phone&& !isMobile(this.form2.phone)){
                   this.$msg({msg:'请填写正确手机号'});
                   return;
              }else if(!this.form2.code){
                    this.$msg({msg:'请填写验证码'});
                    return
              }else if(!this.form2.idCardFront){
                   this.$msg({msg:'请上传法人身份证正面'})
                   return 
              }else if(!this.form2.idCardBack){
                   this.$msg({msg:'请上传法人身份证反面'})
                   return
              }else if(!this.form2.homeAddress){
                  this.$msg({msg:'请填写法人家庭地址'});
                  return
              }
              this.form2.photos=JSON.stringify(this.form2.photos)
              if(this.checked){
                  this.form2=Object.assign({},this.form2,{
                       adminName:this.form2.lpName,
                       adminPhone:this.form2.phone,
                       adminCode:this.form2.code,
                       adminIdCard:this.form2.idCard,
                        adminIdCardFront:this.form2.idCardFront,
                        adminIdCardBack:this.form2.idCardBack
                  })
              }else{
                      let admincode=this.$refs.phonecode3
                      this.form2.adminCode= admincode.code
              }
               this.showLoad();
              farmEntry(this.form2).then(res=>{
                   this.hideLoad();
                   let {code,data}=res.data;
                   if(code==200){
                       this.$msg({
                           msg:"入驻申请成功",
                           type:'success'
                       })
                       this.box2=true
                       this.form2={
                            type:'',
                            name:"",
                            businessLicenseNo:'',
                            businessLicenseUrl:'',
                            licenseUrl:'',
                            address:"",
                            beginYear:'',
                            lpName:'',
                            phone:'',
                            idCard:"",
                            idCardFront:'',
                           idCardBack:"",
                           homeAddress:"",
                           adminName:"",
                           adminPhone:"",
                           adminCode:"",
                           adminIdCard:'',
                           adminIdCardFront:'',
                           adminIdCardBack:'',
                            pwd:'',
                          repeatPwd:'',
                          certificationLetter:''
                       }
                       phonecode.code=''
                       this.photos2=[]
                   }
              })

         },
     }
}
</script>
<style lang="scss">
@import "../../styles/base";
@import "../../styles/dialog";
.baseEntry{
    .content{
         padding:40px $bodypad;
         h5{
             background-image: url("../../assets/square.png");
             background-repeat: no-repeat;
             padding:10px 40px;
             font-size: 18px;
         }
         .select{
             margin-top: 40px;
                 ul{
                     width:800px;
                     margin: 0 auto;
                     li{
                         display:inline-block;
                         width:300px;
                         height: 300px;
                         border-radius: 6px;
                         border: 1px solid #f1f1f1;
                         text-align: center;
                         @include box-shadow(#ccc 1px 1px 1px);
                         padding-top: 50px;
                         box-sizing: border-box;
                         &:first-child{
                             margin-right: 200px;
                         }
                         .img{
                            width: 100px;
                            height: 71px;
                            margin: 0 auto;
                            background-size:100% 100%;
                            box-sizing: border-box;
                         }
                         .img1{
                            background: url("../../assets/base11.png") no-repeat center;
                         }
                         .img2{
                             background: url("../../assets/base2.png") no-repeat center;
                         }
                         p{
                             font-size: 16px;
                             margin-top: 15px;
                             margin-bottom: 30px;
                         }
                         .el-button{
                            width: 130px;
                         }
                         &:hover{
                             cursor: pointer;
                             .img1{
                                 background: url("../../assets/base1.png") no-repeat center;
                             }
                             .img2{
                                  background: url("../../assets/base22.png") no-repeat center;
                             }
                             p{
                                color:#267db8; 
                             }
                             .el-button--default{
                                 @extend .bg
                             }

                         }
                     }
                 }
             }
    }
}
</style>