<script setup lang="ts">
import { ZeroTable } from '@estjs/zero-vue/src/table';
import { ZeroForm } from '@estjs/zero-vue/src/form';

const flag = ref(false);
</script>

<template>
  <div class="btn" @click="flag = !flag">change</div>
  <ZeroTable v-if="flag">
    <template #organization="slotProps">
      <div>
        {{ slotProps.name }}
      </div>
    </template>
  </ZeroTable>

  <ZeroForm v-else />
</template>
