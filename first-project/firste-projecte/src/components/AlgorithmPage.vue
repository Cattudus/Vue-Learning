<script setup lang="ts">
import Map from "@/components/Map.vue";
import {useToast} from "primevue/usetoast";
import {onMounted, watch} from "vue";
import {GridNodes} from "@/state-management/GridNodes";
import {getInitialGrid} from "@/utils/gridOperations";
import {ToastMessage} from "@/state-management/ToastMessage";

const toast = useToast();

onMounted(() => {
  GridNodes.grid = getInitialGrid(50, 20)
})

watch(() => ToastMessage.toast,
    (toastValue) => {
      toast.add(toastValue)
    })

</script>

<template>
  <main>
    <Map/>
  </main>
  <Toast/>
</template>

<style scoped>

</style>
