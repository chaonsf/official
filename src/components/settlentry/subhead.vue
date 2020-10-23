<template>
<div class="subhead">
    <h4>{{title}}</h4>
    <slot></slot>
    <el-divider></el-divider>
</div>
</template>

<script>
export default {
    props: ['title']
}
</script>

<style lang="scss">
.subhead {
    h4 {
        font-size: 21px;
        color: #1CD39B;
        font-weight: normal;
    }

    .el-divider--horizontal {
        margin: 10px 0 24px 0;
    }
}
</style>
