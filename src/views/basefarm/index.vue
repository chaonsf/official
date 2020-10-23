<template>
    <div class="basefarm">
            <div class="banner">
                <img src="../../assets/jidi.png" class='logo' />
               <el-row>
               <el-col :xs='12' :sm="14" :md="12" :lg="17" :xl="18">
                  <Head :url="url"></Head>
               </el-col>
                <el-col :xs='12' :sm="10" :md="12" :lg="7" :xl="6">
                     <Baselogin></Baselogin>
                </el-col>
             </el-row>  
            </div>
           <div class='content'>
                 <p clss='small'>当前位置：<span>基地</span></p>
                <!--  <Query class='queryhead' @search='search' ref='search'></Query> -->
                 <div class='map'>
                      <ul class='title'>
                          <li :class='boff?"active":""' @click='select'>折线图</li>
                        <!--   <li :class='!boff?"active":""' @click='select'>表格</li> -->
                      </ul>
                      <ve-line :data="chartData" :settings='chartSettings' v-show='boff'></ve-line>
                     <div  v-show='!boff'>
                          <el-table :data="baseData" border>
                                  <el-table-column  prop="time"  label="日期" > </el-table-column>
                                   <el-table-column  prop="totalFarms"  label="基地总数(个)" > </el-table-column>
                                    <el-table-column  prop="addedFarms"  label="新增基地总数(个)" > </el-table-column>
                          </el-table>
                            <el-pagination background  layout="prev, pager, next" :total="page.total" @current-change="currentChange"  @size-change="sizeChange"> </el-pagination>                       
                     </div>
                 </div>
                 <div class='map'>
                     <ul class='title'>
                          <li :class='boff2?"active":""' @click='choose'>地图</li>
                          <li :class='!boff2?"active":""' @click='choose'>表格</li>
                      </ul>
                     <baidu-map class="bm-view" :center="{lng: 105.000, lat: 38.000}" :zoom="4"  @ready="mapChart" v-show='boff2'>
                           <template v-for='item in points' >
                               <bm-marker :key="item.id" :position="item.site" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" @mouseover='mouseover(item)' @mouseout="mouseout">
                                       <bm-label :content="content" :labelStyle="{color: '#fff', fontSize : '14px',opacity:'0.8',background:'#ccc',padding:'8px'}" :offset="{width: -35, height: 30}" v-if='item.id==selectId?true:false'/>
                                </bm-marker>  
                           </template>
                     </baidu-map>
                      <div v-show='!boff2'>
                          <el-table :data="tableData" border>
                                  <el-table-column  prop="farmName"  label="下辖基地" > </el-table-column>
                                   <el-table-column  prop="regname"  label="基地地址" > </el-table-column>
                                    <el-table-column  prop="telephone"  label="联系电话" > </el-table-column>
                                    <el-table-column width='150' align='center'>
                                              <template slot-scope="scope">
                                                    <i class="el-icon-document" @click='querydetail(scope.row)'></i>
                                              </template>
                                    </el-table-column>
                          </el-table>
                          <el-pagination background  layout="prev, pager, next" :total="tablepage.total" @current-change="currentChange2"  @size-change="sizeChange2"> </el-pagination>
                      </div>
                 </div>
           </div>
           <Foot></Foot>
    </div>
