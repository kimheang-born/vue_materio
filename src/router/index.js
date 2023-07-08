import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { 
      name: 'dashboard',
      path: '/', redirect: '/dashboard',
      meta: { requiresAuth: true },
    },
    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      children: [
        {
          path: 'dashboard',
          component: () => import('../pages/dashboard.vue'),
          meta: { requiresAuth: true },
        },
        {
          name: 'case',
          path: 'case',
          component: () => import('../pages/indicationPlus/list.vue'),
          meta: { requiresAuth: true },
        },
        {
          name: 'create-case',
          path: 'case-list/create',
          component: () => import('../pages/indicationPlus/create.vue'),
        },
        {
          path: 'account-settings',
          component: () => import('../pages/account-settings.vue'),
        },
        {
          path: 'typography',
          component: () => import('../pages/typography.vue'),
        },
        {
          path: 'icons',
          component: () => import('../pages/icons.vue'),
        },
        {
          path: 'cards',
          component: () => import('../pages/cards.vue'),
        },
        {
          path: 'tables',
          component: () => import('../pages/tables.vue'),
        },
        {
          path: 'form-layouts',
          component: () => import('../pages/form-layouts.vue'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('../layouts/blank.vue'),
      children: [
        {
          path: 'login',
          component: () => import('../pages/login.vue'),
          meta: { requiresUnAuth: true },
        },
        {
          path: 'register',
          component: () => import('../pages/register.vue'),
          meta: { requiresUnAuth: true },
        },
        {
          path: '/:pathMatch(.*)*',
          component: () => import('../pages/[...all].vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, _, next) => {

  const isAuthenticated = store.getters.isAuthenticated
  const authRequired = to.meta.requiresAuth
  const unAuthRequired = to.meta.requiresUnAuth

  if (authRequired && !isAuthenticated) {
    next('/login')
  } else if (unAuthRequired && isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
