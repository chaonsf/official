<template>
<div class='header'>
    <slot>
        <img src='../../assets/mobie/logo.svg' class="img" />
    </slot>

    <img :src="[boff?require('../../assets/mobie/close.svg'):require('../../assets/mobie/more.svg')]" class='fold' @click='fold' />
    <ul class='forms' v-show='boff'>
        <li v-for='item in list' :key='item.id' @click='jumpa(item.id)'>{{item.text}}</li>
    </ul>
</div>
</template>

<script>
export default {
    data() {
        return {
            list: [{
                    text: '首页',
                    id: 1
                },
                {
                    text: '基地',
                    id: 2
                },
                {
                    text: '农资',
                    id: 3
                },
                {
                    text: '保险',
                    id: 4,
                },
                {
                    text: '金融',
                    id: 5,
                },
                {
                    text: '政策',
                    id: 6
                },
                {
                    text: '终端设备',
                    id: 7
                }
            ],
            boff: false,
        }

    },
    methods: {
        fold() {
            this.boff = !this.boff
        },
        jumpa(id) {
            this.boff = !this.boff
            if (id == 1) {
                this.$router.push("/")
            } else if (id == 2) {
                this.$router.push('/platform')
            } else if (id == 3) {
                this.$router.push('/material')
            } else if (id == 4) {
                this.$router.push("/insurance")
            } else if (id == 5) {
                this.$router.push('/finance')
            } else if (id == 6) {
                this.$router.push('/policy')
            } else if (id == 7) {
                this.$router.push('/mobiequip')
            }
        }
    },
}
</script>

<style lang="scss" scoped>
@import "../../styles/base";

.header {
    height: rem(100);
    width: 100%;
    background-color: #071931;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: rem(44);
    padding-right: rem(52);

    .img {
        width: rem(84);
        height: rem(70);
    }

    .fold {
        width: rem(60);
        height: rem(48);
    }

}

.forms {
    position: fixed;
    width: 100%;
    height: calc(100% - #{rem(100)});
    background: #fff;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2000;
    font-size: 18px;
    font-weight: 500;
    padding-left: rem(49.5);

    li {
        height: rem(90);
        line-height: rem(90);
        border-bottom: 1px solid #E8E8E8;
    }
}
</style>
