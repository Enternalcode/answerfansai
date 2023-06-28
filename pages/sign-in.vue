<template>
    <client-only>
        <div class="px-4">
            <Logo class="" />
            <div class="max-w-lg m-auto">
                <div class="text-2xl my-10">登录账号</div>
                <el-form ref="formRef" :model="submitForm" :rules="rules" status-icon class="w-full">
                    <el-form-item prop="email" class="w-full">
                        <el-input placeholder="邮箱" v-model="submitForm.email" style="height:44px;" />
                    </el-form-item>
                    <el-form-item prop="password" class="w-full">
                        <el-input placeholder="请输入至少6位密码" v-model="submitForm.password" type="password" show-password
                            style="height:44px;" />
                    </el-form-item>
                    <div class="dialog-footer flex justify-center mt-4">
                        <el-button @click="signinUser" type="primary" class="w-full text-2xl transition-light"
                            style="height:44px;font-size: 16px;">登录</el-button>
                    </div>
                </el-form>
                <div class="my-4 text-gray-600 text-base text-center flex justify-between items-center">
                    <div>
                        如果没有账号，请先<span class="underline text-cus-active text-base cursor-pointer ml-1 font-bold"
                            @click="jumpToPage('/sign-up')">注册</span>
                    </div>
                    <div class="text-sm text-right text-gray-600 cursor-pointer transition-light hover:text-black"
                        @click="jumpToPage('/forget')">忘记密码？
                    </div>
                </div>
            </div>
        </div>
    </client-only>
</template>

<script setup lang="ts">
import axios from 'axios';
import {
    ElButton,
    ElForm,
    ElFormItem,
    ElInput,
    ElMessage,
} from "element-plus";
import { jumpToPage, setCookie } from "~/assets/js/utils/tools";





const loadingFlag = ref(false)
const submitForm = reactive({ email: "", password: "" })
const userStore = useUserStore()

const rules = reactive({
    email: [
        {
            required: true,
            message: '请填写邮箱地址',
            trigger: 'blur',
        }, {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change'],
        },
    ],
    password: [
        {
            required: true,
            min: 6,
            max: 20,
            message: '请输入至少6位的密码',
            trigger: ['blur', 'change'],
        },
    ]
})

const signinUser = () => {
    if (submitForm.email == '' || submitForm.password == '') {
        return false
    }
    let data = {
        email: submitForm.email,
        password: submitForm.password
    }
    loadingFlag.value = true
    axios.post(`/api/user/sign-in`, data).then(async (response) => {
        if (response && response.data) {
            let res = response.data
            if (res.code) {
                ElMessage({
                    message: res.message,
                    type: 'error',
                })
                loadingFlag.value = false
            } else if (res.userId) {
                setCookie("__user", encodeURIComponent(JSON.stringify(res)), 365)
                loadingFlag.value = false
                ElMessage({
                    message: '登录成功！',
                    type: 'success',
                })
                setTimeout(async () => {
                    await userStore.initLocalUser()
                    jumpToPage("/train")
                }, 2000)
            }
        }
    })
}
</script>
