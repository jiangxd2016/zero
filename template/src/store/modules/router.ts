import { defineStore } from 'pinia';
import { getRoutesInfo } from '@/service/api/menu';


const ROUTE_TYPE = [
  "add",
  "view",
  "edit",
  "delete",
]
interface RouteState {
  auth: any[];
  menus: any[];
}

export const useRouterStore = defineStore('router', {

  state: (): RouteState => ({
    auth: [],
    menus:[],
  }),
  getters: {
    getRoutes(state) {

      console.log(state.auth);

      const menuList: any[] = [];


      state.auth.forEach((item) => {
        const { pid, visible, id } = item;
        if (!pid && visible) {

          // TODO: 暂时只支持二级菜单
          let children = state.auth.filter(child => child.pid === id && child.visible);

          const pages = children.filter((child) => {
            return ROUTE_TYPE.includes(child.type)
          })

          const other = children.filter((child) => {
            return !ROUTE_TYPE.includes(child.type)
          })

          // 查找action里面的页面
          children = children.map((child) => {
            const { actions } = child;
            const viewList = actions.filter((actionItem) => {
              return actionItem.type === 'view'
            }).sort((a, b) => {
              return a.sort - b.sort;
            })
            const firstView = viewList.shift();
            const otherList = actions.filter((actionItem) => {
              return actionItem.type !== 'view'
            }).concat(viewList)
            if (viewList.length) {
              child.component =firstView.view.archFs
              child.mate = {
                ...child.mate,
                ...firstView,
                actions: otherList
              }
            }
            return child
          });
          menuList.push({
            ...item,
            children
          });
        }
      });

      return menuList;
    },
    // 所有的接口上的页面，用来对比是否在本地有对应的页面
    getPageList(state) {

    },
    getMenus(state) {
      const menuList: any[] = [];

      state.auth.forEach((item) => {
        const { pid, visible, id } = item;
        if (!pid && visible) {

          // TODO: 暂时只支持二级菜单
          const children = state.auth.filter(child => child.pid === id && child.visible);
          menuList.push({
            ...item,
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
