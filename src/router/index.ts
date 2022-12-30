import { createRouter, createWebHistory } from 'vue-router'
import { useLazyLoad } from '@/composables/lazyload'

const routes = [
  {
    path: '/',
    name: 'home.page',
    component: () => import('../pages/Home.vue'),
    meta: { title: 'Home' },
  },
  {
    path: '/:state/:city',
    name: 'city.page',
    component: () => import('../pages/City.vue'),
    meta: { title: 'Weather' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = `${
    to.params.state ? `${to.params.city}, ${to.params.state}` : to.meta.title
  } | ilm`
  next()
})

export default router
