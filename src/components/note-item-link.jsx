import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';

@inject('routingStore')
@observer
class NoteItemLink extends Component {

  _click = () => {
      const { _key } = this.props
      const { push } = this.props.routingStore;
      push(`/notes/${_key}`)
  }

  render(){
    const {content} = this.props

    return <a onClick={this._click}>
        {content===""? '-':content}
    </a>
  }
}

export default NoteItemLink
