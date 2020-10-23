<template>
<div class='mobile'>

    <Head class='headers'></Head>
    <div class='content'>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item,index) in imgarr" :key="index">
                <van-image :src="item.url" fit='fill' />
            </van-swipe-item>
        </van-swipe>
        <div class='list'>
            <van-tabs v-model="productid">
                <van-tab v-for='item in productContent' :key='item.id' :title='item.title1'>
                    <h5>{{item.title}}</h5>
                    <p v-for='(it,ind) in item.desc' :key='ind'>{{it}}</p>
                </van-tab>
            </van-tabs>
        </div>
        <div class='hardware'>
            <h5>IOT智能硬件</h5>
            <p class='smt'>IOT intelligent hardware</p>
            <ul>
                <li v-for='item in digitialfen' :key='item.id' @click='jieshao(item.id)'>
                    <van-image :src="item.img" fit='fill' />
                    <h4>{{item.title}}</h4>
                    <p>￥{{item.price}}</p>
                </li>
            </ul>
            <div class='more' @click='querymore' v-show='moreboff'>查看更多
                <van-icon name="arrow" />
            </div>
        </div>
        <div class='intro'>
            <div class='trid'>
                <ul class='title'>
                    <li v-for='item in introtitle' :key='item.id' :class="[item.id==introid?'active':'']" @click='changeintro(item.id)'>
                        <img :src='item.icon' />
                        <h5>{{item.title}}</h5>
                    </li>
                </ul>
                <div class='right' v-for='item in introcontent' :key='item.id' v-show='item.id==introid'>
                    <h5>{{item.title}}</h5>
                    <p v-for='(it,ind) in item.desc' :key='ind'>{{it}}</p>
                </div>
            </div>
        </div>
        <div class='new'>
            <h5>新闻资讯</h5>
            <p class="smt">News and information</p>
            <ul>
                <li v-for='item in newsdata' :key='item.id' @click='detail(item.id)'>
                    <div class='left'>
                        <p class='title'>{{item.tile}}</p>
                        <p class='desc'>{{item.publishTime.substring(0,10)}}</p>
                    </div>
                    <van-image :src="item.imgUrl" fit='fill' />
                </li>
            </ul>
            <van-loading type="spinner" v-show='loading' />
            <div class='more' @click='getmore' v-show='newboff'>查看更多
                <van-icon name="arrow" />
            </div>
        </div>
        <div class='cooper'>
            <h5>合作伙伴</h5>
            <p class='smt'>cooperative partner</p>
            <van-row gutter="20">
                <van-col span='8' v-for='(item,index) in cooper' :key='index'>
                    <van-image :src="item" fit='fill' />
                </van-col>
            </van-row>
        </div>
        <Foot></Foot>
    </div>
</div>
</template>

<script>
import Head from '@/components/header/mobile'
import Foot from "@/components/footer/mobie"
import {
    newslist
} from '@/api/settlement'

