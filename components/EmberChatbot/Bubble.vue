<template>
    <div class="chat" :class="role == 'user' ? 'chat-end' : 'chat-start'">
        <div class="chat-bubble bg-gray-100 overflow-hidden">
            <slot />
        </div>
    </div>
</template>

<script setup>
defineProps({
    role: String,
})
</script>