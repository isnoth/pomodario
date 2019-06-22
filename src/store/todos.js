import {observable, computed, toJS, action} from 'mobx';
import {Fb} from './firebase';
import {authStore} from './store';
import  {fetchAllFromRef} from '../utils/firebase'
const { map }  =  observable;

const checkOngoingPomodario = (list)=>{
  //console.log('checkOngoingPomodario:', list)

  let data = list.filter(i=>{
    return  (Date.now() > i.start.getTime()) &&(Date.now() < i.end.getTime())
  })
  //console.log('filtered items', data)
  return data.length>0? data[0]:null
}

class todos{
  @observable todos = map({});

  @computed get json() {
    return toJS(this.todos)
  }

  //onGoing pomodario
  @computed get onGoing() {
    const value = toJS(this.todos)
    const items = Object.keys(value).map( function(i){
      const start = new Date(value[i].startTime)
      const end = new Date(value[i].endTime)
      const styleClass = value[i].type==="home" ? "orange":"green"
      return ({id: i, content: value[i].content, start:start, end: end , className: styleClass  })
    })

    return checkOngoingPomodario(items)
  }

  @action.bound
  fetchAllPomodarios(){
    fetchAllFromRef(100, authStore.userRef.child('pomodarios'))
    .then(pomodarios=>{
      this.todos.replace(pomodarios)
    })
  }

  @action.bound
  add ({key, value}){
    authStore.userRef.child('pomodarios').child(key).set({content: value})
    this.todos.set(key, {content: value})
  }

  _update (id, name){
    Fb.todos.update({[id]: {name}})
  };

  del (id){
    this.todos.delete(id)
    authStore.userRef.child('pomodarios').child(id).remove()
  };
}

export {todos}
