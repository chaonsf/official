<template>
<div class='basentry'>
    <div class="contenta">
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
                    title: '个人养殖户',
                    url: require('../../assets/new/people.png')
                },
                {
                    id: 2,
                    title: '养殖场',
                    url: require('../../assets/new/farm.png')
                }
            ]
        }
    },
    methods: {
        touch(id) {
            if (id == 1) {
                this.$router.push('/people')
            } else if (id == 2) {
                this.$router.push('/farm')
            }
        }
    }

}
</script>

<style lang="scss" scoped>
@import "../../styles/base";

.basentry {
    @extend .otherhtml;

    &::-webkit-scrollbar {
        display: none;
    }

    .contenta {
        @extend .width;

        .second {
            padding-top: 161px;
            padding-bottom: 371px;

            h4 {
                @extend .h4
            }

            .smtitle {
                @extend .smtitle
            }

            ul {
                overflow: hidden;
                width: 100%;
                padding-left: 43px;

                li {
                    float: left;
                    margin-left: 249px;
                    width: 180px;
                    text-align: center;
                    color: #fff;

                    img {
                        margin-bottom: 26px;
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
