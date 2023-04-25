import {reactive} from "vue";
import type {Todo} from "@/interfaces/todo";

export const TodoList = reactive({
    todos: [] as Todo[],
    addNewTodo(todo: Todo) {
        this.todos.push(todo)
    },
    removeTodo(todo: Todo){
        this.todos.splice(this.todos.indexOf(todo), 1)
    },
    finishTodo(todo: Todo){
        const index = this.todos.indexOf(todo)
        if(index !== -1){
            this.todos[index].isFinished = true
        }
    }
})
