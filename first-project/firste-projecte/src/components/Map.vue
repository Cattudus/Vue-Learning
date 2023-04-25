<script setup lang="ts">
import {GridNodes} from "@/state-management/GridNodes";
import HelpComponent from "@/shared-ui/HelpComponent.vue";


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
  <div class="help-card">
    How To
    <HelpComponent/>
  </div>
</template>


<style scoped>
.grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 1rem;
}

.grid-row {
  display: flex;
  gap: 0.25rem;
  padding-top: 0.25rem;
  padding-left: 1rem;
}
.help-card{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}
</style>
