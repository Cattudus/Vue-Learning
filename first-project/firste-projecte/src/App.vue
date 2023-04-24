<script setup lang="ts">
import Header from "@/components/Header.vue";
import Map from "@/components/Map.vue";
import {onMounted, watch} from "vue";
import {GridNodes} from "@/state-management/GridNodes";
import {getInitialGrid} from "@/composables/gridOperations";
import {useToast} from "primevue/usetoast";
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
