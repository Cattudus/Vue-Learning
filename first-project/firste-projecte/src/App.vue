<script setup lang="ts">
import Header from "@/components/Header.vue";
import {watch} from "vue";
import {ToastMessage} from "@/state-management/ToastMessage";
import {useToast} from "primevue/usetoast";

const toast = useToast();
watch(() => ToastMessage.toast,
    (toastValue) => {
      toast.add(toastValue)
    })
</script>

<template>
  <header>
    <Header/>
  </header>
  <router-view></router-view>
  <Toast/>
</template>

<style scoped>

</style>
