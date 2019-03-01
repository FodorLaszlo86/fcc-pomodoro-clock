import React, { Component } from 'react';
import Timer from './components/Timer';
import TimerCtrlPanel from './components/TimerCtrlPanel';
import DurationControls from './components/DurationControls';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timeRemains: {
        minutes: 25,
        seconds: 0,
      },
      clockType: 'session',
      paused: true,
      intervalID: null
    }
  }

  componentDidMount = () => {
    // controls stop-pause of the timer
    if(this.state.paused) {
      clearInterval(this.state.intervalID);
    } else {
      this.tickTock();
    }
  }


  countDown = () => {
    const { minutes, seconds } = this.state.timeRemains;
    const { clockType } = this.state;
    if(seconds > 0) {
      this.setState({
        timeRemains: {
          seconds: this.state.timeRemains.seconds - 1,
          minutes
        }
      })
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
      if (clockType === 'session') {
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
    let intervalID = setInterval(this.countDown, 1000);
    this.setState({
      intervalID: intervalID
    })

  }

  pauseTimer = () => {
    this.setState({
      paused: true
    })
    clearInterval(this.state.intervalID)
  }

  startTimer = () => {
    this.setState({
      paused: false
    })
    this.tickTock()
  }

  incrementTime = (event) => {
    if (this.state.paused) {
      if(event.target.id === 'increment-session' && this.state.sessionLength < 60) {
        this.setState({
          sessionLength: this.state.sessionLength + 1
        })
      }
      else if (event.target.id === 'increment-break' && this.state.breakLength < 60)
      this.setState({
        breakLength: this.state.breakLength + 1
      })
    }
  }

  decrementTime = (event) => {
    if (this.state.paused) {
      if(event.target.id === 'decrement-session' && this.state.sessionLength > 1) {
        this.setState({
          sessionLength: this.state.sessionLength - 1
        })
      }
      else if (event.target.id === 'decrement-break' && this.state.breakLength > 1)
      this.setState({
        breakLength: this.state.breakLength - 1
      })
    }
  }



  render() {
    const { minutes, seconds } = this.state.timeRemains
    const { breakLength, sessionLength, paused, clockType } = this.state;
    return (
      <div className="App">
        <DurationControls 
            breakDuration={ breakLength } 
            sessionDuration={ sessionLength }
            incrementTime={ this.incrementTime } 
            decrementTime={ this.decrementTime }
        />

        <Timer 
            minutes={ minutes } 
            seconds={ seconds } 
            sessionType={ clockType }  
        />

        <TimerCtrlPanel 
            paused={ paused } 
            pauseTimer={ this.pauseTimer } 
            startTimer={ this.startTimer } 
        />
      </div>
    );
  }
}

export default App;
