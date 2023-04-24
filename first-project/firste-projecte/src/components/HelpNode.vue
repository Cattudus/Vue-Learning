<script setup lang="ts">
import NodeComponent from "@/components/NodeComponent.vue";
import {defineProps} from "vue";
defineProps({
  text: String,
  isFinish: Boolean,
  isStart: Boolean,
  isWall: Boolean,
})
</script>

<template>
  <div class="help-node">
    <NodeComponent :is-start="isStart" :is-finish="isFinish" :is-wall="isWall"/>
    <span>{{text}}</span>
  </div>
</template>

<style scoped>
.help-node{
  display: flex;
  gap: 1rem;
}
</style>
