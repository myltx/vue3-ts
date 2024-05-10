<template>
  <el-config-provider>
    <BaseHeader />
    <div class="flex main-container">
      <BaseSide />
      <div class="p-20px w-100%">
        <RouterView />
      </div>
    </div>
  </el-config-provider>
</template>

<style>
#app {
  text-align: center;
  color: var(--ep-text-color-primary);
}

.main-container {
  height: calc(100vh - var(--ep-menu-item-height) - 3px);
}
</style>
