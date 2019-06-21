import React, { Component } from 'react';
import '../styles/react-grid-layout.css';
import {observer, inject} from 'mobx-react';
import { noteStore } from '../store/store'

import {Responsive, WidthProvider} from 'react-grid-layout';

import { Tree } from './tree/tree'
import {withSideBar} from './side-bar'
import { initLayout } from "../utils/node2"
import { bindKeys } from "../utils/keys"
import { isEmpty } from '../utils/common'

const ResponsiveReactGridLayout = WidthProvider(Responsive);

function checkLayout (layouts){
  console.log('checkLayout', layouts);
  if (layouts){
    if (layouts.lg){
      layouts.lg.forEach(i=>{
        if (i.h < 2){
          i.h = 2
        }
        if (i.w <2){
          i.w = 2
        }
      })
    }
    if (layouts.xs){
      layouts.xs.forEach(i=>{
        if (i.h < 2){
          i.h = 2
        }
        if (i.w <2){
          i.w = 2
        }
      })
    }
  }
}

var toPercent = function(val){
  return (Math.round(val * 10000)/100).toFixed(2) + '%';
}


@inject('noteStore')
@observer
class Loading extends Component{
  render(){
    const {noteStore} = this.props
    const {currentFetchNumbers, totalNodeNumbers} = noteStore
    const percent = toPercent(parseInt(currentFetchNumbers)/parseInt(totalNodeNumbers))
    console.log('percent is:', percent)

    return(
				<div className="progress">
					<div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: percent}}>
					</div>
        </div>
    )
  }

}

@inject('noteStore')
@inject('routingStore')
@observer
class Notes extends Component {
  constructor(props){
    super(props)
    this.goback = this._goback.bind(this)
  }
  
  componentDidMount(){
    this.bindKeys()
  }

  componentWillReceiveProps(nextProps) {
    const {match} = this.props
    console.log('match is:', match);
  }

  layoutChange(_key, current, all){
    console.log('layoutChange:', _key);
    //const {_key} = this.props

    const lg = all.lg.map(i=>(
      {
        i:i.i,
        x:i.x,
        y:i.y,
        w:i.w,
        h:i.h, }
    ))
    const xs = all.xs.map(i=>(
      {
        i:i.i,
        x:i.x,
        y:i.y,
        w:i.w,
        h:i.h, }
    ))

    const newNode = Object.assign({}, noteStore.json[_key], {layouts:{lg:lg, xs:xs}})
    noteStore.update(_key, newNode)
  }

  _goback(){
    console.log('goBack')
    const { goBack } = this.props.routingStore;
    goBack()
  }


  bindKeys(){
    bindKeys({
      el: document,
      keyList: [
        { keys: {ctrlKey: true, key: '[', preventDefault:false}, fn: ()=>{
          //if (this.state.edit) return;
          this.goback();
        }},
      ]
    })
  }

  render() {
    const {noteStore, routingStore} = this.props
    const pathname = routingStore.location.pathname
    let _key = pathname.match('root|BN[-a-zA-Z0-9]+')
    _key = _key?_key[0]:'root'
    const data = noteStore.json
    if (isEmpty(data)) return <Loading/>;

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
    let layouts = data[_key].layouts
    layouts = layouts?layouts: initLayout(noteStore.json, _key);
    checkLayout(layouts);


    //disable isDraggable when mobile
    const isMobile = document.body.clientWidth < 1100

    return isEmpty(data)?null:(
      <ResponsiveReactGridLayout
        layouts={layouts}
        breakpoints={{lg: 1200,  xs: 480}}
        cols={{lg: 48, xs: 1 }}
        rowHeight={30} 
        isDraggable={isMobile?false:true}
        isResizable={true}
        onLayoutChange={(current, all)=>{this.layoutChange(_key, current, all)}} >
        {children}
    </ResponsiveReactGridLayout>)
  }
};

export {
    Loading,
}

export const NotesComponent = withSideBar(Notes)
