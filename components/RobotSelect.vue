<template>
    <div :class="parentClass">
        <el-select v-model="robotStore.selectedRobotName" placeholder="Select" size="large">
            <el-option v-for="item in options" :key="item.robotId" :label="item.robotName" :value="item.robotId" />
        </el-select>
        <el-button class="ml-4" @click="getAllRobot" :icon="Refresh" type="primary">获取机器人列表</el-button>
        <el-button v-if="showCreateButton" class="my-2" size="default" type="primary" :icon="Plus"
            @click="createRobot">创建</el-button>
        <el-button v-if="showCreateButton" class="my-2" size="default" type="success" :icon="Pointer"
            @click="jumpToPage(`/robot-work-area/${userStore.user.userId}`, { 'userId': userStore.user.userId, 'selectedRobotId': robotStore.selectedRobotId, 'selectedRobotName': robotStore.selectedRobotName })">使用机器人</el-button>
    </div>
</template>
<script lang="ts" setup>
import { Plus, Pointer, Refresh } from "@element-plus/icons-vue";
import { jumpToPage } from "assets/js/utils/tools";
import axios from "axios";
import { ElButton, ElMessage, ElMessageBox, ElOption, ElSelect } from "element-plus";
import { defineProps } from 'vue';

const props = defineProps({
    parentClass: {
        type: String,
        default: ''
    },
    showCreateButton: {
        type: Boolean,
        default: false
    }
});
interface ListItem {
    robotId: string;
    robotName: string;
}
const options = ref<ListItem[]>([])
const userStore = useUserStore();
const robotStore = useRobotStore();

const createRobot = () => {
    ElMessageBox.prompt('给机器人起个名字', "创建机器人", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        draggable: true,
    })
        .then(({ value }) => {
            let data = {
                "user_id": userStore.user.userId,
                "request_timestamp_ms": new Date().getTime(),
                "robot_name": value,
                "robot_category": "default"
            };
            axios.post("/api/chatbot/create", data).then(async (response) => {
                console.log('create robot response: ', response.data)
                if (response.data.code != 20000) {
                    ElMessage({
                        message: '创建失败',
                        type: 'error',
                    })
                }
                getAllRobot();
                ElMessage({
                    message: '创建成功',
                    type: 'success',
                });
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消创建',
            })
        })
}

const convert2Options = (robots: any) => {
    let options = []
    for (let i = 0; i < robots.length; i++) {
        options.push({ "robotId": robots[i].robot_id, "robotName": robots[i].robot_name })
    }
    return options
}

const getAllRobot = () => {
    let data = {
        "user_id": userStore.user.userId,
        "request_timestamp_ms": new Date().getTime(),
    }
    axios.post("/api/chatbot/get-all-robot", data).then(async (response) => {
        if (response.data.code != 20000) {
            ElMessage({
                message: '获取机器人列表失败',
                type: 'error',
            })
        }
        robotStore.robotsInfo = response.data.data
        options.value = convert2Options(response.data.data)
        if (options.value.length == 0) {
            return
        }
        robotStore.$patch({
            selectedRobotId: options.value[0].robotId,
            selectedRobotName: options.value[0].robotName
        })
    })
}

// Init
getAllRobot();

</script>