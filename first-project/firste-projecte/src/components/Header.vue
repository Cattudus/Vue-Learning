<script setup lang="ts">
import {onMounted, ref} from "vue";
import {setNodes, visualizeShortestPath} from "@/utils/gridOperations";
import {AlgorithmsEnum} from "@/utils/algorithmFunction";
import {aStarinfo, dijkstrainfo} from "@/assets/mocks/aboutAlgorithm";
import {useRouter} from "vue-router";

let gridRows = ref(20);
let gridColumns = ref(50)
let isDialogVisible = ref(false);
let selectedAlgorithm = ref({name: 'Dijkstra Algorithm', id: AlgorithmsEnum.Dijkstra})
let showHelpDialog = ref(false)
let showAlgorithmDialog = ref(false)
let showHeaderHelp = ref(true)

const aStarInfo = ref(aStarinfo)
const dijkstraInfo = ref(dijkstrainfo)

const algorithms = [{name: 'Dijkstra Algorithm', id: AlgorithmsEnum.Dijkstra}, {
  name: 'A* Algorithm',
  id: AlgorithmsEnum.Astar
}]

const router = useRouter()

function changeHeaderTemplate(isShortestPath: boolean) {
  showHeaderHelp.value = isShortestPath
  items.value = isShortestPath ? shortestPath : todo
}

const todo = [
  {
    label: 'Switch Route',
    icon: 'pi pi-fw pi-external-link',
    items:
        [{
          label: 'Shortest Path',
          icon: 'pi pi-fw pi-sitemap',
          command: () => {
            router.push('/')
            changeHeaderTemplate(true)
          }
        },
          {
            label: 'Todo Page',
            icon: 'pi pi-fw pi-question',
            command: () => {
              router.push('/todo')
              changeHeaderTemplate(false)
            }
          }
        ]
  }]

const shortestPath = [{
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
      setNodes(true, true, gridColumns.value, gridRows.value)
    }
  },
  {
    label: 'Show Shortest Path',
    icon: 'pi pi-fw pi-power-off',
    command: () => {
      visualizeShortestPath(selectedAlgorithm.value.id)
    }
  },
  {
    label: 'Switch Route',
    icon: 'pi pi-fw pi-external-link',
    items:
        [{
          label: 'Shortest Path',
          icon: 'pi pi-fw pi-sitemap',
          command: () => {
            router.push('/')
            changeHeaderTemplate(true)
          }
        },
          {
            label: 'Todo Page',
            icon: 'pi pi-fw pi-question',
            command: () => {
              router.push('/todo')
              changeHeaderTemplate(false)
            }
          }
        ]
  }]
const items = ref(shortestPath);

onMounted(() => {
  router.isReady().then(() => {
    if (router.currentRoute.value.path === '/todo') {
      showHeaderHelp.value = false
      items.value = todo
    }
  })

})

</script>

<template>
  <div>
    <Menubar :model="items">
      <template #start>
        <div>Fastest Path</div>
      </template>
      <template v-if="showHeaderHelp" #end>
        <div class="help-text">Algorithm Info <i @mouseover="showAlgorithmDialog = true"
                                                 @mouseleave="showAlgorithmDialog = false"
                                                 class="pi pi-question-circle"/></div>
        <InfoDialog v-if="showAlgorithmDialog">
          <div class="algorithm-info">
            {{
              selectedAlgorithm.id === AlgorithmsEnum.Astar ? aStarInfo : dijkstraInfo
            }}
          </div>
        </InfoDialog>


        <div class="help-text">Help <i @mouseover="showHelpDialog = true" @mouseleave="showHelpDialog = false"
                                       class="pi pi-question-circle"/></div>
        <InfoDialog v-if="showHelpDialog">
          <HelpComponent/>
        </InfoDialog>
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
      <Button @click="setNodes(false, false,gridColumns,gridRows); isDialogVisible= false"
              label="Apply Settings"></Button>
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

.algorithm-info {
  width: 45rem;
  white-space: break-spaces;
}
</style>
