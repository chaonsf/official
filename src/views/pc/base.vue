<template>
<div class='platform'>
    <div class='banner'>
        <div class="contenta">
            <Newhead></Newhead>
        </div>
    </div>
    <div class='live'>
        <h4>基地实况</h4>
        <p class='smtitle'>Actual Situation Of The Base</p>
        <div class='img'>
            <ul>
                <li v-for="(item,ind) in livedata" :key='ind'>
                    <img :src='item.url' />
                    <div class='biaoti'>
                        <h5>{{item.title}}</h5>
                        <p>{{item.desc}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <h4>基地分布</h4>
        <p class='smtitle'>Base Distribution</p>
        <baidu-map class="bm-view" :center="{lng: 121.300, lat: 30.800}" :zoom="7" @ready="mapChart">
            <template v-for='item in points'>
                <bm-marker :key="item.id" :position="item.site" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" @mouseover='mouseover(item)' @mouseout="mouseout">
                    <bm-label :content="content" :labelStyle="{color: '#fff', fontSize : '14px',opacity:'0.8',background:'#ccc',padding:'8px'}" :offset="{width: -35, height: 30}" v-if='item.id==selectId?true:false' />
                </bm-marker>
            </template>
        </baidu-map>
        <div class='detailtable'>
            <el-table :data="tableData" border>
                <el-table-column prop="farmName" label="下辖基地"> </el-table-column>
                <el-table-column prop="regname" label="基地地址"> </el-table-column>
                <el-table-column prop="telephone" label="联系电话"> </el-table-column>
                <el-table-column width='150' align='center'>
                    <template slot-scope="scope">
                        <i class="el-icon-document" @click='querydetail(scope.row)'></i>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background layout="prev, pager, next" :total="tablepage.total" @current-change="currentChange2" @size-change="sizeChange2"> </el-pagination>
        </div>

    </div>
    <Foot></Foot>
</div>
</template>

<script>
import Newhead from '@/components/header/newhead'
import {
    today
} from "@/utils/commom"
import {
    baiduMaps,
    tableChart
} from '@/api/basefarm'
import store from "@/store"
import {
    mapGetters
} from 'vuex'
import Foot from "../../components/footer"
const todaya = today()
export default {
    components: {
        Newhead,
        Foot
    },
    data() {
        return {
            livedata: [{
                    url: require('../../assets/new/live1.png'),
                    title: '环境监测',
                    desc: '土壤、空气、水质等环境监测及数据统计及预警。'
                },
                {
                    url: require('../../assets/new/live2.png'),
                    title: 'RFID智能禽畜识别',
                    desc: '给予每只禽畜唯一身份编码，完成禽畜统计、出入栏管理，智能盘点及报损预警。'
                },
                {
                    url: require('../../assets/new/live3.png'),
                    title: '养殖场直播',
                    desc: '养殖实况，随时掌握。'
                }
            ],
            points: [],
            query: {
                beginTime: todaya.oldyear,
                endTime: todaya.todayTime
            },
            content: '',
            selectId: '',
            tableData: [],
            tablepage: {
                total: 0,
                currentPage: 1,
                pageSize: 10,
                pagerCount: 5,
            }
        }
    },
    created() {
        store.dispatch("CHECKTHEME", 2)
    },
    mounted() {
        //this.mapChart()
        this.initload()
    },
    computed: {
        ...mapGetters(['userinfo'])
    },
    methods: {
        initload() {
            this.mapChart()
            this.tableChart2()
        },
        querydetail(item) {
            let farmId = item.id
            this.$router.push('/platform/' + farmId)
        },
        mapChart() {
            let param = this.backdata();
            baiduMaps(param).then(res => {
                let {
                    data,
                    code
                } = res.data;
                if (code == 200) {
                    const points = [];
                    for (let i = 0; i < data.length; i++) {
                        let arr, pos
                        if (data[i].coords) {
                            arr = data[i].coords.split(',')
                            pos = {
                                lng: parseFloat(arr[0]),
                                lat: parseFloat(arr[1])
                            }
                        } else {
                            pos = {
                                lng: "",
                                lat: ""
                            }
                        }

                        points.push({
                            ...data[i],
                            site: pos
                        })
                    }
                    this.points = points
                }
            })
        },
        backdata() {
            /*       let loactions=this.$refs.loc
                let   param=Object.assign({},this.query,{
                  province:loactions.provinceId,
                  city:loactions.cityId,
                  county:loactions.countyId
             }) */
            let param = this.query
            return param
        },
        tableChart2() {
            let param = this.backdata()
            param = Object.assign(param, {
                current: this.tablepage.currentPage,
                size: this.tablepage.pageSize
            })
            tableChart(param).then(res => {
                let {
                    code,
                    data
                } = res.data;
                if (code == 200) {
                    let arr = data.farmList.records
                    if (!this.userinfo) {
                        arr.forEach(item => {
                            item.telephone = this.showphone(item.telephone)
                        })
                    }

                    this.tableData = arr
                    this.tablepage.total = data.farmList.total
                }
            })
        },
        showphone(phone) {
            let param = ''
            if (phone) {
                param = phone.substr(0, 3) + '****' + phone.substr(7);
            }
            return param

        },
        mouseover(item) {
            this.selectId = item.id;
            console.log("item:", item)
            let dushu = item.coords.split(',')
            console.log("dushu:", dushu)
            this.content = `<div class='mark'>
                    <p style='margin-top:"10px"'>${item.farmName}</p>
                    <p style='margin-top:"10px"'>在栏数:${item.inFenceCount}</p>
                    <p style='margin-top:"10px"'>地址:${item.address}</p>
                    <p style='margin-top:"10px"'>经度:${dushu[0]}   纬度:${dushu[1]}</p>
                 </div>`
        },
        mouseout() {
            this.selectId = ''
        },
        backdata() {
            let param = this.query
            return param
        },
        currentChange2(cur) {
            this.tablepage.currentPage = cur
            this.tableChart2()
        },
        sizeChange2(pageSize) {
            this.tablepage.pageSize = pageSize;
            this.tableChart2()
        },
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/base";

.platform {
    @extend .otherhtml;

    &::-webkit-scrollbar {
        display: none;
    }

    .banner {
        @include bgImg('../../assets/tinified/platform1.png');

        .contenta {
            @extend .width;
        }
    }

    .live {
        @extend .width;
        padding-bottom: 50px;

        h4 {
            margin-top: 50px;
            @extend .h4;
        }

        .img {
            ul {
                overflow: hidden;

                li {
                    float: left;
                    width: 378px;
                    text-align: center;
                    color: rgba(255, 255, 255, 0.8);
                    margin-right: 32px;

                    &:last-child {
                        margin-right: 0;
                    }

                    img {
                        width: 378px;
                        height: 335px;
                    }

                    .biaoti {
                        padding: 0 10px;
                    }

                    h5 {
                        font-size: 22px;
                        font-weight: 400;
                        margin-top: 27px;
                        margin-bottom: 21px;
                    }

                    p {
                        font-size: 14px;
                    }
                }

            }
        }

        .detailtable {
            margin-top: 20px;
            text-align: center;

            .el-pagination {
                margin-top: 10px;
            }
        }

        .el-icon-document {
            cursor: pointer;
        }

        .bm-view {
            height: 475px;
            width: 100%;
        }
    }

}
</style>
