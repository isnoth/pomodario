import React from 'react';
import { ProgressBar } from "react-bootstrap"

export class CountDown extends React.Component {
  render(){
    const { content, start, end, now} = this.props
    const remain = Math.floor((end.getTime()-now.getTime())/1000)
    const remainText = Math.floor(remain/60) +' : '+  remain%60
    const label = remainText + ' - ' +(content?content:"")

    return (
      <ProgressBar active 
        now={(now.getTime() - start.getTime())/ (end.getTime() - start.getTime())*100}
        bsStyle={"success"}
        label={label}
      />
    )
  }
}

