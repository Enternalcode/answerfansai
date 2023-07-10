<template>
    <div class="flex justify-between w-full py-4 px-4 lg:px-10 items-center fixed top-0">
        <div class="navbar rounded-box">
            <div class="flex-1 px-2 lg:flex-none">
                <a class="text-lg font-bold flex h-14 items-center" href="/">
                    <img src="/logo.png" class="h-10 lg: lg:h-12" />
                    <span class=" text-xl font-bold hidden lg:block"></span>
                </a>
            </div>
            <div class="flex justify-end flex-1 px-2">
                <div class="flex items-stretch">
                    <div class="dropdown dropdown-end">
                        <ul tabindex="0" class="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                            <li><a @click="logout">{{ $t('logOut') }} </a></li>
                        </ul>
                    </div>
                    <a class="btn btn-ghost rounded-btn" href="/">{{ $t('home') }}</a>
                    <a class="btn btn-ghost rounded-btn" href="/price">{{ $t('price') }}</a>
                    <div class="dropdown dropdown-end" v-if="user.email">
                        <label tabindex="0" class="btn btn-ghost rounded-btn">
                            {{ $t('robot') }}
                            <Icon name="bi:chevron-down" size="16" />
                        </label>
                        <ul tabindex="0" class="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                            <li><a @click="jumpToPage('/robot-management')">{{ $t('management') }}</a></li>
                        </ul>
                    </div>
                    <div class="dropdown dropdown-end" v-if="user.email">
                        <label tabindex="0" class="btn btn-ghost rounded-btn">{{ filterName(user.email) }}
                            <Icon name="bi:chevron-down" size="16" />
                        </label>
                        <ul tabindex="0" class="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                            <li><a @click="logout">{{ $t('logOut') }} </a></li>
                        </ul>
                    </div>
                    <a class="btn btn-ghost rounded-btn" href="/sign-in" v-if="!user.email">{{ $t('signIn')
                    }}</a>
                    <a class="btn btn-ghost rounded-btn" href="/sign-up" v-if="!user.email">{{ $t('signUp')
                    }}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" >
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



