import React, { Component } from 'react';
import './App.css';
import {todoStore, authStore} from './store/store'

import {Login } from './components/login'
import { Pomodario } from './components/pomodario'
import { Todos } from './components/todos'

import { observer } from 'mobx-react';

import { Route, Link } from "react-router-dom";


@observer
class App extends Component {
  render() {
    return (
      <div className="App">
      {/*<Todos todoStore={todoStore}/>*/}
        {authStore.authState? <Pomodario todoStore={todoStore}/>:
          <Login authStore={authStore}/>}

				<Route exact path="/app/" render={()=>(
            <Todos todoStore={todoStore}/>
        )}/>
      </div>
    );
  }
}

export default App;
