import { defineStore } from 'pinia';
import { getRoutesInfo } from '@/service/api/menu';

export interface RouteRecord {
  path: string;
  name: string;
  component: string;
  meta: {
    locale: string;
    requiresAuth: boolean;
    icon: string;
    roles: string[];
    order: number;
  };
}

export interface MenuState {
  routeList: RouteRecord[];
}

const useMenuStore = defineStore('menu', {
  state: (): MenuState => ({
    routeList: [],
  }),

  getters: {},

  actions: {
    async getRoutesInfo() {
      const res = await getRoutesInfo();

      this.routeList = [
        {
          path: 'workplace',
          name: 'workplace',
          component: '/workplace/index',
          meta: {
            locale: '工作台',
            requiresAuth: true,
            icon: 'icon-dashboard',
            roles: ['*'],
            order: 0,
          },
        },
        ...(res.data as unknown as RouteRecord[]),
      ];
    },
  },
});

export default useMenuStore;
