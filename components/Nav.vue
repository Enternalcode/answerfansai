<template>
    <div class="flex justify-between w-full py-4 px-4 lg:px-10 items-center fixed top-0">
        <div class="navbar rounded-box">
            <div class="flex-1 px-2 lg:flex-none">
                <NuxtLink class="text-lg font-bold flex h-14 items-center" :to="localePath('/')">
                    <img src="/logo.png" class="h-10 lg: lg:h-12" />
                    <span class=" text-xl font-bold hidden lg:block"></span>
                </NuxtLink>
            </div>
            <div class="flex justify-end flex-1 px-2">
                <div class="flex items-stretch">
                    <div class="dropdown dropdown-end">
                        <ul tabindex="0" class="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                            <li>
                                <NuxtLink @click="logOut">{{ $t('logOut') }} </NuxtLink>
                            </li>
                        </ul>
                    </div>
                    <NuxtLink class="btn btn-ghost rounded-btn" :to="localePath('/')">{{ $t('home') }}</NuxtLink>
                    <NuxtLink class="btn btn-ghost rounded-btn" :to="localePath('/price')">{{ $t('price') }}</NuxtLink>
                    <div class="dropdown dropdown-end" v-if="user.email">
                        <label tabindex="0" class="btn btn-ghost rounded-btn">
                            {{ $t('robot') }}
                            <Icon name="bi:chevron-down" size="16" />
                        </label>
                        <ul tabindex="0" class="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                            <li>
                                <NuxtLink @click="navigateTo(localePath('/robot-management'))">{{ $t('management') }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>
                    <div class="dropdown dropdown-end" v-if="user.email">
                        <label tabindex="0" class="btn btn-ghost rounded-btn">{{ filterName(user.email) }}
                            <Icon name="bi:chevron-down" size="16" />
                        </label>
                        <ul tabindex="0" class="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                            <li>
                                <NuxtLink @click="logOut">{{ $t('logOut') }} </NuxtLink>
                            </li>
                        </ul>
                    </div>
                    <NuxtLink class="btn btn-ghost rounded-btn" :to="localePath('/sign-in')" v-if="!user.email">{{
                        $t('signIn')
                    }}</NuxtLink>
                    <NuxtLink class="btn btn-ghost rounded-btn" :to="localePath('/sign-up')" v-if="!user.email">{{
                        $t('signUp')
                    }}</NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" >
import { storeToRefs } from 'pinia';
import { clearLocal } from "~/assets/js/utils/tools";

const localePath = useLocalePath();

const userStore = useUserStore();
const { user } = storeToRefs(userStore)

if (process.client) {
    userStore.initLocalUser()
}

const filterName = (email: string) => {
    return email.length > 8 ? email.substring(0, 8) + "..." : email
}

const logOut = () => {
    clearLocal()
    window.location.reload()
    userStore.logOut()
}

</script>



