<template>
    <div class='forma'>
         <el-row :gutter="10">
             <el-col :xs='8' :sm='6' v-for='item in chooseData' :key='item.id' class='mb'>
                   <el-button :class='[item.id==chooseid?"selected":""]' @click='initdata(item.start,item.id)'>{{item.name}}</el-button>
             </el-col>
         </el-row>
        <div class='content'>
                 <p class='p'>(1PH 水 = 1PH 土 = 温度 5℃ = 湿度 5% = 二氧化碳 50ppm）</p>
                 <div id='line'></div>
        </div>
    </div>
</template>
<script>
import {tonow,beforeoneday,beforeonemonth,beforethreemonth,beforeoneyear} from '@/utils/watchtime'
import echarts from 'echarts'
import {setToken} from '@/utils/token'
import {testData} from "@/api/hybrid"
const nowa=tonow()
export default {

       data(){
         return{
              farmId:'',
              tabledata:[],
              timea:[],
              temperature:[],
              water:[],
              humidity:[],
              co2:[],
              soil:[],
              chooseid:0,
              chooseData:[
                   {
                       name:'前一天',
                       start:beforeoneday(),
                       id:0
                   },
                   {
                       name:'前一个月',
                       start:beforeonemonth(),
                       id:1
                   },
                   {
                       name:'前三个月',
                       start:beforethreemonth(),
                       id:2
                   },
                   {
                      name:'前一年',
                      start:beforeoneyear(),
                      id:3
                   }
              ],
         }
       },
       created(){
         let query=this.$route.query;
         this.farmId=query.id;
         let token=query.token
         if(token){
            setToken(token)
         }else{
             this.backlogin
         }
         this.initdata()
       },
       methods:{
           initdata(start,id){
              const query={
                     beginTime:start?start:this.chooseData[0].start,
                     endTime:nowa,
                     farmId:this.farmId
             } 
              if(id){
                  this.chooseid=id
              }
                this.querya(query)
           },
           backlogin(){
                if(typeof WebViewObject !='undefined'&& typeof WebViewObject.login !='undefined'){
                    WebViewObject.login()
                }
           },
         initchart(){
             let lineChart=echarts.init(document.getElementById('line'));
             let option={
                     tooltip: {
                         trigger: 'axis'
                     }, 
                     legend:{
                         data:['水质(ph)', '土壤(ph)', '温度(℃)', '湿度(%)', 'co2(ppm)']
                     },
                    grid: {
                       left: '3%',
                       right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                   xAxis: {
                     type: 'category',
                     boundaryGap: false,
                     data: this.timea,
                   },
                   yAxis: {
                      type: 'value'
                   },
                    series:[
                       {
                           "name":'水质(ph)',
                             type:'line',
                             data:this.water
                       },
                       {
                           "name":'土壤(ph)',
                             type:'line',
                             data:this.soil
                       },
                       {
                           "name":'温度(℃)',
                             type:'line',
                             data:this.temperature
                       },
                       {
                           "name":'湿度(%)',
                             type:'line',
                             data:this.humidity
                       },
                       {
                           "name":'co2(ppm)',
                             type:'line',
                             data:this.co2
                       }
                    ]
             }
             lineChart.setOption(option)
         },
         querya(query){
             testData(query).then(res=>{
                   let {code,data,msg}=res.data;
                   if(code==200){
                       let temperature=[];
                       let co2=[]
                       let humidity=[];
                       let soil=[]
                       let timea=[]
                       let water=[]
                       data.forEach(item=>{
                              temperature.push(item.temperature)
                              co2.push(item.co2)
                              humidity.push(item.humidity)
                              soil.push(item.soil)
                              timea.push(item.time)
                       })
                       this.timea=timea;
                       this.temperature=temperature
                       this.co2=co2
                       this.humidity=humidity
                       this.soil=soil
                       this.initchart()

                   }

             })
         },
       }
}
</script>
<style lang="scss" scoped>
.forma{
    padding: 10px;
    .selected{
        background: #409EFF;
        color: #fff;
    }
    #line{
        width: 100%;
        height: 300px;
    }
    .mb{
        margin-bottom: 10px;
    }
    .content{
        padding-bottom: 50px;
        .p{
            font-size: 14px;
            color: #333;
            text-align: center;
        }
    }
}
</style>