<template>
<div class='trace'>
    <header>
        <van-image :src="url" fit='fill' />
    </header>
    <div class='content'>
        <div class='intro'>
            <ul>
                <li>
                    <span class='button'>品种</span><span>{{trace.varName}}</span>
                </li>
                <li>
                    <span class='button'>性别</span><span>{{trace.sex=='0'?'母鸡':'公鸡'}}</span>
                </li>
                <li>
                    <span class='button'>口感</span><span>肉质紧实，口感劲道</span>
                </li>
                <li>
                    <span class='button'>养殖天数</span><span>{{trace.breedDays}}天</span>
                </li>
                <li>
                    <span class='button'>食物来源</span><span>定制食料、谷物</span>
                </li>
                <li>
                    <span class='button'>入栏时间</span><span>{{trace.lairageTime}}</span>
                </li>
                <li>
                    <span class='button'>运动时长</span><span>{{trace.breedDays*10}}小时</span>
                </li>
            </ul>
        </div>
        <div class='base'>
            <ul>
                <li>
                    <span class='button'>名称</span><span>{{trace.farmName}}</span>
                </li>
                <li>
                    <span class="button">地址</span><span>{{trace.farmAddress}}</span>
                </li>
                <li>
                    <span class='button'>经纬度</span><span>东经{{trace.coords[0]}} 北纬{{trace.coords[1]}}</span>
                </li>
            </ul>
        </div>
        <div class='ditu'>
            <van-image :src="url3" fit='fill' class='yun' />
            <baidu-map class="bm-view" :center="{lng: trace.coords[0], lat: trace.coords[1]}" :zoom="8">
                <template>
                    <bm-marker :dragging="true" animation="BMAP_ANIMATION_BOUNCE" :position="{lng: trace.coords[0], lat: trace.coords[1]}">

                    </bm-marker>
                </template>
            </baidu-map>
            <van-image :src="url2" fit='fill' class='bj' />
        </div>
        <div class='envir'>
            <van-image :src="url4" fit='fill' class='huanjing' />
            <p class='right'>1PH 水 = 1PH 土 = 温度 5℃ = 湿度 5% = 二氧化碳 50ppm</p>
            <div id='line'></div>
            <el-row :gutter='10' class='sb'>
                 <el-col :span='6' v-for='item in chooseData' :key='item.id'>
                      <span :class='[item.id==chooseid?"selected":""]' @click='initdata(item.start,item.id)'>{{item.name}}</span>
                 </el-col>
            </el-row>
        </div>
        <div class='live'>
          
            <div class='top'>
                  <van-image :src="url6" fit='fill' class='yun1' />
                  <el-row>
                      <el-col :span='12'>
                        <div class='left'>
                             <h4>基地环境直播</h4>
                              <p>这只味养鸡就在这长大哒！</p>
                         </div> 
                      </el-col>
                      <el-col :span='12'>
                        <van-dropdown-menu >
                              <van-dropdown-item :options="options1" v-model="camerasid" @change='live'/> 
                          </van-dropdown-menu>
                      </el-col>
                  </el-row>
                  
            </div>
            <div class='shipin'>
             <div
                        class="prism-player"
                        id="player-con"
                        style="width: 100%; height: 500px;"
                    ></div>
            </div>

        </div>
        <div class='history'>
            <el-row class='source'>
                 <el-col :span='12' >
                      <span class='ml10'>历史环境追溯</span>
                 </el-col>
                 <el-col :span='12'>
                          <el-date-picker
                               v-model="shijian"
                               type="date"
                             placeholder="选择日期" @change='timechange' format='yyyy-MM-dd'>

                         </el-date-picker>
                 </el-col>
            </el-row>
             <div class='red' v-show='boff'>
                  您选择的日期当前并无图片
             </div>
            <el-row v-show='!boff' class='photos' :gutter='20'>
                <el-col :span='8' v-for='(item,index) in photos' :key='index'>
                     <van-image :src="item" fit='fill' @click='bigimg(index)'/>
                     
                </el-col>
            </el-row>
        </div>
        <footer>
             <van-image :src="url5" fit='fill'/>
        </footer>

    </div>
</div>
</template>

<script>
import {
    tracing,testData
} from '@/api/hybrid'
import {
    tonow,
    beforeoneday,
    beforeoneweek,
    beforeonemonth,
    beforethreemonth,
    beforeoneyear
} from '@/utils/watchtime'
import echarts from 'echarts'
import { DropdownMenu, DropdownItem } from 'vant';
import moment from 'moment'

