import React, { Component } from 'react';
import Timer from './components/Timer';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breakLength: 1,
      sessionLength: 2,
      timeRemains: {
        minutes: 1,
        seconds: 13,
      },
      clockType: 'session',
      paused: false

    }
  }

  componentDidMount = () => {
    this.tickTock();
  }

  countDown = () => {
    const { minutes, seconds } = this.state.timeRemains;
    if(seconds > 0) {
      this.setState({
        timeRemains: {
          seconds: this.state.timeRemains.seconds - 1,
          minutes
        }
      })
      console.log(this.state.timeRemains);
    }
    else if (seconds === 0 && minutes > 0) {
      this.setState({
        timeRemains: {
          seconds: 59,
          minutes: this.state.timeRemains.minutes - 1
        }
      })
    }

    else if (seconds === 0 && minutes === 0) {
      if (this.state.clockType === 'session') {
        this.setState({
          clockType: 'break',
          timeRemains: {
            seconds: 0,
            minutes: this.state.breakLength
          }
        })
      } else {
        this.setState({
          clockType: 'session',
          timeRemains: {
            seconds: 0,
            minutes: this.state.sessionLength
          }
        })
      }
    }
  }

  tickTock = () => {
    setInterval(this.countDown, 1000)
  }



  render() {
    const { minutes, seconds } = this.state.timeRemains
    return (
      <div className="App">
        {/* <SessionLengthCtrl />
        <BreakLengthCtrl /> */}
        <Timer minutes={ minutes } seconds={ seconds } sessionType={ this.state.clockType }  />
        {/* <TimerCtrlPanel /> */}
      </div>
    );
  }
}

export default App;
