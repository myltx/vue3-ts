<template>
  <a-config-provider
    :theme="{
      algorithm: themeConfig,
      token: {
        colorPrimary: '#00b96b'
      }
    }"
  >
    <a-layout class="h-100vh">
      <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
        <div class="flex items-center justify-start h-50px px-10px cursor-pointer" @click="goHome">
          <img src="@/assets/images/sub-logo.gif" class=" w-40px h-40px rounded-full mr-10px"/>
          <div v-if="!collapsed" class="font-bold text-20px">后台系统</div>
        </div>
        <a-menu v-model:selectedKeys="selectedKeys" mode="inline" @click="menuClick">
          <a-menu-item key="/user">
            <user-outlined />
            <span>用户管理</span>
          </a-menu-item>
          <a-menu-item key="/menu">
            <user-outlined />
            <span>菜单管理</span>
          </a-menu-item>
          <a-menu-item key="/role">
            <user-outlined />
            <span>角色管理</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header
          style="padding: 0 30px 0 10px"
          class="flex items-center justify-between custom-container"
        >
          <div class="flex items-center">
            <menu-unfold-outlined
              v-if="collapsed"
              class="trigger"
              @click="() => (collapsed = !collapsed)"
            />
            <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
            <a-breadcrumb class="ml-30px">
              <a-breadcrumb-item>
                <a href="">General</a>
                <template #overlay>
                  <a-menu>
                    <a-menu-item>
                      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/"
                        >General</a
                      >
                    </a-menu-item>
                    <a-menu-item>
                      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/"
                        >Navigation</a
                      >
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-breadcrumb-item>
              <a-breadcrumb-item>Button</a-breadcrumb-item>
            </a-breadcrumb>
          </div>
          <div class="flex items-center justify-between">
            <i
              @click="toggleDarkMode"
              class="cursor-pointer text-20px mr-10px"
              inline-flex
              i="dark:ep-moon ep-sunny"
            />
            <user-dropdown />
          </div>
        </a-layout-header>
        <a-layout-content :style="{ margin: '24px 16px', padding: '24px', minHeight: '280px' }">
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-config-provider>
</template>
<script lang="ts" setup>
import type { MenuProps } from 'ant-design-vue'
import UserDropdown from './components/user-dropdown/index.vue'
import { UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { useDarkMode } from '@/composables'

const router = useRouter()
const route = useRoute()

const { toggleDarkMode, themeConfig } = useDarkMode()
const selectedKeys = ref<string[]>([route.fullPath])
const collapsed = ref<boolean>(false)

const menuClick: MenuProps['onClick'] = ({ key }) => {
  const path: any = key
  router.push(`${path}`)
}
const goHome = () => {
  router.push('/')
  selectedKeys.value = ['/']
}

</script>
<style>
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}
</style>
