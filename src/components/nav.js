import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import {Dropdown, DropdownItem} from './common/dropdown'
import 'bootstrap/dist/css/bootstrap.css';

@inject('uiStore')
@inject('authStore')
@observer
class NavBar extends Component{
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render(){
    const {authStore, uiStore} = this.props

    const unAuthSection = (
      <ul className="nav navbar-nav flex-row justify-content-between ml-auto">
        <li className="nav-item order-2 order-md-1">
          <a className="nav-link" title="settings" onClick={uiStore.openLoginModal}>
            Login
          </a>
        </li>
        <li className="nav-item order-2 order-md-1">
          <a className="nav-link" title="settings">
            Register
          </a>
        </li>
      </ul>
    )

    const authSection = (
      <ul className="nav navbar-nav flex-row justify-content-between ml-auto">
        <Dropdown title={authStore.authState&&authStore.authState.email}>
          <DropdownItem title="Logout" link='#' click={authStore.logout}/>
        </Dropdown>
      </ul>
    )

    return (
		  <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a className="navbar-brand" href="/">BN5x</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample02">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
            </li>
          </ul>
          {(authStore.authState&&authStore.authState.email)?authSection:unAuthSection}
        </div>
      </nav>

    )
  }
}

export default NavBar
