import React, { Component } from 'react';
import '../styles/react-grid-layout.css';
import {observer} from 'mobx-react';

import { noteStore, settingStore } from '../store/store'
import {Responsive, WidthProvider} from 'react-grid-layout';

import { TreeContent } from './tree/tree-content'
import { TreeContentVim } from './tree/tree-content-vim'

const ResponsiveReactGridLayout = WidthProvider(Responsive);



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

const isEmpty = (obj)=>(!!(Object.keys(obj).length===0))

@observer
class Notes extends Component {
  render() {
    const {noteStore} = this.props
    const _key = 'root';
    const data = noteStore.json
    if (isEmpty(data)) return null;

    //childs
    const childKeys = data[_key].children
    let children = null
    if (childKeys){
      children = childKeys.map(childKey=>(
        <div key={childKey}>
          <Tree _key={childKey} key={childKey} />
        </div>
      ))
    }

    //layous
    const layouts = data[_key].layouts

    return isEmpty(data)?null:(
      <ResponsiveReactGridLayout
        layouts={layouts}
        breakpoints={{lg: 1200,  xs: 480}}
        cols={{lg: 48, xs: 1 }}
        rowHeight={30} 
        isDraggable={true}
        isResizable={true}>
        {children}
    </ResponsiveReactGridLayout>)
  }
};

export {Notes}
