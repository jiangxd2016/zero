import type { RouteRecordRaw } from 'vue-router';
import { createWebHashHistory, createRouter } from 'vue-router';
import NProgress from 'nprogress';
import { WHITE_LIST } from './constants';
import { permissionStore, useUserStore } from '@/store';

export const DefaultLayout = () => import('@/layout/default-layout.vue');

export const asyncRoutes = [

];
export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      requiresAuth: false,
    },
  },
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
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/index.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  document.title = to.meta.title as string;

  const token = useToken.get() || 'NOTOKEN';

  // already logged router to index page
  if (token && to.path === '/login') {
    next({ path: '/' });
    return;
  }
  if (!token) {
    if (WHITE_LIST.includes(to.path)) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
    return;
  }

  const userStore = useUserStore();
  const permission = permissionStore();
  const userInfo = userStore.userInfo;
  const hasRoles = userInfo?.roles && userInfo?.roles.length > 0;

  if (hasRoles) {
    next();
  } else {
    try {
      const userInfo = await userStore.getUserInfo();
      const accessRoutes = await permission.generateRoutes(userInfo.roles || []) as unknown as RouteRecordRaw[];
      accessRoutes.forEach((accessRoute) => {
        router.addRoute(accessRoute);
      });
      next({ ...to, replace: true });
    } catch {
      await userStore.logout();
      next({ name: 'Login', query: { redirect: to.path } });
    }
  }

});

router.afterEach(() => {
  NProgress.done();
});

export default router;
