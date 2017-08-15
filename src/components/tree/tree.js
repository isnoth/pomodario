import React, { Component } from 'react';
import {observer} from 'mobx-react';
import { noteStore, settingStore } from '../../store/store'

import { TreeContent } from './tree-content'
import { TreeContentVim } from './tree-content-vim'

@observer
class Tree extends Component {
  constructor(props){
    super(props)
    this.state = {
      edit: false
    }
  }

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
      children = childKeys.map(childKey=><Tree _key={childKey} key={childKey}/>)
    }

    console.log('settingStore: ', settingStore.json.vim)
    const treeContent = settingStore.json.vim?
    <TreeContentVim _key={_key} {...this.state}/>:
      <TreeContent _key={_key} {...this.state}/>

    return (
    <div 
      className="tree-node" >

      {treeContent}
      <div tabIndex={-1}>
        {children}
      </div>
    </div>
    )
  }
}

export { Tree }
