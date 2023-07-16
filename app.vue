<style>
.transition-light {
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.scroll_content_auto::-webkit-scrollbar {
  width: 7px;
  height: 10px;
}

.scroll_content_auto::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 2px;
}

.scroll_content_auto::-webkit-scrollbar-thumb {
  background: #bfbfbf;
  border-radius: 7px;
}
</style>
<template >
  <div data-theme="wireframe">
    <NuxtPage />
    <ModalsContainer />
  </div>
</template>

<script setup lang="ts">
import run from '@/assets/js/scripts/emberRobot.js';
import { useHead } from "unhead";
import { onMounted } from 'vue';
import { ModalsContainer } from 'vue-final-modal';


onMounted(() => {
  run(true)
})

// onMounted(() => {
//   const script = document.createElement('script')
//   script.src = `https://s.oralfairy.com/emberRobotV3.min.js?&buttonBottom=10px&buttonRight=10px&buttonBackgroundColor=#8a2be2&lang=en-US`
//   // script.src = `https://s.oralfairy.com/emberRobot.js?&buttonBottom=10px&buttonRight=10px&buttonBackgroundColor=#8a2be2`
//   // script.src = `https://s.oralfairy.com/emberRobot7.js?&buttonBottom=10px&buttonRight=10px&buttonBackgroundColor=#8a2be2`
//   script.id = '0c925a58-c2e2-4c99-a9a2-f32bd6a9e6f5'
//   document.body.appendChild(script)
// })



useHead({
  title: 'AnserFansAI',
  meta: [
    { name: 'description', content: '' },
  ],
  link: [
    { rel: 'icon', href: '/logo-initial.png' },
  ]
})

</script>
