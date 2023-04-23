<script setup lang="ts">
import NodeComponent from "@/components/NodeComponent.vue";
import {GridNodes} from "@/state-management/GridNodes";


</script>

<template>
  <div class="grid">
    <div class="grid-row" v-for="(row, index) in GridNodes.grid" :key="index">
      <div v-for="node in row">
        <NodeComponent :row="node.row" :col="node.col"
                       :is-finish="node.isFinish" :is-start="node.isStart"
                       :is-wall="node.isWall"/>
      </div>
    </div>
  </div>
</template>


<style scoped>
.grid {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.grid-row {
  display: flex;
  gap: 0.25rem;
  padding-top: 0.25rem;
}
</style>
