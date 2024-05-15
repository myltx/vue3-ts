<script setup lang="ts">
import { getUserInfo } from '@/utils'

const userInfo: any = ref({})
setTimeout(() => {
  userInfo.value = getUserInfo()
}, 500)

</script>

<template>
  <div class="text-green-600 font-600">欢迎你，{{ userInfo?.nikeName }}</div>
  <div class="mt-10px text-green-600">个人简介：{{ userInfo?.signature }}</div>
  <img src="@/assets/images/home.gif" alt="" />
</template>

<style scoped lang="less"></style>
