import React, { Component } from 'react';
import './App.css';
import {todoStore, authStore} from './store/store'

import {Login } from './components/login'
import { Pomodario } from './components/pomodario'

//import {observable, autorun} from 'mobx';
import {observer} from 'mobx-react';

@observer
class Todos extends React.Component {
  handleKeyPress(evt){
    const { todoStore }  = this.props
    if (evt.key === "Enter"){
      console.log(todoStore)
      todoStore.add(evt.target.value)
      evt.target.value = ''
    }
  }

  handDelete( key ){
    const { todoStore }  = this.props
    todoStore.del(key)
  }

  render() {
    const {todoStore} = this.props

    const data = todoStore.json
    const todoLis = Object.keys(data).map((key, index)=>{
      return <li key={key} onClick={this.handDelete.bind(this, key)}>
        {`${data[key].content} - ${data[key].temp}`}
      </li>
    })

    return (<div>
      <ul>
        {todoLis}
      </ul>
      <input onKeyUp={this.handleKeyPress.bind(this)}/>
    </div>
    );
  }
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Todos todoStore={todoStore}/>
        <Login authStore={authStore}/>
        <Pomodario todoStore={todoStore}/>
      </div>
    );
  }
}

export default App;
