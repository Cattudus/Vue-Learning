<template>
  <div class="help-content">
    <HelpNode :is-start="true" text="To select START press LEFT mouse button"/>
    <HelpNode :is-wall="true" text="To select WALL press LEFT mouse button with CTRL"/>
    <HelpNode :is-finish="true" text="To select FINISH press RIGHT mouse button"/>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
  .help-content{
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
