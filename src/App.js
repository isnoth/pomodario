import React, { Component } from 'react';
import './App.css';

import { Login } from './components/login'
import  Nav from './components/nav'
import { Pomodario } from './components/pomodario'
import { Todos } from './components/todos'
import { Notes, Loading } from './components/notes'
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
      <Login/>

      {/*<Todos todoStore={todoStore}/>*/}
        <Nav/>

				<Route exact path="/" render={()=>(
            <Notes/>
        )}/>

				<Route exact path="/pomodario/" render={()=>(
            <Pomodario />
        )}/>

				<Route exact path="/app/" render={()=>(
            <Todos />
        )}/>

				<Route exact path="/notes/:id" render={({match})=>(
            <Notes match={match}/>
        )}/>
      </div>
    );
  }
}

export default App;
