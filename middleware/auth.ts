import { useUserStore } from "../composables/stores"
export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore()
    if (userStore.isSignIn == false) {
        return navigateTo('/sign-in')
    }

})