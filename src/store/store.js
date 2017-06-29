import {todos} from './todos'
import {auth} from './auth'

const todoStore = new todos();
const authStore = new auth();

window.todoStore = todoStore
window.authStore = authStore

export {todoStore, authStore};
