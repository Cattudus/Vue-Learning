<script setup lang="ts">
</script>

<template>
  <div class="dialog-card">
    <slot></slot>
  </div>
</template>


<style scoped>
.dialog-card {
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  display: flex;
  background-color: white;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem;
  position: absolute;
  right: 0;
  z-index: 1;
  white-space: nowrap;
  border-radius: 4px;
}
</style>
