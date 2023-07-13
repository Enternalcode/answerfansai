<template>
    <client-only>
        <Logo class="" />
        <div class="max-w-lg m-auto">
            <div class="relative flex flex-col justify-center h-screen overflow-hidden">
                <div class="w-full p-1 m-auto rounded-md shadow-md lg:max-w-xl">
                    <h1 class="text-3xl font-semibold text-center">AnswerFansAI</h1>
                    <div class="text-2xl my-2 text-center">{{ $t('signIn') }}</div>
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
                            <button @click="signinUser" class="btn btn-block btn-success">{{ $t('signIn') }}</button>
                        </div>
                        <div class="my-4 text-gray-600 text-base text-center flex justify-between items-center">
                            <div>
                                {{ $t('noAccountHint') }}<span
                                    class="underline text-cus-primary text-base cursor-pointer ml-1 font-bold"
                                    @click="navigateTo(localePath('/sign-up'))">{{ $t('signUp') }}</span>
                            </div>
                            <div class="text-sm text-right cursor-pointer transition-light"
                                @click="navigateTo(localePath('/forget'))">{{ $t('forgetPassword') }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </client-only>
</template>

<script setup lang="ts">
import axios from "axios";
import { useI18n } from "vue-i18n";
import { isEmail, setCookie } from "~/assets/js/utils/tools";

const { t } = useI18n();
const submitForm = reactive({ email: "", password: "" });
const userStore = useUserStore();
const localePath = useLocalePath();

const signinUser = () => {
    if (submitForm.email == '' || submitForm.password == '') {
        useNuxtApp().$toast.error(t('passwordLengthRequire'));
        return false
    }
    if (!isEmail(submitForm.email)) {
        useNuxtApp().$toast.error(t('emailRuleType'));
        return false

    }
    if (submitForm.password.length < 6) {
        useNuxtApp().$toast.error(t('passwordLengthRequire'));
        return false
    }
    let data = {
        email: submitForm.email,
        password: submitForm.password
    }
    axios.post(`/api/user/sign-in`, data).then(async (response) => {
        if (response && response.data) {
            let res = response.data

            if (res.code) {
                useNuxtApp().$toast.error(res.message);
            } else if (res.userId) {
                useNuxtApp().$toast.success(t('signInSuccess'));
                setCookie("__user", encodeURIComponent(JSON.stringify(res)), 365)
                setTimeout(() => {
                    userStore.initLocalUser()
                    navigateTo(localePath('/robot-management'))
                }, 2000)
            }
        }
    })
}
</script>
