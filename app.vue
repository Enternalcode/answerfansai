<style>
:root {
  --el-color-primary: #3AB0FF !important;
}

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
<template>
  <NuxtPage />
</template>
