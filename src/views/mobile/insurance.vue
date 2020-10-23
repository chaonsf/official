<template>
<div class='insurance'>

    <Head></Head>
    <div class='content'>
        <van-image :src="url" fit='fill' />
        <div class='inner'>
            <h4>安全保障</h4>
            <p class='smt'>Security</p>
            <ul class='good'>
                <li v-for="(item,ind) in policy" :key='ind'>
                    <van-image :src="item.url" fit='fill' />
                    <div class='desc'>
                        <h5>{{item.title}}</h5>
                        <p>{{item.desc}}</p>
                    </div>
                </li>
            </ul>
            <h4>合作企业</h4>
            <p class='smt'>Cooperative enterprise</p>
            <div class='cooper'>

                <div class='miao'>
                    <van-image :src="cooper" fit='fill' />
                    <h5>国元保险</h5>
                    <p>养鸡险</p>
                    <p class='desc'>自然灾害 | 疫病</p>
                </div>
            </div>
        </div>
        <Foot></Foot>
    </div>
</div>
</template>

<script>
import Head from '@/components/header/mobile'
import Foot from '@/components/footer/mobie'
export default {
    components: {
        Head,
        Foot
    },
    data() {
        return {
            url: require('../../assets/mobie/banner6.png'),
            policy: [{
                    url: require('../../assets/mobie/policy1.png'),
                    title: '一键投保',
                    desc: '每只禽畜拥有唯一身份证编码，并包含相应信息，可自动生成标的清单，一键投保。'
                },
                {
                    url: require('../../assets/mobie/policy2.png'),
                    title: '极速理赔',
                    desc: '报损后可进行在线极速理赔。'
                },
                {
                    url: require('../../assets/mobie/policy3.png'),
                    title: '超低门槛',
                    desc: '节省了大量的人工投保理赔等环节,可实现线上0门槛投保。'
                },
            ],
            cooper: require('../../assets/mobie/guoyuan.png')
        }
    }
}
</script>

<style lang="scss">
@import "../../styles/base";

.insurance {
    @extend .mobieall;

    .content {
        overflow: scroll;
        height: 100%;

        &::-webkit-scrollbar {
            display: none;
        }

        .inner {
            text-align: center;
            padding-bottom: rem(57);

            h4 {
                @extend .mobileh5
            }

            .good {
                padding-left: rem(44);
                padding-right: rem(52);
                color: #fff;

                li {
                    margin-top: rem(39);

                    .van-image {
                        vertical-align: top;
                        width: 100%;
                    }

                    .desc {
                        height: rem(169);
                        padding: rem(19) rem(63);
                        background: rgba(255, 255, 255, 0.2);

                        h5 {
                            margin-bottom: rem(24);
                            font-size: 16px;
                            font-weight: normal;
                        }

                    }
                }
            }

            .cooper {
                padding-left: rem(25);
                padding-right: rem(23);
                margin-top: rem(42);

                .miao {
                    width: 100%;
                    height: rem(228.8);
                    background: rgba(255, 255, 255, 0.3);
                    color: #fff;
                    position: relative;
                    padding-top: rem(30);
                    text-align: left;

                    .van-image {
                        position: absolute;
                        width: rem(392);
                        left: rem(60);
                        bottom: rem(21);
                    }

                    h5 {
                        margin: 0 0 rem(35) rem(482);
                        font-size: 16px;
                        font-weight: normal;
                    }

                    p {
                        margin-left: rem(482);
                        margin-bottom: rem(10);
                    }
                }

            }
        }
    }
}
</style>
