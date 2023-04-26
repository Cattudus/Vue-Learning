import {reactive, unref} from "vue";
import type {Todo} from "@/interfaces/todo";
import {addToLocalStorage} from "@/utils/todoUtils";

export const TodoList = reactive({
    todos: [] as Todo[],
    addNewTodo(todo: string) {
        //add no duplicates
        this.todos.push({name: todo, isFinished: false})
        addToLocalStorage(this.todos)
    },
    removeTodo(todo: Todo) {
        const index = this.todos.findIndex(value =>
            value.name === todo.name
        )
        if (index !== -1) {
            this.todos.splice(this.todos.indexOf(todo), 1)
            addToLocalStorage(this.todos)
        }
    },
    finishTodo(todo: Todo) {
        const index = this.todos.findIndex(value =>
            value.name === todo.name
        )
        if (index !== -1) {
            this.todos[index].isFinished = true
            addToLocalStorage(this.todos)
        }
    }
})