import {
    huourl,
    getToken,
    photolist
} from '@/api/hybrid'
const nowa = tonow()
let now = moment().format("YYYY-MM-DD")
import { ImagePreview } from 'vant';

export default {
    components:{
        DropdownMenu:DropdownMenu,
        DropdownItem:DropdownItem,
        ImagePreview:ImagePreview,
    },
    data() {
        return {
            id: '',
            url: require('../../assets/trace/header.png'),
            trace: {},
            url2: require('../../assets/trace/map.png'),
            url3: require('../../assets/trace/yun.png'),
            url4: require('../../assets/trace/huanjing.png'),
            url5: require('../../assets/trace/footer.png'),
            url6:require('../../assets/trace/live.png'),
            chooseData: [{
                    name: '今天',
                    start: moment().format('YYYY-MM-DD')+' 00:00:00',
                    id: 5
                },
                {
                    name: '前一周',
                    start: beforeoneweek(),
                    id: 1
                },
                {
                    name: '前一个月',
                    start: beforeonemonth(),
                    id: 2
                },
                {
                    name: '前三个月',
                    start: beforethreemonth(),
                    id: 3
                },
            ],
            chooseid: 5,
             timea:[],
              temperature:[],
              water:[],
              humidity:[],
              co2:[],
              soil:[],
              camerasid:'',
              options1:[],
              token:'',
              videourl:'',
              play:null,
              shijian:now,
              photos:[],
              boff:false
        }
    },
    created() {
        this.load()
    },
    methods: {
        load() {
            let param = this.$route.params.id;
            if (param) {
                this.id = param
                this.getlivestock()

            }
        },
        getlivestock() {
            let param = {
                chipNo: this.id
            }
            tracing(param).then(res => {
                let {
                    code,
                    data
                } = res.data
                this.trace = data;
                let can=data.cameras;
                this.camerasid=data.cameras[0].serial;
                for(let i=0;i<can.length;i++){
                     this.options1.push({
                          text:can[i].label,
                          value:can[i].serial
                     })
                }
               this.initdata()
                this.live()
                this.timechange()
                if (this.trace.coords) {
                    this.trace.coords = this.trace.coords.split(',')
                } else {
                    this.trace.coords = ['', '']
                }
            })
        },
        initdata(start, id) {
            const query = {
                beginTime: start ? start : this.chooseData[0].start,
                endTime: nowa,
                farmId: this.trace.farmId
            }
            if(id){
                this.chooseid=id
            }
            this.query(query)
        },
        query(query){
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
                     axisLabel:{
                         rotate:0,
                         formatter:function(value,index){
                             if(value){
                                 return value.split(' ').join("\n");  
                             }else{
                                 return null
                             }
                             
                         }
                      
                     }
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
        live(){
             getToken().then(res=>{
                 let {code,data}=res.data;
                 if(code==200){
                     this.token=data.accessToken;
                     this.geturl()
                 }
             })
        },
        geturl(){
            let param={
                accessToken:this.token,
                deviceSerial:this.camerasid,
                 channelNo: 1,
                  expireTime: 300
            }
            huourl(param).then(res=>{
                let {code,data}=res.data
               if(code==200){
                   this.videourl=data.liveAddress.replace(/^http:\/\//, "https://");
                   if(this.play){
                       this.play.dispose()
                   }
                   this.bofang()
               }
            })
        },
        bofang(){
            this.play= new Aliplayer({
                "id": "player-con",
                "source": this.videourl,
                "width": "100%",
                "height": "500px",
                "autoplay": true,
                "isLive": true,
                "rePlay": true,
                "playsinline": true,
                "preload": true,
                "controlBarVisibility": "hover",
                "useH5Prism": true
            }, function (player) {
                player._switchLevel = 0;
                console.log("播放器创建了。");

            }
            );
        },
        timechange(){
             let time=moment(this.shijian).format('YYYY-MM-DD')
             let param={
                 farmId:this.trace.farmId,
                  beginTime:time+' 00:00:00',
                  endTime:time + ' 23:59:59'
             }
             photolist(param).then(res=>{
                let {code,data}=res.data;
                if(code==200){
                    if(data.length==0){
                          this.boff=true
                    }else{
                        this.photos=data;
                        this.boff=false
                    }
                }
             })
        },
        bigimg(item){
            ImagePreview({
            images:this.photos ,
            startPosition: item,
            });
        }
    }
}
</script>

<style lang="scss">
.trace {
    box-sizing: border-box;
    overflow: hidden;
    .content {
        margin-top: 30px;

        .intro {
            width: 100%;
            height: 260.93pt;
            background-image: url('../../assets/trace/intro.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
            padding-top: 75.33pt;
            padding-left: 48pt;

            ul {

                li {
                    margin-bottom: 10pt;

                    .button {
                        display: inline-block;
                        width: 44pt;
                        height: 13pt;
                        line-height: 13pt;
                        color: #fff;
                        background: #574D9E;
                        text-align: center;
                        font-size: 12px;
                        border-radius: 10px;
                        margin-right: 10pt;
                    }
                }
            }
        }

        .base {
            width: 100%;
            height: 114pt;
            margin-top: 10px;
            background-image: url('../../assets/trace/base.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
            padding-top: 48.67pt;
            padding-left: 26pt;

            ul {
                li {
                    margin-bottom: 9.33pt;

                    .button {
                        display: inline-block;
                        width: 52.97pt;
                        height: 14.37pt;
                        line-height: 14.37pt;
                        text-align: center;
                        background: #F6DC53;
                        color: #4196B5;
                        border-radius: 10px;
                        margin-right: 17pt;
                    }
                }
            }

        }

        .ditu {
            position: relative;
            margin-top: 20px;

            .yun {
                position: absolute;
                left: 0;
                top: 0;
                z-index: 10;
            }

            .bm-view {
                height: 154pt;
                width: 216pt;
                margin-left: 25pt;
                padding-top: 10pt;
            }

            .bj {
                position: absolute;
                left: 21pt;
                top: 0pt;
                height: 205pt;
                width: 260pt;
                z-index: 100;
            }
        }

        .envir {
            margin-top: 60pt;

            .right {
                text-align: center;
                font-size: 12px;
            }
            #line{
                width: 100%;
                height: 160pt;
            }
            .sb{
                padding: 0.5pt;
                span{
                    display:inline-block ;
                    padding:5pt 0;              
                    background: #D3D3D3;
                    text-align: center;
                    border-radius: 5px;
                    width: 60pt;
                    box-sizing: border-box;
                }
                .selected{
                    background: #FCC14A;
                    
                }

            }

        }
        .live{
           margin-top: 20px;
            position: relative;
          .top{
             width: 220pt;
              height: 35pt;
              background: #FCC14A;
              margin: 0 auto;
              border-radius: 10px;
              position: relative;
              .left{
                 text-align: center;
                  h4{
                      font-size: 14px;
                      font-weight: normal;
                      color: #fff;
                      margin-top: 5px;
                  }
                  p{
                      color: #4196B5;
                  }
              }
            .yun1{
              position: absolute;
              right:-10pt;
              z-index: -10;
              top:-5pt;
            }
            .van-dropdown-menu__item{
               // background: #FCC14A;

            }
          }
          .shipin{
              padding: 0 15px;
          }
          .prism-player{
              margin-top: 10px;
          }
            
        }
        .history{
            margin-top: 10px;
            padding: 0 10px;
            .source{
                display: flex;
                 justify-content: center;
                align-items: center;
                font-size: 14px;
            }
          .el-input{
              width: 160px;
          }
            .ml10{
                margin-left: 10px;
            }
            .red{
                text-align: center;
                color: red;
                margin-top: 20px;
                font-size: 14px;
            }
            .photos{
                margin-top: 20px;
                .el-col{
                    margin-bottom: 10px;
                }
            }
        }
        footer{
            margin-top: 20px;
        }
    }
}

@media screen and (min-width:750px) {
    .trace {
        width: 750px;
        margin: 0 auto;
        .envir{
            text-align: center;
            margin-top: 100px !important;
        }
        .live{
            .top{
                width: 720px !important;
            }
        }
        .ditu{
            .bj{
                width: 720px !important;
                height: 500px !important;
                top:-10px !important;
            }
            .bm-view{
                width: 630px !important;
                height: 380px !important;
            }
        }
        footer{
            text-align: center;
        }
        .history{
            .el-input{
                width: 100% !important;
            }
        }
    }
}
</style>
