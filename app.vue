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
import { themeChange } from 'theme-change';
import { useHead } from "unhead";
import { onBeforeMount, onMounted } from 'vue';
import { ModalsContainer } from 'vue-final-modal';
// const MyScript = defineAsyncComponent(() => import('@/static/scripts/emberRobot.js'))

onMounted(() => {
  themeChange(false)
})


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
