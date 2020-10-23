<template>
<div class="finance">
    <div class='banner'>
        <div class="contenta">
            <Newhead></Newhead>
        </div>
    </div>
    <div class='content'>
        <h4>安全保障</h4>
        <p class='smtitle'>Security</p>
        <ul class='good'>
            <li v-for="(item,ind) in finance" :key='ind'>
                <img :src='item.url' />
                <h5>{{item.title}}</h5>
                <p>{{item.desc}}</p>
            </li>
        </ul>
        <h4>合作企业</h4>
        <p class='smtitle'>Cooperative enterprise</p>
        <div class='cooper'>
            <img src='../../assets/new/zhifubao.png' />
        </div>
    </div>

    <Foot></Foot>
</div>
</template>

<script>
import Newhead from '@/components/header/newhead'
import Foot from '@/components/footer'
import store from '@/store'

export default {
    components: {
        Newhead,
        Foot
    },
    data() {
        return {
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
    },
    created() {
        store.dispatch("CHECKTHEME", 5)
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/base";

.finance {
    @extend .otherhtml;

    &::-webkit-scrollbar {
        display: none;
    }

    .banner {
        @include bgImg('../../assets/tinified/jinrong.png');

        .contenta {
            @extend .width;
        }
    }

    .content {
        @extend .width;
        padding-bottom: 156px;

        h4 {
            margin-top: 50px;
            @extend .h4;
        }

        .good {
            overflow: hidden;

            li {
                float: left;
                color: rgba(255, 255, 255, 0.8);
                text-align: center;
                padding: 0 85px;
                border-right: 2px solid rgba(255, 255, 255, 0.03);

                &:first-child {
                    padding-left: 0;
                    margin-left: 10px;
                }

                &:last-child {
                    padding-right: 0;
                    border-right: none;
                }

                img {
                    width: 48px;
                    height: 48px;
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

        .cooper {
            text-align: center;
        }
    }

}
</style>
