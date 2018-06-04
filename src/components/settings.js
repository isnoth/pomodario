import {observer, inject} from 'mobx-react';
import React, { Component } from 'react';
import {saveData} from '../utils/file'


@inject('noteStore')
@observer
class Settings extends Component {
  getNotes(){
    const {noteStore} = this.props
    const notes = noteStore.json
    const fileName = `bn5x_${new Date().getMonth()+1}_${new Date().getDate()}.json`
    saveData(notes, fileName)
  }

  render(){

    return <div>
    <h1>settings</h1>
    <button onClick={this.getNotes.bind(this)}> downlaod </button>

    </div>
  }
}

export default Settings
