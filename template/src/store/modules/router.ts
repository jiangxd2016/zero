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
  routes: any[];
}

export const useRouterStore = defineStore('router', {

  state: (): RouteState => ({
    auth: [],
    menus: [],
    routes:[]
  }),
  getters: {
    getRoutes(state) {


      console.log(import.meta.glob("../../views/**/*.vue  "));

      const menuList: any[] = [];
      state.auth.forEach((item) => {
        const { pid, visible, id } = item;
        if (!pid && visible) {

          // TODO: 暂时只支持二级菜单
          let children = state.auth.filter(child => child.pid === id && child.visible);


          // 查找action里面的页面
          children = children.map((child) => {
            const { actions } = child;

            const pages = actions.filter((child) => {
              return ROUTE_TYPE.includes(child.type)
            })

            const other = actions.filter((child) => {
              return !ROUTE_TYPE.includes(child.type)
            })


            const viewList = pages.sort((a, b) => {
              return a.sort - b.sort;
            }).map(async (actionItem) => {

              actionItem.component =  actionItem.view.archFs
              actionItem.mate = {
                ...child.mate,
                ... child.view,
                actions: other
              }
              return actionItem;
            });
            return viewList
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
