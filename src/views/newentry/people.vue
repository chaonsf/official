<template>
<div class='people'>
    <div class='content'>
        <Newhead></Newhead>
        <div class='second'>
            <h5>养殖户入驻</h5>
            <p class='smtitle'>Settlement of farmers</p>
            <div class='entry'>
                <Subhead :title="title"></Subhead>
                <el-form label-width="102px" ref='form1' :model="form1" :rules='rules1'>
                    <el-form-item label="姓名:" prop='name'>
                        <el-input v-model='form1.name'></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码:" prop='phone'>
                        <el-input v-model='form1.phone'></el-input>
                    </el-form-item>
                    <Verify :phone='this.form1.phone' ref='phonecode' class='require'></Verify>
                    <el-form-item label="身份证号:" prop='idCard'>
                        <el-input v-model='form1.idCard'></el-input>
                    </el-form-item>
                    <el-form-item class='float'>
                        <el-row>
                            <el-col :span='11'>
                                <el-upload :action="fronturl" class="idCardupload card" list-type="picture-card" :headers='header' :on-success='idCardFrontSuccess' :on-remove="removeFront" :file-list='idcardfront'>
                                    <span>上传身份证正面</span>
                                </el-upload>
                            </el-col>
                            <el-col :span='11' :offset='2'>
                                <el-upload :action="uploadUrl" class="idCardupload left" :headers='header' list-type="picture-card" :on-success='idCardBackSuccess' :on-remove="removeBack" :file-list='idcardback'>
                                    <span>上传身份证反面</span>
                                </el-upload>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label='家庭住址:'>
                        <Location ref='location1'></Location>
                        <el-input class="detail mt30" placeholder="请输入详细地址" v-model='form1.homeAddress'></el-input>
                    </el-form-item>
                    <el-form-item label='养殖住址:'>
                        <Location ref='location2'></Location>
                        <el-input class="detail mt30" placeholder="请输入详细地址" v-model='form1.address'></el-input>
                    </el-form-item>
                    <el-form-item label='开始养殖年份:' class='require max'>
                        <el-date-picker type="year" placeholder="选择年" v-model='form1.beginYear' value-format="yyyy" :picker-options='endtime'>
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label='上传基地照片:' class='base'>
                        <el-upload :action="uploadUrl" list-type="picture-card" class="img" :headers='header' :on-preview="handlePictureCardPreview" :file-list="form1.photos" :on-success='successupload' :on-remove="handleRemove" :limit='3'>
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>
                </el-form>
                <Subhead :title="title4" class='mt30'></Subhead>
                <el-form label-width="102px" class='mt30'>
                    <el-form-item label="登录密码:">
                        <el-input v-model='form1.pwd' type='password' minlength='4' maxlength='20' show-password></el-input>
                    </el-form-item>
                    <el-form-item label="重复密码:">
                        <el-input v-model='form1.repeatPwd' type='password' show-password></el-input>
                    </el-form-item>
                </el-form>
                <el-button @click='submit'>申请入驻 </el-button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Newhead from '@/components/header/newhead'
