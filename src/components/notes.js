import React, { Component } from 'react';
import '../styles/react-grid-layout.css';
import {observer, inject} from 'mobx-react';

import {Responsive, WidthProvider} from 'react-grid-layout';

import { Tree } from './tree/tree'

const ResponsiveReactGridLayout = WidthProvider(Responsive);



const isEmpty = (obj)=>(!!(Object.keys(obj).length===0))

@inject('routingStore')
@observer
class Notes extends Component {

  componentWillReceiveProps(nextProps) {
    const {match} = this.props
    console.log('match is:', match);
  }

  render() {
    const {noteStore, match, routingStore} = this.props
    const pathname = routingStore.location.pathname
    const _key = pathname.match('root|BN[\-a-zA-Z0-9]+')
    if (!_key) return null
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
