import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {observable, autorun} from 'mobx';
import {observer} from 'mobx-react';

class TodoStore{
  @observable todos = [];

  constructor(){
     autorun(() => console.log(this.report));
  }

  get completedTodosCount() {
    return this.todos.filter(
      todo => todo.completed === true
    ).length;
  }

  get report() {
    if (this.todos.length === 0)
      return "<none>";
    return `Next todo: "${this.todos[0].task}". ` +
      `Progress: ${this.completedTodosCount}/${this.todos.length}`;
  }

  addTodo(task) {
    this.todos.push({
      task: task,
      completed: false,
      assignee: null
    });
  }

  deleteTodo(index){
    this.todos.splice(index, 1)
  }
}
const todoStore = new TodoStore();


/* ..and some actions that modify the state */
todoStore.todos[0] = {
    task: "Take a walk",
    completed: false
};
// -> synchronously prints 'Completed 0 of 1 items'

todoStore.todos[0].completed = true;
// -> synchronously prints 'Completed 1 of 1 items'


@observer
class Todos extends React.Component {
  handleKeyPress(evt){
    const todoStore = this.props.todoStore
    if (evt.key === "Enter"){
      todoStore.addTodo(evt.target.value)
      evt.target.value = ''
    }
  }
  render() {
    const {todos} = this.props.todoStore
    const todoLis = todos.map((i, index)=>{
      return <li key={index}>
        {i.task} 
        <button onClick={()=>{this.props.todoStore.deleteTodo(index)}}>x</button></li>
    })

    return (<p>
      <ul>
        {todoLis}
      </ul>
      <input onKeyUp={this.handleKeyPress.bind(this)}/>
    </p>
    );
  }

  onReset () {
      this.props.appState.resetTimer();
  }
};



class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Todos todoStore={todoStore}/>
      </div>
    );
  }
}

export default App;
