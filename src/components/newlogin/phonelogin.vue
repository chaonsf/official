<template>
<div class='phone'>
    <div class='toper'>
        <p>手机号登录 <span @click="checkway">用户名登录</span></p>
    </div>
    <el-form :model="form" ref="form" :rules="rules">
        <el-form-item prop="phone">
            <el-input placeholder="请输入手机号码" prefix-icon='el-icon-mobile' v-model="form.phone">
            </el-input>
        </el-form-item>
        <el-form-item prop='code'>
            <el-row>
                <el-col :span='14'>
                    <el-input placeholder="请输入验证码" prefix-icon='el-icon-chat-round' v-model="form.code" @keyup.enter.native='login'> </el-input>
                </el-col>
                <el-col :span='9' :offset="1">
                    <el-button @click="send" :disabled="status">{{buttonName}}</el-button>
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import {
    isvalidatemobile
} from "@/utils/validate"
import {
    sendMsg,
    loginByuserName
} from "@/api/login"
import store from "@/store"
import Storage from '@/utils/storage2'
import {
    setToken
} from '@/utils/token'
let storage = new Storage();
const validatePhone = (rule, value, callback) => {
    if (isvalidatemobile(value)[0]) {
        callback(new Error(isvalidatemobile(value)[1]));
    } else {
        callback();
    }
};
export default {
    data() {
        return {
            buttonName: "获取验证码",
            msgTime: 60, //倒计时
            status: false,
            form: {
                phone: "",
                code: ""
            },
            rules: {
                phone: [{
                    required: true,
                    trigger: "blur",
                    validator: validatePhone,
                    message: "请输入正确的手机号码"
                }],
                code: [{
                    required: true,
                    message: '请输入验证码',
                    trigger: 'blur'
                }, ]
            }
        }
    },
    methods: {
        checkway() {
            this.$emit("phoneByValue", 'user')
        },
        login() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    let param = {
                        grantType: 'sms_code',
                        account: this.form.phone,
                        password: this.form.code
                    }
                    loginByuserName(param).then(res => {
                        let {
                            code,
                            data
                        } = res.data;
                        if (code == 200) {
                            this.$msg({
                                msg: "登录成功",
                                type: 'success'
                            })
                            store.dispatch('CHECKUSER', data)
                            storage.setItem({
                                name: "ynyuserinfo",
                                value: data,
                                expires: '3600000'
                            })
                            setToken(data.accessToken)
                            this.$emit('close')
                        }
                    })
                }
            })
        },
        send() {
            this.$refs.form.validateField('phone', (err) => {
                if (!err) {
                    let param = {
                        phone: this.form.phone,
                        type: 2
                    }
                    sendMsg(param).then(res => {
                        let {
                            code
                        } = res.data
                        if (code == 200) {
                            this.getcode()
                        }

                    })
                }

            })

        },
        getcode() { //获取验证码
            this.status = true;
            let timer = setInterval(() => {
                this.msgTime--;
                this.buttonName = this.msgTime + 's后重发';
                if (this.msgTime == 0) {
                    this.msgTime = 60;
                    this.status = false;
                    this.buttonName = '获取验证码'
                    clearInterval(timer)
                }
            }, 1000)
        }
    }
}
</script>

<style lang="scss" scoped>
.phone {
    p {
        color: #333;
        font-size: 20px;
        font-weight: normal;

        span {
            display: inline-block;
            margin-left: 19px;
            font-size: 14px;
            color: #666;
            cursor: pointer;
        }
    }

    .toper {
        margin-bottom: 31px;
    }

    .el-button--default {
        width: 100%;
        color: #1BD39A;
        border: 1px solid #1BD39A;
    }

    .el-button--primary {
        width: 100%;
        background: #1BD39A;
        color: #fff;
        border: none
    }

}
</style>
