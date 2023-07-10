<template>
    <div :class="$attrs.class">
        <div class="my-4">
            <form>
                <div class="mb-4">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text mb-2">{{ $t('inputCorpus') }}</span>
                        </label>
                        <textarea class=" textarea textarea-bordered h-24" v-model="testScopedKnowledge"></textarea>
                    </div>
                </div>
                <div class="mb-4">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text mb-2">{{ $t('relatedQuestion') }}</span>
                        </label>
                        <textarea class=" textarea textarea-bordered h-24" v-model="testQuestion"></textarea>
                    </div>
                </div>
                <div class="mb-4 text-center">
                    <button class="btn btn-primary btn-block" :disabled="isLoadingSumbmit"
                        @click="askChatBot(testScopedKnowledge, testQuestion)">
                        <span v-if="isLoadingSumbmit" class="loading loading-spinner loading-lg text-green-600"></span>
                        <span v-else="!isLoadingSumbmit">{{ $t('submit') }}</span>
                    </button>
                </div>
                <div class="mb-4">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text mb-2">{{ $t('answer') }}</span>
                        </label>
                        <textarea class=" textarea textarea-bordered h-24" v-model="testAnswer"></textarea>
                    </div>
                </div>
                <div class="text-center">
                    <button class="btn btn-primary" type="button" @click="addScopedKnowledge(testScopedKnowledge)">
                        <span v-if="isLoadingSave" class="loading loading-spinner loading-lg text-green-600"></span>
                        <span v-else="!isLoadingSave">{{ $t('save') }}</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>

import axios from 'axios';

import { ref } from "vue";
import eventBus from '~~/assets/js/lib/eventBus';

const { t } = useI18n();

const robotStore = useRobotStore();
const userStore = useUserStore();


// State
const testScopedKnowledge = ref('');
const testQuestion = ref('');
const testAnswer = ref('');
const isLoadingSumbmit = ref(false);
const isLoadingSave = ref(false);


const addScopedKnowledge = async (scoped_knowledge: string) => {
    let data = {
        "scoped_knowledge": scoped_knowledge,
        "user_id": userStore.user.userId,
        "robot_id": robotStore.selectedRobotId,
    }
    isLoadingSave.value = true
    axios.post('/api/chatbot/add-scoped-knowledge', data).then(async (response) => {
        useNuxtApp().$toast.success(t('success'));
        eventBus.emit("updateScopedKnowledgeEvent", {
            user_id: userStore.user.userId,
            robot_id: robotStore.selectedRobotId,
        })
    }).catch(error => {
        useNuxtApp().$toast.error(t('error'));
    }).finally(() => {
        setTimeout(() => {
            isLoadingSave.value = false
        }, 1000)
    })
}


const askChatBot = async (scoped_knowledge: string, question: string, max_tokens: number = 1024) => {
    let data = {
        "scoped_knowledge": scoped_knowledge,
        "messages": [{ "role": "user", "content": question }],
        "max_tokens": max_tokens,
    }
    isLoadingSumbmit.value = true;
    axios.post('/api/chatbot/ask', data).then(async (response) => {
        if (response.data.code != 20000) {
            useNuxtApp().$toast.error(t('robotRefuseAnswer'));
        }
        testAnswer.value = response.data.data.message
    }).catch(error => {
        useNuxtApp().$toast.error(error);
    }).finally(() => {
        isLoadingSumbmit.value = false;
    })

}

</script>