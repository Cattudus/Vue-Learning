import type {Todo} from "@/interfaces/todo";

export function addToLocalStorage(todoList: Todo[]){
    localStorage.setItem('todoList', JSON.stringify(todoList))
}

export function getTodoListFromLocalStorage(){
    const stringList = localStorage.getItem('todoList');
    if(stringList !== null){
        return  JSON.parse(stringList)
    }
    return [];
}
