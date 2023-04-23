import { createRouter, createWebHistory } from 'vue-router';

import createRouteGuard from './permission';

export const DefaultLayout = () => import('@/layout/default-layout.vue');

export const constantRoutes = [
  {
    name: 'root',
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: 'workplace',
        name: 'workplace',
        component: () => import('@/views/workplace/index.vue'),
        meta: {
          locale: '工作台',
          requiresAuth: true,
          icon: 'icon-dashboard',
          roles: ['*'],
          order: 0,
        },
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: () => import('@/views/not-found/index.vue'),
      },
    ],
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  scrollBehavior() {
    return { top: 0 };
  },
});

createRouteGuard(router);

export default router;
