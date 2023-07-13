<template>
    <client-only>
        <Nav class="z-10" />
        <div class="w-full pt-40">
            <div class="w-full max-w-screen-xl m-auto lg:pb-20 flex items-center flex-wrap">
                <div class="w-full">
                    <span class="text-5xl">{{ $t('inputCorpus') }}</span>
                    <div class="mt-6 tabs tabs-boxed">
                        <NuxtLink v-for="(tab, index) in moduleTabs" :key="index" class="tab"
                            :class="{ 'tab-active': activeTabIndex === index }" @click="activeTabIndex = index">
                            {{ tab }}
                        </NuxtLink>
                    </div>
                    <div class="mt-10">
                        <div v-if="activeTabIndex === 0">
                            <TestRobotForm />
                            <div class="divider"></div>
                            <TextRecordForm />
                        </div>
                        <div v-if="activeTabIndex === 1">
                            {{ $t('website') }}
                            <p>coming soon...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </client-only>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { useRoute } from 'vue-router';

const { t } = useI18n();

let moduleTabs = [t('text'), t('website')]
let activeTabIndex = ref(0)

const route = useRoute();
const robotId = route.params.robotId as string;
const robotStore = useRobotStore();

onMounted(() => {
    if (robotId) {
        robotStore.selectedRobotId = robotId
    }
})


</script>

<style></style>