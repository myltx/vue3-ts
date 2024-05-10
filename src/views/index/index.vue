<script setup lang="ts">
import { getUserInfo, removeLocalStorage } from '@/utils'

const router = useRouter()
const userInfo: any = ref({})
setTimeout(() => {
  userInfo.value = getUserInfo()
}, 500)
function handleLoginOut() {
  removeLocalStorage()
  router.replace('/login')
}
function handleGoPath(path: string) {
  router.push(`/${path}`)
}
</script>

<template>
  <div class="text-green-600 font-600">欢迎你，{{ userInfo?.user_name }}</div>
  <div class="mt-10px text-green-600">个人简介：{{ userInfo?.signature }}</div>
  <el-button type="primary" @click="handleLoginOut">退出</el-button>
  <el-button type="primary" @click="handleGoPath('menu')">菜单页面</el-button>
</template>

<style scoped lang="scss"></style>