</template>
<script>
import Head from '@/components/header'
import Foot from '@/components/footer'
import store from "@/store"
//import Location from '@/components/settlentry/location'
import {today} from "@/utils/commom"
import {lineChart,tableChart,baiduMaps} from '@/api/basefarm'
import Baselogin from "../../components/login/baselogin"
import {mapGetters} from 'vuex' 
//import Query from '@/components/queryhead'
const url=require("../../assets/logo4.png")
const todaya=today()
export default {
     components:{
       Head,Foot,Baselogin
     },
     
     data(){
         return{
             url:url,
             boff:true,
             boff2:true,
             query:{
                 beginTime:todaya.oldyear,
                 endTime:todaya.todayTime
             },
            chartSettings:{
                 metrics: ['基地总数(个)', '新增基地总数(个)'],
                dimension: ['日期']
             },
             chartData:{
                 columns:['日期','基地总数(个)',"新增基地总数(个)"],
                 rows:[]
             },
             baseData:[],
             page:{
                total:0,
                currentPage:1,
                pageSize:7,
                pagerCount:5,
            },
            points:[],
            content:'',
            selectId:'',
            /* 第二个表格 */
            tableData:[],
            tablepage:{
                total:0,
                currentPage:1,
                pageSize:10,
                pagerCount:5,
            }

         }
     },
     created(){
          store.dispatch("CHECKTHEME",2) 
     },
     mounted(){
        this.initload()
     },
     computed:{
      ...mapGetters(['userinfo'])
     },
     methods:{
          initload(){
                    this.lineCharts()
                    this.tableChart1()
                    this.mapChart()
                    this.tableChart2()
          },
          select(){
           // this.boff=!this.boff
           this.boff=true
          },
          submit(){
              this.initload()
          },
          lineCharts(){
                let param= this.backdata()
               lineChart(param).then(res=>{
                    console.log(res.data)
                    let {data,code}=res.data
                    if(code==200){
                        //this.chartData.columns=
                       let {content,dates}=data;
                       let arr=[];
                       for(let i=0;i<content[0].length;i++){
                            arr.push({
                                '日期':dates[i],
                                '基地总数(个)':content[0][i],
                                '新增基地总数(个)':content[1][i]
                            })
                       }
                       this.chartData.rows=arr
                    }
               })   
          },
          backdata(){
              /*       let loactions=this.$refs.loc
                  let   param=Object.assign({},this.query,{
                    province:loactions.provinceId,
                    city:loactions.cityId,
                    county:loactions.countyId
               }) */
               let param=this.query
               return param
          },
          tableChart1(){
               let param=this.backdata()
                 param=Object.assign(param,{
                     current:this.page.currentPage,
                      size:this.page.pageSize
                 })
               tableChart(param).then(res=>{
                    let {code,data}=res.data;
                    if(code==200){
                         this.baseData=data.statistics.content;
                         this.page.total=data.statistics.page.total
                    }
               })
          },
         tableChart2(){
               let param=this.backdata()
                 param=Object.assign(param,{
                     current:this.tablepage.currentPage,
                      size:this.tablepage.pageSize
                 })
               tableChart(param).then(res=>{
                    let {code,data}=res.data;
                    if(code==200){
                        let arr=data.farmList.records
                        if(!this.userinfo){
                         arr.forEach(item=>{
                           item.telephone=this.showphone(item.telephone)
                           })
                        }

                         this.tableData=arr
                         this.tablepage.total=data.farmList.total
                    }
               })
          },
          currentChange(cur){
              this.page.currentPage=cur
              this.tableChart1()
          },
          sizeChange(pageSize){
              this.page.pageSize = pageSize;
              this.tableChart1()
          },
          currentChange2(cur){
              this.tablepage.currentPage=cur
              this.tableChart2()
          },
          sizeChange2(pageSize){
              this.tablepage.pageSize = pageSize;
              this.tableChart2()
          },
          mapChart(){
             let param=this.backdata();
            //let param=this.
              baiduMaps(param).then(res=>{
                 let {data,code}=res.data;
                 if(code==200){
                 const points = [];
                 for(let i=0;i<data.length;i++){
                     let arr,pos
                       if(data[i].coords){
                            arr=data[i].coords.split(',')
                             pos={lng:parseFloat(arr[0]),lat:parseFloat(arr[1])}
                       }else{
                        pos={lng:"",lat:""}
                       }

                       points.push({
                            ...data[i],
                            site:pos
                       })
                 }
                  this.points = points
                  console.log("this:",this.points)
                 }
              })
          },
           mouseover(item){
               this.selectId=item.id
               this.content=`<div class='mark'>
                    <p style='margin-top:"10px"'>${item.farmName}</p>
                    <p style='margin-top:"10px"'>在栏数:${item.inFenceCount}</p>
                    <p style='margin-top:"10px"'>地址:${item.address}</p>
                 </div>`
           },
           mouseout(){
               this.selectId=''
           },
           choose(){
               this.boff2=!this.boff2;        
           },
           querydetail(item){
               let farmId=item.id
                this.$router.push('/basefarm/'+farmId)
           },
           showphone(phone){
               let param=''
               if(phone){
                  param=  phone.substr(0,3)+'****'+phone.substr(7);
               }
               return param
               
           },
           search(query){
                let param=''
                 if(query){
                     param={
                         ...query
                     }
                 }else{
                      let search=this.$refs.search
                      let que=search.query
                      let val=search.value
                      param={
                          ...que,
                         beginTime:val[0],
                         endTime:val[1]
                      }
                 }
               //return param
           }
     }
}
</script>
<style lang="scss" scoped>
.basefarm{
     .banner{
         width:100%;
         height:466px;
         background-image:url('../../assets/basefarm.png');
        /*  padding:0 207px; */
         position: relative;
         .logo{
             position: absolute;
             left:348px;
             top:210px;
         }
     }
     .content{
        /*   padding:30px 207px 20px; */
        padding: 30px 0;
        box-sizing: border-box;
          .small{
              font-size: 14px;
              color:#9b9b9b;
              margin-top: 10px;
            span{
               font-size: 16px;
               color: #9c9c9c;
            }
          }
          .queryhead{
              margin-top: 20px;
          }
          .query{
              .el-row{
                  .el-col{
                      margin-top: 15px;
                      .el-input__inner{
                          width: 212px;
                      }
                      .el-button--primary{
                          width: 212px;
                      }
                  }
              }
          }
          .map{
              .title{
                  text-align: right;
                  margin-bottom: 10px;
                  li{
                      display: inline-block;
                      margin-left: 14px;
                      font-size: 18px;
                      color: #555;
                      cursor: pointer;
                  }
                  .active{
                      color:#1163ad
                  }
              }
              .bm-view{
                  height: 760px;
              }
              .el-pagination{
                  text-align: center;
                  margin-top: 10px;
              }

          }
     }
}
@media  screen and (min-width:768px){
.basefarm{
    .banner{
         padding:0 207px;
         box-sizing: border-box;
    }
    .content{
        padding:30px 207px 20px; 
        box-sizing: border-box;
    }
}
}
@media screen and (max-width: 768px){
.basefarm{
    .logo{
        display: none;
    }
}
}
</style>