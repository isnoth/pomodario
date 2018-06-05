import {observer, inject} from 'mobx-react';
import React, { Component } from 'react';
import dayjs from 'dayjs'

const NUMBER_PER_PAGE = 10

function filterPaging(notes, pageIndex, numberPerPage=NUMBER_PER_PAGE){
  return notes.slice(numberPerPage*pageIndex, numberPerPage*(pageIndex+1))
}

@inject('noteStore')
@observer
class Search extends Component {
  state = {
    searchInput: '',
    page: 0
  }
  getNotes = ()=> {
    //return filterPaging(filteredNotes, this.state.page)
    //function filterPaging(notes, pageIndex){
    //  return notes.slice(NUMBER_PER_PAGE*pageIndex, NUMBER_PER_PAGE*(pageIndex+1))
    //}
  }

  updateInput = (evt)=>{
    this.setState({searchInput: evt.target.value})
  }

  render(){
    const {noteStore} = this.props
    const notes = noteStore.filter(this.state.searchInput)

    return <div>
      <h1>settings</h1>
      <input onChange={this.updateInput}/>
      <div>
        {this.state.searchInput}
      </div>
      <div>
        {notes.map(i=>(<li>{i.content}</li>))}
      </div>
      <button>prev</button>
      <span> {notes.length/NUMBER_PER_PAGE} </span>
      <button>next</button>


    </div>
  }
}

export default Search
