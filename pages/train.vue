<template>
    <client-only>
        <Logo />
        <div class="w-full section-bg pt-2">
            <div class="w-full max-w-screen-xl m-auto px-4 lg:px-10 pb-10 lg:pb-10 flex items-center flex-wrap">
                <div class="w-full lg:w-1/2">
                    <h1 class="text-center lg:text-left text-3xl lg:text-5xl pt-10 lg:pt-20">训练机器人
                    </h1>
                    <div class="text-center lg:text-left mt-8 text-gray-600">输入预设语料，让机器人根据其内容回答</div>
                </div>
            </div>
        </div>
        <div class="w-10/12 my-5 mx-auto max-w-[90%]">
            <el-divider content-position="left">
                测试区域
            </el-divider>
            <span>在下列测试区域，测试给定预设语料后，AI的回复效果。</span>
            <TestRobotForm class=" my-6"></TestRobotForm>
            <el-divider content-position="left">
                选择操作的机器人
            </el-divider>
            <RobotSelect showCreateButton class="my-4"></RobotSelect>
            <el-divider content-position="left">
                已录入数据
            </el-divider>
            <el-button class="my-2" @click="syncScopedKnowledgeByUserAndRobot" :icon="Refresh"
                type="primary">同步数据</el-button>
            <el-table scrollbar-always-on flexible fit highlight-current-row ref="multipleTableRef" border :data="tableData"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" min-width="55"></el-table-column>
                <el-table-column prop="id" label="行" min-width=80 />
                <el-table-column prop="content" label="预设语料" min-width="500">
                    <template #default="scope">
                        <div class="flex content-center">
                            <!-- <el-input autosize v-model="scope.row.content" clearable type="textarea" resize="vertical"
                                show-word-limit maxlength="1024" :placeholder="$t('questionPlaceHodler')"></el-input> -->
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
        </div>
    </client-only>
</template>

<script lang="ts" setup>
import { Refresh } from '@element-plus/icons-vue';
import axios from 'axios';
import { ElButton, ElDivider, ElMessage, ElRow, ElTable, ElTableColumn, ElText } from "element-plus";
import { ref } from 'vue';
import eventBus from '~/assets/js/lib/eventBus';

const userStore = useUserStore();
const robotStore = useRobotStore();

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
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<QAInfo[]>([]);
const tableData = ref<TableData[]>([]);



const handleSelectionChange = (val: QAInfo[]) => {
    multipleSelection.value = val
}

const deleteScopedKnowledge = async (digest: string) => {
    let data = {
        "user_id": userStore.user.userId,
        "robot_id": robotStore.selectedRobotId,
        "digest": digest,
    }
    axios.post("/api/chatbot/delete-scoped-knowledge", data).then(async (response) => {
        if (response.data.code != 20000) {
            ElMessage({
                message: response.data.data,
                type: 'error',
            })
            return;
        }
        ElMessage({
            message: "删除成功",
            type: 'success',
        })
        tableData.value = tableData.value.filter((value: any) => value.digest != digest);
    })
}

const syncScopedKnowledgeByUserAndRobot = async () => {
    let data = {
        "limit": 10,
        "user_id": userStore.user.userId,
        "request_timestamp_ms": new Date().getTime(),
        "robot_id": robotStore.selectedRobotId,
    }
    axios.post("/api/chatbot/get-scoped-knowledge", data).then(async (response) => {
        if (response.data.code != 20000) {
            ElMessage({
                message: response.data.data,
                type: 'error',
            })
            return;
        }
        tableData.value = response.data.data.map((value: any, index: number) => ({ id: index + 1, content: value.scoped_knowledge, digest: value.digest }));
    }).catch(error => {
        ElMessage({ message: error, type: 'error' })
    }).finally(() => {
    })
}

eventBus.on("updateScopedKnowledgeEvent", syncScopedKnowledgeByUserAndRobot)

// init
syncScopedKnowledgeByUserAndRobot()

</script>

