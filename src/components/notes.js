import React, { Component } from 'react';
import {observer} from 'mobx-react';
import {getUniqueId} from '../utils/node'

import { noteStore } from '../store/store'

@observer
class Tree extends Component {
  handDelete( key ){
    noteStore.del(key)
  }

  render(){
    const { _key} = this.props
    const data = noteStore.json

    console.log(data, _key, data[_key])
    const childKeys = data[_key].children
    let children = null
    if (childKeys){
      children = childKeys.map(childKey=><Tree _key={childKey} />)
    }

    return <div className="tree-node" >
      <div tabIndex={1} className="tree-node__body">
        {_key, data[_key].content}
      </div>
      <div tabIndex={-1}>
        {children}
      </div>
    </div>
  }
}

const isEmpty = (obj)=>(!!(Object.keys(obj).length===0))

@observer
class Notes extends Component {
  render() {
    const {noteStore} = this.props
    const data = noteStore.json
    return isEmpty(data)?null:<Tree _key={"root"}/>
  }
};

export {Notes}
