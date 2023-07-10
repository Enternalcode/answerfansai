<template>
    <client-only>
        <div :class="$attrs.class" class="py-2">
            <div class="my-4">
                <h2 class="text-lg font-medium">{{ $t('scopedKnowledge') }}</h2>
                <div class="flex justify-end">
                    <button class="btn btn-primary" @click="syncScopedKnowledgeByUserAndRobot" :disabled="isLoadingSync">
                        <span v-if="isLoadingSync">
                            <span class="loading loading-spinner"></span>
                        </span>
                        <div v-else="!isLoadingSync">
                            <Icon name="ic:round-sync" size="32"></Icon>
                            {{ $t('syncData') }}
                        </div>

                    </button>
                </div>
            </div>
            <div class="my-4">
                <table class="table table-compact table-fixed">
                    <thead>
                        <tr>
                            <th class="w-20">{{ $t('row') }}</th>
                            <th>{{ $t('inputCorpus') }}</th>
                            <th class="w-40">{{ $t('operation') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in tableData" :key="item.id">
                            <td class="text-center">{{ index + 1 }}</td>
                            <td>{{ item.content }}</td>
                            <td class="text-center">
                                <button class="btn btn-error btn-square flex justify-center items-center" type="button"
                                    @click="deleteScopedKnowledge(item.digest)">
                                    <Icon name="jam:delete" size="30"></Icon>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- <div :class="$attrs.class" class="py-2">
            <el-divider content-position="left">
                已录入数据
            </el-divider>
            <el-button class="my-2" @click="syncScopedKnowledgeByUserAndRobot" :icon="Refresh"
                type="primary">同步数据</el-button>
            <el-table class="my-2" scrollbar-always-on flexible fit highlight-current-row ref="multipleTableRef" border
                :data="tableData" @selection-change="handleSelectionChange">
                <el-table-column prop="id" label="行" min-width=80 />
                <el-table-column prop="content" label="预设语料" min-width="500">
                    <template #default="scope">
                        <div class="flex content-center">
                            <el-text>{{ scope.row.content }}</el-text>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="operation" label="操作">
                    <template #default="scope">
                        <el-row :span="24" class="space-y-2 flex justify-end">
                            <el-button size="default" type="danger"
                                @click="deleteScopedKnowledge(scope.row.digest)">删除</el-button>
                        </el-row>
                    </template>
                </el-table-column>
            </el-table>
        </div> -->
    </client-only>
</template>

<script lang="ts" setup>
import axios from 'axios';

import { ref } from 'vue';
import eventBus from '~/assets/js/lib/eventBus';

const userStore = useUserStore();
const robotStore = useRobotStore();
const { t } = useI18n();

const isLoadingSync = ref(false)

if (process.client) {
    userStore.initLocalUser()
}

//  State 
interface QAInfo {
    id: number;
    content: string;
    question: string;
    answer: string;
}
interface TableData {
    id: number;
    content: string;
    digest: string;
}
// const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<QAInfo[]>([]);
const tableData = ref<TableData[]>([]);




const deleteScopedKnowledge = async (digest: string) => {
    let data = {
        "user_id": userStore.user.userId,
        "robot_id": robotStore.selectedRobotId,
        "digest": digest,
    }
    axios.post("/api/chatbot/delete-scoped-knowledge", data).then(async (response) => {
        if (response.data.code != 20000) {
            useNuxtApp().$toast.error(response.data.data)
            return;
        }
        useNuxtApp().$toast.success(t('success'))
        tableData.value = tableData.value.filter((value: any) => value.digest != digest);
    })
}

const syncScopedKnowledgeByUserAndRobot = async () => {
    let data = {
        "limit": 10,
        "user_id": userStore.user.userId,
        "robot_id": robotStore.selectedRobotId,
    }
    isLoadingSync.value = true
    axios.post("/api/chatbot/get-scoped-knowledge", data).then(async (response) => {
        if (response.data.code != 20000) {
            useNuxtApp().$toast.error(response.data.data)
            return;
        }
        tableData.value = response.data.data.map((value: any, index: number) => ({ id: index + 1, content: value.scoped_knowledge, digest: value.digest }));
    }).catch(error => {
        useNuxtApp().$toast.error(error)
    }).finally(() => {
        setTimeout(() => {
            isLoadingSync.value = false
        }, 1000)
    })
}

eventBus.on("updateScopedKnowledgeEvent", syncScopedKnowledgeByUserAndRobot)

// init
syncScopedKnowledgeByUserAndRobot()

</script>

