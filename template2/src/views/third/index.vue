<template>
  <div class="container"> <div class="main" /> </div>
</template>

<script lang="ts">
export default {
  name: 'Third',
};
</script>

<style lang="scss" scoped>
  .container {
    padding: 16px 16px 0 16px;
    height: 100%;
    .main {
      border-radius: 4px;
      height: 100%;
      background-color: var(--color-bg-2);
    }
  }
</style>
