import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import '../styles/bn.less'
var classNames = require('classnames')

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
    const { uiStore } = this.props

    return (
			<div className={classNames({modal: true, fade: true, show: uiStore.showLoginModal})} style={{display:uiStore.showLoginModal?'block':'none'}}>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">PLEASE SIGN IN</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={uiStore.closeLoginModal}>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<form className="form-signin">
								<label for="inputEmail" className="sr-only" >Email address</label>
								<input ref={c=>this.usr=c} type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autofocus=""/>
								<label for="inputPassword" className="sr-only" >Password</label>
								<input ref={c=>this.pwd=c} type="password" id="inputPassword" className="form-control" placeholder="Password" required=""/>
							</form>
						</div>
						<div className="modal-footer">
              <button onClick={this.login.bind(this)} className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
						</div>
					</div>
				</div>
			</div>
    );
  }
};

export {Login}
