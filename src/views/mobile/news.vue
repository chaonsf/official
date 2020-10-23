<template>
<div class='news'>

    <Head>
        <div class='back' @click='back'>
            <van-icon name="arrow-left" />返回
        </div>
    </Head>
    <div class='container'>
        <div class='content'>
            <van-image :src="detail.imgUrl" fit='fill' />
            <h5>{{detail.tile}}</h5>
            <p class='time'>{{detail.publishTime?detail.publishTime.substring(0,10):''}}</p>
            <quill-editor v-model="detail.info" @focus="onEditorFocus($event)" class='queryq ql-editor' :disabled='true'>

            </quill-editor>
        </div>
        <Foot></Foot>
    </div>
</div>
</template>

<script>
import {
    newsdetail
} from '@/api/settlement'
import Head from '@/components/header/mobile'
import Foot from '@/components/footer/mobie'

export default {
    components: {
        Head,
        Foot
    },
    data() {
        return {
            detail: {}
        }
    },
    created() {
        this.load()
    },
    methods: {
        load() {
            let params = this.$route.params.id
            let param = {
                id: params
            }
            newsdetail(param).then(res => {
                let {
                    code,
                    data
                } = res.data
                if (code == 200) {
                    this.detail = data
                }
            })
        },
        back() {
            this.$router.go(-1)
        },
        onEditorFocus(event) {
            event.enable(false);
        }
    }

}
</script>

<style lang="scss">
@import "../../styles/base";

.news {
    height: 100%;
    width: 100%;
    // overflow: auto;
    // background: url('../../assets/mobie/index.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;

    .back {
        color: #fff;
        font-size: 18px;
        display: flex;
        align-items: center;
    }

    .container {
        overflow: scroll;
        height: 100%;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    .content {
        padding: rem(45) rem(52) 0 rem(44);

        h5 {
            font-size: 24px;
            //color: #fff;
            font-weight: 500;
            line-height: 28px;
            margin-top: rem(50);
            margin-bottom: rem(28);
        }

        .time {
            // color: #eaeaea;
            font-size: 14px;
            //margin-bottom: rem(31);
        }
    }
}

.queryq {
    padding: 0;

    .ql-toolbar {
        display: none;
    }

    .ql-container.ql-snow {
        border: none;
    }
}
</style>
