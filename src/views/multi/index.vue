<<template>
<div class='demo'>
    <el-row :gutter='10'>
        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-for='(item,index) in urls' :key='index' class='video'>
            <span>{{item.name}}</span>
            <video :id="['myPlayer'+index]" autoplay :src="item.url" muted controls playsInline webkit-playsinline width="100%" height='100%' style="object-fit:fill"></video>
        </el-col>
    </el-row>
</div>
</template>

<script>
import {
    cameraslist,
    huourl,
    getToken
} from '@/api/hybrid'

export default {
    data() {
        return {
            id: '1,2,3,12',
            serial: ['D83611273','D83611274','D83611232','E49854591','E45419299','E45419248','678531067','E44111726','E49853793'],
            token: 'at.9ihbl2o0buo7p3hu7jdj5lwo8624u1tg-7ef4xx2fct-1q6urlg-imdguremk',
            urls: []
        }
    },
    created() {
        this.tokena()
    },
    updated() {
        if (this.urls.length > 0) {
            let urls = this.urls
            for (let i = 0; i < urls.length; i++) {
                new EZUIKit.EZUIPlayer('myPlayer' + i)
            }

        }
    },
    methods: {
        load() {   
            let id = this.id
            cameraslist(id).then(res => {
                let {
                    code,
                    data
                } = res.data;
                if (code == 200) {
                    let arr = []
                    for (let i = 0; i < data.length; i++) {
                        for (let j = 0; j < data[i].devices.length; j++) {
                            arr.push(data[i].devices[j].serial)
                        }
                    }
                    this.serial = arr
                    this.beforegeturl()
                }
            })
        },
        beforegeturl() {
            let arr = this.serial
            arr.forEach(item => {
                this.geturl(item)
            })

        },
        tokena() {
            getToken().then(res => {
                let {
                    code,
                    data
                } = res.data
                if (code == 200) {
                    this.token = data.accessToken;
                    //this.load()    //根据养殖场id,后面可能试根据摄像头serial来,所以不需要
                    this.beforegeturl()
                }
            })
        },
        async geturl(item) {
            let param = {
                accessToken: this.token,
                deviceSerial: item,
                channelNo: 1,
                expireTime: 300
            }
            let res = await huourl(param)
            let url = {
                url: res.data.data.liveAddress.replace(/^http:\/\//, "https://"),
                name: res.data.data.deviceName
            }
            this.urls.push(url)
        }
    }
}
</script>

<style lang="scss">
.demo {
    padding: 0 10px;

    .video {
        position: relative;
        margin-bottom: 10px;
        height: calc((100vh - 30px)/3);

        span {
            position: absolute;
            color: #fff;
            left: 20px;
            bottom: 10px;
            font-size: 14px;
        }

    }

}
</style>
