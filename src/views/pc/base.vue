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
    baiduMaps
} from '@/api/basefarm'
import store from "@/store"
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
        }
    },
    created() {
        store.dispatch("CHECKTHEME", 2)
    },
    mounted() {
        this.mapChart()
    },
    methods: {
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
        mouseover(item) {
            this.selectId = item.id
            this.content = `<div class='mark'>
                    <p style='margin-top:"10px"'>${item.farmName}</p>
                    <p style='margin-top:"10px"'>在栏数:${item.inFenceCount}</p>
                    <p style='margin-top:"10px"'>地址:${item.address}</p>
                 </div>`
        },
        mouseout() {
            this.selectId = ''
        },
        backdata() {
            let param = this.query
            return param
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

        .bm-view {
            height: 475px;
            width: 100%;
        }
    }

}
</style>
