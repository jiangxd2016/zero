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

      const menuList: auth[] = [];

      list.forEach((item) => {
        const { pid, visible, id } = item;
        if (!pid && visible) {

          // TODO: 暂时只支持二级菜单
          const children = list.filter(child => child.pid === id && child.visible);
          menuList.push({
            ...item,
            children
          });
        }
      });
      this.routeList = menuList;
      return menuList;
    },
  },
});

export default useMenuStore;
