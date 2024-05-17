import { createRouter, createWebHashHistory } from 'vue-router'
import { getToken } from '@/utils'
import { start, close } from '@/utils/nprogress'
import { staticRouter } from './model/staticRouter'
import {getMenuTree} from './model/asyncRouter'

getMenuTree()
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: staticRouter
})

router.beforeEach((to, from, next) => {
  start()
  const token = getToken()
  if (to.path !== '/login' && !token) {
    next('/login')
  } else {
    next()
  }
})

router.afterEach(() => {
  // 在路由切换结束时，完成进度条
  setTimeout(() => {
    close()
  }, 1000)
})

export default router
