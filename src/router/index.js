import { createRouter, createWebHistory } from '@ionic/vue-router'

import LoginPage from '@/views/login.vue'
import DashboardPage from '@/views/Dashboard.vue'
import OpenInspections from '@/views/OpenInspections.vue'
import CompletedInspections from '@/views/CompletedInspections.vue'
import SettingsPage from '@/views/Settings.vue'
import KnowledgeBase from '@/views/KnowledgeBase.vue'

import store from '@/store'

const routes = [
  {
    path: '/login',
    component: LoginPage
  },

  {
    path: '/dashboard',
    component: DashboardPage,
    meta: { requiresAuth: true }
  },

  {
    path: '/open-inspections',
    component: OpenInspections,
    meta: { requiresAuth: true }
  },

  {
    path: '/completed-inspections',
    component: CompletedInspections,
    meta: { requiresAuth: true }
  },

  {
    path: '/settings',
    component: SettingsPage,
    meta: { requiresAuth: true }
  },

  {
    path: '/knowledge-base',
    component: KnowledgeBase,
    meta: { requiresAuth: true }
  },

  {
    path: '/',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters['auth/isAuthenticated']) {
    next('/login')
  } else {
    next()
  }
})

export default router
