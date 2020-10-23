<template>
<div class="farm">
    <div class='content'>
        <Newhead></Newhead>
        <div class='second'>
            <h5>养殖场入驻</h5>
            <p class='smtitle'>Farm settlement</p>
            <div class='entry'>
                <Subhead :title="title1"></Subhead>
                <el-form label-width="102px">
                    <el-form-item label="企业类型:" class='require'>
                        <el-radio-group v-model="form2.type">
                            <el-radio :label="2">企业</el-radio>
                            <el-radio :label="3">个体工商户</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="企业名称:" class='require'>
                        <el-input v-model='form2.name'></el-input>
                    </el-form-item>
                    <el-form-item label="" class="desc">
                        <p>严格按照营业执照填写。如个体工商户营业执照无企业名称时(包括**,“无字号"或者空等情况，请以“个体户+经营者姓名”的形式填写。如：个体户+张三)</p>
                    </el-form-item>
                    <el-form-item label="营业执照注册号:" class='require max'>
                        <el-input v-model='form2.businessLicenseNo'></el-input>
                    </el-form-item>
                    <el-form-item class='require'>
                        <el-upload :action="businessLicense" class='business' :headers='header' :limit="1" :on-success='businessuccessful' :on-remove='removebusiness' :file-list='businessarr'>
                            <el-button size='medium' type='info'>上传营业执照照片</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-upload :action="uploadUrl" class='business' :headers='header' :limit="1" :on-success='licensesuccessful' :on-remove='removelicense' :file-list='licensearr'>
                            <el-button size='medium' type='info'>动物防疫条件合格证</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label='养殖基地:' class='require'>
                        <Location ref='location3'></Location>
                        <el-input class="detail mt30" placeholder="请输入详细地址" v-model='form2.address'></el-input>
                    </el-form-item>
                    <el-form-item label='开始养殖年份:' class='require max'>
                        <el-date-picker type="year" placeholder="选择年" v-model='form2.beginYear' value-format="yyyy" :picker-options='endtime'>
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label='上传基地照片:' class='base'>
                        <el-upload :action="uploadUrl" list-type="picture-card" class="img" :headers='header' :on-preview="handlePictureCardPreview2" :on-success='successupload2' :on-remove="handleRemove2" :file-list='basearr'>
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible2">
                            <img width="100%" :src="dialogImageUrl2" alt="">
                        </el-dialog>
                    </el-form-item>
                </el-form>
                <Legal ref='legal'></Legal>
                <el-form label-width="102px">
                    <el-form-item label='家庭住址:'>
                        <Location ref='location4'></Location>
                        <el-input class="detail mt30" placeholder="请输入详细地址" v-model='form2.homeAddress'></el-input>
                    </el-form-item>
                </el-form>
                <Admin ref='admin' :boff='true'></Admin>
                <el-button @click='submit'>申请入驻 </el-button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Newhead from '@/components/header/newhead'
import {
    farmEntry
} from "@/api/settlement"
import {
    removeStore
} from "@/utils/storage"
import store from "@/store"
import Subhead from "@/components/settlentry/subhead"
import config from '@/config'
import Verify from "@/components/settlentry/verifity"
import Location from '@/components/settlentry/location'
import Legal from '@/components/settlentry/chain/Legal'
import Admin from '@/components/settlentry/chain/Admin'
import {
    cardid,
    isvalidatemobile,
    isMobile
} from '@/utils/validate'
const endtime = () => {
    return {
        disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e6
        }
    }
}
export default {
    components: {
        Newhead,
        Subhead,
        Verify,
        Location,
        Legal,
        Admin
    },
    data() {
        return {
            title1: '01:主体信息登记',
            uploadUrl: config.uploadUrl,
            businessLicense: config.businessLicense,
            header: config.header,
            endtime: endtime(),
            dialogVisible2: false,
            dialogImageUrl2: '',
            businessarr: [],
            licensearr: [],
            basearr: [],
            form2: {
                type: '',
                name: "",
                businessLicenseNo: '',
                businessLicenseUrl: '',
                licenseUrl: '',
                address: "",
                beginYear: '',
                homeAddress: "",
            },
        }
    },
    created() {
        removeStore("menuid", '')
        store.dispatch("CHECKTHEME", "")
    },
    methods: {
        businessuccessful(res, file) { //上传营业执照
            let {
                code,
                data,
                msg
            } = res
            if (code == 200) {
                if (data.success && data.reg_num) {
                    this.form2.businessLicenseUrl = file.response.data
                    this.form2.businessLicenseNo = data.reg_num
                } else {
                    this.form2.businessLicenseUrl = ''
                    this.businessarr = [];
                    this.$msg({
                        msg: '请上传正确的营业执照'
                    })
                }
            } else {
                this.$msg({
                    msg
                })
            }
        },
        removebusiness() {
            this.form2.businessLicenseUrl = ''
        },
        licensesuccessful(res, file) { //动物防疫条件合格证
            this.form2.licenseUrl = file.response.data
        },
        removelicense() {
            this.form2.licenseUrl = ''
        },
        handlePictureCardPreview2(file) { //养殖场基地上传
            this.dialogImageUrl2 = file.url;
            this.dialogVisible2 = true;
        },
        successupload2(res, file, fileList) {
            this.photos2 = []
            for (let i = 0; i < fileList.length; i++) {
                this.photos2.push(fileList[i].response.data)
            }
        },
        handleRemove2(file, filelist) {
            this.photos2 = []
            for (let i = 0; i < filelist.length; i++) {
                this.photos2.push(filelist[i].response.data)
            }
        },
        submit() {
            let base = this.$refs.location3;
            let home = this.$refs.location4
            let legal = this.$refs.legal
            let admin = this.$refs.admin
            this.form2 = Object.assign({}, this.form2, legal.form, admin.form, {
                province: parseInt(base.provinceId),
                city: parseInt(base.cityId),
                county: parseInt(base.countyId),
                homeProvince: parseInt(home.provinceId),
                homeCity: parseInt(home.cityId),
                homeCounty: parseInt(home.countyId),
                photos: this.photos2
            })
            let checked = admin.checked;
            if (checked) {
                this.form2 = Object.assign({}, this.form2, {
                    adminName: legal.lpName,
                    adminPhone: legal.phone,
                    adminCode: legal.code,
                    adminIdCard: legal.idCard,
                    adminIdCardFront: legal.idCardFront,
                    adminIdCardBack: legal.idCardBack
                })
            }
            //
            if (!this.form2.type) {
                this.$msg({
                    msg: "请选择企业类型"
                });
                return
            } else if (!this.form2.name) {
                this.$msg({
                    msg: "请填写企业名称"
                });
                return
            } else if (!this.form2.businessLicenseNo) {
                this.$msg({
                    msg: '请填写营业执照注册号'
                });
                return
            } else if (!this.form2.businessLicenseUrl) {
                this.$msg({
                    msg: '请上传营业执照'
                });
                return
            } else if (!this.form2.licenseUrl) {
                this.$msg({
                    msg: '请上传动物防疫条件合格证'
                });
                return
            } else if (!this.form2.address) {
                this.$msg({
                    msg: "请填写养殖地址"
                });
                return
            } else if (!this.form2.beginYear) {
                this.$msg({
                    msg: '请选择开始养殖年份'
                });
                return
            } else if (this.form2.photos.length == 0) {
                this.$msg({
                    msg: '请上传养殖场地照片'
                });
                return
            } else if (!this.form2.lpName) {
                this.$msg({
                    msg: '请填写法人姓名'
                });
                return;
            } else if (!this.form2.idCard) {
                this.$msg({
                    msg: '请填写法人身份证号'
                });
                return
            } else if (!this.form2.phone && !isMobile(this.form2.phone)) {
                this.$msg({
                    msg: '请填写正确手机号'
                });
                return;
            } else if (!this.form2.code) {
                this.$msg({
                    msg: '请填写验证码'
                });
                return
            } else if (!this.form2.idCardFront) {
                this.$msg({
                    msg: '请上传法人身份证正面'
                })
                return
            } else if (!this.form2.idCardBack) {
                this.$msg({
                    msg: '请上传法人身份证反面'
                })
                return
            } else if (!this.form2.homeAddress) {
                this.$msg({
                    msg: '请填写法人家庭地址'
                });
                return
            } else if (this.form2.pwd && this.form2.pwd != this.form2.repeatPwd) {
                this.$msg({
                    msg: '两次密码输入不一致'
                })
                return
            } else if (this.form2.pwd) {
                if (this.form2.pwd.length < 4 || this.form2.pwd.length > 20) {
                    this.$msg({
                        msg: '密码长度在 4 到 20 个字符之间'
                    })
                    return
                }
            }
            this.form2.photos = JSON.stringify(this.form2.photos)
            this.showLoad();
            farmEntry(this.form2).then(res => {
                this.hideLoad();
                let {
                    code,
                    data
                } = res.data;
                if (code == 200) {
                    this.$msg({
                        msg: "入驻申请成功",
                        type: 'success'
                    })
                    this.clear()
                }
            })
        },
        clear() {
            this.form2 = {
                type: '',
                name: "",
                businessLicenseNo: '',
                businessLicenseUrl: '',
                licenseUrl: '',
                address: "",
                beginYear: '',
                homeAddress: "",
            }
            this.businessarr = []
            this.licensearr = []
            this.basearr = []
            this.$refs.legal.clear()
            this.$refs.admin.clear()
            this.$refs.location4.clear()
            this.$refs.location3.clear()
        }
    }
}
</script>

<style lang="scss">
@import "../../styles/base";
@import "../../styles/entry";

.farm {
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
