<template>
<div class='agricultural'>
    <div class='contenta'>
        <Newhead></Newhead>
        <div class='second'>
            <h4>选择入驻类型</h4>
            <p class='smtitle'>Select The Type Of Settlement</p>
            <ul>
                <li v-for="item in type" :key='item.id'>
                    <img :src='item.url' />
                    <p>{{item.title}}</p>
                    <div class='btn' @click='touch(item.id)'>申请入驻</div>
                </li>
            </ul>
        </div>
    </div>
    <Foot></Foot>
</div>
</template>

<script>
import Newhead from '@/components/header/newhead'
import {
    removeStore
} from "@/utils/storage"
import store from "@/store"
import Foot from '@/components/footer'
export default {
    components: {
        Newhead,
        Foot
    },
    created() {
        removeStore("menuid", '')
        store.dispatch("CHECKTHEME", "")
    },
    data() {
        return {
            type: [{
                    id: 1,
                    title: '饲料企业',
                    url: require('../../assets/new/mat1.png')
                },
                {
                    id: 2,
                    title: '疫苗企业',
                    url: require('../../assets/new/vaccines.png')
                },
                {
                    id: 3,
                    title: '兽医服务企业',
                    url: require('../../assets/new/veterinary.png')
                },
            ]
        }
    },
    methods: {
        touch(id) {
            if (id == 1) {
                this.$router.push('/feed')
            } else if (id == 2) {
                this.$router.push('/vaccine')
            } else if (id == 3) {
                this.$router.push('/veterinary')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/base";

.agricultural {
    @extend .otherhtml;

    &::-webkit-scrollbar {
        display: none;
    }

    .contenta {
        @extend .width;

        .second {
            padding-top: 161px;
            padding-bottom: 390px;

            h4 {
                @extend .h4
            }

            ul {
                overflow: hidden;
                width: 100%;
                padding-left: 116px;

                li {
                    float: left;
                    width: 180px;
                    text-align: center;
                    margin-left: 210px;
                    color: #fff;

                    &:first-child {
                        margin-left: 0;
                    }

                    img {
                        margin-bottom: 24px;
                    }

                    p {
                        font-size: 20px;
                    }

                    .btn {
                        width: 180px;
                        height: 48px;
                        line-height: 48px;
                        border: 1px solid #FFFFFF;
                        border-radius: 4px;
                        margin-top: 60px;
                        cursor: pointer;

                        &:hover {
                            background: linear-gradient(90deg, #1CD29C 0%, #12BAD2 100%);
                            border: none;
                        }
                    }
                }
            }
        }
    }

}
</style>
