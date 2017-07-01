import {observable, computed, toJS} from 'mobx';
import {Fb} from './firebase';
import {authStore} from './store';
const { map }  =  observable;

const checkOngoingPomodario = (list)=>{
  console.log('checkOngoingPomodario:', list)

  let data = list.filter(i=>{
    return  (Date.now() > i.start.getTime()) &&(Date.now() < i.end.getTime())
  })
  console.log('filtered items', data)
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

  startListernining(){
    authStore.userRef.child('pomodarios').on('value', (snapshot) => {
      let val = snapshot.val()
      this.todos = val;
    });
  }

  add = (name) => {
    //Fb.todos.push({content: name})
    authStore.userRef.child('pomodarios').push({content: name})
    //console.log(id)
    //this.update(id, name);
  };

  update = (id, name) => {
    Fb.todos.update({[id]: {name}})
  };

  del = (id) => {
    authStore.userRef.child('pomodarios').child(id).remove();
  };
}

export {todos}
