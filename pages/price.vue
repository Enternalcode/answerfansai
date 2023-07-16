<template>
    <div class="max-w-2xl mx-auto py-10 flex flex-col justify-center items-center">
        <h1 class="text-3xl font-bold mb-6">{{ title }}</h1>
        <p class="text-lg mb-8">{{ description }}</p>

        <img :src="qrCodeValue" class="h-80 w-80 flex justify-center items-center" />
    </div>
</template>
  
<script setup>
import { ref } from 'vue';

const title = 'Buy Me a Coffee!';
const description = 'Thank you for considering sponsoring me. Your support means a lot and helps me continue to create useful content!';
const qrCodeValue = ref('/qrcode/IMG_5410.JPG');
const size = ref(256);
const fgColor = ref('#000000');
const bgColor = ref('#ffffff');
</script>