import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
var classNames = require('classnames');

class Dropdown extends Component{
	state = {
    show: false
  }

  toggleShow(){
    this.setState({show: !this.state.show})
  }

	render(){
		return(
			<li className={classNames({'nav-item':true, 'dropdown': true, show:this.state.show})}>
				<a className="nav-link dropdown-toggle" href='#' id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={this.toggleShow.bind(this)}>Dropdown</a>
				<div className={classNames({'dropdown-menu': true, 'show': this.state.show})} aria-labelledby="dropdown01">
					<a className="dropdown-item" href="#">Action</a>
					<a className="dropdown-item" href="#">Another action</a>
					<a className="dropdown-item" href="#">Something else here</a>
				</div>
			</li>
    )
	}
}

export {Dropdown}
