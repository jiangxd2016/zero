import NProgress from 'nprogress';
import type { Router } from 'vue-router';
import { WHITE_LIST } from './constants';
import { useRouterStore } from '@/store/modules/router';

async function getAuthRouter() {

  const routerStore =  useRouterStore();
  await routerStore.getAuthRoutes();

  return   routerStore.getRoutes;

}

const createRouteGuard = (router: Router) => {

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
   const authRouters = await  getAuthRouter();

   router.addRoute(authRouters);

    next();
  });

  router.afterEach(() => {
    NProgress.done();
  });

};

export default createRouteGuard;
