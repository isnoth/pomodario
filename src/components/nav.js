import React, { Component } from 'react';
import { Login } from './login'
//import LoginModal from "./auth/login"
import {observer, inject} from 'mobx-react';
import {SplitButton, Navbar, NavItem, Nav, NavDropdown, MenuItem, Label} from 'react-bootstrap'


@inject('uiStore')
@inject('authStore')
@observer
class NavBar extends Component{
  render(){
    const {authStore, uiStore} = this.props

    const navbarInstance = (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">BN5x</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={4} href="#newFlat/root">NewFlat</NavItem>
            <NavItem eventKey={3} href="#md">MarkDown</NavItem>
            <NavItem eventKey={3} href="#stat">Stat</NavItem>
          </Nav>
          <Login/>
            {authStore.authState?(
              <Nav pullRight>
                <NavDropdown eventKey={7} title={authStore.authState.email} id="basic-nav-dropdown">
                  {/*<MenuItem eventKey={7.1} onClick={this.backup}>Backup</MenuItem>*/}
                  {<MenuItem eventKey={7.2} onClick={authStore.logout}>Log out</MenuItem>}
                </NavDropdown>
              </Nav>
            ):(
              <Nav pullRight>
                <NavItem eventKey={9} href="#register">Register</NavItem>
                <NavItem eventKey={9} onClick={uiStore.openLoginModal}>Login</NavItem>
              </Nav>
            )}
        </Navbar.Collapse>
      </Navbar>
    );

    return navbarInstance
  }
}

export default NavBar
