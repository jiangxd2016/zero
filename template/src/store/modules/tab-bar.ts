import type { RouteLocationNormalized } from 'vue-router';
import { defineStore } from 'pinia';

export interface TagProps {
  title: string;
  name: string;
  fullPath: string;
  query?: any;
}

export interface TabBarState {
  tagList: TagProps[];
  cacheTabList: Set<string>;
}

const formatTag = (route: RouteLocationNormalized): TagProps => {
  const { name, meta, fullPath, query } = route;
  return {
    title: meta.locale as string || '',
    name: String(name),
    fullPath,
    query,
  };
};

const useTabBarStore = defineStore('tabBar', {
  state: (): TabBarState => ({
    cacheTabList: new Set(),
    tagList: [
      // Set the first element dynamically as needed
      {
        title: '工作台',
        name: 'workplace',
        fullPath: '/workplace',
      },
    ],
  }),

  getters: {
    getTabList(): TagProps[] {
      return this.tagList;
    },
    getCacheList(): string[] {
      return Array.from(this.cacheTabList);
    },
  },

  actions: {
    updateTabList(route: RouteLocationNormalized) {
      this.tagList.push(formatTag(route));
      this.cacheTabList.add(route.name as string);
    },
    deleteTag(name: string) {
      this.tagList.splice(
        this.tagList.findIndex(tag => tag.name === name),
        1
      );
      this.cacheTabList.delete(name);
    },
  },
});

export default useTabBarStore;
