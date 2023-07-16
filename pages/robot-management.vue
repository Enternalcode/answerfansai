<template>
    <client-only>
        <Nav class="z-10" />
        <div class="w-full pt-40">
            <div class="w-full max-w-screen-xl m-auto lg:pb-20 flex items-center flex-wrap">
                <div class="w-full">
                    <span class="text-5xl">{{ $t('management') }}</span>
                    <div class="mt-6 tabs tabs-boxed">
                        <NuxtLink v-for="(tab, index) in moduleTabs" :key="index" class="tab"
                            :class="{ 'tab-active': activeTabIndex === index }" @click="activeTabIndex = index">
                            {{ tab }}
                        </NuxtLink>
                    </div>
                    <div class="mt-10">
                        <div v-if="activeTabIndex === 0">
                            <RobotTab />
                        </div>
                        <div v-if="activeTabIndex === 1">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </client-only>
</template>
<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { getAllRobot } from "~~/assets/js/utils/commonService.js";


const { t } = useI18n();

const userStore = useUserStore();
const robotStore = useRobotStore();
if (process.client) {
    userStore.initLocalUser()
    getAllRobot()
}

let moduleTabs = [t('create'), t('setting')]
let activeTabIndex = ref(0)

</script>

