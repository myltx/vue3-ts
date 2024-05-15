<template>
  <a-dropdown>
    <div @click.prevent class="flex items-center cursor-pointer">
      <a-avatar :size="26" class="mr-10px">
        <template #icon> {{ userInfo.nikeName?.substring(0, 1) }} </template>
      </a-avatar>
      {{ userInfo.nikeName }}
    </div>
    <template #overlay>
      <a-menu @click="onClick">
        <a-menu-item :key="'user'">
          <a href="javascript:;">个人中心</a>
        </a-menu-item>
        <a-menu-item :key="'loginOut'">
          <a href="javascript:;">退出登录</a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script lang="ts" setup>
import { Modal, type MenuProps } from 'ant-design-vue'

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
const onClick: MenuProps['onClick'] = ({ key }) => {
  console.log(`Click on item ${key}`)
  if (key === 'loginOut') {
    Modal.confirm({
      title: '确定退出吗？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        handleLoginOut()
      }
    })
  }
}
</script>
