import { RouterStore } from 'mobx-react-router';

import {todos} from './todos'
import {notes} from './notes'
import {auth} from './auth'
import {settings} from './settings'

const todoStore = new todos();
const noteStore = new notes()
const authStore = new auth();
const settingStore = new settings();


window.todoStore = todoStore
window.noteStore = noteStore
window.authStore = authStore

//routers
const routingStore = new RouterStore();

export {todoStore, noteStore, authStore, settingStore, routingStore};
