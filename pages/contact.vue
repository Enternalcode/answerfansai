<style scoped>
p {
    margin: 20px 0px;
}
</style>
<template>
    <div>
        <Nav class="bg-white z-50" />
        <div class="max-w-screen-xl m-auto px-4 lg:px-10 pt-10 pb-20 text-gray-500 mt-20">
            <div class="text-4xl text-black">沟通建议</div>
            <p>微信</p>
            <p>请备注: answerfansai</p>
            <el-image style="width: 200px; height: 200px" :src="wechatQrCode" fit="fill" />
            <ElDivider></ElDivider>
            <div>邮箱</div>
            <div>answerfansai@gmail.com</div>
        </div>
        <Footer class="fixed w-full bottom-0"></Footer>
    </div>
</template>

<script lang="ts" setup>
import { ElDivider, ElImage } from "element-plus";
const wechatQrCode = "/qrcode/myWechat.jpeg";
</script>
