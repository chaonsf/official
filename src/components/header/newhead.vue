<template>
<div class='header'>
    <img src='../../assets/new/logo.png' class="img" />
    <ul class="pc">
        <li v-for="(item,index) in list" :key='index' :class="[item.id==$store.getters.menuId?'active':'']" @click="check(item.id)">{{item.text}}</li>
        <li>
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    企业入驻<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for='(item,ind) in  dropdown' :key='ind' :command='item.id'>{{item.text}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </li>
        <li class="teshu" @click='tologoin' v-if='!userinfo'><span>登录</span>
            <!--    <span class="line"></span>
                    <span>注册</span> -->
        </li>
        <li class="teshu" @click="enteradmin" v-if='userinfo'>
            <span>进入控制台</span>
        </li>
        <li v-if='userinfo'>
            <el-dropdown @command="loginCommand">
                <span class="el-dropdown-link">
                    {{userinfo.userName}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for='(item,ind) in  logindp' :key='ind' :command='item.id'>{{item.text}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </li>
    </ul>
    <el-dialog :visible.sync="box" class="loginbox" width="420px" :close-on-click-modal='false' :modal='false'>
        <Phonelogin v-if="activeLoginName==='phone'" @phoneByValue="phoneByValue" @close='close'></Phonelogin>
        <Userlogin v-if="activeLoginName==='user'" @userByvalue="phoneByValue" @close='close' @reset='phoneByValue'></Userlogin>
        <Resetpass v-if="activeLoginName==='reset'" @close='close'></Resetpass>
    </el-dialog>
</div>
</template>

<script>
import store from "@/store"
import {
    setStore,
    removeStore
} from "@/utils/storage"
import Phonelogin from '../newlogin/phonelogin'
import Userlogin from '../newlogin/userlogin'
import Resetpass from '../newlogin/resetpassword'
import {
    mapGetters
} from 'vuex'

export default {
    components: {
        Phonelogin,
        Userlogin,
        Resetpass
    },
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
            dropdown: [{
                    id: 1,
                    text: '基地入驻',
                },
                {
                    id: 2,
                    text: '保险服务入驻',
                },
                {
                    id: 3,
                    text: '金融服务入驻',
                },
                {
                    id: 4,
                    text: '农资服务入驻',
                },
                {
                    id: 5,
                    text: '机构服务入驻',
                },

            ],
            logindp: [{
                id: 2,
                text: '退出登录'
            }],
            box: false,
            activeLoginName: "user",
        }
    },
    computed: {
        ...mapGetters(['userinfo'])
    },
    methods: {
        check(id) {
            store.dispatch("CHECKTHEME", id)
            setStore("menuid", id)
            if (id == 1) {
                this.$router.push("/")
            } else if (id == 2) {
                this.$router.push("/platform")
            } else if (id == 3) {
                this.$router.push("/material")
            } else if (id == 4) {
                this.$router.push("/insurance")
            } else if (id == 5) {
                this.$router.push('/finance')
            } else if (id == 6) {
                this.$router.push('/policy')
            } else if (id == 7) {
                this.$router.push('/equipment')
            }
        },
        handleCommand(command) {
            removeStore("menuid", '')
            store.dispatch("CHECKTHEME", "")
            if (command == 1) {
                this.$router.push('/basentry')
            } else if (command == 2) {
                this.$router.push('/insurancentry')
            } else if (command == 3) {
                this.$router.push('/financentry')
            } else if (command == 4) {
                this.$router.push('/agricultural')
            } else if (command == 5) {
                this.$router.push('/gov')
            }
        },
        tologoin() {
            this.box = true;
            this.activeLoginName = "phone"
        },
        phoneByValue(val) {
            this.activeLoginName = val;
        },
        close() {
            this.box = false
        },
        loginCommand(id) {
            if (id == 2) {
                this.$confirm("", "是否确定退出登录?", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    store.dispatch("REMOVEUSER")
                }).catch(() => {
                    console.log("取消")
                })

            }
        },
        enteradmin() {
            window.location.href = 'https://ynyiot.com/management/wel/index'
        }
    }
}
</script>

<style lang="scss">
$color:#fff;

.header {
    .img {
        margin-top: 13px;
        width: 110px;
        height: 40px;
    }

    ul {
        float: right;

        li {
            display: inline-block;
            font-size: 14px;
            color: $color;
            padding: 25px 5px;
            box-sizing: border-box;
            margin-right: 45px;
            text-align: center;

            &:hover {
                cursor: pointer;
                color: #1BD39A;
            }

            .el-dropdown {
                .el-dropdown-link {
                    color: #fff;
                }

            }
        }

        .teshu {
            &:hover {
                color: $color;
            }

            span:hover {
                color: #1BD39A;
            }

            .line {
                display: inline-block;
                width: 2px;
                height: 14px;
                background: $color;
                margin: 0px 10px;
                line-height: 14px;
            }
        }

        li.active {
            color: #1BD39A;
        }
    }
}

.loginbox {
    .el-dialog__header {
        padding: 0;
    }
}

.el-dropdown-menu__item:not(.is-disabled):hover {
    color: #1BD39A !important;
}
</style>
