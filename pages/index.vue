<template>
    <Nav class="z-10" />
    <div class="w-full pt-20">
        <div class="w-full max-w-screen-xl m-auto px-4 lg:px-10 pb-10 lg:pb-20 flex items-center flex-wrap">
            <div class="w-full lg:w-1/2">
                <h1 class="text-center lg:text-left text-3xl lg:text-5xl pt-10 lg:pt-20">{{ $t('smartReplyBot') }}</h1>
                <div class="text-center lg:text-left mt-8 text-gray-600 leading-loose">
                    <p class="font-bold mb-4">{{ $t('mainDesTitle') }}</p>
                    <p class="whitespace-pre-wrap overflow-wrap-break-word">
                        {{ $t("mainDes") }}
                    </p>
                </div>
                <button class="btn my-4" @click="jumpToPage('/robot-management')">
                    {{ $t('freeTrial') }}
                </button>
            </div>
            <div class="w-full lg:w-1/2 lg:px-5">
                <lottie-player loop autoplay class="max-w-screen-md m-auto" style="min-width:400px" src="/lottie/robot.json"
                    speed="1" />
            </div>
        </div>
    </div>
    <div class="w-full max-w-screen-xl m-auto px-4 lg:px-10 py-20 flex items-center flex-wrap flex-col-reverse lg:flex-row">
        <div class="w-full lg:w-1/2 lg:pr-20">
            <img src="/svg/completed-steps.svg" class="rounded shadow-2xl w-full max-w-sm m-auto">
        </div>
        <div class="w-full lg:w-1/2 lg:pl-10 text-center lg:text-left mb-6 lg:mb-0">
            <h2 class="text-4xl">{{ $t('stepDesTitle') }}</h2>
            <div class="mt-8 text-gray-600">
                <ul class="steps">
                    <li class="step step-primary">{{ $t('registerAccount') }}</li>
                    <li class="step">{{ $t('createRobot') }}</li>
                    <li class="step">{{ $t('inputCorpus') }}</li>
                    <li class="step">{{ $t('integrationTo') }}</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="w-full max-w-screen-xl m-auto px-4 lg:px-10 py-20 flex items-center flex-wrap flex-col-reverse lg:flex-row">
        <div class="w-full lg:w-1/2 px-4 lg:px-20">
            <img src="/svg/fast.svg" class="max-w-sm m-auto">
        </div>
        <div class="w-full lg:w-1/2 lg:pl-10 text-center lg:text-left mb-6 lg:mb-0">
            <h2 class="text-4xl">{{ $t('experienceItNow') }}</h2>
            <div class="mt-8 text-gray-600">{{ $t('repliesMoreHeartfelt') }}</div>
            <button class="btn my-4" @click="jumpToPage('/sign-up')">{{ $t('registerNow') }}</button>
        </div>
    </div>
    <Footer></Footer>
</template>


<script setup lang="ts">
import { jumpToPage } from "~/assets/js/utils/tools";

</script>