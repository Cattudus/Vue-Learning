<script setup lang="ts">
import Map from "@/components/Map.vue";
import {onMounted, watch} from "vue";
import {GridNodes} from "@/state-management/GridNodes";
import {getInitialGrid} from "@/utils/gridOperations";


onMounted(() => {
  GridNodes.grid = getInitialGrid(50, 20)
})

</script>

<template>
  <main>
    <Map/>
  </main>
</template>

<style scoped>

</style>
