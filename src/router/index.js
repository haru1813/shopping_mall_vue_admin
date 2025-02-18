import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/Main.vue'),
    },
    {
      path: '/product/category_manager',
      name: 'category_manager',
      component: () => import('@/views/product/category_manager.vue'),
    },
    {
      path: '/product/productColor_manager',
      name: 'productColor_manager',
      component: () => import('@/views/product/productColor_manager.vue'),
    },
    {
      path: '/product/productSize_manager',
      name: 'productSize_manager',
      component: () => import('@/views/product/productSize_manager.vue'),
    },
    {
      path: '/product/product_manager',
      name: 'product_manager',
      component: () => import('@/views/product/product_manager.vue'),
    },
    {
      path: '/user/user_manager',
      name: 'user_manager',
      component: () => import('@/views/user/user_manager.vue'),
    },
    {
      path: '/user/cart_manager',
      name: 'cart_manager',
      component: () => import('@/views/user/cart_manager.vue'),
    },
    {
      path: '/user/buy_manager',
      name: 'buy_manager',
      component: () => import('@/views/user/buy_manager.vue'),
    },
  ],
})

export default router
