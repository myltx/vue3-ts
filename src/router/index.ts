import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '@/views/index/index.vue'
import Login from '@/views/sys/login/index.vue'
import Menu from '@/views/sys/menu/index.vue'
import Layout from '@/layouts/index.vue'
import { getToken } from '@/utils'
import { start, close } from '@/utils/nprogress'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layouts',
      component: Layout,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'Index',
          component: Index
        },
        {
          path: '/menu',
          name: 'Menu',
          component: Menu
        },
        {
          path: '/role',
          name: 'Role',
          component: () => import('@/views/sys/role/index.vue')
        },
        {
          path: '/user',
          name: 'User',
          component: () => import('@/views/sys/user/index.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
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
