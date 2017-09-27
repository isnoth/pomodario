import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
var classNames = require('classnames');

const DropdownItem = (props)=>(
  <a className="dropdown-item" onClick={props.click}>{props.title}</a>
)

class Dropdown extends Component{
  state = {
    show: false
  }

  toggleShow(){
    this.setState({show: !this.state.show})
  }

  render(){
    const {title} = this.props
    return(
      <li className={classNames({'nav-item':true, 'dropdown': true, show:this.state.show, 'mr-4':true})}>
        <a className="nav-link dropdown-toggle" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={this.toggleShow.bind(this)}>{title}</a>
        <div className={classNames({'dropdown-menu': true, 'show': this.state.show})} aria-labelledby="dropdown01">
          {this.props.children}
        </div>
      </li>
    )
  }
}

export {Dropdown, DropdownItem}
