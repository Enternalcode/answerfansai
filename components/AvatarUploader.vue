<template>
    <div class="max-w-xl">
        <label class="flex justify-center w-full h-44  px-4 transition ">
            <div
                class="rounded-full flex items-center bg-white border-2 border-gray-300 border-dashed appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                <span v-if="imageUrl.length == 0" class="flex justify-center items-center w-44 h-44 rounded-full">
                    <Icon name="ep:plus" size="24" />
                </span>
                <img :key="imageUrl" v-if="imageUrl" :src="imageUrl" class="block w-44 h-44 rounded-full" />
            </div>
            <input type="file" name="file_upload" class="hidden" accept="image/png,image/jpeg,image/jpg"
                @change="uploadAvatar($event.target!.files)">
        </label>
        <div class="pt-2">
            <p class="text-xs text-gray-500">png, jpeg, jpg</p>
            <p class="text-xs text-gray-500">up to 4MB</p>
        </div>
        <progress v-if="startUpload" class="progress progress-success w-56" :value="uploadProcess" max="100"></progress>
    </div>
</template>

<script lang="ts" setup>
import eventBus from '~/assets/js/lib/eventBus';
import { uploadFile } from "~/assets/js/utils/qiniu";

const props = defineProps({
    avatarUrl: {
        type: String,
        default: ''
    }
})

const imageUrl = ref(props.avatarUrl)
const uploadProcess = ref(0.0)
const startUpload = ref(false)



const uploadAvatar = async (files: Array<File>) => {
    if (files.length > 0) {
        const preparedUploadObject = files[0]
        const observable = await uploadFile(preparedUploadObject)
        startUpload.value = true
        uploadProcess.value = 0.0
        observable.subscribe({
            next: (res: any) => {
                uploadProcess.value = res.total.percent
            },
            error: (err: any) => {
                startUpload.value = false
                useNuxtApp().$toast.error(err);
            },
            complete: (res: any) => {
                startUpload.value = false
                const url = 'http://s.oralfairy.com/' + res.key + "?imageslim";
                imageUrl.value = URL.createObjectURL(preparedUploadObject)
                eventBus.emit('uploadAvatar', { avatarKey: res.key })
            },
        });
    }

}
</script>