import React, { Component } from 'react';
import Timer from './components/Timer';
import TimerCtrlPanel from './components/TimerCtrlPanel';
import DurationControls from './components/DurationControls';
import Beep from './components/Beep';
import PomodoroHeader from './components/PomodoroHeader';
import PomodoroFooter from './components/PomodoroFooter';


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


  // Manages countdown timing, time value decrements minutes and seconds
  countDown = () => {
    const { minutes, seconds } = this.state.timeRemains;
    const { clockType } = this.state;
    const timerDisplay = document.getElementById('timer-display');
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
      this.playBeep();
      if (clockType === 'session') {
        this.setState({
          clockType: 'break',
          timeRemains: {
            seconds: 0,
            minutes: this.state.breakLength
          }
        })
        timerDisplay.style.backgroundColor = '#d12a2a';
      } else {
        this.setState({
          clockType: 'session',
          timeRemains: {
            seconds: 0,
            minutes: this.state.sessionLength
          }
        })
        timerDisplay.style.backgroundColor = '#08490c'
      }
    }
  }


  // drives countdown,  clock update every 1000ms
  tickTock = () => {
    let intervalID = setInterval(this.countDown, 1000);
    this.setState({
      intervalID: intervalID
    })

  }


  handleTimerBackground = () => {
    const timerClockBody = document.getElementById('timer-display');
    
    if(this.state.clockType === 'session') {
      timerClockBody.classList = 'timer-display-session-active';
    } else {
      timerClockBody.classList = 'timer-display-break-active';
    }
  }


  // start-stop timer countDown
  startPauseTimer = () => {
    if(this.state.paused) {
      this.setState({
        paused: false
      })
      this.tickTock()
      this.handleTimerBackground();
    } else {
      this.setState({
        paused: true
      })
      clearInterval(this.state.intervalID);
      this.handleTimerBackground()
    }
  }

  adjustClockSession = changeType => {
    if(changeType === 'session-increment') {
      this.setState({
        timeRemains: {
          minutes: this.state.sessionLength + 1,
          seconds: 0
        }
      })
    } 
    else if (changeType === 'session-decrement') {
      this.setState({
        timeRemains: {
          minutes: this.state.sessionLength - 1,
          seconds: 0
        }
      })
    }
  }

  adjustClockBreak = changeType => {
    if(changeType === 'break-increment' && this.state.timeRemains.minutes < 60) {
      this.setState({
        timeRemains: {
          minutes: this.state.breakLength + 1,
          seconds: 0
        }
      })
    } 
    else if (changeType === 'break-decrement' && this.state.timeRemains.minutes > 1) {
      this.setState({
        timeRemains: {
          minutes: this.state.breakLength - 1,
          seconds: 0
        }
      })
    }
  }

  incrementTime = (event) => {
    if (this.state.paused) {
      // increase session duration, ensures time does not go under 1 minute
      if(event.target.id === 'session-increment' && this.state.sessionLength < 60) {
        this.setState({
          sessionLength: this.state.sessionLength + 1,
          clockType: 'session'
        })
        this.adjustClockSession(event.target.id);
      }
      // increase break duration, ensures time does not go under 1 minute
      else if (event.target.id === 'break-increment' && this.state.breakLength < 60)
      this.setState({
        breakLength: this.state.breakLength + 1,
        clockType: 'break'
      })
      this.adjustClockBreak(event.target.id);
    }
  }

  decrementTime = (event) => {
    if (this.state.paused) {
      // decrease session duration, ensures time does not go under 1 minute
      if(event.target.id === 'session-decrement' && this.state.sessionLength > 1) {
        this.setState({
          sessionLength: this.state.sessionLength - 1,
          clockType: 'session'
        })
        this.adjustClockSession(event.target.id);
      }
      // decrease break duration, ensures time does not go under 1 minute
      else if (event.target.id === 'break-decrement' && this.state.breakLength > 1) {
        this.setState({
          breakLength: this.state.breakLength - 1,
          clockType: 'break'
        })
        this.adjustClockBreak(event.target.id);
      }
    } 
  }

  resetClockDefault = () => {
    const alarm = document.querySelector('#beep');
    // stop interval when reset pressed
    clearInterval(this.state.intervalID);
    // stop and rewind Alarm sound when reset pressed
    alarm.pause();
    alarm.currentTime = 0;

    // reset state to default
    this.setState({
      sessionLength: 25,
      breakLength: 5,
      timeRemains: {
        minutes: 25,
        seconds: 0
      },
      clockType: 'session',
      paused: true,
      intervalID: null
    })
  }

  playBeep = () => {
    const beepSound = document.querySelector('#beep');
    beepSound.play();
  }


  render() {
    const { minutes, seconds } = this.state.timeRemains
    const { breakLength, sessionLength, clockType, paused } = this.state;
    return (
      <div className="App">

        <PomodoroHeader />
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
            timerCtrl={ this.startPauseTimer } 
            reset={ this.resetClockDefault }
            setBackGround={ this.handleTimerBackground }
            paused={ paused }
        />

        <Beep />
        <PomodoroFooter />
      </div>
    );
  }
}

export default App;
