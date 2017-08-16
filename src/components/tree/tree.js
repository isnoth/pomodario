import React, { Component } from 'react';
import {observer} from 'mobx-react';
import { noteStore, settingStore } from '../../store/store'

import { TreeContent } from './tree-content'
import { TreeContentVim } from './tree-content-vim'
import {Glyphicon} from 'react-bootstrap'

import '../../styles/tree.less'


class Bullet extends Component {
  constructor(props){
    super(props)
    this.state = {hot: false}
  }

  updateFold(){
    const {_key} = this.props
    const node = noteStore.json[_key]
    noteStore.update(_key, Object.assign({}, node, {fold: !node.fold}));
  }
  drag(){}

  render(){
    const {_key} = this.props

    console.log('Bullet:', _key, noteStore)
    const hashHistory = []
    const nodeUrl = ''
    const data = noteStore.json

    return (<div className="node-btn-wrap" 
      onMouseEnter ={this.setHot}>
      {data[_key].children?<Glyphicon className="fold" glyph={data[_key].fold?"plus":"minus"} onClick={this.updateFold.bind(this, !data[_key].fold)}/>:null}
      <div className={data[_key].md?"dot-md":"dot"}></div>
      {data[_key].fold?<div className="dot-fold" ></div>:null}
      {this.state.hot?<div 
        draggable='true' 
        className="dot-hot" 
        onDragStart={this.drag.bind(this, _key)}
        onClick={()=>{ hashHistory.push(nodeUrl) }}
        ></div>:null}
        {/*<TreeMenu show={this.state.showMenu} nodeUpdate={this.nodeUpdate} node={content[_key]} onMouseBlur={this.clearHot}/>*/}
    </div>)
  }
}




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
    if (childKeys && !data[_key].fold){
      children = childKeys.map(childKey=><Tree _key={childKey} key={childKey}/>)
    }

    console.log('settingStore: ', settingStore.json.vim)
    const treeContent = settingStore.json.vim?
    <TreeContentVim _key={_key} {...this.state}/>:
      <TreeContent _key={_key} {...this.state}/>

    return (
    <div className="tree-node" >
      <Bullet {...this.props}/>
      {treeContent}
      <div tabIndex={-1}>
        {children}
      </div>
    </div>
    )
  }
}

export { Tree }
