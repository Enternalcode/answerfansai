<template>
    <button class="absolute bottom-0 right-0 rounded-full h-16 w-16 p-1 bg-purple-700 grid place-items-center"
        @click="toggleStates">
        <Icon name="fontisto:hipchat" color="white" size="24" />
    </button>
</template>

<script setup>
import { useEmberChatbotStore } from "~~/composables/stores";
const emberChatbotStore = useEmberChatbotStore()
function toggleStates() {
    emberChatbotStore.chatWindow = !emberChatbotStore.chatWindow
    emberChatbotStore.chatInitiated = true
}

</script>