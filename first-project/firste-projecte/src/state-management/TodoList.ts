import {reactive, unref} from "vue";
import type {Todo} from "@/interfaces/todo";
import {addToLocalStorage, getTodoListFromLocalStorage} from "@/utils/todoUtils";
import {ToastMessage} from "@/state-management/ToastMessage";

export const TodoList = reactive({
    todos: [] as Todo[],
    loadTodos(){
        this.todos = getTodoListFromLocalStorage()
    },
    addNewTodo(todo: string) {
        if (getIndex(todo) === -1) {
            this.todos.push({name: todo, isFinished: false})
            addToLocalStorage(this.todos)
        } else {
            ToastMessage.toast = {
                severity: 'error',
                summary: 'Todo Already Exist!',
                detail: 'Please Choose Another Name',
                life: 4000
            }
        }
    },
    removeTodo(todo: Todo) {
        const index = getIndex(todo.name)
        if (index !== -1) {
            this.todos.splice(index, 1)
            addToLocalStorage(this.todos)
        }
    },
    finishTodo(todo: Todo) {
        const index = getIndex(todo.name)
        if (index !== -1) {
            this.todos[index].isFinished = true
            addToLocalStorage(this.todos)
        }
    }
})

function getIndex(todo: string) {
    return TodoList.todos.findIndex(value =>
        value.name === todo
    )
}
