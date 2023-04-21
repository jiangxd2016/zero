<template>
  <a-layout class="w-full w-full flex flex-nowrap overflow-hidden">
    <a-layout-sider
      class="h-100vh flex-shrink-0" breakpoint="xl" :collapsed="collapsed" :collapsible="true" :hide-trigger="true" :width="menuWidth"
      @collapse="setCollapsed"
    >
      <div class="h-full flex flex-col overflow-auto overflow-x-hidden">
        <div class="w-full flex flex-nowrap items-center justify-center bg-#232324 py-2 color-#ccc">
          <img
            alt="logo"
            :src="logo"
          />
          <span
            v-if="!collapsed"
            class="ml-2 truncate text-18px color-[rbg(201,205,212)]"
          >
            pkg-name
          </span>
        </div>
        <Menu :collapsed="collapsed" @collapse="setCollapsed" />
      </div>
    </a-layout-sider>
    <div class="ma-0 h-100vh w-full column flex-1 overflow-hidden pa-0">
      <div class="w-full flex-shrink-0">
        <NavBar />
      </div>
      <div class="flex-1 overflow-y-auto">
        <PageLayout />
        <!--        <Footer />  -->
      </div>
    </div>
  </a-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import PageLayout from './page-layout.vue';
import NavBar from '@/components/nav-bar/index.vue';
import Menu from '@/components/menu/index.vue';

import logo from '@/assets/logo.svg';

const collapsed = ref(false);
const setCollapsed = (val: boolean) => {
  collapsed.value = val;
};
const menuWidth = computed(() => {
  return collapsed.value ? 48 : 220;
});
</script>
