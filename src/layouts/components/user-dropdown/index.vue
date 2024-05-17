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
        <a-menu-item :key="'person'">
          <a href="javascript:;"><UserOutlined class="mr-2px" /> 个人中心</a>
        </a-menu-item>
        <a-menu-item :key="'admin'">
          <a href="javascript:;"><GithubOutlined class="mr-2px" /> 前端源码</a>
        </a-menu-item>
        <a-menu-item :key="'node'">
          <a href="javascript:;"><GithubOutlined class="mr-2px" /> 后端源码</a>
        </a-menu-item>
        <a-menu-item :key="'loginOut'">
          <a href="javascript:;"><LoginOutlined class="mr-2px" /> 退出登录</a>
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
  } else if (key === 'person') {
    handleGoPath(key)
  } else if (key === 'admin') {
    window.open('https://github.com/myltx/vue3-ts')
  } else if (key === 'node') {
    window.open('https://github.com/myltx/note-service')
  }
}
</script>
