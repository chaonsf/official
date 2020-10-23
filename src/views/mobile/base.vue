<template>
<div class='base'>

    <Head></Head>
    <div class='content'>
        <van-image :src="url" fit='fill' />
        <div class='live'>
            <h4>基地实况</h4>
            <p class='smt'>Actual Situation Of The Base</p>
            <ul class='cot'>
                <li v-for="(item,ind) in livedata" :key='ind'>
                    <van-image :src="item.url" fit='fill' />
                    <div class='biaoti'>
                        <h5>{{item.title}}</h5>
                        <p>{{item.desc}}</p>
                    </div>
                </li>
            </ul>
            <h4>基地分布</h4>
            <p class='smt'>Base Distribution</p>
            <div class='map'>
                <baidu-map class="bm-view" :center="{lng: 121.300, lat: 30.800}" :zoom="7" @ready="mapChart">
                    <template v-for='item in points'>
                        <bm-marker :key="item.id" :position="item.site" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" @@tap='mouseover(item)' @touchend="mouseout">
                            <bm-label :content="content" :labelStyle="{color: '#fff', fontSize : '14px',opacity:'0.8',background:'#ccc',padding:'8px'}" :offset="{width: -35, height: 30}" v-if='item.id==selectId?true:false' />
                        </bm-marker>
                    </template>
                </baidu-map>
            </div>

        </div>
        <Foot></Foot>
    </div>
</div>
</template>

<script>
import Head from '@/components/header/mobile'
import Foot from '@/components/footer/mobie'
import {
    today
} from "@/utils/commom"
import {
    baiduMaps
} from '@/api/basefarm'
const todaya = today()
export default {
    components: {
        Head,
        Foot
    },
    data() {
        return {
            url: require('../../assets/mobie/banner2.png'),
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
    },
}
</script>

<style lang="scss" scoped>
@import "../../styles/base";

.base {
    @extend .mobieall;

    .content {
        overflow: scroll;
        height: 100%;

        &::-webkit-scrollbar {
            display: none;
        }

        .live {
            text-align: center;
            padding-bottom: rem(40);

            h4 {
                @extend .mobileh5
            }

            .cot {
                color: #fff;
                padding: 0 rem(52) 0 rem(44);

                li {
                    margin-top: rem(40);

                    h5 {
                        margin-top: rem(27);
                        margin-bottom: rem(14);
                        font-size: 16px;
                        font-weight: normal;
                    }
                }
            }

            .map {
                padding: 0 rem(52) 0 rem(44);

            }

            .bm-view {
                height: rem(488);
                width: 100%;
                margin-top: rem(30);
            }
        }
    }
}
</style>
