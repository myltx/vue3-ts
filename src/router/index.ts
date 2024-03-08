import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/index/index.vue'
import path from 'path'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }
  ]
})

export default router
