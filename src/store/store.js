import { RouterStore } from 'mobx-react-router';

import {todos} from './todos'
import {notes} from './notes'
import {auth} from './auth'
import {vim} from './vim'
import {tooltip} from './tooltip'
import {settings} from './settings'
import {ui} from './ui'

const todoStore = new todos();
const noteStore = new notes()
const authStore = new auth();
const settingStore = new settings();
const vimStore = new vim();
const tooltipStore = new tooltip();
const uiStore = new ui();
const routingStore = new RouterStore();


window.todoStore = todoStore
window.noteStore = noteStore
window.authStore = authStore
window.vimStore = vimStore
window.uiStore = uiStore
window.routingStore = routingStore


export {todoStore, noteStore, authStore, settingStore, routingStore, vimStore, tooltipStore, uiStore};
