import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import {Dropdown, DropdownItem} from './common/dropdown'
import 'bootstrap/dist/css/bootstrap.css';
import {getRootPathAndContent} from '../utils/node2'


@inject('routingStore')
@inject('noteStore')
@observer
class BreadCrumb extends Component{

	componentWillReceiveProps(nextProps) {
		console.log('[test] BreadCrumb receive new props:', nextProps)
	}

  render(){
    const {routingStore, noteStore} = this.props
    const pathname = routingStore.location.pathname
    let _key = pathname.match('root|BN[-a-zA-Z0-9]+')
    _key = _key?_key[0]:'root'
		const content = noteStore.json

    const pathAndContents = getRootPathAndContent(_key, noteStore.json)
    console.log('[test] pathAndContents:', pathAndContents, _key, content)

		return (
			<ol className="breadcrumb">
        {pathAndContents?pathAndContents.map((i, index)=>(
           <li className="breadcrumb-item" key={index}>
             <a onClick={()=>{routingStore.push('/notes/'+i.id)}}>{i.content}</a>
           </li>
        )):null}
			</ol>
		)
  }
}


@inject('routingStore')
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
    const {authStore, uiStore, routingStore} = this.props

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
        <li className="nav-item">
            <a className="nav-link active" onClick={uiStore.toggleSideBar}><i className="fas fa-star"></i>star</a>
        </li>
        <Dropdown title={authStore.authState&&authStore.authState.email}>
          <DropdownItem title="Logout" link='#' click={authStore.logout}/>
          <DropdownItem title="settings" link='#' click={()=>{ routingStore.push('/settings/')}}/>
          <DropdownItem title="search" link='#' click={()=>{ routingStore.push('/search/')}}/>
          <DropdownItem title="toggle fav" link='#' click={uiStore.toggleSideBar}/>
        </Dropdown>
      </ul>
    )


    return (
		  <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a className="navbar-brand" href="/" onClick={()=>routingStore.push('/')}>BN5x</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample02">
          <BreadCrumb/>
          {(authStore.authState&&authStore.authState.email)?authSection:unAuthSection}
        </div>
      </nav>

    )
  }
}

export default NavBar
