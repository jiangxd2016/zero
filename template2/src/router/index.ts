import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import { WHITE_LIST } from './constants';
import { useUserStore, useMenuStore } from '@/store';
import formatRoute from '@/utils/route-format';

export const DefaultLayout = () => import('@/layout/default-layout.vue');

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
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }

  // const token = useToken.get() || 'NOTOKEN';
  const token = 'NOTOKEN';

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
  const menuStore = useMenuStore();

  menuStore.getRoutesInfo();
  const userInfo = userStore.userInfo;
  const hasRoles = userInfo?.roles && userInfo?.roles.length > 0;

  if (hasRoles) {
    next();
  } else {
    try {

      const asyncRoutes = {
        name: 'root',
        path: '/',
        component: () => import('@/layout/default-layout.vue'),
        children: [
          {
            path: '/',
            redirect: 'workplace',
          },
          {
            path: 'user-center',
            name: 'user-center',
            component: () => import('@/views/user-center/index.vue'),
            meta: {
              locale: '用户中心',
              requiresAuth: false,
              icon: 'user',
            },
          },
          ...formatRoute( menuStore.routeList),
        ],
      };

      // TODO: get user access routes

      router.addRoute(asyncRoutes);
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
