import {observable } from 'mobx';
import { tooltipStore } from './store';

const MODE_NORMAL = "MODE_NORMAL"
const MODE_EDIT = "MODE_EDIT"

class vim{
  @observable state = MODE_NORMAL;
  @observable keys = '';
  @observable history = [];

  initState(){
    this.state = MODE_NORMAL
    this.keys = ''
    tooltipStore.clearTooltips()
  }

  keyPress({keyName, param}){
    console.log('press')
    this.history.push(keyName)

    if( keyName === 'Escape'){
      this.state = MODE_NORMAL
      this.keys = ''
      tooltipStore.clearTooltips()
    }

    if(this.state === MODE_NORMAL){
      if (this.keys[0] === "f"){
        this.keys = this.keys + keyName
        tooltipStore.checkTooltip(this.keys.slice(1))
      }

      if (this.keys === ''){
        if( keyName === 'f'){
          this.keys = 'f'
          tooltipStore.createTooltips()
        }
      }
    }


    if (this.keys === ''){
      if( keyName === 'i'){
        console.log('goto')
        this.state = MODE_EDIT
        this.keys = ''
      }
    }
  }

  clearKeys(){
    this.keys = ''
  }


}

export {vim}
