<template>
<div class='footer'>
    <ul>
        <li class='item'>
            <img src='../../assets/mobie/call.svg' />
            <span>021-61984811</span>
        </li>
        <li class='item'>
            <img src='../../assets/mobie/map.svg' />
            <span>上海市宝山区泰和路2038号G座</span>
        </li>
        <li class='item'>
            <img src='../../assets/mobie/mail.svg' />
            <span>yinongyuan@atu.cn.com</span>
        </li>
        <li class='item about' @click='aboutus'>
            <img src='../../assets/mobie/about.svg' class='about1' />
            <span>关于我们</span>
        </li>
    </ul>
    <p>© 2020 版权所有 安徽壹农源科技有限公司. </p>
    <p>皖ICP备2020014728号-1</p>
</div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        aboutus() {
            this.$router.push('/about')
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/base";

.footer {
    background: #010B20;
    padding-bottom: rem(52);

    ul {
        li {
            padding-left: rem(44);
            color: #fff;
            width: 100%;
            height: rem(70);
            display: flex;
            align-items: center;
            border-bottom: 1px solid rgba(255, 255, 255, .3);
            font-size: 14px;

            img {
                width: rem(37);
                margin-right: rem(18);
            }
        }
    }

    p {
        color: #fff;
        font-size: 14px;
        padding-left: rem(44);
        line-height: 26px;
    }
}
</style>
