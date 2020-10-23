<template>
<div class='equip'>

    <Head></Head>
    <div class='content'>
        <van-image :src="url" fit='fill' />
        <div class='qicai'>
            <h5>物联网智能传感器系列数字终端</h5>
            <p class='smt'>Internet of things intelligent sensor series digital terminal</p>
            <ul class='nav'>
                <li v-for='item in terminal' :key='item.id' class='navli'>
                    <div :class="[item.id==selected?'active':'','father']" @click='changetitle(item.id)'>{{item.title}}
                        <van-icon :name="item.id==selected?'arrow-up':'arrow-down'" color='#fff' />
                    </div>
                    <ul v-show='item.children&&item.id==selected' class='children'>
                        <li v-for='it in item.children' :key='it.id' class='childrenli'>
                            <div :class="[it.id==childrenid?'jihuo':'','childrendiv']" @click='childrentitle(it.id)'>{{it.title}}
                                <van-icon :name="it.id==childrenid?'arrow-up':'arrow-down'" color='#fff' />
                            </div>
                            <div class='desc' v-show="it.id==childrenid">
                                <div class='tupian'>
                                    <van-image :src="it.img" fit='fill' />
                                    <div class='right'>
                                        <h4>{{it.model}}</h4>
                                        <p>详询请拨：17755678952</p>
                                    </div>
                                </div>
                                <div class='detail'>
                                    <h4>{{it.title}}</h4>
                                    <p>{{it.func}}</p>
                                    <ul class='detailul'>
                                        <li v-for='(o,i) in it.desc' :key='i'><span></span>{{o.li}}</li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class='desc' v-show="!item.children&&item.id==selected">
                        <div class='tupian'>
                            <van-image :src="item.img" fit='fill' />
                            <div class='right'>
                                <h4>{{item.model}}</h4>
                                <p>详询请拨：17755678952</p>
                            </div>
                        </div>
                        <div class='detail'>
                            <h4>{{item.title}}</h4>
                            <p>{{item.func}}</p>
                            <ul class='detailul'>
                                <li v-for='(o,i) in item.desc' :key='i'><span></span>{{o.li}}</li>
                            </ul>
                        </div>
                    </div>
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
import config from '@/config'
export default {
    components: {
        Head,
        Foot
    },
    data() {
        return {
            url: require('../../assets/mobie/banner7.png'),
            terminal: config.terminal,
            selected: '',
            childrenid: '',
        }
    },
    created() {
        this.load()
    },
    methods: {
        load() {
            let params = this.$route.params
            if (params.id) {
                this.selected = params.id
            } else {
                this.selected = ''
            }
        },
        changetitle(id) {
            this.childrenid = ''
            if (id == this.selected) {
                this.selected = ''
            } else {
                this.selected = id
            }

        },
        childrentitle(id) {
            if (id == this.childrenid) {
                this.childrenid = ''
            } else {
                this.childrenid = id
            }

        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/base";

.equip {
    @extend .mobieall;

    .content {
        overflow: scroll;
        height: 100%;

        &::-webkit-scrollbar {
            display: none;
        }

        .qicai {
            padding: 0 rem(49) rem(50) rem(43);

            h5 {
                @extend .mobileh5;
                text-align: center;
            }

            .nav {
                width: 100%;
                padding-top: rem(29);

                .navli {
                    width: 100%;
                    color: #fff;

                    .father {
                        min-height: rem(80);
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-size: 18px;
                        padding: 0 rem(48) 0 rem(26);
                    }

                    .active {
                        background: linear-gradient(90deg, #1CD39C 0%, #11BAD1 100%);
                    }

                    .children {
                        width: 100%;

                        .childrenli {
                            font-size: 16px;

                            .childrendiv {
                                display: flex;
                                min-height: rem(80);
                                justify-content: space-between;
                                align-items: center;
                                padding: 0 rem(48) 0 rem(45);
                            }

                            .jihuo {
                                color: #1cd49a;
                            }

                        }
                    }

                    .tupian {
                        display: flex;
                        flex-direction: row;
                        padding-top: rem(40);

                        .van-image {
                            max-width: rem(300);
                        }

                        .right {
                            flex: 1;
                            font-size: 14px;
                            text-align: center;

                            h4 {
                                font-weight: normal;
                                font-size: 14px;
                                margin-bottom: rem(26);
                            }

                            p {
                                padding: rem(14) rem(10);
                                display: inline-block;
                                background: linear-gradient(90deg, #1CD39B 0%, #11BAD2 100%);
                            }
                        }

                    }

                    .detail {
                        padding-top: rem(30);

                        h4 {
                            text-align: center;
                            font-size: 16px;
                            font-weight: normal;
                            margin-bottom: rem(28);
                        }

                        p {
                            line-height: 20px;
                            font-size: 14px;
                        }

                        ul {
                            padding-bottom: rem(33);

                            li {
                                display: flex;
                                align-items: center;
                                margin-top: rem(33);
                                font-size: 12px;

                                span {
                                    display: inline-block;
                                    background: #17B286;
                                    width: 4px;
                                    height: 4px;
                                    border-radius: 50%;
                                    margin-right: rem(10);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
