import * as VueRouter from 'vue-router'
import { createWebHistory, RouteRecordRaw } from 'vue-router'

import HomePage from '@/pages/home.vue'
import TestPage from '@/pages/test.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/test',
    component: TestPage,
  },
]
const router = VueRouter.createRouter({
  history: createWebHistory(),
  routes,
})

export default router