export default {
    components: {
        Head,
        Foot
    },
    data() {
        return {
            imgarr: [{
                    url: require('../../assets/mobie/banner1.png'),
                },
                {
                    url: require('../../assets/mobie/banner2.png'),
                },
                {
                    url: require('../../assets/mobie/banner3.png'),
                },
                {
                    url: require('../../assets/mobie/banner4.png'),
                },
                {
                    url: require('../../assets/mobie/banner5.png'),
                }
            ],
            productid: 0,
            productContent: [{
                    id: 1,
                    title1: '壹农源APP',
                    title: '壹农源旗下智慧农业管理app',
                    desc: ['“养殖”新武器，禽畜管理更高效，风险有保障，养殖资金随借随还，降低养殖门槛，让养殖更轻松。'],
                    img: require('../../assets/new/product1.png')
                },
                {
                    id: 2,
                    title1: "大数据管理平台",
                    title: "壹农源旗下的智慧农业管理平台",
                    desc: ['政策监管新武器，辖下农业局势竟在掌握。', '农业保险管理新方案，尽赔尽保，低风险更高效。', '金融服务新赛道，资产清晰，风险可控。', '农资服务新模式，全程把控，合规更安全。'],
                    img: require('../../assets/new/product2.png')
                },
                {
                    id: 3,
                    title1: '壹农源小程序',
                    title: "壹农源旗下生态食品购物小程序",
                    desc: ['新鲜禽畜肉类全程溯源', '从出生到餐桌一目了然', '养殖环境全程直播', '不定期会员活动让利多多', '更有趣味农场等你来经营哟...'],
                    img: require('../../assets/new/product3.png')
                }
            ],
            digitial: [{
                    id: 1,
                    img: require('../../assets/new/terminator.png'),
                    title: "壹农源云视频终端器",
                    price: '1180元'
                },
                {
                    id: 2,
                    img: require('../../assets/new/bluetooth.png'),
                    title: "壹农源超高频蓝牙发卡器",
                    price: '2280元'
                },
                {
                    id: 4,
                    img: require('../../assets/new/Integrated.png'),
                    title: "壹农源RFID无线一体机",
                    price: '4580元'
                },
                {
                    id: 6,
                    img: require('../../assets/new/transmission.png'),
                    title: "壹农源智联传输服务器",
                    price: '1580元'
                },
                {
                    id: 7,
                    img: require('../../assets/new/water.png'),
                    title: "壹农源环境监测终端",
                    price: '3800元'
                },
                {
                    id: 8,
                    img: require('../../assets/new/radio.png'),
                    title: "壹农源无线传输电台",
                    price: '3680元'
                },
                {
                    id: 9,
                    img: require('../../assets/new/server.png'),
                    title: "壹农源工业数字服务器",
                    price: '11800元'
                },
            ],
            digitialfen: [],
            moreboff: true,
            introtitle: [{
                    id: 1,
                    title: "智慧农业",
                    icon: require('../../assets/mobie/intro1.svg')
                },
                {
                    id: 2,
                    title: "社会责任",
                    icon: require('../../assets/mobie/intro2.svg')
                },
            ],
            introid: 1,
            introcontent: [{
                    id: 1,
                    title: '智慧农业',
                    desc: ['集互联网、移动互联网、云计算和物联网技术为一体，依托智能化监测设备（环境温湿度、土壤水分、二氧化碳、图像等）和无线通信网络实现农业生产环境的智能感知、智能预警、智能决策、智能分析，为农业生产提供精准化养殖、可视化管理、智能化决策。']
                },
                {
                    id: 2,
                    title: '社会责任',
                    desc: ['2019年起壹农源多次在上海组织募捐，向宿松县30多户贫困家庭捐赠了物资和资金。',
                        '2020年疫情最严重期间，壹农源向宿松县破凉镇、孚玉镇等捐赠了口罩、消毒酒精、测温仪等物资。同时向孚玉镇、陈汉、隘口、二郞、凉亭乡等地收购的土鸡数量达9万只、蔬菜、水果8300多斤，解决了种、养殖户疫情期间的燃眉之急。',
                        '2020年6月，宿松遭受连续暴雨袭击，长江抗洪形势严峻，政府部门、人民子弟兵等抗洪力量持续奋战在一线，满口香向一线抗洪指挥部捐赠了近2万元的救灾物资。'
                    ]
                },
            ],
            page: {
                total: 0,
                currentPage: 1,
                pageSize: 2,
            },
            loading: false,
            newsdata: [],
            newboff: true,
            cooper: [require('../../assets/new/cooper1.png'), require('../../assets/new/cooper2.png'), require('../../assets/new/cooper3.png'), require('../../assets/new/cooper4.png'), require('../../assets/new/cooper5.png'), require('../../assets/mobie/zhifubao.png')]
        }
    },
    created() {
        this.load()
    },
    methods: {
        load() {
            this.digitialfen = [this.digitial[0], this.digitial[1]];
            this.fresh()

        },
        querymore() {
            this.digitialfen = this.digitial
            this.moreboff = false
        },
        changeintro(id) {
            this.introid = id
        },
        fresh() {
            this.loading = true;
            let param = {
                current: this.page.currentPage,
                size: this.page.pageSize,
                type: '2,3'
            }
            newslist(param).then(res => {
                let {
                    code,
                    data
                } = res.data;
                this.loading = false
                if (code == 200) {
                    let records = data.records
                    this.page.total = data.total
                    this.newsdata = this.newsdata.concat(records)
                    if (this.newsdata.length == data.total) {
                        this.newboff = false
                    }
                }
            })
        },
        getmore() {
            this.page.currentPage = ++this.page.currentPage;
            if (this.total == this.newsdata.length) {
                this.$msg({
                    msg: '没有更多新闻'
                })
                this.newboff = false
            } else {
                this.fresh()
            }
        },
        detail(id) {
            this.$router.push('/news/' + id)
        },
        jieshao(id) {
            this.$router.push('/mobiequip/' + id)
        }
    },
}
</script>

