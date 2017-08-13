import {observable, computed, toJS} from 'mobx';
import {authStore} from './store';
import  {fetchAllFromRef} from '../utils/firebase'
import { getUniqueId } from "../utils/node2"
import { getParent, nodeGetAllChildrenId} from "../utils/node2"
const { map }  =  observable;



const NOTES_REF = 'flats'

class notes{
  @observable notes = map({});

  @computed get json() {
    return toJS(this.notes)
  }

  fetchAllPomodarios(){
    fetchAllFromRef(100, authStore.userRef.child(NOTES_REF))
    .then(notes=>{
      this.notes.replace(notes)
    })
  }

  add ({key, value}){
    authStore.userRef.child(NOTES_REF).child(key).set({content: value})
    this.notes.set(key, {content: value})
  }

  update (key, value){
    console.log('update:', key, value)
    authStore.userRef.child(NOTES_REF).child(key).set(value)
    this.notes.set(key, value)
  };

  del (id){
    this.notes.delete(id)
    authStore.userRef.child(NOTES_REF).child(id).remove()
  };

  delete(cKey){
    const obj = toJS(this.notes)

    let parentKey = getParent(cKey, obj)
    let parent = obj[parentKey]
    let deleteList = nodeGetAllChildrenId(cKey, obj)
    deleteList.push(cKey)
    let children = obj[parentKey].children
    children.splice(children.indexOf(cKey), 1)
    parent.children = children

    //dispatch(nodeUpdate(parent))
    this.update(parentKey, parent)

    deleteList.forEach(key=>{
      this.del(key)
    })
  }

  createChild(cKey){
    const nNodeKey = getUniqueId()
    const notes = toJS(this.notes)
    const cNode = notes[cKey]

    this.add({key: nNodeKey, value: ""})
    this.update(cKey, Object.assign({}, cNode, { children: cNode.children?[...cNode.children, nNodeKey]:[nNodeKey] }))
  }

  createNebour(cKey){
    const content = toJS(this.notes)

    const nNodeKey = getUniqueId()
    this.add({key: nNodeKey, value:""})

    const parentKey = getParent( cKey, content)

    const parentNode = content[parentKey]

    const newChildren = parentNode.children.slice()
    newChildren.splice(newChildren.indexOf(cKey)+1, 0, nNodeKey)

    this.update(parentKey, Object.assign({}, parentNode, { children: parentNode.children?newChildren:[nNodeKey] }))
  }


}

export {notes}
