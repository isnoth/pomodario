import React, { Component } from 'react';
import {observer} from 'mobx-react';

@observer
class Login extends Component {
  handleKeyPress(evt){
    const { todoStore }  = this.props
    if (evt.key === "Enter"){
      console.log(todoStore)
      todoStore.add(evt.target.value)
      evt.target.value = ''
    }
  }

  login(){
    const {authStore} = this.props
    authStore.login(this.usr.value, this.pwd.value)
  }

  handDelete( key ){
    const { todoStore }  = this.props
    todoStore.del(key)
  }

  render() {
    const {authStore} = this.props
    console.log(authStore.authState)

    return (<div>

        {authStore.authState?authStore.authState.email: 'not login'}
        <input ref={c=>this.usr=c}></input>
        <input ref={c=>this.pwd=c}></input>
        <button onClick={this.login.bind(this)}>login</button>
        <button onClick={authStore.logout}>logout</button>
    </div>
    );
  }
};

export {Login}
