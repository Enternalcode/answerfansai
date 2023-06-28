import { defineStore } from 'pinia';
import { getCookie } from "~/assets/js/utils/tools";


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
        setUser(data: any) {
            this.user = data;
        },
        async initLocalUser() {
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


// })

export const useRobotStore = defineStore('robot', {
    state: () => ({
        robotsInfo: [],
        selectedRobotName: "",
        selectedRobotId: "",
    }),
    actions: {
    }
})
