import { defineStore } from 'pinia';
import { getCookie } from "~/assets/js/utils/tools";
import { getPrivateDownloadUrl } from '~~/assets/js/utils/commonService';
import { ResRobotItem, RobotItem } from '~~/types/robot';

export const useMemberStore = defineStore('member', {
    state: () => ({
        verify: false,
        expirationAt: new Date(),
    }),
    getters: {

    },
    actions: {
        setVerify(verify: boolean) {
            this.verify = verify;
        },
        setExpirationAt(expirationAt: Date) {
            this.expirationAt = expirationAt;
        }
    }
})

export const useUserStore = defineStore('user', {
    state: () => ({
        user: { "email": "", "token": "", "userId": "" },
        isLogIn: ref(false),
    }),
    getters: {
        getUser: (state) => {
            return state.user
        },
        isSignIn: (state) => {
            return state.user.userId ? true : false
        }
    },
    actions: {
        logOut() {
            this.user = { "email": "", "token": "", "userId": "" };
            this.isLogIn = false;   
        },
        setUser(data: any) {
            this.user = data;
            this.isLogIn = true;
        },
        initLocalUser() {
            const res = getCookie("__user")
            if (res) {
                const userObject = JSON.parse(decodeURIComponent(res))
                if (userObject) {
                    this.setUser(userObject)
                }
            }
        }
    }
})


export const useEmberChatbotStore = defineStore('emberChatbot', () => {
    var chatWindow = ref(false);
    var chatInitiated = ref(false);

    function $reset() {
        chatWindow.value = false;
        chatInitiated.value = false;
    }

    return {
        chatWindow,
        chatInitiated,
        $reset
    }
})

export const useRobotStore = defineStore('robot', () => {
    var robotsInfo = ref<RobotItem[]>([])
    var selectedRobotName = ""
    var selectedRobotId = ""

    async function setRobotsInfo(data: ResRobotItem[]) {
        let newData: RobotItem[] = []
        for (let i = 0; i < data.length; i++) {
            let avatar = await getPrivateDownloadUrl(data[i].avatar_key)
            let item: RobotItem = {
                id: data[i].robot_id,
                name: data[i].robot_name,
                category: data[i].category,
                avatarKey: data[i].avatar_key,
                avatarUrl: avatar,
                desc: data[i].robot_desc
            }
            newData.push(item)
        }
        robotsInfo.value = newData
    }

    function $reset() {
        robotsInfo.value = []
        selectedRobotName = ""
        selectedRobotId = ""
    }

    return {
        robotsInfo,
        selectedRobotName,
        selectedRobotId,
        setRobotsInfo,
        $reset
    }
})