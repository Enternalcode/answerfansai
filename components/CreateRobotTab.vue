<template>
    <div :class="$attrs.class">
        <div class="w-full flex items-center">
            <div class="flex items-center">
                <RobotOperationForm action="create" :saveButtonHandler="createRobot" />
                <!-- <p class="text-gray-400 ml-20">5/5</p> -->
            </div>
        </div>
        <div class="my-10 w-full block">
            <div class="grid grid-cols-4 gap-32">
                <div v-for="(item, index) in robotStore.robotsInfo" :key="index">
                    <div class="card rounded-md w-80 bg-base-100 shadow-xl">
                        <figure class="px-10 pt-10">
                            <img :key="item.avatarUrl" class="rounded-full m-4 w-32 h-32" :src="item.avatarUrl" />
                        </figure>
                        <div class="card-body items-center text-center">
                            <h2 class="card-title">{{ item.name }}</h2>
                            <p class="h-14">{{ item.desc }}</p>
                            <div class="join space-x-2">
                                <RobotOperationForm action="update" :saveButtonHandler="updateRobot" :robotData="item" />
                                <div class="card-actions">
                                    <button class="btn btn-circle"
                                        @click="navigateTo({ path: localePath(`/robot-load-data/${item.id}`), query: { robotId: item.id } })">
                                        <Icon name="grommet-icons:document-store" />
                                    </button>
                                </div>
                                <div class="card-actions">
                                    <button class="btn btn-circle"
                                        @click="navigateTo({ path: localePath(`/robot-chat-room/${item.id}`), query: { robotId: item.id } })">
                                        <Icon name="heroicons-outline:chat-bubble-left-right" />
                                    </button>
                                </div>
                                <div class="card-actions">
                                    <button class="btn btn-circle" @click="toggleDeployCodeModal(true, item.id)">
                                        <Icon name="ph:code-bold" />
                                    </button>
                                </div>
                                <div class="card-actions">
                                    <button class="btn btn-error btn-circle" @click="deleteRobot(item.id)">
                                        <Icon name="lucide:trash-2" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalTemplate v-model="deployCodeModal" @close="toggleDeployCodeModal(false)">
                <!-- </div> -->
                <div class="flex flex-col justify-center space-y-2">
                    <div class="text-center">
                        <span>只需要几行代码即可快速集成你到网站</span>
                    </div>
                    <div class="divider"></div>
                    <div>
                        <h3 class="py-2 ">iframe</h3>
                        <div class="mockup-code text-white">
                            <pre><code>{{ iframeScriptContent }}</code></pre>
                        </div>
                    </div>
                    <div class="divider"></div>
                    <div>
                        <h3 class="py-2 ">Nuxt 3</h3>
                        <div class="mockup-code text-white">
                            <pre><code>{{ nuxt3ScriptContent }}</code></pre>
                        </div>
                    </div>
                </div>
                <div class="flex space-x-2">
                </div>
            </ModalTemplate>
        </div>
    </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { useI18n } from "vue-i18n";
import { getAllRobot } from "~~/assets/js/utils/commonService.js";


const { t } = useI18n();
const localePath = useLocalePath();

const userStore = useUserStore();
const robotStore = useRobotStore();
const deployCodeModal = ref(false);


const iframeScriptContent = ref('')
const nuxt3ScriptContent = ref('');

if (process.client) {
    userStore.initLocalUser()
    getAllRobot()
}

const toggleDeployCodeModal = (visible: boolean, robotId: string = '') => {
    console.log("🚀 ~ file: CreateRobotTab.vue:114 ~ toggleDeployCodeModal ~ visible:", visible)
    console.log("🚀 ~ file: CreateRobotTab.vue:115 ~ toggleDeployCodeModal ~ robotId:", robotId)
    deployCodeModal.value = visible;
    nuxt3ScriptContent.value = `
    <script lang="ts" setup>
        onMounted(() => {
            const script = document.createElement('script')
            script.src = "https://s.oralfairy.com/emberRobotV2.min.js?&buttonBottom=10px&buttonRight=10px&buttonBackgroundColor=#8a2be2"
            script.id = '${robotId}'
            document.body.appendChild(script)
        })
    <script>`;
    iframeScriptContent.value = `
    // v-loazy-load, data-src is used for "nuxt-lazy-load" library,
    // if you are not using this library, you can use "src" attribute instead

    <iframe src="https://answerfansai.com/robot-chat-room/${robotId}" height="824" width="448"></iframe>
    `
}

const createRobot = async (robotInfoForm: { avatarKey: any; name: any; desc: any; }) => {
    const { avatarKey, name, desc } = robotInfoForm;
    if (!name) {
        useNuxtApp().$toast.error(t('robotNameAlert'));
        return
    }
    let data = {
        "userId": userStore.user.userId,
        "robotName": name,
        "robotAvatarKey": avatarKey,
        "robotDesc": desc,
        "robotCategory": "default"
    }

    const res = await axios.post("/api/chatbot/create", data);
    if (res.data.code != 20000) {
        useNuxtApp().$toast.error(t('fail'));
    } else {
        await getAllRobot();
        useNuxtApp().$toast.success(t('success'));
    }
    // eventBus.emit('createRobotButton', { type: "create", robot: res })
}

const updateRobot = async (robotId: string, robotInfoForm: { avatarKey: any; name: any; desc: any; }) => {
    const { avatarKey, name, desc } = robotInfoForm;
    let data = {
        "userId": userStore.user.userId,
        "robotId": robotId,
        "robotName": name,
        "robotAvatarKey": avatarKey,
        "robotDesc": desc,
        "robotCategory": "default"
    }
    const res = await axios.post("/api/chatbot/update", data);
    if (res.data.code != 20000) {
        useNuxtApp().$toast.error(t('fail'));
    } else {
        await getAllRobot();
        useNuxtApp().$toast.success(t('success'));
    }
}

const deleteRobot = async (robotId: string) => {
    let data = {
        "userId": userStore.user.userId,
        "robotId": robotId
    }
    const res = await axios.post("/api/chatbot/delete", data);
    if (res.data.code != 20000) {
        useNuxtApp().$toast.error(t('fail'));
    } else {
        await getAllRobot();
        useNuxtApp().$toast.success(t('success'));
    }
}


</script>

<style></style>
