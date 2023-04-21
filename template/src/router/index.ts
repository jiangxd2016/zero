import { createRouter, createWebHistory } from 'vue-router';

import createRouteGuard from './permission';

export const DefaultLayout = () => import('@/layout/default-layout.vue');

export const constantRoutes = [
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('@/views/login/index.vue'),
  //   meta: {
  //     requiresAuth: false,
  //   },
  // },
  {
    name: 'root',
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          locale: '工作台',
          requiresAuth: true,
          roles: ['*'],
          order: 0,
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
  scrollBehavior() {
    return { top: 0 };
  },
});

createRouteGuard(router);

export default router;
