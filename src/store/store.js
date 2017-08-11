import {todos} from './todos'
import {notes} from './notes'
import {auth} from './auth'

const todoStore = new todos();
const noteStore = new notes()
const authStore = new auth();

window.todoStore = todoStore
window.authStore = authStore

export {todoStore, noteStore, authStore};
