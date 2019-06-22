import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import classNames from 'classnames';
import './side-bar.less'

import { isEmpty } from '../utils/common'
import NoteItemLink from './note-item-link'

@inject('noteStore')
@inject('uiStore')
@observer
class SideBar extends Component {
    constructor(props){
        super(props);
    }

    render () {
        const {noteStore, uiStore} = this.props
        if (isEmpty(noteStore.json)) return null;
        console.log(noteStore.json)
        //const {currentFetchNumbers, totalNodeNumbers} = noteStore
        return <div className={classNames({'sidebar': true, 'sidebar-expand': uiStore.showSideBar})}>
            {noteStore.favNotes.map(note => (
                <p><NoteItemLink _key={note.key} content={note.value.content}/></p>
            ))}
        </div>
    }
}

function withSideBar(C) {
    return class WithSideBar extends Component {
        render() {
            return <div>
                <C {...this.props}/>
                <SideBar/>
            </div>
        }
    }
}

export {withSideBar, SideBar}
