<template>
<div class='about'>

    <Head></Head>
    <div class='content'>
        <van-image :src="url" fit='fill' />
        <div class='jieshao'>
            <h4>公司介绍</h4>
            <p class='smt'>Company Profile</p>
            <van-image :src="url2" fit='fill' class='tea' />
            <p class='f14'>壹农源是一家以数据服务为核心能力的农业领域数字化管理平台，通过对农业养殖物联网多源信息智能化数据采集设备及技术，对农业养殖基础信息、服务信息、管理信息和空间信息进行采集、分析和处理，建立统一的农业养殖信息资源综合服务和智能分析系统，实现大数据的共享性、复用性、高效性的数字化优势，辅助政府部门对农村农业产业进行宏观调控、对农产品质量进行全面监管，为服务对象提供综合信息服务。</p>
            <h4>企业文化</h4>
            <p class="smt">corporate Culture</p>
            <ul class='square'>
                <li v-for='(item,index) in square' :key='index'>
                    <van-image :src="item.url" fit='fill' />
                    <h5>{{item.title}}</h5>
                    <p>{{item.desc}}</p>
                </li>
            </ul>
            <h4>公司相册</h4>
            <p class='smt'>Company Album</p>
            <van-row class='photo' gutter='20'>
                <van-col span="12" v-for="(item,index) in banner" :key='index' @click.native='yulan(item)'>
                    <van-image :src="item" fit='fill' />
                </van-col>
                <van-col span='12'></van-col>
            </van-row>
        </div>
        <Foot></Foot>
    </div>
</div>
</template>

<script>
import Head from '@/components/header/mobile'
import Foot from '@/components/footer/mobie'
import {
    ImagePreview
} from 'vant';
export default {
    components: {
        Head,
        Foot
    },
    data() {
        return {
            url: require('../../assets/mobie/banner8.png'),
            url2: require('../../assets/about/tea.png'),
            square: [{
                    title: '企业标语',
                    desc: '开拓、拼搏、诚信、服务，责任',
                    url: require("../../assets/about/about1.png")
                },
                {
                    title: '企业口号',
                    desc: '开拓创新，顽强拼搏，与时俱进，争创一流',
                    url: require("../../assets/about/about2.png")
                },
                {
                    title: '企业SLOG',
                    desc: '数字农业，科技赋能',
                    url: require("../../assets/about/about3.png")
                }
            ],
            banner: [require("../../assets/about/about4.png"), require("../../assets/about/about5.png"), require("../../assets/about/about6.png")],

        }
    },
    methods: {
        yulan(item) {
            ImagePreview({
                images: [
                    item
                ],
            });
        }
    },
}
</script>

<style lang="scss" scoped>
@import "../../styles/base";

.about {
    @extend .mobieall;

    .content {
        overflow: scroll;
        height: 100%;

        &::-webkit-scrollbar {
            display: none;
        }

        .jieshao {
            text-align: center;
            padding: 0 rem(49);

            h4 {
                @extend .mobileh5;
            }

            .tea {
                margin-top: rem(39);
            }

            p.f14 {
                color: #fff;
                text-align: left;
                margin-top: rem(25);
            }

            .square {
                li {
                    margin-top: rem(29);
                    color: #fff;

                    .van-image {
                        width: rem(82);
                    }

                    h5 {
                        font-size: 16px;
                        font-weight: normal;
                        margin: rem(21) 0 rem(15);
                    }

                    p {
                        font-size: 14px;
                    }
                }

            }

            .photo {
                padding: rem(27) 0;

                .van-col {
                    margin-top: rem(10);
                }
            }
        }

    }
}
</style>
