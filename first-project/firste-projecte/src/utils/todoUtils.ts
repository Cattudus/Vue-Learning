import type {Todo} from "@/interfaces/todo";

export function addToLocalStorage(todoList: Todo[]){
    localStorage.setItem('todoList', JSON.stringify(todoList))
}
