import React, { Component } from 'react';
import {observer} from 'mobx-react';
import {getUniqueId} from '../utils/node'

@observer
class Todos extends Component {
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

export {Todos}
