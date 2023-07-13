<template>
    <div class="flex justify-between w-full py-4 px-4 lg:px-10 items-center">
        <NuxtLink class="flex h-14 items-center" :to="localePath('/')">
            <img src="/logo.png" class="h-10 lg: lg:h-14" />
            <span class="ml-2 text-xl font-bold hidden lg:block"></span>
        </NuxtLink>
    </div>
</template>
<script lang="ts" setup>
const localePath = useLocalePath()
</script>