<template>
    <div class="flex justify-between w-full py-4 px-4 lg:px-10 items-center fixed top-0">
        <a class="flex h-14 items-center" href="/">
            <img src="/logo.png" class="h-10 lg: lg:h-12" />
            <span class="ml-2 text-xl font-bold hidden lg:block"></span>
        </a>
        <div class="flex space-x-10 items-center">
            <a href="/" class="hidden lg:block">主页</a>
            <div class="flex items-center justify-end" v-if="user.email">
                <el-dropdown :style="{ outline: 'none' }">
                    <span class="outline-0">
                        AI
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown class="w-full">
                        <el-dropdown-menu class="text-center">
                            <el-dropdown-item style="width: 140px;" class="justify-center"
                                @click="jumpToPage('/train')">训练机器人</el-dropdown-item>
                        </el-dropdown-menu>
                        <el-dropdown-menu class="text-center">
                            <el-dropdown-item style="width: 140px;" class="justify-center"
                                @click="jumpToPage(`/robot-work-area/${userStore.user.userId}`, { 'userId': userStore.user.userId })">使用机器人</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
            <div class="flex items-center justify-end" v-if="user.email">
                <el-dropdown>
                    <span class="outline-0 flex">
                        <div>{{ filterName(user.email) }}</div>
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown class="w-full">
                        <el-dropdown-menu class="text-center">
                            <el-dropdown-item style="width: 140px;" class="justify-center"
                                @click="logout">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
            <a href="/sign-in" class="hidden lg:block" v-if="!user.email">登录</a>
            <a href="/sign-up" class="hidden lg:block" v-if="!user.email">注册</a>
        </div>
    </div>
</template>

<script setup lang="ts" >
import { ArrowDown } from '@element-plus/icons-vue';
import {
    ElDropdown,
    ElDropdownItem,
    ElDropdownMenu,
    ElIcon
} from "element-plus";
import { storeToRefs } from 'pinia';
import { clearLocal, jumpToPage } from "~/assets/js/utils/tools";

const userStore = useUserStore();
const { user } = storeToRefs(userStore)

if (process.client) {
    userStore.initLocalUser()
}

const filterName = (email: string) => {
    return email.length > 8 ? email.substring(0, 8) + "..." : email
}

const logout = () => {
    clearLocal()
    window.location.href = "/";
}

</script>



