import { defineStore } from 'pinia';
import { getRoutesInfo } from '@/service/api/menu';

export interface auth {
  virtual: boolean;
  visible: boolean;
  code: string;
  module: { icon: string; name: string; id: string; sort: number; type: number; group: string };
  name: string;
  icon: string;
  scopes: number;
  sort: number;
  id: string;
  roleGroups: number;
}

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
      const list = res.data.list;


      this.routeList = menuList;
      return menuList;
    },
  },
});

export default useMenuStore;
