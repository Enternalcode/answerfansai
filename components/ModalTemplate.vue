<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';

defineProps<{
    title?: string
}>()

const emit = defineEmits<{
    (e: 'close'): void
}>()
</script>

<template>
    <VueFinalModal class="flex justify-center items-center"
        content-class="flex flex-col max-w-xl mx-4 p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg space-y-2">
        <div class="flex w-full">
            <button class="mt-1 ml-auto px-1" @click="emit('close')">
                <Icon name="fa-solid:times" size="16" />
            </button>
        </div>
        <slot />
    </VueFinalModal>
</template>