import React, { Component } from 'react';
import { Login } from './login'
//import LoginModal from "./auth/login"
import {observer, inject} from 'mobx-react';
//import {SplitButton, Navbar, NavItem, Nav, NavDropdown, MenuItem, Label} from 'react-bootstrap'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

import {Dropdown} from './common/dropdown'


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
    return (
		  <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a className="navbar-brand" href="#">BN5x</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample02">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <Dropdown/>
          </ul>

          <form className="form-inline my-2 my-md-0">
            <input className="form-control" type="text" placeholder="Search"/>
          </form>
        </div>
      </nav>

    )
  }
}

//class NavBar extends Component{
//  render(){
//    const {authStore, uiStore} = this.props
//
//    const navbarInstance = (
//      <Navbar inverse>
//        <Navbar.Header>
//          <Navbar.Brand>
//            <a href="#">BN5x</a>
//          </Navbar.Brand>
//          <Navbar.Toggle />
//        </Navbar.Header>
//        <Navbar.Collapse>
//          <Nav>
//            <NavItem eventKey={4} href="#newFlat/root">NewFlat</NavItem>
//            <NavItem eventKey={3} href="#md">MarkDown</NavItem>
//            <NavItem eventKey={3} href="#stat">Stat</NavItem>
//          </Nav>
//          <Login/>
//            {authStore.authState?(
//              <Nav pullRight>
//                <NavDropdown eventKey={7} title={authStore.authState.email} id="basic-nav-dropdown">
//                  {/*<MenuItem eventKey={7.1} onClick={this.backup}>Backup</MenuItem>*/}
//                  {<MenuItem eventKey={7.2} onClick={authStore.logout}>Log out</MenuItem>}
//                </NavDropdown>
//              </Nav>
//            ):(
//              <Nav pullRight>
//                <NavItem eventKey={9} href="#register">Register</NavItem>
//                <NavItem eventKey={9} onClick={uiStore.openLoginModal}>Login</NavItem>
//              </Nav>
//            )}
//        </Navbar.Collapse>
//      </Navbar>
//    );
//
//    return navbarInstance
//  }
//}




export default NavBar
