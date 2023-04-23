<template>
  <div>
    <Menubar :model="items">
      <template #start>
        <div>Fastest Path</div>
      </template>
    </Menubar>
  </div>
  <Dialog v-model:visible="isDialogVisible" modal header="Grid Config" :style="{ width: '50vw' }">
    <div class="map-options">
      <span class="p-float-label">
      <InputNumber id="grid-col" v-model="gridColumns" inputId="integeronly"/>
      <label for="grid-col">Grid Columns</label>
    </span>
      <span class="p-float-label">
      <InputNumber id="grid-row" v-model="gridRows" inputId="integeronly"/>
      <label for="grid-row">Grid Rows</label>
    </span>
      <Button @click="setNodes()" label="Apply Settings"></Button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {GridNodes} from "@/state-management/GridNodes";
import {getInitialGrid, resetAllClasses, visualizeShortestPath} from "@/composables/gridOperations";

let gridRows = ref(20);
let gridColumns = ref(50)
let isDialogVisible = ref(false);
const items = ref([
  {
    label: 'Grid Config',
    icon: 'pi pi-fw pi-cog',
    command: () => {
      isDialogVisible.value = true
    }
  },
  {
    label: 'Reset Grid',
    icon: 'pi pi-fw pi-refresh',
    command: () => {
      GridNodes.selectedEnd = undefined;
      GridNodes.selectedStart = undefined;
      resetAllClasses()
    }
  },
  {
    label: 'Show Shortest Path',
    icon: 'pi pi-fw pi-power-off',
    command: () => {
      visualizeShortestPath()
    }
  }
]);

function setNodes() {
  GridNodes.grid = getInitialGrid(gridColumns.value, gridRows.value)
}
</script>

<style scoped>
.map-options {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  padding-top: 1.5rem;
}
</style>
