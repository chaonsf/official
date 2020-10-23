<template>
    <div class="chain">
         <Basehead :show="false"></Basehead>
         <div class="content">
              <h5>请选择入驻类型</h5>
              <div class="select">
                  <el-row class='ml40'>
                      <el-col :xs='24' :sm='24' :md="12" :lg='8' :xl='8'>
                         <div class="feed item">
                              <div class="img img1"></div>
                               <p>饲料企业</p>
                               <el-button @click='feed'>申请入驻</el-button>
                            </div>
                      </el-col>
                     <el-col :xs='24' :sm='24' :md="12" :lg='8' :xl='8'>
                         <div class="vaccines item">
                              <div class="img img2"></div>
                               <p>疫苗企业</p>
                               <el-button @click='vaccines'>申请入驻</el-button>
                            </div>
                      </el-col>
                     <el-col :xs='24' :sm='24' :md="12" :lg='8' :xl='8'>
                         <div class="veterinary item">
                              <div class="img img3"></div>
                               <p>兽医服务企业</p>
                               <el-button @click='veterinarian'>申请入驻</el-button>
                            </div>
                      </el-col>
                  </el-row>
              </div>
                  <el-dialog title='饲料生产机构入驻' :visible.sync='feedbox' class="entryDialog" width="800px">
                      <FeedEntry @dialogclose='feeddialogclose'></FeedEntry>
                 </el-dialog>
                 <el-dialog title='疫苗生产机构入驻' :visible.sync='vaccniesbox' class="entryDialog" width="800px">
                          <VaccinesEntry @dialogclose='vaccinedailogclose'></VaccinesEntry>
                 </el-dialog>
                 <el-dialog title='兽医机构入驻' :visible.sync='veterinarianbox' class="entryDialog" width="800px">
                        <Veter @dialogclose='veterdialogclose'></Veter>
                 </el-dialog>                
         </div>
          <Foot></Foot>
    </div>
</template>
<script>
import Basehead from '@/components/settlentry/baseHead'
import Foot from '@/components/footer'
import FeedEntry from "@/components/settlentry/chain/feedEntry"
import VaccinesEntry from "@/components/settlentry/chain/vaccineEntry"
import Veter from '@/components/settlentry/chain/veterinarianEntry'
export default {
    components:{
        Basehead,Foot,FeedEntry,VaccinesEntry,Veter
    },
    data(){
        return{
            feedbox:false,
            vaccniesbox:false,
            veterinarianbox:false,
        }
    },
    methods:{
        feed(){
             this.feedbox=true
        },
        feeddialogclose(){
             this.feedbox=false
        },
        vaccines(){
             this.vaccniesbox=true
        },
        vaccinedailogclose(){
            this.vaccniesbox=false
        },
        veterinarian(){
            this.veterinarianbox=true
        },
        veterdialogclose(){
            this.veterinarianbox=false
        }
    }
}
</script>
<style lang="scss">
@import "../../styles/base";
@import "../../styles/dialog";
.chain{
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
           .item{
               width:300px;
               height: 300px;
               border-radius: 6px;
               border: 1px solid #f1f1f1;
               text-align: center;
               @include box-shadow(#ccc 1px 1px 1px);
               padding-top: 50px;
               box-sizing: border-box;
              .img{
                  width: 100px;
                  height: 76px;
                  margin: 0 auto;
                  background-size:100% 100%;
                  box-sizing: border-box;
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
                         background: url("../../assets/chain2.png") no-repeat center;
                       }
                      .img2{
                           background: url("../../assets/chain3.png") no-repeat center;
                       }
                       .img3{
                           background: url("../../assets/chain1.png") no-repeat center;
                       }
                       p{
                          color:#267db8; 
                         }
                        .el-button--default{
                            @extend .bg
                         }
                }
           }
           .feed{
               .img1{
                 background: url("../../assets/chain22.png") no-repeat center;
               }
           }
           .vaccines{
               .img2{
                   background: url("../../assets/chain33.png") no-repeat center;
               }
           }
           .veterinary{
               .img3{
                   background: url("../../assets/chain11.png") no-repeat center;
               }
           }
       }
  }
}
</style>