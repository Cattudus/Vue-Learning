<script setup lang="ts">
import HelpDialog from "@/components/HelpDialog.vue"
import {ref, watch} from "vue";
import {GridNodes} from "@/state-management/GridNodes";
import {getInitialGrid, resetAllClasses, visualizeShortestPath} from "@/composables/gridOperations";
import {AlgorithmsEnum} from "@/composables/algorithmFunction";

let gridRows = ref(20);
let gridColumns = ref(50)
let isDialogVisible = ref(false);
let selectedAlgorithm = ref({name: 'Dijkstra Algorithm', id: AlgorithmsEnum.Dijkstra})
let gridChanged = false;
let showHelpDialog = ref(false)

watch(gridRows, () => {
  gridChanged = true;
})
watch(gridColumns, () => {
  gridChanged = true;
})
const algorithms = [{name: 'Dijkstra Algorithm', id: AlgorithmsEnum.Dijkstra}, {
  name: 'A* Algorithm',
  id: AlgorithmsEnum.Astar
}]

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
      gridChanged = true
      setNodes(true)
      resetAllClasses()
    }
  },
  {
    label: 'Show Shortest Path',
    icon: 'pi pi-fw pi-power-off',
    command: () => {
      visualizeShortestPath(selectedAlgorithm.value.id)
    }
  }
]);

function setNodes(resetStarFinish: boolean) {
  if (gridChanged) {
    GridNodes.grid = getInitialGrid(gridColumns.value, gridRows.value)
  }
  if (resetStarFinish) {
    GridNodes.selectedEnd = undefined;
    GridNodes.selectedStart = undefined;
  }
  resetAllClasses()
  gridChanged = false;
}
</script>

<template>
  <div>
    <Menubar :model="items">
      <template #start>
        <div>Fastest Path</div>
      </template>
      <template #end>
        <div class="help-text">Help <i @mouseover="showHelpDialog = true" @mouseleave="showHelpDialog = false" class="pi pi-question-circle"/></div>
        <HelpDialog v-if="showHelpDialog"/>
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
      <InputNumber id="grid-row" v-model="gridRows" inputId="grid-row"/>
      <label for="grid-row">Grid Rows</label>
    </span>
      <div class="p-float-label">
        <Dropdown style="width: 13rem;" v-model="selectedAlgorithm" optionLabel="name" inputId="dd-algorithms"
                  :options="algorithms"
                  class="w-full"/>
        <label for="dd-algorithms">Select Algorithm</label>
      </div>
      <Button @click="setNodes(false); isDialogVisible= false" label="Apply Settings"></Button>
    </div>
  </Dialog>
</template>

<style scoped>
.map-options {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  padding-top: 1.5rem;
}

.help-text {
  padding-right: 5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
