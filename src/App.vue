<script setup lang="ts">
import { theme } from 'ant-design-vue'
import { useDarkMode } from '@/composables/index'
const { themeConfig } = useDarkMode()

setTimeout(() => {
  themeConfig.value = theme.darkAlgorithm
}, 2000)
// console.log(themeConfig.value, 'themeConfig')
</script>
<template>
  <RouterView />
</template>

<style>
#app {
  color: var(--ep-text-color-primary);
  height: 100vh;
  width: 100vw;
}

.main-container {
  height: calc(100vh - var(--ep-menu-item-height) - 3px);
}
* {
  transition: all 0.2s ease-out; /*加上过渡使主题转换更加自然 */
}
.el-input__inner {
  transition: all 0.2s ease-out; /*必须单独添加，不然el-input的组件过渡效果不能生效*/
}
</style>
