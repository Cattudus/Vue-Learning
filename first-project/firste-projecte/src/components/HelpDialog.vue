<script setup lang="ts">
import HelpNode from "@/components/HelpNode.vue";
</script>

<template>
  <div class="dialog-card">
    <div>
      <HelpNode :is-start="true" text="To select START press LEFT mouse button"/>
    </div>
    <div>
      <HelpNode :is-wall="true" text="To select WALL press LEFT mouse button with CTRL"/>
    </div>
    <div>
      <HelpNode :is-finish="true" text="To select FINISH press RIGHT mouse button"/>
    </div>
  </div>
</template>


<style scoped>
  .dialog-card{
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    display: flex;
    background-color: white;
    flex-direction: column;
    gap: 1rem;
    padding: 0.5rem;
    position: absolute;
    right: 0rem;
    z-index: 1;
    white-space: nowrap;
  }
</style>
