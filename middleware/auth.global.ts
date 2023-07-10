import { useUserStore } from "../composables/stores"
export default defineNuxtRouteMiddleware((to, from) => {
    if (to.name == 'robot-management') {
        const userStore = useUserStore()
        if (userStore.isSignIn == false) {
            return navigateTo('/sign-in')
        }
    }
})