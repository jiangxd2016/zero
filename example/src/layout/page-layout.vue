<template>
  <router-view v-slot="{ Component, route }">
    <TabBar />
    <transition name="fade" mode="out-in" appear>
      <component
        :is="Component"
        v-if="route.meta.noCache"
        :key="route.fullPath"
      />
      <keep-alive v-else>
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
import TabBar from '@/components/tab-bar/index.vue';
</script>
