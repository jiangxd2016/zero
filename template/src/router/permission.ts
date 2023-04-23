import NProgress from 'nprogress';
import type { Router } from 'vue-router';
import { WHITE_LIST } from './constants';
import { useRouterStore } from '@/store/modules/router';
import { setRouteEmitter } from '@/utils/route-listener';

const createRouteGuard = (router: Router) => {
  let routerInit = false;
  router.beforeEach(async (to, from, next) => {
    if (to.path !== from.path) {
      NProgress.start();
    }
    setRouteEmitter(to);
    const routerStore = useRouterStore();

    if (!routerStore.getRoutes || !routerStore.getRoutes.length) {
      await routerStore.getAuthRoutes();
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

    if (!routerInit) {
      router.addRoute({
        name: 'root',
        path: '/',
        component: () => import('@/layout/default-layout.vue'),
        children: [
          ...routerStore.getRoutes,
        ],
      });
      routerInit = true;
    }

    const resolved = router.resolve({ path: to.path });

    if (to.name === 'notFound') {
      next(resolved);
      return;
    }


    next();

  });

  router.afterEach(() => {
    NProgress.done();
  });

};

export default createRouteGuard;
