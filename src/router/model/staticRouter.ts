import Index from '@/views/index/index.vue'
import Login from '@/views/sys/login/index.vue'
import Menu from '@/views/sys/menu/index.vue'
import Layout from '@/layouts/index.vue'

export const staticRouter = [
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
      },
      {
        path: '/person',
        name: 'Person',
        component: () => import('@/views/sys/person/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]
