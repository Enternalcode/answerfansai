<template>
    <div :class="$attrs.class">
        <button class="btn" v-if="$props.action == 'create'" @click="toggleCreateRobotForm(true)">{{
            $t('create')
        }}</button>
        <button class="btn btn-circle" v-else="$props.action == 'update'" @click="toggleCreateRobotForm(true)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32">
                <path fill="currentColor"
                    d="M19 21h-6a3 3 0 0 0-3 3v2h2v-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2h2v-2a3 3 0 0 0-3-3zm-3-1a4 4 0 1 0-4-4a4 4 0 0 0 4 4zm0-6a2 2 0 1 1-2 2a2 2 0 0 1 2-2z" />
                <path fill="currentColor"
                    d="M25 5h-3V4a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v1H7a2 2 0 0 0-2 2v21a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2ZM12 4h8v4h-8Zm13 24H7V7h3v3h12V7h3Z" />
            </svg>
        </button>
        <ModalTemplate v-model="robotFormVisible" @close="toggleCreateRobotForm(false)">
            <div class="mx-auto text-center">
                <div class="text-center text-gray-600">
                    <AvatarUploader :avatarUrl="imageUrl" />
                </div>
            </div>
            <!-- </div> -->
            <div class="flex flex-col justify-center space-y-2">
                <input v-model="robotInfoForm.name" type="text" :placeholder="t('createRobotNamePlaceholder')"
                    class="w-full input input-bordered input-primary" />
                <input v-model="robotInfoForm.desc" type="text" :placeholder="t('createRobotDescPlaceholder')"
                    class="w-full input input-bordered input-primary" />
            </div>
            <div class="flex flex-row justify-between space-x-2">
                <button class="btn" @click="toggleCreateRobotForm(false)">{{ $t('discardChanges')
                }}</button>
                <button class="btn" @click="handlerClick()">
                    {{ $t('save') }}
                </button>
            </div>
        </ModalTemplate>
    </div>
</template>
<script lang="ts" setup>
import { defineProps, ref } from 'vue';
import eventBus from "~~/assets/js/lib/eventBus";
import { RobotItem } from "~~/types/robot";


interface RobotInfoForm {
    avatarKey: string;
    name: string;
    desc: string;
}

const props = defineProps({
    action: {
        type: String,
        required: true
    },
    saveButtonHandler: {
        type: Function,
        required: true
    },
    robotData: {
        type: Object as () => RobotItem,
        default: null,
        required: false
    },
})

async function handlerClick() {
    try {
        if (props.action == "create") {
            await props.saveButtonHandler(robotInfoForm)
        } else if (props.action == "update") {
            await props.saveButtonHandler(props.robotData.id, robotInfoForm)
        }
    } catch (error) {
        console.log(error)
    } finally {
        toggleCreateRobotForm(false)
        resetRobotForm()
    }
}

const { t } = useI18n();
const userStore = useUserStore();
const robotStore = useRobotStore();
const imageUrl = ref('')
const robotFormVisible = ref(false)
const maxImageSizeMB = 4;
const robotInfoForm = reactive<RobotInfoForm>({
    avatarKey: '',
    name: '',
    desc: '',
});
const fileList = ref([])

const resetRobotForm = () => {
    robotInfoForm.name = ''
    robotInfoForm.desc = ''
    imageUrl.value = ''
    fileList.value = []
}


const toggleCreateRobotForm = (value: boolean) => {
    robotFormVisible.value = value
    if (props.robotData && props.action == "update" && value) {
        imageUrl.value = props.robotData.avatarUrl
        robotInfoForm.name = props.robotData.name
        robotInfoForm.desc = props.robotData.desc
        robotInfoForm.avatarKey = props.robotData.avatarKey
    }
    if (!value) {
        resetRobotForm()
    }
}


const onUploadAvatarKey = (data: any) => {
    robotInfoForm.avatarKey = data.avatarKey
}

// Start listening
eventBus.on('uploadAvatar', onUploadAvatarKey)

</script>

