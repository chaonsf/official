<template>
<div class='equipment'>
    <div class='banner'>
        <div class="contenta">
            <Newhead></Newhead>
        </div>
    </div>
    <div class='inContent'>
        <h4>物联网智能传感器系列数字终端</h4>
        <p class='smtitle'>Internet of things intelligent sensor series digital terminal</p>
        <div class='container'>
            <ul class='left nav'>
                <li v-for='item in terminal' :key='item.id'>
                    <div :class="[item.id==selected?'active':'','father']" @click='changetitle(item.id)'>{{item.title}} <i :class="[selected==item.id?'el-icon-arrow-down':'el-icon-arrow-up']" v-show="item.children"></i></div>
                    <ul v-show='item.id==selected&&item.children' class='children'>
                        <li v-for="it in item.children" :key='it.id' :class="[it.id==childid?'jihuo':'']" @click='childmen(it.id)'>{{it.title}}</li>
                    </ul>
                </li>
            </ul>
            <div class='left middle'>
                <h5>{{selectcontent.title}}</h5>
                <p>{{selectcontent.func}}</p>
                <ul>
                    <li v-for='(item,index) in selectcontent.desc' :key='index'><span></span>{{item.li}}</li>
                </ul>
            </div>
            <div class='line left'></div>
            <div class='left right'>
                <div class='img'>
                    <img :src='selectcontent.img' />
                </div>
                <p>{{selectcontent.model}}</p>
                <div class='call'>详询请拨：17755678952</div>
            </div>
        </div>
    </div>
    <Foot></Foot>
</div>
</template>

<script>
import Newhead from '@/components/header/newhead'
import Foot from '@/components/footer'
import store from "@/store"
import config from '@/config'
export default {
    components: {
        Newhead,
        Foot
    },
    created() {
        store.dispatch("CHECKTHEME", 7)
        this.load()
    },
    data() {
        return {
            terminal: config.terminal,
            selected: 1,
            childid: 1,
            selectcontent: {}
        }
    },
    methods: {
        getContent() {
            let id = this.selected
            let obj = this.terminal.find(item => {
                return item.id == id
            })
            if (!obj.children) {
                this.selectcontent = obj
            } else {
                this.selectcontent = obj.children.find(item => {
                    return item.id == this.childid
                })
            }
        },
        changetitle(id) {
            this.selected = id;
            this.childid = 1
            this.getContent()
        },
        childmen(id) {
            this.childid = id
            this.getContent()
        },
        load() {
            let params = this.$route.params
            if (params.id) {
                this.selected = params.id
            } else {
                this.selected = 1
            }
            this.getContent()
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/base";

.equipment {
    @extend .otherhtml;

    &::-webkit-scrollbar {
        display: none;
    }

    .banner {
        @include bgImg('../../assets/tinified/equipment.png');

        .contenta {
            @extend .width;
        }
    }

    .inContent {
        @extend .width;
        padding-bottom: 50px;

        h4 {
            @extend .h4;
            margin-top: 50px;
        }

        .container {
            overflow: hidden;
            min-height: 525px;

            .left {
                float: left;
            }

            .nav {
                width: 280px;

                .father {
                    width: 280px;
                    min-height: 50px;
                    background-color: rgba(255, 255, 255, 0.16);
                    font-size: 18px;
                    line-height: 50px;
                    color: rgba(255, 255, 255, 0.8);
                    cursor: pointer;
                    padding-left: 17px;
                }

                .children {
                    background-color: rgba(255, 255, 255, 0.16);
                    color: rgba(255, 255, 255, 0.8);
                    width: 280px;

                    li {
                        height: 50px;
                        width: 280px;
                        line-height: 50px;
                        padding-left: 53px;
                        cursor: pointer;

                    }

                    .jihuo {
                        color: #1cd49a;
                    }
                }

                .active {
                    background: linear-gradient(90deg, #1CD39C 0%, #11BAD1 100%);
                }
            }

            .middle {
                padding-left: 36px;
                color: rgba(255, 255, 255, 0.8);
                width: 563px;
                padding-right: 36px;

                h5 {
                    font-size: 20px;
                    font-weight: normal;
                    margin-bottom: 22px;
                }

                ul {
                    margin-top: 16px;

                    li {
                        font-size: 14px;
                        margin-bottom: 12px;

                        span {
                            display: inline-block;
                            width: 4px;
                            height: 4px;
                            background: #17B286;
                            border-radius: 50%;
                            margin-right: 4px;
                            margin-bottom: 4px;
                        }
                    }
                }
            }

            .line {
                width: 1px;
                height: 220px;
                background: #E3E3E3;
                opacity: 0.22;
                margin-top: 96px;
            }

            .right {
                padding-top: 96px;
                padding-left: 60px;
                font-size: 16px;
                color: rgba(255, 255, 255, 0.8);

                .img {
                    margin-bottom: 40px;
                    text-align: center;
                }

                .call {
                    width: 206px;
                    height: 34px;
                    background: linear-gradient(90deg, #1CD39B 0%, #11BAD2 100%);
                    line-height: 34px;
                    margin-top: 20px;
                    text-align: center;
                }
            }
        }
    }
}
</style>
