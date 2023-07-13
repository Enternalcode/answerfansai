import { useUserStore } from "../composables/stores";
export default defineNuxtRouteMiddleware((to, from) => {
    const localePath = useLocalePath();
    console.log("🚀 ~ file: auth.global.ts:6 ~ defineNuxtRouteMiddleware ~ to.name:", to.name)
    if (to.path.includes('robot-management')) {
        const userStore = useUserStore()
        if (userStore.isSignIn == false) {
            return navigateTo(localePath('/sign-in'))
        }
    }
})