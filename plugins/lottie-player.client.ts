
import * as LottiePlayer from "@lottiefiles/lottie-player";

// export default LottiePlayer;


export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(LottiePlayer, {
  })
})
