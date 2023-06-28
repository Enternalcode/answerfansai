<template>
    <div :class="parentClass">
        <span></span>
        <el-form label-position="top">
            <el-form-item label="输入语料" prop="testScopedKnowledge">
                <el-input :rows="8" clearable type="textarea" show-word-limit maxlength="1500"
                    v-model="testScopedKnowledge"></el-input>
            </el-form-item>
            <el-form-item v-loading="isLoading" label="相关问题" prop="testQuestion">
                <el-input :rows="2" clearable type="textarea" show-word-limit maxlength="200"
                    v-model="testQuestion"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button :loading="isLoading" :disabled="isLoading" @click="askChatBot(testScopedKnowledge, testQuestion)"
                    size="default" type="primary" :icon="Promotion"></el-button>
            </el-form-item>
            <el-form-item label="回复内容" prop="testAnswer">
                <el-input :rows="5" clearable type="textarea" v-model="testAnswer">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addScopedKnowledge(testScopedKnowledge)">录入数据</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { Promotion } from '@element-plus/icons-vue';
import axios from 'axios';
import { ElButton, ElForm, ElFormItem, ElInput, ElLoading, ElMessage } from 'element-plus';
import { defineProps, ref } from "vue";
import eventBus from '~~/assets/js/lib/eventBus';


const robotStore = useRobotStore();
const userStore = useUserStore();
const props = defineProps({
    parentClass: {
        type: String,
        default: ''
    }
});

// State
const testScopedKnowledge = ref('使用AnswerFansAI快速搭建智能回复机器人, 让你不用再一遍又一遍的回答重复的问题');
const testQuestion = ref('AnswerFansAI可以干什么');
const testAnswer = ref('');
const isLoading = ref(false);


const addScopedKnowledge = async (scoped_knowledge: string) => {
    let data = {
        "scoped_knowledge": scoped_knowledge,
        "user_id": userStore.user.userId,
        "request_timestamp_ms": new Date().getTime(),
        "robot_id": robotStore.selectedRobotId,
    }
    const loadingInstance = ElLoading.service(
        {
            lock: true,
            text: '录入中...',
            background: 'rgba(0, 0, 0, 0.7)'
        }
    );
    axios.post('/api/chatbot/add-scoped-knowledge', data).then(async (response) => {
        if (response.data.code != 20000) {
            ElMessage({
                message: response.data.data,
                type: 'error',
            })
            return;
        }
        ElMessage({
            message: '录入成功',
            type: 'success',
        })
        eventBus.emit("updateScopedKnowledgeEvent", {
            user_id: userStore.user.userId,
            robot_id: robotStore.selectedRobotId,
        })
    }).catch(error => {
        ElMessage({ message: error, type: 'error' })
    }).finally(() => {
        setTimeout(() => {
            loadingInstance.close()
        }, 1000)
    })
}


const askChatBot = async (scoped_knowledge: string, question: string, max_tokens: number = 1024) => {
    let data = {
        "scoped_knowledge": scoped_knowledge,
        "messages": [{ "role": "user", "content": question }],
        "max_tokens": max_tokens,
    }
    isLoading.value = true;
    axios.post('/api/chatbot/ask', data).then(async (response) => {
        if (response.data.code != 20000) {
            ElMessage({
                message: 'Ask ChatBot Failed',
                type: 'error',
            })
        }
        testAnswer.value = response.data.data.message
    }).catch(error => {
        ElMessage({ message: error, type: 'error' })
    }).finally(() => {
        isLoading.value = false;
    })

}

</script>