<template>
<div class='phone'>
    <div class='toper'>
        <p>用户名登录 <span @click="checkway">手机号登录</span></p>
    </div>
    <el-form :model="form" ref="form" :rules="rules">
        <el-form-item prop="account">
            <el-input placeholder="用户名(企业名称)" prefix-icon='el-icon-user' v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item prop="password" class='password'>
            <el-input placeholder="登录密码" prefix-icon='el-icon-lock' v-model="form.password" show-password @keyup.enter.native="login"></el-input>
        </el-form-item>
        <el-form-item class="forgot">
            <span @click="resetpassword">忘记密码?</span>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import {
    loginByuserName,
    sendMsg
} from '@/api/login'
import store from "@/store"
import {
    isvalidatemobile
} from "@/utils/validate"
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
            form: {
                account: "",
                password: ""
            },
            rules: {
                account: [{
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    },
                    {
                        min: 2,
                        max: 20,
                        message: '长度在 2 到 20 个字符',
                        trigger: 'blur'
                    }
                ],
                password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 15,
                        message: '长度在 3 到 15 个字符',
                        trigger: 'blur'
                    }
                ],
            },
        }
    },
    methods: {
        checkway() {
            this.$emit("userByvalue", 'phone')
        },
        login() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.showLoad();
                    this.form = Object.assign(this.form, {
                        grantType: 'password'
                    })
                    loginByuserName(this.form).then(res => {
                        this.hideLoad()
                        let {
                            code,
                            data
                        } = res.data;
                        if (code == 200) {
                            store.dispatch('CHECKUSER', data)
                            storage.setItem({
                                name: "ynyuserinfo",
                                value: data,
                                expires: '3600000'
                            })
                            this.$msg({
                                msg: "登录成功",
                                type: 'success'
                            })
                            setToken(data.accessToken)
                            this.$emit('close')
                        }
                    })
                } else {
                    return false
                }
            })
        },
        resetpassword() {
            this.$emit('reset', "reset")
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

    .forgot {
        text-align: right;
        margin-bottom: 5px;
        color: #1BD39A;

        span:hover {
            cursor: pointer;
        }
    }

    .password {
        margin-bottom: 0;
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
        border: none;
    }

}
</style>