import {
    removeStore
} from "@/utils/storage"
import store from "@/store"
import Subhead from "@/components/settlentry/subhead"
import config from '@/config'
import Verify from "@/components/settlentry/verifity"
import Location from '@/components/settlentry/location'
import {
    farmerEntry
} from "@/api/settlement"
import {
    cardid,
    isvalidatemobile,
    isMobile
} from '@/utils/validate'
const validatePhone = (rule, value, callback) => {
    if (isvalidatemobile(value)[0]) {
        callback(new Error(isvalidatemobile(value)[1]));
    } else {
        callback();
    }
};
const vaiidateCard = (rule, value, callback) => {
    if (cardid(value)[0]) {
        callback(new Error(cardid(value)[1]));
    } else {
        callback()
    }
}
const endtime = () => {
    return {
        disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e7
        }
    }
}
export default {
    components: {
        Newhead,
        Subhead,
        Verify,
        Location
    },
    data() {
        return {
            title: '01:主体信息登记',
            title4: "02:管理员信息登记",
            uploadUrl: config.uploadUrl,
            header: config.header,
            fronturl: config.fronturl,
            idcardfront: [],
            idcardback: [],
            rules1: {
                name: [{
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur'
                    },
                    {
                        min: 2,
                        max: 20,
                        message: '长度在 2 到 20 个字符',
                        trigger: 'blur'
                    }
                ],
                phone: [{
                    required: true,
                    trigger: "blur",
                    validator: validatePhone,
                    message: "请输入手机号码"
                }],
                idCard: [{
                    required: true,
                    trigger: "blur",
                    validator: vaiidateCard,
                    message: "请输入正确的身份证号码"
                }]

            },
            endtime: endtime(),
            photos: [],
            dialogImageUrl: '', //点击查看图片
            dialogVisible: false,
            form1: {
                name: '',
                phone: '',
                homeAddress: '',
                address: '',
                beginYear: '',
                idCard: '',
                idCardFront: '', //身份证正面
                idCardBack: '',
                homeProvince: '',
                homeCity: '',
                homeCounty: '',
                province: '', //养殖地址省
                city: "",
                county: '',
                pwd: '',
                repeatPwd: '',
            },
        }
    },
    created() {
        removeStore("menuid", '')
        store.dispatch("CHECKTHEME", "")
    },
    methods: {
        idCardFrontSuccess(res, file) {
            let {
                code,
                data,
                msg
            } = res
            if (code == 200) {
                if (data && data.num) {
                    this.form1.idCardFront = file.response.data
                    this.form1.idCard = data.num
                } else {
                    this.form1.idCardFront = ''
                    this.idcardfront = [];
                    this.$msg({
                        msg: '请上传身份证正面'
                    })
                }
            } else {
                this.$msg({
                    msg
                })
            }
        },
        idCardBackSuccess(res, file) {
            this.form1.idCardBack = file.response.data
        },
        removeFront() {
            this.form1.idCardFront = ''
        },
        removeBack() {
            this.form1.idCardBack = ''
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        successupload(res, file, fileList) { //个人养殖户上传成功得基地照片
            this.photos = []
            for (let i = 0; i < fileList.length; i++) {
                this.photos.push(fileList[i].response.data)
            }
        },
        handleRemove(file, filelist) { //个人养殖户删除基地照片
            this.photos = []
            for (let i = 0; i < filelist.length; i++) {
                this.photos.push(filelist[i].response.data)
            }
        },
        clear() {
            this.form1 = {
                name: '',
                phone: '',
                homeAddress: '',
                address: '',
                beginYear: '',
                idCardFront: '', //身份证正面
                idCardBack: '',
                homeProvince: '',
                homeCity: '',
                homeCounty: '',
                province: '', //养殖地址省
                city: "",
                county: '',
                pwd: '',
                repeatPwd: '',
            }
            this.idcardfront = []
            this.form1.photos = []
            this.idcardback = []
            this.$refs.phonecode.clear()
            this.$refs.location1.clear()
            this.$refs.location2.clear()
        },
        submit() {
            let home = this.$refs.location1
            let farmer = this.$refs.location2
            let phonecode = this.$refs.phonecode
            this.form1 = Object.assign({}, this.form1, {
                homeProvince: parseInt(home.provinceId),
                homeCity: parseInt(home.cityId),
                homeCounty: parseInt(home.countyId),
                province: parseInt(farmer.provinceId),
                city: parseInt(farmer.cityId),
                county: parseInt(farmer.countyId),
                photos: this.photos,
                code: phonecode.code
            })
            if (!this.form1.code) {
                this.$msg({
                    msg: "请输入验证码"
                })
                return
            } else
            if (!this.form1.idCardFront) {
                this.$msg({
                    msg: '请上传身份证正面'
                })
                return
            } else if (!this.form1.idCardBack) {
                this.$msg({
                    msg: '请上传身份证反面'
                })
                return
            } else if (!this.form1.beginYear) {
                this.$msg({
                    msg: '请输入开始养殖年份'
                })
                return
            } else if (this.form1.pwd && this.form1.pwd != this.form1.repeatPwd) {
                this.$msg({
                    msg: '两次密码输入不一致'
                })
                return
            } else if (this.form1.pwd) {
                if (this.form1.pwd.length < 4 || this.form1.pwd.length > 20) {
                    this.$msg({
                        msg: '密码长度在 4 到 20 个字符之间'
                    })
                    return
                }
            }
            this.form1.photos = JSON.stringify(this.form1.photos)
            this.$refs.form1.validate((valid) => {
                if (valid) {
                    this.showLoad();
                    farmerEntry(this.form1).then(res => {
                        this.hideLoad()
                        let {
                            code,
                            data
                        } = res.data;
                        if (code == 200) {
                            this.$msg({
                                msg: '入驻申请成功',
                                type: 'success'
                            })
                            this.clear()

                        }
                    })
                } else {
                    this.$msg({
                        msg: "请填写完必填信息在提交"
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss">
@import "../../styles/base";
@import "../../styles/entry";

.people {
    @extend .otherhtml;

    &::-webkit-scrollbar {
        display: none;
    }

    .content {
        @extend .width;

        .second {
            padding-top: 126px;

            h5 {
                @extend .h4
            }
        }
    }
}
</style>
