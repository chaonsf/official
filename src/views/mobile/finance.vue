<template>
<div class='fin'>

    <Head></Head>
    <div class='content'>
        <van-image :src="url" fit='fill' />
        <div class='call'>
            <h4>安全保障</h4>
            <p class='smt'>Security</p>
            <ul class='good'>
                <li v-for="(item,ind) in finance" :key='ind'>
                    <van-image :src="item.url" fit='fill' />
                    <h5>{{item.title}}</h5>
                    <p>{{item.desc}}</p>
                </li>
            </ul>
            <h4>合作企业</h4>
            <p class='smt'>Cooperative enterprise</p>
            <div class='cooper'>
                <img src='../../assets/new/zhifubao.png' />
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
            url: require('../../assets/mobie/banner3.png'),
            finance: [{
                    url: require('../../assets/new/fin1.png'),
                    title: '资产清晰',
                    desc: '每只禽畜拥有唯一身份编码，资产总值清晰可查。'
                },
                {
                    url: require('../../assets/new/fin2.png'),
                    title: '风险可控',
                    desc: '禽畜资产由保险公司承保，降低还款风险。'
                },
                {
                    url: require('../../assets/new/fin3.png'),
                    title: '资金灵活',
                    desc: '禽畜供应链商城随买随还。'
                },
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/base";

.fin {
    @extend .mobieall;

    .content {
        overflow: scroll;
        height: 100%;

        &::-webkit-scrollbar {
            display: none;
        }

        .call {
            text-align: center;
            padding-bottom: rem(43);

            h4 {
                @extend .mobileh5
            }

            .good {
                color: #fff;

                li {
                    margin-top: rem(38);

                    h5 {
                        margin: rem(30) 0 rem(21);
                        font-size: 16px;
                        font-weight: normal;
                    }
                }
            }

            .cooper {
                margin-top: rem(29);
            }
        }
    }
}
</style>
