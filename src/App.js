import React, { Component } from 'react';
import './App.css';
import {todoStore, noteStore, authStore} from './store/store'

import {Login } from './components/login'
import { Pomodario } from './components/pomodario'
import { Todos } from './components/todos'
import { Notes } from './components/notes'

import { observer } from 'mobx-react';

import { Route, Link } from "react-router-dom";


@observer
class App extends Component {
  render() {
    return (
      <div className="App">
      {/*<Todos todoStore={todoStore}/>*/}
        {authStore.authState? null:<Login authStore={authStore}/>}

				<Route exact path="/pomodario/" render={()=>(
            <Pomodario todoStore={todoStore}/>
        )}/>

				<Route exact path="/app/" render={()=>(
            <Todos todoStore={todoStore}/>
        )}/>

				<Route exact path="/notes/" render={()=>(
            <Notes noteStore={noteStore}/>
        )}/>
      </div>
    );
  }
}

export default App;
