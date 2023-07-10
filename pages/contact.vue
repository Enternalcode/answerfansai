<style scoped>
p {
    margin: 20px 0px;
}
</style>
<template>
    <div>
        <Nav class="z-50" />
        <div class="max-w-screen-xl m-auto px-4 lg:px-10 pt-10 pb-20 text-gray-500 mt-20">
            <div class="text-4xl text-black">{{ $t('contactUsPageTitle') }}</div>
            <p>{{ $t('wechat') }}</p>
            <p>{{ $t('wechatFriendInvitationPrompt') }}</p>
            <img style="width: 200px; height: 200px" :src="wechatQrCode" fit="fill" />
            <div>{{ $t('email') }}</div>
            <div>answerfansai@gmail.com</div>
        </div>
        <Footer class="fixed w-full bottom-0"></Footer>
    </div>
</template>

<script lang="ts" setup>
const wechatQrCode = "/qrcode/myWechat.jpeg";
</script>
