import React, { Component } from 'react';
import './App.css';
import {todoStore, authStore} from './store/store'

import {Login } from './components/login'
import { Pomodario } from './components/pomodario'

import {getUniqueId} from './utils/node'

//import {observable, autorun} from 'mobx';
import {observer} from 'mobx-react';

@observer
class Todos extends React.Component {
  handleKeyPress(evt){
    const { todoStore }  = this.props
    if (evt.key === "Enter"){
      console.log(todoStore)
      todoStore.add({key: getUniqueId(), value:evt.target.value})
      evt.target.value = ''
    }
  }1

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

@observer
class App extends Component {
  render() {
    return (
      <div className="App">
      {/*<Todos todoStore={todoStore}/>*/}
      {authStore.authState? <Pomodario todoStore={todoStore}/>:
        <Login authStore={authStore}/>}
      </div>
    );
  }
}

export default App;
