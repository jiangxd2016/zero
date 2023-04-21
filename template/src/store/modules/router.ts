import { defineStore } from 'pinia';
import { getRoutesInfo } from '@/service/api/menu';

interface RouteState {
  routes: any[];
  menus: any[];
}

export const useRouterStore = defineStore('router', {

  state: (): RouteState => ({
    routes: [],
    menus: [],
  }),
  getters: {
    getRoutes(state) {
      return state.routes;
    },
    getMenus(state) {
      return state.menus;
    }
  },
  actions: {

    getAuthRoutes() {
      getRoutesInfo().then((res) => {
        console.log(res);
      });
    }
  }

});
