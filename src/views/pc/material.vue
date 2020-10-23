<template>
<div class="material">
    <div class='banner'>
        <div class="contenta">
            <Newhead></Newhead>
        </div>
    </div>
    <div class="content">
        <h4>农资商城</h4>
        <p class='smtitle'>Agricultural Materials Mall</p>
        <ul>
            <li v-for='(item,index) in nongzi' :key='index'>
                <img :src='item.url' />
                <h5>{{item.title}}</h5>
                <p>{{item.desc}}</p>
            </li>
        </ul>
    </div>
    <Foot></Foot>
</div>
</template>

<script>
import Newhead from '@/components/header/newhead'
import Foot from '@/components/footer'
import store from '@/store'
export default {
    name: "material",
    components: {
        Newhead,
        Foot
    },
    data() {
        return {
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
    },
    created() {
        store.dispatch("CHECKTHEME", 3)
    },
}
</script>

<style lang="scss" scoped>
@import "../../styles/base";

.material {
    @extend .otherhtml;

    &::-webkit-scrollbar {
        display: none;
    }

    .banner {
        @include bgImg('../../assets/tinified/farm.png');

        .contenta {
            @extend .width;
        }
    }

    .content {
        @extend .width;
        padding-bottom: 191px;

        h4 {
            margin-top: 50px;
            @extend .h4;
        }

        ul {
            overflow: hidden;

            li {
                float: left;
                color: rgba(255, 255, 255, 0.8);
                text-align: center;
                padding: 0 85px;
                border-right: 2px solid rgba(255, 255, 255, 0.03);

                &:first-child {
                    padding-left: 0;
                }

                &:last-child {
                    padding-right: 0;
                    border-right: none;
                }

                img {
                    width: 43px;
                    height: 50px;
                }

                h5 {
                    margin-top: 34px;
                    margin-bottom: 21px;
                    font-size: 22px;
                    font-weight: 400;
                }

                p {
                    width: 273px;
                    font-size: 14px;
                }
            }
        }
    }

}
</style>
