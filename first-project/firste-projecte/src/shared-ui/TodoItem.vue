<template>
  <div :class="{ 'finished-todo': isFinished }" class="todo-item">
    <span class="todo-name">{{ name }}</span>
    <div style="display: flex">
      <Button v-if="!isFinished" text rounded icon="pi pi-check" severity="success"
              @click="finishTodo(name, isFinished)"/>
      <Button text rounded icon="pi pi-trash" severity="danger" @click="removeTodo(name,isFinished)"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {TodoList} from "@/state-management/TodoList";
import {defineProps} from "vue";

defineProps({
  name: String,
  isFinished: Boolean
})

function finishTodo(name: string | undefined, isFinished: boolean) {
  if (name !== undefined) {
    TodoList.finishTodo({name: name, isFinished: isFinished})
  }
}

function removeTodo(name: string | undefined, isFinished: boolean) {
  if (name !== undefined) {
    TodoList.removeTodo({name: name, isFinished: isFinished})
  }
}
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

.todo-item:hover{
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}

.finished-todo {
  border: 1px solid #81f381;
}

.finished-todo span{
  text-decoration-line: line-through;
}

.todo-name{
  width: 75%;
  word-wrap: break-word;
  overflow: inherit;
  padding: 0.25rem 0;
}
</style>
