<template>
<div class="index">
    <div class='headera'>
        <div class='top'>
            <Newhead></Newhead>
        </div>
        <ul class='left'>
            <li v-for='item in lists' :key='item.id' :class="[item.id==selected?'active':'']" @click='changeitem(item.id)'>
                <img :src="[item.id==selected?item.icon:item.icon2]" /><span>{{item.text}}</span>
            </li>
        </ul>
        <el-carousel height="402px" indicator-position='none' :autoplay='false' ref='carousel'>
            <el-carousel-item v-for="(item,index) in imgarr" :key="index">
                <el-image :src='item.url' fit='fill' @click='jump'></el-image>
            </el-carousel-item>
        </el-carousel>
    </div>
    <div class='product'>
        <h4>产品应用</h4>
        <p class='smtitle'>只为建立农业领域的诚信体系</p>
        <div class='content'>
            <ul class='mptitle'>
                <li v-for='item in procductapp' :key='item.id' :class="[item.id==productid?'active':'']" @click='changeapp(item.id)'>
                    <span>{{item.title}}</span>
                </li>
            </ul>
            <div class='right' v-for='item in productContent' :key='item.id' v-show='item.id==productid'>
                <div class='middle'>
                    <h5>{{item.title}}</h5>
                    <p v-for='(it,ind) in item.desc' :key='ind'>{{it}}</p>
                </div>
                <div class='rimg'>
                    <img :src='item.img' />
                </div>
            </div>
        </div>
    </div>
    <div class='digitial'>
        <h4>物联网智能传感器系列数字终端</h4>
        <p class='smtitle'>Internet of things intelligent sensor series digital terminal</p>
        <el-carousel height="260px" indicator-position='outside' :interval='10000'>
            <el-carousel-item v-for="(ite,index) in digitialfen" :key='index'>
                <ul class='ul'>
                    <li v-for="item in ite" :key='item.id' @click='detail(item.id)'>
                        <img :src='item.img' :class="['img'+ item.id]" />
                        <h5>{{item.title}}</h5>
                        <p>￥：{{item.price}}</p>
                    </li>
                </ul>
            </el-carousel-item>
        </el-carousel>
    </div>
    <div class='intro'>
        <div class='content'>
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
    </div>
    <div class='cooper'>
        <h4>合作伙伴</h4>
        <p class='smtitle'>cooperative partner</p>
        <ul>
            <li v-for='(item,index) in cooper' :key='index'>
                <img :src='item' />
            </li>
        </ul>
    </div>
    <Foot></Foot>
</div>
</template>

