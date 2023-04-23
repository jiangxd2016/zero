<template>
  <div>
    path /Users/xd/Documents/www/zero/template/src/views/pCenter/pointMall__list.vue

    <component :is="compts" :key="id" :model="model" :name="name" :actions="actions" />
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import ZeroTable from '../../../../packages/vue/src/table/index.jsx';
import ZeroFrom from '../../../../packages/vue/src/form/index.jsx';

const props = defineProps<{ modelValue: boolean }>();

const router = useRouter();

const route = useRoute();

const { id, name, model, actions, type } = route.meta;

const compts = type === 'list' ? ZeroTable : ZeroFrom;
</script>
