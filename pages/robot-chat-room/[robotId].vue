<template>
    <div class="absolute inset-0">
        <div class="relative h-full">
            <div class="shadowshadow-gray-600 overflow-hidden flex flex-col bg-white h-full">
                <header
                    class="w-full flex-none bg-gradient-to-r flex items-center justify-start space-x-6 px-3 from-purple-600 to-violet-600">
                    <img :key="currentRobotInfo.avatarUrl" :src="currentRobotInfo.avatarUrl"
                        class="block w-20 h-20 rounded-full m-2">
                    <h1 class="text-lg text-gray-50 font-semibold">{{ currentRobotInfo.name }}</h1>
                </header>
                <div class="messages flex flex-col h-full space-y-4 w-full overflow-x-hidden overflow-y-auto py-8 scroll-smooth px-6"
                    ref="messageContainer">
                    <EmberChatbotBubble v-for="(message, index) in messages" :key="index" :role="message.role">
                        <span v-html="message.content">
                        </span>
                    </EmberChatbotBubble>
                    <EmberChatbotBubble v-if="typing" role="assistant">
                        <EmberChatbotTyping />
                    </EmberChatbotBubble>
                </div>
                <div class="pb-2">
                    <form @submit.prevent="sendMessage" class="flex items-center mt-auto px-4 space-x-2">
                        <input v-model="messageText" type="text"
                            class="w-full py-6 px-3 h-10 text-black border border-gray-900 placeholder:text-gray-600 outline-none focus:outline-none transition-all duration-150 ease-in-out focus:border-purple-600" />
                        <button class="btn btn-md btn-primary rounded-none bg-purple-600" :disabled="typing">
                            <Icon name="grommet-icons:send" size="24" color="white" />
                        </button>
                    </form>
                </div>
                <div class="flex justify-center items-center py-4">
                    <span>Powered By
                        <NuxtLink class="link" to="http://answerfansai.com">AnswerFansAI.com</NuxtLink>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { getRobotInfoByRobotId } from '~~/assets/js/utils/commonService';
import { useEmberChatbotStore } from '~~/composables/stores';


const route = useRoute();
const { robotId } = route.params;
const emberChatbotStore = useEmberChatbotStore()
const currentRobotId: string = robotId as string;
const maxTokens = 1024
const messageText = ref("")
const typing = ref(false)
const currentRobotInfo = reactive({
    "avatarUrl": "",
    "name": "",
    "robotId": "",
    "userId": "",
})

const messages = ref([
    { role: "assistant", content: "你好，我能帮你什么忙吗?" },
    { role: "assistant", content: "关于我们的服务，你可以问任何你喜欢的问题." },
])

const messageContainer = ref()

function sendMessage() {
    messages.value = [...messages.value, { role: "user", content: messageText.value }]
    // { messages: messages.value }
    let data = {
        "robot_id": currentRobotInfo.robotId,
        "messages": [{ "role": "user", "content": messageText.value }],
        "max_tokens": maxTokens,
        "search_limit": 1,
        "hit_score_threshold": 0.20,
        "carry_related_scoped_knowledge": true
    }
    typing.value = true
    messageText.value = ""
    setTimeout(() => {
        messageContainer.value.scrollTop = messageContainer.value.scrollHeight
    }, 500)

    $fetch("/api/chatbot/answer-question", {
        method: "POST",
        body: JSON.stringify(data),
    }).then((res) => {
        let received = res.data.message
        // replace link with anchor tags
        // received.content = replaceLinkWithAnchorTags(received.content)
        let receivedMessage = { role: "assistant", content: res.data.message }
        messages.value = [...messages.value, receivedMessage]
        messageContainer.value.scrollTop = messageContainer.value.scrollHeight
    }).finally(() => {
        typing.value = false
    })
}

// onMounted(async () => {
//     const robotInfo = await getRobotInfoByRobotId(currentRobotId)
//     currentRobotInfo.avatarUrl = robotInfo.data[0].robot_avatar
//     currentRobotInfo.name = robotInfo.data[0].robot_name
//     currentRobotInfo.robotId = robotInfo.data[0].robot_id
//     currentRobotInfo.userId = robotInfo.data[0].user_id
// })

onBeforeMount(async () => {
    const robotInfo = await getRobotInfoByRobotId(currentRobotId)
    currentRobotInfo.avatarUrl = robotInfo.data[0].robot_avatar
    currentRobotInfo.name = robotInfo.data[0].robot_name
    currentRobotInfo.robotId = robotInfo.data[0].robot_id
    currentRobotInfo.userId = robotInfo.data[0].user_id
})

</script>

<style></style>