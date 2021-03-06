import {observable, computed, toJS, action} from 'mobx';
import {authStore} from './store';
import  {fetchAllFromRef} from '../utils/firebase'
import { getUniqueId } from "../utils/node2"
import { getParent, nodeGetAllChildrenId} from "../utils/node2"
const { map }  =  observable;



const NOTES_REF = 'flats'
const STAT_REF = 'STAT'

class notes{
  @observable notes = map({});
  @observable cutNode = null;

  // for stat
  @observable currentFetchNumbers = 0;
  @observable totalNodeNumbers= 0;

  @computed get json() {
    return toJS(this.notes)
  }

  @computed get list() {
      const notes = toJS(this.notes)
      return Object.keys(notes)
      .map(key => ({key: key, value: notes[key]}))
  }

  @computed get favNotes() {
    return this.list
    .filter(obj => obj.value && obj.value.bookmark)
  }

  @action.bound
  filter(text) {
    const filteredNotes = this.list.filter(note=>textMatch(text, note.value))
    console.log('filtered notes:', filteredNotes)
    return filteredNotes

    function textMatch(text, note){
      return note && note.content && !!~note.content.indexOf(text)
    }
  }

  /*todo*/
  //filterWithCondition() {
  //    Object.keys(window.noteStore.json).map(key=>window.noteStore.json[key]).filter(i=>i.content===undefined)
  //}

  fetchAllPomodarios(){
    console.log('fetchAllPomodarios');
    Promise.resolve()
    .then(this.fetchTotalNodeNumbers)
    .then(()=>{
      return fetchAllFromRef(100, authStore.userRef.child(NOTES_REF), this.updateCurrentStat)
    })
    .then(notes=>{
      this.notes.replace(notes)
      return Promise.resolve()
    })
    .then(this.checkNodes)
    .then(this.updateStat)
  }



  @action.bound
  checkNodes(){
    const notes = toJS(this.notes)
    console.log(notes)
    if(!(notes['root'] && notes['root'].children)){
      this.createChild('root')
    }
    return Promise.resolve()
  }

  @action.bound
  fetchTotalNodeNumbers(){
    authStore.userRef.child(STAT_REF).once('value', snap=>{
      const stat = snap.val()

      if (!stat) {
          authStore.userRef.child(STAT_REF).set({
              length: 0
          })
          return Promise.resolve()
      }
      this.totalNodeNumbers = stat.length
      return Promise.resolve()
    })
  }

  /* caculation total number of node*/
  @action.bound
  updateStat(){
    const notes = toJS(this.notes)
    const length = Object.keys(notes).length
    authStore.userRef.child(STAT_REF).set({length: length})
  }

  @action.bound
  updateCurrentStat({length}){
    console.warn('updateStat', length)
    this.currentFetchNumbers = length
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

    return nNodeKey;
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

    return nNodeKey
  }

  nodePaste(key){
    const obj = toJS(this.notes)
    let cid = this.cutNode
    let nid = key

    let nParent = getParent( nid, obj)
    let cParent = getParent( cid, obj)

    if (cParent===nParent && 
        (obj[nParent].children.indexOf(nid)-obj[nParent].children.indexOf(cid) === -1)){
      console.log("1.2 -> 1.1")
    }else if(nodeGetAllChildrenId(cid, obj).indexOf(nid) > -1){
      console.log('1.1 -> 1')
    }else{
      //cut
      let currentchildren = obj[cParent].children 
      currentchildren.splice(currentchildren.indexOf(cid),1) //!!!!

      //paste
      let newchildren = obj[nParent].children 
      let index = newchildren.indexOf(nid)+1
      let _index =-( newchildren.length - index)

      if ((index === newchildren.length) || (newchildren.length === 1)){
        newchildren = [...newchildren, cid]
      }else{
        newchildren = [...newchildren.slice(0,index), cid, ...newchildren.slice(_index)]
      }

      if (nParent !== cParent){
        this.update(cParent, Object.assign({}, obj[cParent], { children: currentchildren}))
      }

      this.update(nParent, Object.assign({}, obj[nParent], { children: newchildren}))
      this.cutNode = null
    }
  }

}


export {notes}
