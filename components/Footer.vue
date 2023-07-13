<!-- Please remove this file from your project -->
<template>
    <div class="w-full px-10 py-8 flex justify-between items-center flex-col-reverse lg:flex-row">
        <div class="text-sm text-gray-500">
            © 2023 answerfansai.com
        </div>
        <div class="flex flex-wrap lg:space-x-10 text-sm">
            <NuxtLink :to="localePath('/terms')" class="w-full lg:w-auto text-center my-4 lg:my-0">{{ $t('termsOfService')
            }}</NuxtLink>
            <NuxtLink :to="localePath('/privacy')" class="w-full lg:w-auto text-center my-4 lg:my-0">{{ $t('privacyPolicy')
            }}</NuxtLink>
            <NuxtLink :to="localePath('/contact')" class="w-full lg:w-auto text-center my-4 mb-8 lg:my-0">{{
                $t(('contactUs')) }}</NuxtLink>
        </div>
        <div class="pr-10">
            <form>
                <label for="locale-select">{{ $t('language') }}: </label>
                <select v-model="language">
                    <option v-for="item in locales" :key="typeof item === 'object' ? item.code : item"
                        :value="typeof item === 'object' ? item.code : item">
                        {{ typeof item === 'object' ? item.name : item }}
                    </option>
                </select>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">

const { locale, locales, setLocale } = useI18n()
const localePath = useLocalePath()

const language = computed({
    get: () => locale.value,
    set: (value) => {
        setLocale(value);
    }
})


</script>

