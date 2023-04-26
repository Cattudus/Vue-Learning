<script setup lang="ts">
import {TodoList} from "@/state-management/TodoList";
import {onMounted, ref} from "vue";
import TodoItem from "@/shared-ui/TodoItem.vue";

let todoName = ref(null)

onMounted(() =>{
  TodoList.loadTodos()
})

function addTodo() {
  if (todoName.value !== null ) {
    TodoList.addNewTodo(todoName.value)
    todoName.value = null
  }
}
</script>

<template>
  <div class="todo-page-content">
    <div class="todo-card">
      <div style="display: flex; justify-content: center; font-size: 20px">
        Your TODO List
      </div>
      <div class="todo-content">
        <div class="todo" v-for="todo in TodoList.todos">
          <TodoItem :name="todo.name" :is-finished="todo.isFinished"></TodoItem>
        </div>
      </div>
      <div class="todo-footer">
        <span class="p-float-label">
            <InputText id="todoname" v-model="todoName"></InputText>
           <label for="todoname">Todo Name</label>
        </span>
        <Button @click="addTodo()">Add Todo</Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.todo-page-content {
  display: flex;
  justify-content: center;
  padding-top: 1rem;
}

.todo-card {
  background-color: #0093E9;
  background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
  padding: 1rem;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 4px;
}

.todo-content {
  min-width: 25rem;
  min-height: 10rem;
  max-height: 25rem;
  max-width: 30rem;
  overflow: auto;
}

.todo {
  padding: 0.25rem 0;
}

.todo-footer {
  display: flex;
  gap: 1rem;
  padding-top: 2rem;
  justify-content: center;
}
</style>
