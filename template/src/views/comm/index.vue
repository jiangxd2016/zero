<script setup lang="ts">
import { useRoute } from 'vue-router';

const pageRoute = useRoute();
</script>

<template>
  <div>
    comm page

    {{
      pageRoute.meta }}
  </div>
</template>

