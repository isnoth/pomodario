import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { noteStore } from '../../store/store'
import { bindKeys } from "../../utils/keys"

import { getParent, nodeSibling, nodePrevSibling, nodeGetFirstChild} from "../../utils/node2"

var classNames = require('classnames');


function setEndOfContenteditable(contentEditableElement)
{
    var range,selection;
    if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
        range = document.createRange();//Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection();//get the selection object (allows you to change selection)
        selection.removeAllRanges();//remove any selections already made
        selection.addRange(range);//make the range you have just created the visible selection
    }
    else if(document.selection)//IE 8 and lower
    { 
        range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
        range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        range.select();//Select the range (make it the visible selection
    }
}

class TreeContentVim extends Component {
  constructor(props){
    super(props)
    this.state = {
      edit: false,
      keycodes:""
    }
    this.jump = this._jump.bind(this)
    this.goback = this._goback.bind(this)
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

  _jump(){
    const { _key } = this.props
    const { location, push, goBack } = this.props.routingStore;
    push(`/notes/${_key}`)
  }

  _goback(){
    const { location, push, goBack } = this.props.routingStore;
    goBack()
  }

  blur(){
    const {_key} = this.props
    const data = noteStore.json
    noteStore.update(_key, Object.assign(data[_key], {content: this._input2.innerText} ))
    this.toggleEditState()
  }

  click(){
    if( this.state.edit === false) {
      this.toggleEditState();
    }
  }

  updateFold(){
    console.log('updateFold');
    const {_key} = this.props
    const node = noteStore.json[_key]
    noteStore.update(_key, Object.assign({}, node, {fold: !node.fold}));
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
            if (this.state.edit) return;
            let key=nodeSibling(_key, noteStore.json);
            if(key)
              document.getElementById(key).focus()
          }},
          { keys: {ctrlKey: false, key: 'k', preventDefault:false}, fn: ()=>{
            if (this.state.edit) {return} ;
            let key = nodePrevSibling(_key, noteStore.json);
            if(key)
              document.getElementById(key).focus()
          }},
          { keys: {ctrlKey: false, key: 'l', preventDefault:false}, fn: ()=>{
            if (this.state.edit) {return} ;
            if (noteStore.json[_key].fold) {return};
            let key = nodeGetFirstChild(_key, noteStore.json);
            if(key)
              document.getElementById(key).focus()
          }},
          { keys: {ctrlKey: false, key: 'h', preventDefault:false}, fn: ()=>{
            if (this.state.edit) {return} ;
            let key = getParent(_key, noteStore.json);
            if(key)
              document.getElementById(key).focus()
          }},
          { keys: {ctrlKey: false, key: 'd', preventDefault:false}, fn: ()=>{
            if (this.state.edit) return ;
            if(this.state.keycodes === 'd'){
              console.log('cut key', _key)
              noteStore.cutNode = _key;
              this.setState({keycodes: ''})
            }else if(this.state.keycodes === ''){
              this.setState({keycodes: 'd'})
            }
          }},
          { keys: {ctrlKey: false, shiftKey: true,  key: 'D'}, fn: ()=>{
            if (this.state.edit) return ;
            if(this.state.keycodes === 'd'){
              let pKey=getParent(_key, noteStore.json)
              let sKey = nodeSibling(_key, noteStore.json)
              noteStore.delete(_key)
              this.setState({keycodes: ''})

              const key = sKey?sKey:pKey
              document.getElementById(key).focus()
            }
          }},

          { keys: {ctrlKey: false, key: 'i', preventDefault:false}, fn: (event)=>{
            console.log(this.state.edit)
            if (this.state.edit) return ;
            this.toggleEditState()
            event.preventDefault()
          }},

          { keys: {ctrlKey: false, key: 'Escape'}, fn: ()=>{
            if(this.state.edit){
              this.blur()
              document.getElementById(_key).focus()
            }else{
              this.setState({keycodes: ''})
            }
          }},

          { keys: {ctrlKey: false, key: 'o', preventDefault:false}, fn: ()=>{
            console.log(this.state.edit)
            if (this.state.edit) return ;;
            const newKey = noteStore.createNebour(_key)
            setTimeout(()=>{
              document.getElementById(newKey).focus() //improve focus
            }, 0)
          }},

          { keys: {shiftKey: true, key: 'O', preventDefault:false}, fn: ()=>{
            console.log(this.state.edit)
            if (this.state.edit) return ;;
            const newKey = noteStore.createChild(_key)
            setTimeout(()=>{
              document.getElementById(newKey).focus() //improve focus
            }, 0)
          }},

          { keys: {ctrlKey: false, key: 'p', preventDefault:false}, fn: ()=>{
            if (this.state.edit) return ;;
            if(!noteStore.cutNode) return ;
            noteStore.nodePaste(_key)
          }},

          { keys: {ctrlKey: false, key: 'z', preventDefault:false}, fn: ()=>{
            console.log('z')
            if (this.state.edit) return;
            this.updateFold();
          }},

          { keys: {ctrlKey: true, key: ']', preventDefault:false}, fn: ()=>{
            //if (this.state.edit) return;
            this.jump();
          }},

          { keys: {ctrlKey: true, key: '[', preventDefault:false}, fn: ()=>{
            //if (this.state.edit) return;
            this.goback();
          }},

        ]
      });
    }
  }

  componentDidUpdate(){
    const {_key} = this.props

    if (this._input2){
      this._input2.focus()
      this._input2.innerText = noteStore.json[_key].content

			//to move cursor to end
      const elem = ReactDOM.findDOMNode(this._input2) //This is the element that you want to move the caret to the end of
      setEndOfContenteditable(elem);

      ////to move cursor to end
      //const value  = this._input2.value
      //this._input2.value = ''
      //this._input2.value = value
    }
  }

  render(){
    const { _key} = this.props
    const data = noteStore.json
    const content=data[_key].content
    const style = data[_key].style

    return (
      <div 
        id={_key}
        onFocus={this.focus.bind(this)}
        tabIndex={1}
        className="tree-node__body"
        ref={(c) => this._input = c}
      >
        <div 
          className={classNames({'inedit':this.state.edit, 'noedit':!this.state.edit})}
          onClick={this.click.bind(this)}
          style={style}
          >
          {content}
        </div>
        { this.state.edit?
          <div 
            onBlur={this.blur.bind(this)}
            tabIndex={1} 
            contentEditable={true}
            defaultValue={content}
            ref={(c) => this._input2 = c}
          />:null
        }
      </div>
    )
  }
}

export { TreeContentVim }
