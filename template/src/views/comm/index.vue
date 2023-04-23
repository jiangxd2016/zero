<script setup lang="ts">
import { useRoute } from 'vue-router';

import { ZeroTable } from '@estjs/zero-vue/src/table/index.jsx';
import { ZeroForm } from '@estjs/zero-vue/src/form/index.jsx';

const pageRoute = useRoute();

const query = pageRoute.query;

const { model, type } = query;

const compts = type === 'list' ? ZeroTable : ZeroForm;
</script>

<template>
  <component :is="compts" :name="model" />
</template>

