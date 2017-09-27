import React, { Component } from 'react';
import './App.css';
import {todoStore, noteStore, authStore} from './store/store'

import { Login } from './components/login'
import  Nav from './components/navbar'
import { Pomodario } from './components/pomodario'
import { Todos } from './components/todos'
import { Notes } from './components/notes'
import Vim from './components/vim'


import { observer } from 'mobx-react';

import { Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';


@observer
class App extends Component {
  render() {
    return (
      <div className="App">
      <Vim/>
      {/*<Todos todoStore={todoStore}/>*/}
        <Nav/>

				<Route exact path="/" render={()=>(
            <Notes/>
        )}/>

				<Route exact path="/pomodario/" render={()=>(
            <Pomodario todoStore={todoStore}/>
        )}/>

				<Route exact path="/app/" render={()=>(
            <Todos todoStore={todoStore}/>
        )}/>

				<Route exact path="/notes/:id" render={({match})=>(
            <Notes match={match}/>
        )}/>
      </div>
    );
  }
}

export default App;
