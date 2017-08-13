import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { noteStore } from '../../store/store'
import { bindKeys } from "../../utils/keys"

import { getParent, nodeSibling, nodePrevSibling, nodeGetFirstChild} from "../../utils/node2"

class TreeContentVim extends Component {
  constructor(props){
    super(props)
    this.state = {
      edit: false,
      keycodes:""
    }
  }

  componentDidMount(){
    this.bindKeys()
  }

  toggleEditState(){
    this.setState({edit: !this.state.edit})
  }

  updateContent(){
  }

  focus(){
    //if(this.state.edit === false){
    //  this.toggleEditState()
    //}
  }

  blur(){
    const {_key} = this.props
    const data = noteStore.json
    noteStore.update(_key, Object.assign(data[_key], {content: this._input2.value} ))
    this.toggleEditState()
  }

  bindKeys(){
    const {_key} = this.props
    if (this._input){
      bindKeys({
        el: ReactDOM.findDOMNode(this._input),
        keyList: [
          { keys: {shiftKey: true, key: 'A'}, fn: this.toggleEditState.bind(this) },
          { keys: {shiftKey: true, key: 'Enter'}, fn: ()=>noteStore.createChild(_key)},
          { keys: {ctrlKey: true, key: 'Enter'}, fn: ()=>noteStore.createNebour(_key)},
          { keys: {ctrlKey: true, key: 'Delete'}, fn: ()=>noteStore.delete(_key)},
          { keys: {ctrlKey: false, key: 'j', preventDefault:false}, fn: ()=>{
            let key;
            if (this.state.edit) return ;
            if(key=nodeSibling(_key, noteStore.json))
              document.getElementById(key).focus()
          }},
          { keys: {ctrlKey: false, key: 'k', preventDefault:false}, fn: ()=>{
            let key;
            if (this.state.edit) return ;
            if(key=nodePrevSibling(_key, noteStore.json))
              document.getElementById(key).focus()
          }},
          { keys: {ctrlKey: false, key: 'l', preventDefault:false}, fn: ()=>{
            let key;
            if (this.state.edit) return ;
            if(key=nodeGetFirstChild(_key, noteStore.json))
              document.getElementById(key).focus()
          }},
          { keys: {ctrlKey: false, key: 'h', preventDefault:false}, fn: ()=>{
            let key;
            if (this.state.edit) return ;
            if(key=getParent(_key, noteStore.json))
              document.getElementById(key).focus()
          }},
          { keys: {ctrlKey: false, key: 'd', preventDefault:false}, fn: ()=>{
            let key;
            if (this.state.edit) return ;
            if(this.state.keycodes === 'd'){
              console.log('cut key', _key)
              this.setState({keycodes: ''})
            }else if(this.state.keycodes == ''){
              this.setState({keycodes: 'd'})
            }
          }},
          { keys: {ctrlKey: false, shiftKey: true,  key: 'D'}, fn: ()=>{
            let key;
            if (this.state.edit) return ;
            if(this.state.keycodes === 'd'){
              let pKey=getParent(_key, noteStore.json)
              noteStore.delete(_key)
              this.setState({keycodes: ''})
              document.getElementById(pKey).focus()
            }
          }},

          { keys: {ctrlKey: false, key: 'i', preventDefault:false}, fn: ()=>{
            console.log(this.state.edit)
            if (this.state.edit) return ;
            this.toggleEditState()}
          },
          { keys: {ctrlKey: false, key: 'Escape'}, fn: ()=>{
            this.blur()
            document.getElementById(_key).focus()
          }},
        ]
      });
    }
  }

  componentDidUpdate(){

    if (this._input2){
      this._input2.focus()
      console.log(this._input2.value)

      //to move cursor to end
      const value  = this._input2.value
      this._input2.value = ''
      this._input2.value = value
    }
  }

  render(){
    const { _key} = this.props
    const data = noteStore.json
    const content=data[_key].content

    return <div 
      id={_key}
      onFocus={this.focus.bind(this)}
      tabIndex={1}
      className="tree-node__body"
      onClick={()=>{
        if( this.state.edit === false) this.toggleEditState();
      }}
      ref={(c) => this._input = c}>
        <span
          style={{display:!this.state.edit?'inline':'none'}} >
          {content}
        </span>
        { this.state.edit?
        <input 
          onBlur={this.blur.bind(this)}
          tabIndex={1} 
          defaultValue={content}
          ref={(c) => this._input2 = c}
        />:null}
    </div>
  }
}

export { TreeContentVim }
