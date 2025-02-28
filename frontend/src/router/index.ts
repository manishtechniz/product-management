import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('@/views/Pages/BlankPage.vue'),
      meta: {
        title: 'Dashboard',
      },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('@/views/Others/UserProfile.vue'),
      meta: {
        title: 'Profile',
      },
    },
    {
      path: '/error-404',
      name: '404 Error',
      component: () => import('@/views/Errors/FourZeroFour.vue'),
      meta: {
        title: '404 Error',
        requiresAuth: false,
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Auth/Login.vue'),
      meta: {
        title: 'Login',
        requiresAuth: false,
      },
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/Auth/Register.vue'),
      meta: {
        title: 'Resgister',
        requiresAuth: false,
      },
    },
  ],
})

export default router

router.beforeEach((to, from, next) => {
  if ((to.meta.requiresAuth !== false)
      && ! useAuthStore().isAuthenticated
    ) {
      next('/login')
  } else {
      next()
  }
})
