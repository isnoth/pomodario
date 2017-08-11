import {observable, computed, toJS} from 'mobx';
import {Fb} from './firebase';
import {authStore} from './store';
import  {fetchAllFromRef} from '../utils/firebase'
const { map }  =  observable;


class notes{
  @observable notes = map({});

  @computed get json() {
    return toJS(this.notes)
  }

  //onGoing pomodario
  //@computed get onGoing() {
  //  const value = toJS(this.todos)
  //  const items = Object.keys(value).map( function(i){
  //    const start = new Date(value[i].startTime)
  //    const end = new Date(value[i].endTime)
  //    const styleClass = value[i].type==="home" ? "orange":"green"
  //    return ({id: i, content: value[i].content, start:start, end: end , className: styleClass  })
  //  })

  //  return checkOngoingPomodario(items)
  //}

  fetchAllPomodarios(){
    fetchAllFromRef(100, authStore.userRef.child('flats'))
    .then(notes=>{
      this.notes.replace(notes)
    })
  }

  add ({key, value}){
    authStore.userRef.child('pomodarios').child('key').set({content: value})
    this.notes.set(key, {content: value})
  }

  _update (id, name){
    Fb.notes.update({[id]: {name}})
  };

  del (id){
    this.notes.delete(id)
    authStore.userRef.child('pomodarios').child(id).remove()
  };
}

export {notes}
