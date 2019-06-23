import React from 'react';
import ReactDOM from 'react-dom';
import {observer, inject} from 'mobx-react';
//import { connect } from 'react-redux';
import { myDate, getTimeStampHour, todayXhour} from "../../utils/date_util"
import { getUniqueId } from "../../utils/node2"
import {Button, Col} from "react-bootstrap"
import {doNotify} from './notify'


//import { pomodarioActions } from 'core/pomodario';
//import { uiActions } from 'core/ui';

import vis from 'vis'
import 'vis/dist/vis.css'
import './timeline.css'
//import Timeline from 'react-visjs-timeline'

@inject('authStore')
@inject('todoStore')
@observer
class TestVis extends React.Component {
  constructor(props){
    super(props)
    this.state = {items:[]}
    //this.togglePomodario = this.props.togglePomodario.bind(this)
  }

  componentDidMount() {
    const {startRegisterListeners } = this.props
    console.log('startRegisterListeners')
    //startRegisterListeners()
    this.initTimeline()
    this.startCheckingPomodarioState()
  }

  startCheckingPomodarioState() {
    const {setPomodarioMeta} = this.props
      setInterval(()=>{
          let data = this.state.items.filter(i=>{
              return  (Date.now() - i.start.getTime()> 0) &&(Date.now()-i.start.getTime()<1000)
          })
          console.log('filtered items', data)
          if(data.length>0){
              //alert(data[0].content)
              console.log(data[0])
              doNotify(data[0].content, data[0].end.getTime() - data[0].start.getTime())
              this.togglePomodario()
              setPomodarioMeta(data[0])
          }
      }, 1000)
  }

  componentWillReceiveProps(nextprops){
      console.log('receive next props:', nextprops);
    const {todoStore} = nextprops
    const items = this.itemsToVisItems(todoStore.json)
    this.setState({items: items})
    this.TimelineElement.setItems(items)
  }

  componentWillUpdate (args) {
      console.log(args)
  }

  itemsToVisItems(value) {
    if (!value){
        return [{id:0, content:"initial", start:new Date(), end:new Date(), className: "green"}]
    }else{
        return Object.keys(value).map( function(i){
            const start = new Date(value[i].startTime)
            const end = new Date(value[i].endTime)
            const styleClass = value[i].type==="home" ? "orange":"green"
            return ({id: i, content: value[i].content, start:start, end: end , className: styleClass  })
        })
    }
  }

  onAdd = (item, cb) => {
    console.log('onAdd: ', item)
    const { todoStore: {add} } = this.props

    const data = window.prompt()
    //item.content = "test"
    item.content = data
    item.key = getUniqueId()
    item.value = {
        content: data,
        endTime: item.start.getTime()+ 25*60*1000,
        startTime: item.start.getTime(),
        className: "green"
    }

    add(item)

    cb()
  }

  initTimeline(){
    const { container } = this.refs
    const {updatePomodario, deletePomodario} = this.props

    //init timeline
    const options = {
      editable: true, 
      start: todayXhour(0),
      end: todayXhour(12),
      onAdd: this.onAdd,
      onUpdate: (item, cb)=>{
        console.log('onUpdate', item)
        item.startTime = item.start.getTime()
        item.endTime = item.end.getTime()
        updatePomodario(item)
        cb()
      },
      onRemove: (item, cb)=>{
        console.log('onRemove', item)
        deletePomodario(item)
      }
    };
    const timelineItems = []
    this.TimelineElement = new vis.Timeline(container, timelineItems, options)
  }

  shiftTime(h1, h2){
    const today = todayXhour(h1)
    const tomorrow = todayXhour(h2)
    const shift = today.getTimezoneOffset()*60000
    console.log(today)
    console.log(tomorrow)
    this.TimelineElement.setWindow(today.getTime()+shift, tomorrow.getTime()+shift)
  }

  render(){
    //const styles = {display: ui.showTimeline?"block":'none'}
    const {todoStore} = this.props;
    return (
      <div>
        <p>hello vis</p>
        <div ref='container' />
        <Button onClick={this.shiftTime.bind(this, 9, 23)}>Today</Button>
        <Button onClick={this.shiftTime.bind(this, 9-24, 23-24)}>Yesterday</Button>
        {JSON.stringify(todoStore.json)}
      </div>
    )
  }
}

//export default connect(state => ({
//}), Object.assign(pomodarioActions, uiActions))(TestVis);
//
export default TestVis
