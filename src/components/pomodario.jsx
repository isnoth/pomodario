import React from 'react';
import {observer} from 'mobx-react';
import { CountDown } from './countdown'
import { Button} from 'react-bootstrap'
import '../styles/electron.less'

@observer
class Pomodario extends React.Component {
  constructor(props){
    super(props)
    this.state = {now: Date.now()}
  }

  componentDidMount(){
    const { todoStore } = this.props
    setInterval(()=>{
      this.setState({now: Date.now()})
    }, 1000)
  }

  render(){
    const {todoStore} = this.props
    const onGoingPomodaro = todoStore.onGoing
    console.log('onGoing: ', onGoingPomodaro, todoStore.now)

    return (
      <div>
        {onGoingPomodaro?<CountDown 
            content={onGoingPomodaro.content}
            start={onGoingPomodaro.start}
            end={onGoingPomodaro.end}
            now={new Date(this.state.now)}
            />:null}
          <div style={{width: '90%', float: 'left'}} >
            {CountDown}
          </div>
          <div style={{width: '10%', float: 'left'}}>
            <Button  bsStyle="primary" bsSize="xsmall" className="drag">x</Button>
          </div>
      </div>
    )
  }
}

export { Pomodario }
