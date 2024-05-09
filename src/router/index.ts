import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '@/views/index/index.vue'
import Login from '@/views/sys/login/index.vue'
import Layout from '@/layouts/index.vue'
import { getToken } from '@/utils'
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
  const token = getToken()
  if (to.path !== '/login' && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
