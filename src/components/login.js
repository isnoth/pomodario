import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import {Input, Panel, Modal, Col, InputGroup, FormControl, ControlLabel, Form, FormGroup, Checkbox, Button} from "react-bootstrap" 
@inject('uiStore')
@inject('authStore')
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
    const {authStore, uiStore} = this.props

    return (
    <Modal bsSize="small" show={uiStore.showLoginModal} onHide={uiStore.closeLoginModal}>
      <Modal.Header closeButton >
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ControlLabel>email:</ControlLabel>
        <FormControl type="email" placeholder="Userid" inputRef={c=>this.usr=c}/>
        <ControlLabel>password:</ControlLabel>
        <FormControl type="password" placeholder="Passwd" inputRef={c=>this.pwd=c}/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.login.bind(this)}>login </Button>
      </Modal.Footer>
    </Modal>
    );
  }
};

export {Login}