<style lang="scss">
@import "../../styles/base";

.mobile {
    @extend .mobieall;

    .content {
        // display: flex;
        //flex: 1 1 auto;
        overflow: scroll;

        &::-webkit-scrollbar {
            display: none;
        }

        .my-swipe {
            .el-image {
                width: 100%;
            }
        }

        .list {
            .van-tabs {
                .van-tab {
                    font-size: 16px;
                }

                .van-tabs__nav {
                    background: none;

                    .van-tab {
                        color: #fff;
                        border-bottom: 1px solid rgba(255, 255, 255, .3);
                    }

                    .van-tab--active {
                        border-bottom: 2px solid #1CD29B;
                    }

                    .van-tabs__line {
                        //background-color: #1CD29B;
                        width: 0;
                    }
                }
            }

            .van-tabs__content {
                text-align: center;

                h5 {
                    font-size: 16px;
                    color: #fff;
                    font-weight: normal;
                    margin-top: rem(38);
                    margin-bottom: rem(25);
                    text-align: center;
                }

                p {
                    color: rgba(255, 255, 255, .8);
                    line-height: 20px;
                    //width: rem(606);
                }
            }
        }

        .hardware {
            text-align: center;

            h5 {
                @extend .mobileh5
            }

            ul {
                li {
                    margin-top: rem(70);
                    color: #1CD29B;

                    .van-image {
                        max-width: rem(291);
                    }

                    h4 {
                        margin-top: rem(34);
                        font-size: 16px;
                        margin-bottom: rem(18);
                        font-weight: normal;
                    }

                    p {
                        font-size: 14px;
                    }
                }
            }
        }

        .more {
            font-size: 14px;
            color: #fff;
            margin-top: rem(42);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .intro {
            height: rem(320);
            margin-top: rem(60);
            background: url('../../assets/mobie/intro.png') no-repeat;
            background-size: cover;
            padding-top: rem(34);
            padding-left: rem(61);

            .trid {
                width: rem(620);
                height: rem(252);
                background: rgba(255, 255, 255, .3);

                .title {
                    padding-top: rem(33);
                    text-align: center;
                    width: rem(134);
                    height: rem(252);
                    border-right: 1px solid #fff;
                    float: left;

                    li {
                        margin-bottom: rem(35);
                        width: rem(134);
                        cursor: pointer;

                        img {
                            width: rem(40);
                        }
                    }

                    li.active {
                        border-right: 2px solid #1CD499;
                    }

                    h5 {
                        font-weight: 400;
                        color: #fff;
                    }
                }

                .right {
                    float: left;
                    width: rem(485);
                    height: rem(252);
                    box-sizing: border-box;
                    padding: rem(15) rem(17) 0 rem(23);
                    color: rgba(255, 255, 255, .8);
                    overflow-y: scroll;

                    &::-webkit-scrollbar {
                        display: none;
                    }

                    h5 {
                        font-size: 16px;
                        margin-bottom: 10px;
                        font-weight: normal;
                    }

                    p {
                        font-size: 14px;
                        line-height: 16px;
                    }
                }
            }
        }

        .new {

            h5 {
                @extend .mobileh5;
                text-align: center;
            }

            .smt {
                text-align: center;
            }

            ul {
                li {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    padding: rem(29) rem(51) rem(10) 0;
                    border-bottom: 1px solid rgba(255, 255, 255, .3);

                    .left {
                        padding-left: rem(50);
                        width: rem(418);
                        box-sizing: border-box;

                        .title {
                            font-size: 18px;
                            color: #fff;
                        }

                        .desc {
                            margin-top: rem(29);
                            color: #eaeaea;
                            font-size: 14px;
                        }
                    }

                    .van-image__img {
                        width: rem(240);
                        height: rem(180);
                    }
                }
            }

        }

        .cooper {
            text-align: center;
            padding-bottom: rem(15);

            h5 {
                @extend .mobileh5;

            }

            .van-row {
                padding: rem(24) rem(50);

                .van-col {
                    margin-bottom: rem(18);
                }
            }
        }
    }
}
</style>
