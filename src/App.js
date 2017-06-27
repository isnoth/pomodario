import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {todoStore} from './store/store'

//import {observable, autorun} from 'mobx';
import {observer} from 'mobx-react';

@observer
class Todos extends React.Component {
  handleKeyPress(evt){
    const todoStore = this.props
    if (evt.key === "Enter"){
      todoStore.addTodo(evt.target.value)
      evt.target.value = ''
    }
  }
  render() {
    const {todoStore} = this.props

    const data = todoStore.json
    const todoLis = Object.keys(data).map((key, index)=>{
      return <li key={key}>
        {`${data[key].humi} - ${data[key].temp}`}
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
