import {observable, computed, toJS} from 'mobx';
import {Fb} from './firebase';
const { map }  =  observable;


class todos{
  @observable todos = map({});

  constructor() {
    Fb.todos.on('value', (snapshot) => {
      let val = snapshot.val()
      this.todos = val;
    });
  }

  @computed get json() {
    return toJS(this.todos)
  }

  add = (name) => {
    const id = Fb.todos.push().key;
    this.update(id, name);
  };

  update = (id, name) => {
    Fb.todos.update({[id]: {name}})
  };

  del = (id) => {
    Fb.todos.child(id).remove();
  };
}

const todoStore = new todos();
window.todoStore = todoStore

export {todoStore};
