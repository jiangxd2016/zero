import { defineStore } from 'pinia';
import { getRoutesInfo } from '@/service/api/menu';
import { getComponent } from '@/utils/views';

export const DefaultLayout = () => import('@/layout/default-layout.vue');

const ROUTE_TYPE = [
  'add',
  'view',
  'edit',
  'delete',
];
interface RouteState {
  auth: any[];
  menus: any[];
  routes: any[];
}

export const useRouterStore = defineStore('router', {

  state: (): RouteState => ({
    auth: [],
    menus: [],
    routes: []
  }),
  getters: {
    getRoutes(state) {
      let menuList: any[] = [];
      state.auth.forEach((item) => {
        const { pid, visible, id } = item;
        if (!pid && visible) {

          // TODO: 暂时只支持二级菜单
          let children = state.auth.filter(child => child.pid === id && child.visible);

          // 查找action里面的页面
          children = children.map((child) => {
            const { actions } = child;

            const pages = actions.filter((child) => {
              return ROUTE_TYPE.includes(child.type);
            });

            const other = actions.filter((child) => {
              return !ROUTE_TYPE.includes(child.type);
            });

            const viewList = pages.sort((a, b) => {
              return a.sort - b.sort;
            }).map( (actionItem) => {
              actionItem.component = getComponent(actionItem.view.archFs);
              actionItem.path = actionItem.view.archFs;

              actionItem.meta = {
                actions: other,
                ... actionItem.view,
              };
              return actionItem;
            });
            return viewList;
          });
          menuList = menuList.concat(...children);
        }
      });
      return menuList;
    },

    getMenus(state) {
      const menuList: any[] = [];

      state.auth.forEach((item) => {
        const { pid, visible, id } = item;
        if (!pid && visible) {

          // TODO: 暂时只支持二级菜单
          let defaultView = {};
          const children = state.auth.filter(child => child.pid === id && child.visible);

          children.forEach((child) => {
            const { actions } = child;
            if (actions.length) {
              defaultView = actions.find((action) => {
                return action.type === 'view';
              });
            }
          });
          menuList.push({
            ...item,
            ...defaultView,
            children
          });
        }
      });

      return menuList;
    }
  },
  actions: {
    getAuthRoutes() {
      return getRoutesInfo().then((res) => {
        this.auth = res.data.list;
      });
    }
  }

});
