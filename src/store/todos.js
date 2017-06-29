import {observable, computed, toJS} from 'mobx';
import {Fb} from './firebase';
import {authStore} from './store';
const { map }  =  observable;

class todos{
  @observable todos = map({});

  constructor() {
    //Fb.todos.on('value', (snapshot) => {
    //  let val = snapshot.val()
    //  this.todos = val;
    //});
  }

  @computed get json() {
    return toJS(this.todos)
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
