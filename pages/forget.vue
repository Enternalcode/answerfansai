<template>
    <client-only>
        <div class="px-4">
            <Logo class="" />
            <div class="max-w-lg m-auto">
                <div class="text-2xl my-10">{{ $t('resetPassword') }}</div>
                <div class="w-full p-1 m-auto rounded-md shadow-md lg:max-w-xl">
                    <h1 class="text-3xl font-semibold text-center">AnswerFansAI</h1>
                    <div class="text-2xl my-2 text-center">{{ $t('forgetPassword') }}</div>
                    <div class="space-y-4">
                        <div>
                            <label class="label">
                                <span class="text-base label-text">{{ $t('resetPasswordAccountHinit') }}</span>
                            </label>
                            <input v-model="submitForm.email" type="text" :placeholder="t('email')"
                                class="w-full input input-bordered input-primary" />
                        </div>
                        <div>
                            <button @click="forgetUser" class="btn btn-block btn-success">{{ $t('confirm')
                            }}</button>
                        </div>
                        <div class="text-sm  mt-4">{{ $t('sendResetEmailHint') }}</div>
                    </div>
                </div>
                <div class="my-4 text-gray-600 text-base text-center flex justify-between items-center">
                    <div>
                        {{ $t('back') }}<span class="underline text-cus-primary text-base cursor-pointer ml-1 font-bold"
                            @click="jumpToPage('/sign-in')">{{ $t('SignIn') }}</span>
                    </div>
                </div>
            </div>
        </div>
    </client-only>
</template>

<script setup lang="ts">
import axios from 'axios';
import { jumpToPage } from "~/assets/js/utils/tools";

const { t } = useI18n();
const submitForm = reactive({ email: "" })



const forgetUser = () => {
    if (submitForm.email == '') {
        return false
    }
    let data = {
        email: submitForm.email
    }
    axios.post(`/api/user/forget`, data).then(async (response) => {
        if (response && response.data && response.data.code) {
            useNuxtApp().$toast.error(response.data.message);
        } else if (response && response.data) {
            useNuxtApp().$toast.error(t('sendedResetEmail'));
        }
    }).catch(error => {

        useNuxtApp().$toast.error(t('fail'));
    }).finally(() => {
    })
}
</script>
