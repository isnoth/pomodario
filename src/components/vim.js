import React, { Component } from 'react';
import { bindKeys } from "../utils/keys"
import '../styles/tooltip.less'

export default class Vim extends Component {
  componentDidMount(){
    var tooltips = []

    function createTooltipsForTreeNode(){

        function createTooltip(pos, label){
            const div = document.createElement('div')
            div.className = 'vim-tooltip'
            div.style.left = pos.left+'px'
            div.style.top = pos.top+'px'

            const tooltip = document.createElement('span')
            tooltip.innerText = label
            div.appendChild(tooltip)

            document.body.appendChild(div)
            return div
        }

        function createTooltips(nodes){
          Array.prototype.forEach.call(nodes, (node, index)=>{
            const pos = node.getBoundingClientRect();
            const label = getToolTipLabel(index)
            const tooltip = createTooltip(pos, label)
            tooltips.push(tooltip)
          })
        }

        const nodes = document.getElementsByClassName('tree-node__body')
        createTooltips(nodes)
    }

    function clearTooltipsForTreeNode(){
      tooltips.forEach(tooltip=>{
        document.body.removeChild(tooltip)
      })
      tooltips = []
    }

    function getToolTipLabel(index){
      return String.fromCharCode(0x61+index);
    }

		bindKeys({
      el: document.body,
      keyList: [
        { keys: {ctrlKey:false, shiftKey: true, key: '~'}, fn: createTooltipsForTreeNode },
        { keys: {ctrlKey:true, shiftKey: false, key: '`'}, fn: clearTooltipsForTreeNode },
      ]
    })


  }

  render(){
    return <span></span>
  }
}
