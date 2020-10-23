<template>
<div class="insurance">
    <div class='banner'>
        <div class="contenta">
            <Newhead></Newhead>
        </div>
    </div>
    <div class="inContent">
        <h4>安全保障</h4>
        <p class='smtitle'>Security</p>
        <ul class='good'>
            <li v-for="(item,ind) in policy" :key='ind'>
                <img :src='item.url' />
                <div>
                    <h5>{{item.title}}</h5>
                    <p v-for="(it,ind) in item.desc" :key='ind'>{{it}}</p>
                </div>
            </li>
        </ul>
        <h4>合作企业</h4>
        <p class='smtitle'>Cooperative enterprise</p>
        <div class='cooper'>
            <img src='../../assets/new/guoyuan.png' />
            <div>
                <h5>国元保险</h5>
                <p>养鸡险</p>
                <p class='desc'>自然灾害 | 疫病</p>
            </div>
        </div>
    </div>
    <Foot></Foot>
</div>
</template>

<script>
import Newhead from '@/components/header/newhead'
import Foot from '@/components/footer'
import store from "@/store"

export default {
    components: {
        Newhead,
        Foot
    },
    data() {
        return {
            policy: [{
                    url: require('../../assets/new/policy1.png'),
                    title: '一键投保',
                    desc: ['每只禽畜拥有唯一身份证编码，并包含相应信息，可自动生成标的清单，一键投保。']
                },
                {
                    url: require('../../assets/new/policy3.png'),
                    title: '极速理赔',
                    desc: ['报损后可进行在线极速理赔。']
                },
                {
                    url: require('../../assets/new/policy2.png'),
                    title: '超低门槛',
                    desc: ['节省了大量的人工投保理赔等环节,', '可实现线上0门槛投保。']
                },
            ]
        }
    },
    created() {
        store.dispatch("CHECKTHEME", 4)
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/base";

.insurance {
    @extend .otherhtml;

    &::-webkit-scrollbar {
        display: none;
    }

    .banner {
        @include bgImg('../../assets/tinified/policy.png');

        .contenta {
            @extend .width;
        }
    }

    .inContent {
        @extend .width;
        padding-bottom: 50px;

        h4 {
            margin-top: 50px;
            @extend .h4;
        }

        .good {
            overflow: hidden;

            li {
                float: left;
                width: 340px;
                height: 289px;
                color: rgba(255, 255, 255, 0.8);
                margin-right: 66px;

                &:last-child {
                    margin-right: 0;
                }

                &:first-child {
                    margin-left: 15px;
                }

                img {
                    width: 340px;
                    height: 155px;
                    vertical-align: top
                }

                div {
                    width: 340px;
                    height: 134px;
                    background: rgba(255, 255, 255, 0.2);
                    padding: 25px 10px 0 10px;
                    text-align: center;

                    h5 {
                        font-size: 22px;
                        font-weight: normal;
                        margin-bottom: 21px;

                    }

                    p {
                        font-size: 14px;
                        //margin-top: 21px;
                    }
                }
            }
        }

        .cooper {
            width: 1019px;
            height: 286px;
            padding-top: 26px;
            background: rgba(255, 255, 255, 0.3);
            margin: 0 auto;
            position: relative;

            img {
                width: 504px;
                height: 286px;
                position: absolute;
                left: 76px;
                bottom: 26px;
            }

            div {
                padding-left: 631px;
                color: rgba(255, 255, 255, 0.8);
                padding-top: 38px;

                h5 {
                    margin-bottom: 45px;
                    font-size: 29px;
                    font-weight: 500px;
                }

                p {
                    font-size: 23px;
                }

                .desc {
                    font-size: 18px;
                    margin-top: 5px;
                }
            }
        }
    }

}
</style>
