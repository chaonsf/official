<template>
<div class="policy">

    <Head></Head>
    <div class='content'>
        <van-image :src="url" fit='fill' />
        <div class='poli'>
            <h4>管理平台</h4>
            <p class='smt'>Management Platform</p>
            <ul class='good'>
                <li v-for='(item,ind) in manage' :key='ind'>
                    <van-image :src="item.url" fit='fill' />
                    <div>
                        <h5>{{item.title}}</h5>
                        <p>{{item.desc}}</p>
                    </div>
                </li>
            </ul>
            <h4>扶贫数据</h4>
            <p class='smt'>Base Distribution</p>
            <div class='zhanshi'>
                <van-row>
                    <van-col span="24">
                        <div class='item'>
                            <div class='left img'>
                                <img src="../../assets/new/icon11.png" />
                            </div>
                            <div class='right'>
                                <p class='number'>{{helpdata.povertyCount}}</p>
                                <p class='title'>帮扶贫困户数量（户）</p>
                            </div>
                        </div>
                    </van-col>
                    <van-col span="24">
                        <div class='item'>
                            <div class='left img'>
                                <img src="../../assets/new/icon10.png" />
                            </div>
                            <div class='right'>
                                <p class='number'>{{helpdata.povertyAvgAmount}}</p>
                                <p class='title'>贫困户平均增收</p>
                            </div>
                        </div>
                    </van-col>
                    <van-col span="24">
                        <div class='item'>
                            <div class='left'>
                                <div class='pie' id='poor'></div>
                            </div>
                            <div class='right'>
                                <p><span>{{helpdata.povertyLivestockCount}}</span>头</p>
                                <p>贫困户畜类在栏数量</p>
                                <p class='two'><span>{{helpdata.name1}}</span></p>
                                <p>占在栏畜类总数</p>
                            </div>
                        </div>
                    </van-col>
                    <van-col span="24">
                        <div class='item'>
                            <div class='left'>
                                <div class='pie' id='poor2'></div>
                            </div>
                            <div class='right'>
                                <p><span>{{helpdata.povertyPoultryCount}}</span>头</p>
                                <p>贫困户禽类在栏数量</p>
                                <p class='two'><span>{{helpdata.name2}}</span></p>
                                <p>占在栏禽类总数</p>
                            </div>
                        </div>
                    </van-col>
                    <van-col span="24">
                        <div class='item'>
                            <div class='left'>
                                <div class='pie' id='poor3'></div>
                            </div>
                            <div class='right'>
                                <p><span>{{helpdata.povertyTotalAmount}}</span>万元</p>
                                <p>帮助贫困户年产值</p>
                                <p class='two'><span>{{helpdata.name3}}</span></p>
                                <p>占平台年总产值</p>
                            </div>
                        </div>
                    </van-col>
                </van-row>
            </div>
        </div>
        <Foot></Foot>
    </div>
</div>
</template>

