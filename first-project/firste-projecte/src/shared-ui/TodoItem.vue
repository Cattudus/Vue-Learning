<template>
  <div :class="{ 'finished-todo': isFinished }" class="todo-item">
    <span>{{ name }}</span>
    <div>
      <Button v-if="!isFinished" text rounded icon="pi pi-check" severity="success"
              @click="TodoList.finishTodo(props)"/>
      <Button text rounded icon="pi pi-trash" severity="danger" @click="TodoList.removeTodo(props)"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {TodoList} from "@/state-management/TodoList";
import {defineProps} from "vue";

const props = defineProps({
  name: String,
  isFinished: Boolean
})
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-radius: 4px;
  padding: 0 0.5rem;
  border: 1px solid #a2a2a2;
}

.finished-todo {
  text-decoration-line: line-through;
  border: 1px solid #81f381;
}
</style>
