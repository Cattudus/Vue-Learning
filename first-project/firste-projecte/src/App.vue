<script setup lang="ts">
import Header from "@/components/Header.vue";
import Map from "@/components/Map.vue";
import {onMounted} from "vue";
import {GridNodes} from "@/state-management/GridNodes";
import {getInitialGrid} from "@/composables/gridOperations";

onMounted(() => {
  GridNodes.grid = getInitialGrid(50, 20)
})
</script>

<template>
  <header>
    <Header/>
  </header>
  <main>
    <Map/>
  </main>
  <Toast/>
</template>

<style scoped>
</style>
