import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import './App.css';

import { Login } from './components/login'
import  Nav from './components/nav'
import { Pomodario } from './components/pomodario'
import { Todos } from './components/todos'
import { Notes, Loading } from './components/notes'
import Vim from './components/vim'
import Settings from './components/settings'

import { HashRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';

class App extends Component{
  render(){
    return <Router>
    <div className="App">
      <Vim/>
      <Login/>
      <Nav/>

      <Route exact path={'/'} component={Notes}/>
      <Route path={'/notes/'} component={Notes}/>
      <Route exact path={'/settings/'} component={Settings}/>
      <Route exact path={`/pomodario/`} component={Pomodario}/>
    </div>
  </Router>
  }
}

export default App;
