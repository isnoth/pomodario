import {observable, computed, toJS} from 'mobx';
import {vimStore} from './store';
import {getToolTipLabel} from '../utils/tooltip'
const { map }  =  observable;


class tooltip{
  @observable tooltips = map({});
  @computed get json() {
    return toJS(this.tooltips)
  }

  createTooltips(){
    const  eachTooltip=(nodes)=>{
      Array.prototype.forEach.call(nodes, (node, index)=>{
        const pos = node.getBoundingClientRect();
        const label = getToolTipLabel(index)
        const id = node.id
        //const tooltip = createTooltip(pos, label)
        console.log('this is:', this)
        this.tooltips.set(label, {pos, id})
      })
    }

    const nodes = document.getElementsByClassName('tree-node__body')
    console.log('this 0 is:', this)
    eachTooltip(nodes)

    //this.tooltips.set(key, {content: value})
  }


  clearTooltips(){
    this.tooltips.clear()
  }

  checkTooltip(keys){
    const tooltips = this.json
    const node = tooltips[keys]
    console.log('checkTooltip:', keys, tooltips, node)
    if(node){
      document.getElementById(node.id).focus()
      vimStore.initState()
    }

  }
}

export {tooltip}
