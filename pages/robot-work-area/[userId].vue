<template>
    <client-only>
        <Logo />
        <div class="w-full section-bg">
            <div class="w-full max-w-screen-xl m-auto px-4 lg:px-10 pb-10 lg:pb-10 flex items-center flex-wrap">
                <div class="w-full lg:w-1/2">
                    <h1 class="text-center lg:text-left text-3xl lg:text-5xl pt-10 lg:pt-10">智能回复机器人
                    </h1>
                </div>
            </div>
        </div>
        <div class="w-10/12 my-5 mx-auto max-w-[90%]">
            <!-- <el-divider content-position="left">
                选择机器人
            </el-divider>
            <el-select v-model="selectedRobot.robotName" placeholder="Select" size="large">
                <el-option v-for="item in options" :key="item.robotId" :label="item.robotName" :value="item.robotId" />
            </el-select>
            <el-divider content-position="left">
                问题
            </el-divider>
            <el-input class="mt-4" :rows="2" clearable type="textarea" show-word-limit maxlength="200"
                v-model="question"></el-input>
            <el-button class="mt-4" :loading="isLoading" :disabled="isLoading" @click="askChatBot(question)" size="default"
                type="primary" :icon="Promotion"></el-button>
            <el-divider content-position="left">
                回复
            </el-divider>
            <el-input :rows="10" clearable type="textarea" v-model="answer">
            </el-input> -->
        </div>
        <Footer />
    </client-only>
</template>

<script setup lang="ts">
import axios from 'axios';

const route = useRoute();
const { userId } = route.params;

const question = ref("")
const answer = ref("")
const isLoading = ref(false);
const selectedRobot = reactive({ "robotId": "", "robotName": "" });
interface ListItem {
    robotId: string;
    robotName: string;
}
const options = ref<ListItem[]>([]);

const askChatBot = async (question: string, max_tokens: number = 1024) => {
    let data = {
        "user_id": userId,
        "robot_id": selectedRobot.robotId,
        "messages": [{ "role": "user", "content": question }],
        "max_tokens": max_tokens,
        "search_limit": 1,
        "hit_score_threshold": 0.40,
        "carry_related_scoped_knowledge": true
    }
    isLoading.value = true;
    axios.post('/api/chatbot/answer-question', data).then(async (response) => {
        if (response.data.code != 20000) {
            ElMessage({
                message: 'AI内部故障请联系管理员',
                type: 'error',
            })
        }
        answer.value = response.data.data.message

        console.log("debug", response.data.data)
    }).catch(error => {
        ElMessage({ message: error, type: 'error' })
    }).finally(() => {
        isLoading.value = false;
    })
}

const convert2Options = (robots: any) => {
    let options = []
    for (let i = 0; i < robots.length; i++) {
        options.push({ "robotId": robots[i].robot_id, "robotName": robots[i].robot_name })
    }
    return options
}

const testPost = async () => {
    let data = {
        "user_id": userId,
    }
    axios.post("/api/chatbot/test-post", data).then(async (response) => {
        if (response.data.code != 20000) {
            ElMessage({
                message: '失败',
                type: 'error',
            })
        }
        ElMessage({
            message: `成功, ${response.data.data}`,
            type: 'success',
        })
        console.log("debug post", response.data.data)
    })
}

const getAllRobot = async () => {
    let data = {
        "user_id": userId,
    }
    axios.post("/api/chatbot/get-all-robot", data).then(async (response) => {
        if (response.data.code != 20000) {
            ElMessage({
                message: '获取机器人列表失败',
                type: 'error',
            })
        }
        options.value = convert2Options(response.data.data)
        if (options.value.length == 0) {
            return
        }
        selectedRobot.robotId = options.value[0].robotId
        selectedRobot.robotName = options.value[0].robotName
    })
}

if (process.client) {
    getAllRobot()
}

</script>



