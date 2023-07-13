<template>
    <client-only>
        <Logo class="" />
        <div class="max-w-lg m-auto">
            <div class="relative flex flex-col justify-center h-screen overflow-hidden">
                <div class="w-full p-1 m-auto rounded-md shadow-md lg:max-w-xl">
                    <h1 class="text-3xl font-semibold text-center">AnswerFansAI</h1>
                    <div class="text-2xl my-2 text-center">{{ $t('signUp') }}</div>
                    <div class="space-y-4">
                        <div>
                            <label class="label">
                                <span class="text-base label-text">{{ $t('email') }}</span>
                            </label>
                            <input v-model="submitForm.email" type="text" :placeholder="t('email')"
                                class="w-full input input-bordered input-primary" />
                        </div>
                        <div>
                            <label class="label">
                                <span class="text-base label-text">{{ $t('password') }}</span>
                            </label>
                            <input v-model="submitForm.password" type="password" :placeholder="t('passwordLengthRequire')"
                                class="w-full input input-bordered input-primary" />
                        </div>
                        <div>
                            <label class="label">
                                <span class="text-base label-text">{{ $t('confirmPassword') }}</span>
                            </label>
                            <input v-model="submitForm.confirmPassword" type="password"
                                :placeholder="t('passwordLengthRequire')"
                                class="w-full input input-bordered input-primary" />
                        </div>
                        <div>
                            <button @click="signUpUser" class="btn btn-block btn-success">{{ $t('signUp') }}</button>
                        </div>
                        <div class="my-4 text-gray-600 text-base text-left">
                            {{ $t('haveAccountHint') }}<span
                                class="underline text-cus-primary text-base cursor-pointer ml-1 font-bold">
                                <NuxtLink :to="localePath('/sign-in')">{{ $t('signIn') }}</NuxtLink>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </client-only>
</template>
<script setup lang="ts">
import axios from 'axios';
import { setCookie } from "~/assets/js/utils/tools";
const { t } = useI18n();
const localePath = useLocalePath();

const submitForm = reactive({ email: "", password: "", confirmPassword: "" })

const signUpUser = () => {
    if (submitForm.email.trim() == '' || submitForm.password.trim() == '' || submitForm.password.trim() == '') {
        return false
    }
    if (submitForm.password != submitForm.confirmPassword) {
        useNuxtApp().$toast.error(t('passwordInconsistency'));
        return false
    }
    let data = {
        email: submitForm.email.trim(),
        password: submitForm.password.trim()
    }
    axios.post(`/api/user/sign-up`, data).then(async (response) => {
        if (response && response.data) {
            let res = response.data
            if (res.code) {
                useNuxtApp().$toast.error(res.message);
            } else if (res.userId) {
                setCookie("__user", encodeURIComponent(JSON.stringify(res)), 365)
                useNuxtApp().$toast.success(t('success'));
                setTimeout(() => {
                    navigateTo(localePath('/robot-management'))
                }, 2000)
            }
        }
    }).catch((err) => {
        useNuxtApp().$toast.error(err);
    })
}


</script>
