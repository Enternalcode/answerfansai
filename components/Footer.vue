<!-- Please remove this file from your project -->
<template>
    <div class="w-full px-10 py-8 flex justify-between items-center flex-col-reverse lg:flex-row">
        <div class="text-sm text-gray-500">
            © 2023 answerfansai.com
        </div>
        <div class="flex flex-wrap lg:space-x-10 text-sm">
            <a href="/terms" class="w-full lg:w-auto text-center my-4 lg:my-0">{{ $t('termsOfService') }}</a>
            <a href="/privacy" class="w-full lg:w-auto text-center my-4 lg:my-0">{{ $t('privacyPolicy') }}</a>
            <a href="/contact" class="w-full lg:w-auto text-center my-4 mb-8 lg:my-0">{{ $t(('contactUs')) }}</a>
        </div>
        <div class="pr-10">
            <form>
                <label for="locale-select">{{ $t('language') }}: </label>
                <select id="locale-select select select-info w-full max-w-xs" v-model="$i18n.locale">
                    <option value="en">English</option>
                    <option value="zh">中文</option>
                </select>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
    return (locales.value).filter(i => i.code !== locale.value)
})
</script>

