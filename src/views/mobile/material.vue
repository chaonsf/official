<template>
<div class='agri'>

    <Head></Head>
    <div class='content'>
        <van-image :src="url" fit='fill' />
        <div class='middle'>
            <h4>农资商城</h4>
            <p class='smt'>Agricultural Materials Mall</p>
            <ul>
                <li v-for='(item,index) in nongzi' :key='index'>
                    <van-image :src="item.url" fit='fill' />
                    <h5>{{item.title}}</h5>
                    <p>{{item.desc}}</p>
                </li>
            </ul>
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
            url: require('../../assets/mobie/banner4.png'),
            nongzi: [{
                    url: require('../../assets/new/mat1.png'),
                    title: '农资饲料',
                    desc: '严格筛选农资饲料等供应商，安全高效。'
                },
                {
                    url: require('../../assets/new/mat2.png'),
                    title: '医疗疫苗',
                    desc: '严格筛选疫苗、兽医、兽药服务商，保障禽畜资产。'
                },
                {
                    url: require('../../assets/new/mat3.png'),
                    title: '支付便捷',
                    desc: '支付宝、微信、银行卡、白条支付等多种选择。'
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/base";

.agri {
    @extend .mobieall;

    .content {
        overflow: scroll;
        height: 100%;

        &::-webkit-scrollbar {
            display: none;
        }

        .middle {
            text-align: center;
            padding-bottom: rem(57);

            h4 {
                @extend .mobileh5
            }

            ul {
                color: #fff;

                li {
                    margin-top: rem(36);

                    h5 {
                        margin-top: rem(35);
                        margin-bottom: rem(21);
                        font-size: 16px;
                        font-weight: normal;
                    }
                }
            }
        }
    }
}
</style>
