<template>
    <Nav class="z-10 bg-white" />
    <div class="w-full pt-20">
        <div class="w-full max-w-screen-xl m-auto px-4 lg:px-10 pb-10 lg:pb-20 flex items-center flex-wrap">
            <div class="w-full lg:w-1/2">
                <h1 class="text-center lg:text-left text-3xl lg:text-5xl pt-10 lg:pt-20">智能回复机器人</h1>
                <div class="text-center lg:text-left mt-8 text-gray-600 leading-loose">
                    <p class="font-bold mb-4">您是否遇到过下面的问题:</p>
                    <ul class="list-disc list-inside mb-4">
                        <li>视频里明明有提到的内容，粉丝还在评论区或者私信提问。</li>
                        <li>同一个客户总是问题百出，重复回答，烦不胜烦。</li>
                        <li>不同客户总是问同一个问题，回答一次还要回答一次。</li>
                        <li>重复一边又一边，让您感到
                            <span class="text-cus-third text-xl font-bold">烦躁</span>
                            ，但是您又不得不回复。生怕得罪他们。
                        </li>
                    </ul>
                    <p class="mb-1">我们深知您的时间精力<span
                            class="text-cus-second text-xl font-bold">非常宝贵</span>，您的工作也本应该更有价值，而不是被这些给束缚住。</p>
                    <p>所以让我们来帮助您吧，将您从这些繁琐的无意义的工作中<span class="text-cus-primary text-xl font-bold">解救出来</span>。让您的工作更有价值。</p>
                </div>
                <div class="mt-10 flex flex-col lg:flex-row justify-center lg:justify-start">
                    <a class="bg-cus-primary text-white px-4 py-3 rounded flex items-center justify-center w-48 m-auto lg:ml-0 lg:mr-0"
                        href="/train" target="_self">
                        <span class="ml-1">
                            免费使用
                        </span>
                    </a>
                </div>
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
            <h2 class="text-4xl">只需三步，定制你的专属机器人</h2>
            <div class="mt-8 text-gray-600">
                <el-steps :active="1">
                    <el-step title="注册账号" />
                    <el-step title="创建机器人" />
                    <el-step title="输入语料" />
                </el-steps>
            </div>
        </div>
    </div>
    <div
        class="w-full max-w-screen-xl m-auto px-4 lg:px-10 py-20 flex items-center flex-wrap w-full flex-col-reverse lg:flex-row">
        <div class="w-full lg:w-1/2 px-4 lg:px-20">
            <img src="/svg/fast.svg" class="max-w-sm m-auto">
        </div>
        <div class="w-full lg:w-1/2 lg:pl-10 text-center lg:text-left mb-6 lg:mb-0">
            <h2 class="text-4xl">马上体验，快人一步</h2>
            <div class="mt-8 text-gray-600">让你的回复更有温度</div>
            <div class="mt-10 flex flex-col lg:flex-row justify-center lg:justify-start">
                <a class="bg-cus-primary text-white px-4 py-3 rounded flex items-center justify-center w-48 m-auto lg:ml-0 lg:mr-0"
                    href="/editor" target="_self">
                    <span class="ml-1">
                        立即注册
                    </span>
                </a>
            </div>
        </div>
    </div>
    <Footer></Footer>
</template>
<script setup lang="ts">
import {
    ElStep,
    ElSteps
} from "element-plus";



</script>