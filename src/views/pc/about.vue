<template>
     <div class='about'>
            <div class="banner">
                <div class='contenta'>
                   <Newhead></Newhead>
                </div>

            </div>
            <div class='content'>
                   <h4>公司介绍</h4>
                   <p class='line'>Company Profile</p>
                   <div class='jeishao'>
                        <img src='../../assets/about/tea.png' class='left' />
                        <div class='right'>
                            <h5>公司介绍</h5>
                             <img src='../../assets/about/about8.png'  class='line'/>
                            <p class='title'>数字农业  科技赋能</p>
                            <p class='f14'>
                                壹农源是一家以数据服务为核心能力的农 息、管理信息和空间信息进行采集、分析和处理，建立统一的农业养殖信息资源综合服务和智能分析系统，实现大数据的共享性、复用性、高效性的数字化优势，辅助政府部门对农村农业产业进行宏观调控、对农产品质量进行全面监管，为服务对象提供综合信息服务。   
                            </p>
                        </div>
                   </div>
                   <h4>企业文化</h4>
                   <p class='line'>corporate Culture</p>
                   <el-row :gutter='30' class='square'>
                        <el-col :sm='24' :xs='24' :md='24' :lg='8' :xl='8' v-for='(item,index) in square' :key='index'>
                             <div class='item'>
                                   <img :src='item.url' />
                                   <h5>{{item.title}}</h5>
                                    <p>{{item.desc}}</p>
                             </div>
                        </el-col>
                   </el-row>
                   <h4>公司相册</h4>
                   <p class='line'>Company Album</p>
                   <el-row class='ul'>
                       <el-col :span='8'  v-for='(item,index) in banner' :key='index'>
                       <img :src='item' />
                       </el-col>
                   </el-row>
            </div>
            <foot></foot>
     </div>
</template>
<script>
import Newhead from '@/components/header/newhead'
import Foot from '@/components/footer'
import {removeStore} from "@/utils/storage"
import store from "@/store"
export default {
     components:{
         Newhead,Foot
     },
     created(){
         removeStore("menuid",'') 
          store.dispatch("CHECKTHEME","")
          window.scrollTo(0,0)
     },
     data(){
         return{
             square:[
                 {
                      title:'企业标语',
                      desc:'开拓、拼搏、诚信、服务，责任',
                      url:require("../../assets/about/about1.png")
                 },
                 {
                     title:'企业口号',
                     desc:'开拓创新，顽强拼搏，与时俱进，争创一流',
                     url:require("../../assets/about/about2.png")
                 },
                 {
                     title:'企业SLOG',
                     desc:'数字农业，科技赋能',
                     url:require("../../assets/about/about3.png")
                 }
             ],
             banner:[require("../../assets/about/about4.png"),require("../../assets/about/about5.png"),require("../../assets/about/about6.png")],
         }
     }
}
</script>
<style lang="scss" scoped>
@import "../../styles/base";
html,body{
    width: 100%;
    height: 100%;
}
.about{
    @extend .otherhtml;
     .banner{
         @include bgImg('../../assets/about/about.png');
         .contenta{
             @extend .width;
         }
     }
     .content{
          padding:50px 0 20px;
          @extend .width;
          h4{
              font-size: 28px;
              color: #fff;
              text-align: center;
          }
          .line{
              text-align: center;
              color: #fff;
              font-size: 12px;
          }
          .jeishao{
             display: flex;
             flex-direction: row;
              color: #fff;
              margin-top: 20px;
              margin-bottom: 50px;
              .left{
                 flex: 1;
                 width:320px;
              }
              .line{
                  width:98px;
                  height: 2px;
              }
              .right{
                padding-left: 40px;
                h5{
                    font-size: 18px;
                    margin-top: 20px;
                    margin-bottom: -10px;
                }
                .title{
                    font-size: 16px;
                    margin-top: 20px;
                }
                .f14{
                    font-size: 14px;
                    margin-top: 20px;
                    line-height: 24px;
                }
              }
          }
          .square{
              margin-top: 20px;
              margin-bottom: 40px;
              .item{
                  text-align: center;
                  margin-bottom: 10px;

                  img{
                      width: 82px;
                      height:82px;
                  }
                  h5{
                      font-size:18px;
                      color:rgba(255,255,255,1);
                      margin-top: 30px;
                      margin-bottom: 18px;
                      font-weight: 400;
                  }
                  p{
                      font-size: 14px;
                      color: rgba(255,255,255,1);
                      font-weight:400;
                  }
              }
          }
                  .ul{
                     margin-top: 20px;
                     img{
                         width:300px;
                         height: 240px;
                     }
                  }
     }
}

</style>