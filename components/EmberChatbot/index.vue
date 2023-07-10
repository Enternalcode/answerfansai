<template>
    <div class="fixed bottom-1 right-2">
        <div class="relative">
            <EmberChatbotWindow v-if="emberChatbotStore.chatWindow" :userId="props.userId" :robotId="props.robotId" />
            <EmberChatbotButton />
        </div>
    </div>
</template>

<script setup>
import { useEmberChatbotStore } from '~~/composables/stores';
const emberChatbotStore = useEmberChatbotStore()

const props = defineProps({
    userId: {
        type: String,
        required: true,
    },
    robotId: {
        type: String,
        required: true,
    }
})
</script>