<script>
import Newhead from '@/components/header/newhead'
import Foot from "../../components/footer"
import isZoom from 'is-zoom'
import store from "@/store"
export default {
    components: {
        Newhead,
        Foot
    },
    data() {
        return {
            lists: [{
                    id: '0',
                    text: '物联网平台',
                    icon: require('../../assets/new/wulianwang.png'),
                    icon2: require('../../assets/new/wulianwang2.png')
                },
                {
                    id: '1',
                    text: '保险服务',
                    icon: require('../../assets/new/baoxian1.png'),
                    icon2: require('../../assets/new/baoxian.png')
                },
                {
                    id: '2',
                    text: '金融服务',
                    icon: require('../../assets/new/jinrong1.png'),
                    icon2: require('../../assets/new/jinrong.png')
                },
                {
                    id: '3',
                    text: '农资服务',
                    icon: require('../../assets/new/chain.png'),
                    icon2: require('../../assets/new/chain2.png'),
                },
                {
                    id: '4',
                    text: '机构服务',
                    icon: require('../../assets/new/gov.png'),
                    icon2: require('../../assets/new/gov2.png')
                },
            ],
            imgarr: [{
                    url: require('../../assets/tinified/index.png')
                },
                {
                    url: require('../../assets/tinified/policy.png')
                },
                {
                    url: require('../../assets/tinified/jinrong.png')
                },
                {
                    url: require('../../assets/tinified/farm.png')
                },
                {
                    url: require('../../assets/tinified/gov.png')
                },
            ],
            selected: 0,
            procductapp: [{
                    id: 1,
                    title: '壹农源APP'
                },
                {
                    id: 2,
                    title: "壹农源大数据管理平台"
                },
                {
                    id: 3,
                    title: '壹农源小程序'
                }
            ],
            productid: 1,
            productContent: [{
                    id: 1,
                    title: '壹农源旗下智慧农业管理app',
                    desc: ['“养殖”新武器，禽畜管理更高效，风险有保障，养殖资金随借随还，降低养殖门槛，让养殖更轻松。'],
                    img: require('../../assets/new/product1.png')
                },
                {
                    id: 2,
                    title: "壹农源旗下的智慧农业管理平台",
                    desc: ['政策监管新武器，辖下农业局势竟在掌握。', '农业保险管理新方案，尽赔尽保，低风险更高效。', '金融服务新赛道，资产清晰，风险可控。', '农资服务新模式，全程把控，合规更安全。'],
                    img: require('../../assets/new/product2.png')
                },
                {
                    id: 3,
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
                /*             {
                                id: 3,
                                img: require('../../assets/new/sensor.png'),
                                title: "壹农源土壤PH传感器",
                                price: 'XXXX元'
                            }, */
                {
                    id: 4,
                    img: require('../../assets/new/Integrated.png'),
                    title: "壹农源RFID无线一体机",
                    price: '4580元'
                },
                /*        {
                           id: 5,
                           img: require('../../assets/new/co2.png'),
                           title: "壹农源二氧化碳温湿度一体传感器",
                           price: 'XXXX元'
                       }, */
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
            introtitle: [{
                    id: 1,
                    title: "智慧农业",
                    icon: require('../../assets/new/intro1.png')
                },
                {
                    id: 2,
                    title: "社会责任",
                    icon: require('../../assets/new/intro2.png')
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
            cooper: [require('../../assets/new/cooper1.png'), require('../../assets/new/cooper2.png'), require('../../assets/new/cooper3.png'), require('../../assets/new/cooper4.png'), require('../../assets/new/cooper5.png')]

        }
    },
    created() {
        store.dispatch("CHECKTHEME", 1);
        this.fen()
        let zoom = isZoom()
        if (zoom) {
            this.$notify({
                title: "你的浏览器目前处于缩放状态，页面可能会出现错位现象，建议100%大小显示"
            })
        }
    },
    methods: {
        changeitem(id) {
            this.selected = id;
            this.$refs.carousel.setActiveItem(id)
        },
        changeapp(id) {
            this.productid = id
        },
        jump() {
            let id = this.selected;
            if (id == 0) {
                this.$router.push("/platform")
            } else if (id == 1) {
                this.$router.push("/insurance")
            } else if (id == 2) {
                this.$router.push('/finance')
            } else if (id == 3) {
                this.$router.push("/material")
            } else if (id == 4) {
                this.$router.push('/policy')
            }
        },
        detail(id) {
            this.$router.push("/equipment/" + id)
        },
        changeintro(id) {
            this.introid = id
        },
        fen() {
            let list = this.digitial;
            let arr = []
            for (var i = 0; i < list.length; i += 4) {
                arr.push(list.slice(i, i + 4))
            }
            this.digitialfen = arr
        }
    }
}
</script>

<style lang="scss">
@import "../../styles/base";

.index {
    width: 100%;
    height: 100%;
    background-image: url('../../assets/tinified/html.png');
    background-size: 100%;
    background-repeat: no-repeat;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }

    .contenta {
        @extend .width;
    }

    .headera {
        height: 402px;
        width: 100%;
        position: relative;

        .el-carousel {
            width: 100%;
            height: 402px;

            .el-image {
                height: 402px;
                width: 100%;
                cursor: pointer;
            }

            .el-carousel__container {
                height: 402px;
            }
        }

        .top {
            position: absolute;
            width: $body;
            height: 64px;
            left: 50%;
            margin-left: -600px;
            top: 0;
            z-index: 1000;
        }

        .left {
            position: absolute;
            width: 200px;
            height: 250px;
            left: 50%;
            top: 101px;
            margin-left: -600px;
            z-index: 1000;

            li {
                width: 200px;
                height: 50px;
                background-color: #162943;
                color: #fff;
                font-size: 14px;
                line-height: 50px;
                cursor: pointer;

                img {
                    width: 24px;
                    height: 24px;
                    margin-left: 49px;
                    margin-right: 5px;
                    margin-bottom: -5px;
                }
            }

            .active {
                background: linear-gradient(90deg, rgba(28, 212, 154, 1) 0%, rgba(17, 185, 211, 1) 100%)
            }
        }
    }

    .product {
        @extend .width;
        padding-top: 50px;

        h4 {
            @extend .h4;
        }

        .smtitle {
            color: rgba(255, 255, 255, .8);
        }

        .content {
            margin-top: 40px;
            overflow: hidden;

            .mptitle {
                width: 190px;
                height: 150px;
                background: #16263C;
                color: #fff;
                float: left;

                li {
                    width: 190px;
                    height: 50px;
                    line-height: 50px;
                    text-align: center;
                    font-size: 16px;
                    cursor: pointer;
                }

                .active {
                    background: linear-gradient(90deg, rgba(28, 212, 154, 1) 0%, rgba(17, 185, 211, 1) 100%)
                }
            }

            .right {
                float: left;
                padding-left: 65px;
                overflow: hidden;

                .middle {
                    float: left;
                    color: rgba(255, 255, 255, .8);
                    width: 523px;

                    h5 {
                        font-size: 22px;
                        margin-bottom: 20px;
                    }

                    p {
                        font-size: 14px;
                        line-height: 26px;
                    }
                }

                .rimg {
                    float: left;
                    padding-left: 93px;

                    img {
                        // width: 328px;
                        height: 208px;
                    }
                }
            }
        }
    }

    .digitial {
        @extend .width;
        padding-top: 50px;

        h4 {
            @extend .h4;
        }

        .ul {
            height: 260px;
            width: 100%;

            li {
                float: left;
                width: 260px;
                height: 260px;
                border: 1px solid rgba(255, 255, 255, 0.3);
                margin-right: 53px;
                box-sizing: border-box;
                text-align: center;
                position: relative;
                cursor: pointer;

                &:last-child {
                    margin-right: 0
                }

                .img1 {
                    margin-top: 46px;

                }

                .img2 {
                    margin-top: 25px;
                }

                .img3 {
                    margin-top: 50px;

                }

                .img4 {
                    margin-top: 26px;
                }

                .img5 {
                    margin-top: 34px;
                }

                .img6 {
                    margin-top: 32px;
                }

                .img7 {
                    margin-top: 39px;
                }

                .img8 {
                    margin-top: 42px;
                }

                .img9 {
                    margin-top: 46px;
                }

                &:hover {

                    h5,
                    p {
                        color: #1CD39C;
                    }
                }

            }

            h5 {
                font-size: 16px;
                color: #fff;
                font-weight: 500;
                position: absolute;
                bottom: 96px;
                left: 0;
                right: 0
            }

            p {
                position: absolute;
                color: #fff;
                font-size: 14px;
                bottom: 55px;
                left: 0;
                right: 0;
            }
        }
    }

    .el-carousel__indicators {
        margin-top: 20px;
    }

    .el-carousel__button {
        height: 4px;
    }

    .is-active {
        .el-carousel__button {
            background: #1cd49a;
        }
    }

    .el-carousel__arrow {
        display: none;
    }

    .intro {
        margin-top: 50px;
        width: 100%;
        height: 320px;
        background-image: url('../../assets/tinified/intro.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;

        .content {
            @extend .width;
            padding-left: 180px;
            padding-top: 34px;
            height: 320px;

            .trid {
                width: 550px;
                height: 252px;
                padding-left: 18px;
                background: rgba(255, 255, 255, 0.3);

                .title {
                    padding-top: 38px;
                    text-align: center;
                    width: 104px;
                    height: 252px;
                    border-right: 1px solid #fff;
                    float: left;

                    li {
                        margin-bottom: 56px;
                        width: 104px;
                        cursor: pointer;
                    }

                    li.active {
                        border-right: 3px solid #1CD499;
                    }

                    h5 {
                        font-weight: 400;
                        color: #fff;
                    }
                }

                .right {
                    float: left;
                    width: 420px;
                    height: 252px;
                    padding-left: 32px;
                    box-sizing: border-box;
                    padding: 12px 38px 0 32px;
                    color: rgba(255, 255, 255, .8);
                    overflow-y: scroll;

                    &::-webkit-scrollbar {
                        display: none;
                    }

                    h5 {
                        font-size: 18px;
                        margin-bottom: 10px;
                    }

                    p {
                        font-size: 14px;
                        line-height: 20px;
                    }
                }
            }
        }
    }

    .cooper {
        @extend .width;
        padding: 50px 0;

        h4 {
            @extend .h4;
        }

        ul {
            overflow: hidden;
            padding-left: 14px;

            li {
                float: left;
                margin-left: 83px;
            }
        }
    }
}
</style>
