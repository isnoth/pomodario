import {observer, inject} from 'mobx-react';
import React, { Component } from 'react';
import { bindKeys } from "../utils/keys"
import '../styles/tooltip.less'
import {createTooltipsForTreeNode, clearTooltipsForTreeNode, getToolTipLabel} from '../utils/tooltip'
import { isEmpty, isEmptyOrNull} from '../utils/common'

const Tooltip = ({label, data, props})=>{
  console.log('Tooltip props', props)
  if(props.vimStore.keys.slice(1)===label){
    const node = document.getElementById(data.id)
    //console.log('focus node:', node)
    //setTimeout(()=>{node.focus()}, 0)
  }
  return <div 
    className="vim-tooltip" 
    style={{
      left:data.pos.left+'px',
      top: data.pos.top+'px',
      visibility:(!!~label.indexOf(props.vimStore.keys.slice(1)))?'visible':'hidden'
    }}>
    {label}
  </div>
}

const Tooltips = ({data, keys, ...props})=>{
  console.log('tooltips is:', data, props)

  if (isEmptyOrNull(data)){
    return null
  }

  return (<div>
    {
      Object.keys(data).map(i=>{
        return Tooltip({label:i, data:data[i], props})
      })
    }
  </div>)
}

@inject('vimStore')
@inject('tooltipStore')
@observer
class Vim extends Component {
  componentDidMount(){
    document.body.addEventListener('keydown', this.bindKey.bind(this))
  }

  bindKey(evt){
    const {vimStore} = this.props
    vimStore.keyPress({keyName: evt.key})
  }

  render(){
    const {vimStore, tooltipStore} = this.props
    console.log('---', vimStore)
    const tooltips = tooltipStore.json



    return <div>
      <Tooltips data={tooltips} keys={vimStore.keys} {...this.props}/>
      <div style={{position: 'fixed', bottom:'0px' }}>
        <p> {vimStore.keys} </p>
        <p> {vimStore.state} </p>
        <p> {vimStore.history.join('')} </p>
        <button onClick={()=>{tooltipStore.createTooltips()}}> tooltip </button>
      </div>
    </div>
  }
}

export default Vim
