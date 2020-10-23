<template>
<div class='phone'>
    <p>设置新密码</p>
    <el-form :model="form" ref="form" :rules="rules">
        <el-form-item prop="phone">
            <el-input placeholder="请输入手机号码" prefix-icon='el-icon-mobile' v-model="form.phone">
            </el-input>
        </el-form-item>
        <el-form-item prop="code">
            <el-row>
                <el-col :span='14'>
                    <el-input placeholder="请输入验证码" prefix-icon='el-icon-chat-round' v-model="form.code"> </el-input>
                </el-col>
                <el-col :span='9' :offset="1">
                    <el-button @click="send" :disabled="status">{{buttonName}}</el-button>
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item prop="password">
            <el-input placeholder="新密码" prefix-icon='el-icon-lock' v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
            <el-input placeholder="再次输入新密码" prefix-icon='el-icon-lock' v-model="form.again" show-password></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import {
    isvalidatemobile
} from "@/utils/validate"
import {
    forgetpass,
    sendMsg
} from '@/api/login'
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
                phone: '',
                code: '',
                password: '',
                again: ''
            },
            buttonName: "获取验证码",
            status: false,
            msgTime: 60, //倒计时
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
                }, ],
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
            }
        }
    },
    methods: {
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
        },
        submit() {
            if (this.form.password != this.form.again) {
                this.$msg({
                    msg: '两次密码输入不一致'
                })
                return
            }
            this.$refs.form.validate((valid) => {
                if (valid) {
                    let edit = this.form
                    let param = {
                        ...edit
                    }
                    forgetpass(param).then(res => {
                        let {
                            code
                        } = res.data
                        if (code == 200) {
                            this.$msg({
                                msg: '修改成功'
                            })
                            this.$emit('close')
                        }
                    })
                }
            })

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
        border: none;
    }
}
</style>