<script>
import Head from '@/components/header/mobile'
import Foot from '@/components/footer/mobie'
import echarts from 'echarts'
import {
    statistics
} from '@/api/policy'
export default {
    components: {
        Head,
        Foot
    },
    data() {
        return {
            url: require('../../assets/mobie/banner5.png'),
            manage: [{
                    url: require('../../assets/new/po1.png'),
                    title: '监管审批',
                    desc: '养殖场详情、环境监测、禽畜信息、出入栏信息、无害化审批、保单信息、借贷信息、检验检疫、饲喂信息、电商详情。'
                },
                {
                    url: require('../../assets/new/po2.png'),
                    title: '分级权限',
                    desc: '不同级别可浏览、审批辖下的信息不同部门浏览、审批各自所需信息。'
                },
                {
                    url: require('../../assets/new/po3.png'),
                    title: '灾害预警',
                    desc: '通过环境数据监测、报损数据分析可第一时间获知灾害、疫情等情况，及时采取应对措施。'
                }

            ],
            helpdata: {},
            label: { //显示线条
                show: true,
                position: 'inner',
                color: '#fff',
                fontSize: 16,
            },
            label2: { //隐藏线条
                show: false,
                position: 'inner',
            },
        }
    },
    created() {
        this.submit()
    },
    methods: {
        submit() {
            statistics().then(res => {
                let {
                    code,
                    data,
                    msg
                } = res.data;
                if (code == 200) {
                    this.helpdata = data;
                    this.helpdata.deffpovertyLivestockCount = parseInt(data.totalLivestockCount) - parseInt(data.povertyLivestockCount);
                    if (data.totalLivestockCount != 0) {
                        let name1 = (parseInt(data.povertyLivestockCount) / parseInt(data.totalLivestockCount) * 100).toFixed(2)
                        this.helpdata.name1 = name1 + '%'
                    } else {
                        this.helpdata.name1 = "0%";
                    }
                    this.helpdata.diffpovertyPoultryCount = parseInt(data.totalPoultryCount) - parseInt(data.povertyPoultryCount);
                    if (data.povertyPoultryCount != 0) {
                        let name2 = (parseInt(data.povertyPoultryCount) / parseInt(data.totalPoultryCount) * 100).toFixed(2)
                        this.helpdata.name2 = name2 + "%"
                    } else {
                        this.helpdata.name2 = "0%";
                    }
                    this.helpdata.diffpovertyTotalAmount = parseFloat(data.totalAmount) - parseFloat(data.povertyTotalAmount)
                    if (data.povertyTotalAmount != 0) {
                        let name3 = (parseFloat(data.povertyTotalAmount) / parseFloat(data.totalAmount) * 100).toFixed(2)
                        this.helpdata.name3 = name3 + "%";
                    } else {
                        this.helpdata.name3 = "0%";
                    }
                    this.draw()
                } else {
                    this.$msg({
                        msg: msg
                    })
                }
            })
        },
        draw() {
            this.poor()
            this.poor2()
            this.poor3()
        },
        poor() {
            let poorChart = echarts.init(document.getElementById('poor'));
            let option = {
                series: [{
                        name: '扶贫窗口数据',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [{
                                value: this.helpdata.deffpovertyLivestockCount,
                                name: '0',
                                selected: true,
                                itemStyle: {
                                    color: "#EA5E51",
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                },
                                label: this.label2
                            },
                            {
                                value: this.helpdata.povertyLivestockCount,
                                name: this.helpdata.name1,
                                itemStyle: {
                                    color: "#566ED4",
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                },
                                label: this.helpdata.name1 == "0%" ? this.label2 : this.label

                            },
                        ],
                    },

                ]
            }
            poorChart.setOption(option)
        },
        poor2() {
            let poorChart = echarts.init(document.getElementById('poor2'));
            let option = {
                series: [{
                        name: '扶贫窗口数据',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [{
                                value: this.helpdata.diffpovertyPoultryCount,
                                name: '0',
                                selected: true,
                                itemStyle: {
                                    color: "#FEA443",
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                },
                                label: this.label2
                            },
                            {
                                value: this.helpdata.povertyPoultryCount,
                                name: this.helpdata.name2,
                                itemStyle: {
                                    color: "#009AFF",
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                },
                                label: this.helpdata.name2 == "0%" ? this.label2 : this.label

                            },
                        ],
                    },

                ]
            }
            poorChart.setOption(option)
        },
        poor3() {
            let poorChart = echarts.init(document.getElementById('poor3'));
            let option = {
                series: [{
                        name: '扶贫窗口数据',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [{
                                value: this.helpdata.diffpovertyTotalAmount,
                                name: '0',
                                selected: true,
                                itemStyle: {
                                    color: "#2DB9BD",
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                },
                                label: this.label2
                            },
                            {
                                value: this.helpdata.povertyTotalAmount,
                                name: this.helpdata.name3,
                                itemStyle: {
                                    color: "#6C80D1",
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                },
                                label: this.helpdata.name3 == "0%" ? this.label2 : this.label

                            },
                        ],
                    },

                ]
            }
            poorChart.setOption(option)
        }
    },
}
</script>

<style lang="scss" scoped>
@import "../../styles/base";

.policy {
    @extend .mobieall;

    .content {
        overflow: scroll;
        height: 100%;

        &::-webkit-scrollbar {
            display: none;
        }

        .poli {
            padding-bottom: rem(46);

            h4 {
                @extend .mobileh5;
                text-align: center;
            }

            .smt {
                text-align: center;
            }

            .good {
                padding: 0 rem(49);
                color: #fff;
                text-align: center;

                .van-image {
                    width: 100%;
                }

                li {
                    margin-top: rem(40);

                    h5 {
                        margin: rem(27) 0 rem(14);
                        font-size: 16px;
                        font-weight: normal;
                    }

                    p {
                        text-align: left;
                    }
                }

            }

            .zhanshi {
                padding: 0 rem(49);
                color: #fff;

                .item {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    min-height: rem(250);
                    font-size: 16px;

                    .left {
                        min-width: rem(190);
                        text-align: right;

                        &.img {
                            text-align: center;
                        }
                    }

                    img {
                        width: rem(56);
                        height: rem(56);
                    }

                    .right {
                        flex: 1;
                        padding-left: rem(42);
                        text-align: center;

                        .number {
                            color: #1eade9;
                            margin-bottom: rem(24);
                        }

                        span {
                            font-size: 20px;
                            color: #1eade9;
                            margin-right: 5px;
                        }
                    }
                }

                .pie {
                    width: rem(180);
                    height: rem(180);
                    text-align: right;
                }
            }
        }
    }

}
</style>
