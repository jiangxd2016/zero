<script setup lang="ts">
import { ZeroTable } from '@estjs/zero-vue';

const name = $ref('');

const router = useRouter();
const go = () => {
  if (name) { router.push(`/hi/${encodeURIComponent(name)}`); }
};
</script>

<template>
  <ZeroTable />
</template>
