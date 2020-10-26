<template>
<div class="detail">
    <div class='banner'>
        <div class="contenta">
            <Newhead></Newhead>
        </div>
    </div>
    <div class='content'>
        <el-row :gutter='50' class='top'>
            <el-col :sm='24' :xs='24' :md='24' :lg='12' :xl='12'>
                <div class='left'>
                    <el-image :src='bannerUrl' fit='conver'></el-image>
                </div>
                <el-carousel type="card" height="100px" :autoplay='boff' @change='change' :indicator-position='none'>
                    <el-carousel-item v-for="(item,index) in photos" :key="index" @click='checkimg(item)'>
                        <el-image :src='item' fit='cover'></el-image>
                    </el-carousel-item>
                </el-carousel>

            </el-col>
            <el-col :sm='24' :xs='24' :md='24' :lg='12' :xl='12'>
                <p class='p'>(1PH 水 = 1PH 土 = 温度 5℃ = 湿度 5% = 二氧化碳 50ppm）</p>
                <ve-line :data="chartData"></ve-line>
            </el-col>
        </el-row>
        <el-row :gutter='25' class='introd'>
            <el-col :sm='24' :xs='24' :md='12' :lg='8' :xl='6'>
                <div class='item'>
                    <h4>地址</h4>
                    <p>{{load.address}}<i class="el-icon-location-information"></i></p>
                </div>
            </el-col>
            <el-col :sm='24' :xs='24' :md='12' :lg='8' :xl='6'>
                <div class='item'>
                    <h4>经纬度</h4>
                    <p>东经：{{load.coords?load.coords.split(',')[0]:''}}</p>
                    <p>北纬：{{load.coords?load.coords.split(',')[1]:''}}</p>
                </div>
            </el-col>
            <el-col :sm='24' :xs='24' :md='12' :lg='8' :xl='6'>
                <div class='item'>
                    <h4>在栏畜类</h4>
                    <p v-for='(item,index) in load.livestockCount' :key='index'>
                        {{item.varName}}<span>{{item.count}}</span>{{item.unit}}
                    </p>
                </div>
            </el-col>
            <el-col :sm='24' :xs='24' :md='12' :lg='8' :xl='6'>
                <div class='item'>
                    <h4>在栏禽类</h4>
                    <p v-for='(item,index) in load.poultryCount' :key='index'>
                        {{item.varName}}<span>{{item.count}}</span>{{item.unit}}
                    </p>
                </div>
            </el-col>
            <el-col :sm='24' :xs='24' :md='12' :lg='8' :xl='6'>
                <div class='item'>
                    <h4>可授信额度</h4>
                    <p>{{load.creditLimit}}万元</p>
                </div>
            </el-col>
            <el-col :sm='24' :xs='24' :md='12' :lg='8' :xl='6'>
                <div class='item'>
                    <h4>下月饲料配送量</h4>
                    <p>{{load.fodderDispatchQuantity}}万元</p>
                </div>
            </el-col>
            <el-col :sm='24' :xs='24' :md='12' :lg='8' :xl='6'>
                <div class='item'>
                    <h4>投保总价值</h4>
                    <p><span>{{load.totalInsured}}</span>万元</p>
                </div>
            </el-col>
            <el-col :sm='24' :xs='24' :md='12' :lg='8' :xl='6'>
                <div class='item'>
                    <h4>已投保</h4>
                    <p v-for='(item,index) in load.insured' :key='index'>
                        {{item.varName}}<span>{{item.count}}</span>{{item.unit}}
                    </p>
                </div>
            </el-col>
            <el-col :sm='24' :xs='24' :md='12' :lg='8' :xl='6'>
                <div class='item'>
                    <h4>带动贫困户</h4>
                    <p><span>{{load.drivePoorCount}}</span>户</p>
                </div>
            </el-col>
            <el-col :sm='24' :xs='24' :md='12' :lg='8' :xl='6'>
                <div class='item'>
                    <h4>贫困户养殖</h4>
                    <p v-for='(item,index) in load.poorBreed' :key='index'>
                        {{item.varName}}<span>{{item.count}}</span>{{item.unit}}
                    </p>
                </div>
            </el-col>
        </el-row>
    </div>
    <Foot></Foot>
</div>
</template>

<script>
import Newhead from '@/components/header/newhead'
import {
    detail
} from '@/api/basefarm'
import Foot from '@/components/footer'
import {
    mapGetters
} from 'vuex'
export default {
    components: {
        Newhead,
        Foot
    },
    data() {

        return {
            boff: false,
            none: "none",
            photos: [],
            bannerUrl: '',
            chartData: {
                columns: ['时间', '水质(ph)', '土壤(ph)', '温度(℃)', '湿度(%)', '二氧化碳(ppm)'],
                rows: []
            },
            load: {}
        }
    },
    created() {
        let id = this.$route.params.id;
        detail(id).then(res => {
            let {
                photos,
                trendsInfo
            } = res.data.data;
            console.log("photos:",photos)
            if (this.userinfo) {
                this.load = res.data
            } else {
                let livestockCount = res.data.data.livestockCount
                livestockCount.forEach(item => {
                    item.count = "***"
                })
                let poultryCount = res.data.data.poultryCount
                poultryCount.forEach(item => {
                    item.count = '***'
                })
                let insured = res.data.data.insured
                insured.forEach(item => {
                    item.count = '***'
                })
                let poorBreed = res.data.data.poorBreed
                poorBreed.forEach(item => {
                    item.count = '***'
                })
                this.load = {
                    address: '***',
                    coords: '***,***',
                    livestockCount,
                    poultryCount,
                    creditLimit: '***',
                    fodderDispatchQuantity: '***',
                    totalInsured: '***',
                    insured,
                    drivePoorCount: '***',
                    poorBreed
                }
            }
            if (photos) {
                this.photos = photos.split(',')
                this.bannerUrl = this.photos[0]
            }
            let arr = []
            for (let i = 0; i < trendsInfo.length; i++) {
                arr.push({
                    '时间': trendsInfo[i].time,
                    '水质(ph)': trendsInfo[i].water,
                    '土壤(ph)': trendsInfo[i].soil,
                    '温度(℃)': trendsInfo[i].temperature,
                    '二氧化碳(ppm)': trendsInfo[i].co2
                })
            }
            this.chartData.rows = arr
        })
    },
    computed: {
        ...mapGetters(['userinfo'])
    },
    methods: {
        checkimg(item) {
            this.bannerUrl = item
        },
        change(index) {
            this.bannerUrl = this.photos[index]
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/base";

.detail {
    @extend .otherhtml;

    &::-webkit-scrollbar {
        display: none;
    }

    .ve-line {
        background-color: #fff;
    }

    .banner {
        //  @include bgImg('../../assets/tinified/platform1.png');

        .contenta {
            @extend .width;
        }
    }

    .content {
        @extend .width;

        box-sizing: border-box;

        .el-row {
            .el-col {
                // box-shadow: #ccc 2px 2px 8px;
            }
        }

        .top {
            height: 365px;
            box-sizing: border-box;

            .el-col {
                margin-bottom: 20px;
            }

            .left {
                width: 100%;
                height: 200px;
                box-sizing: border-box;
                margin-bottom: 100px;

                .el-image {
                    height: 280px;
                }
            }

            .p {
                font-size: 12px;
                //  color: #999;
                color: #fff;
                text-align: center;
                margin-bottom: 10px;
            }

        }

        .introd {
            .el-col {
                .item {
                    width: 250px;
                    height: 180px;
                    box-shadow: 0px 14px 40px 0px rgba(0, 65, 157, 0.1), -1px -2px 18px 0px rgba(0, 65, 157, 0.1);
                    margin-bottom: 10px;
                    padding: 24px 28px;
                    border-radius: 10px;
                    box-sizing: border-box;
                    overflow-y: scroll;

                    &::-webkit-scrollbar {
                        display: none;
                    }

                    h4 {
                        font-size: 18px;
                        font-weight: 500;
                        //  color: #333;
                        color: #fff;
                        margin-bottom: 29px;
                    }

                    p {
                        //  color: #333;
                        color: #fff;
                        font-size: 14px;
                        margin-bottom: 8px;

                        i {
                            color: blue;
                        }

                        span {
                            color: #00419D;
                        }
                    }
                }
            }
        }
    }
}
</style>
