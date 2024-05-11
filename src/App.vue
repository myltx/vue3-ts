<template>
  <el-config-provider>
    <div class="flex main-container w-100% h-100%">
      <div class="w-100%">
        <RouterView />
      </div>
    </div>
  </el-config-provider>
</template>

<style>
#app {
  text-align: center;
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
