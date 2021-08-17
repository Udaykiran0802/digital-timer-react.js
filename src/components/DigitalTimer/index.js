import {Component} from 'react'

import './index.css'

const initialState = {
  timerElapsed: false,
  timeStartSeconds: 0,
  timeLimitMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  renderTimeControllerSection = () => {
    const {timerElapsed} = this.state
    const startOrPauseImageUrl = timerElapsed
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseAltText = timerElapsed ? 'pause icon' : 'play icon'
    console.log(startOrPauseAltText)

    return (
      <div className="timer-controller-section">
        <button
          className="timer-controller-btn"
          type="button"
          onClick={this.onClickStartOrPause}
        >
          <img
            src={startOrPauseImageUrl}
            alt={startOrPauseAltText}
            className="timer-controller-icon"
          />
          <p className="timer-controller-label">
            {timerElapsed ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          className="timer-controller-btn"
          type="button"
          onClick={this.onClickReset}
        >
          <img
            className="timer-controller-icon"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
          />
          <p className="timer-controller-label">Reset</p>
        </button>
      </div>
    )
  }

  onClickReset = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timeStartSeconds, timeLimitMinutes} = this.state
    const isTimerCompleted = timeStartSeconds === timeLimitMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({timerElapsed: false})
    } else {
      this.setState(prevState => ({
        timeStartSeconds: prevState.timeStartSeconds + 1,
      }))
    }
  }

  onClickStartOrPause = () => {
    const {timerElapsed, timeStartSeconds, timeLimitMinutes} = this.state
    const isTimerCompleted = timeStartSeconds === timeLimitMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeStartSeconds: 0})
    }
    if (timerElapsed) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }

    this.setState(prevState => ({timerElapsed: !prevState.timerElapsed}))
  }

  onTimerLimitInMinutesDecrement = () => {
    const {timeLimitMinutes} = this.state

    if (timeLimitMinutes > 1) {
      this.setState(prevState => ({
        timeLimitMinutes: prevState.timeLimitMinutes - 1,
      }))
    }
  }

  onTimerLimitInMinutesIncrement = () => {
    this.setState(prevState => ({
      timeLimitMinutes: prevState.timeLimitMinutes + 1,
    }))
  }

  renderTimeLimitControllerSection = () => {
    const {timeStartSeconds, timeLimitMinutes} = this.state
    const isButtonsDisabled = timeStartSeconds > 0

    return (
      <div className="timer-limit-controller-section">
        <p className="limit-label">Set Timer Limit</p>
        <div className="timer-limit-controller">
          <button
            type="button"
            className="limit-controller-button"
            disabled={isButtonsDisabled}
            onClick={this.onTimerLimitInMinutesDecrement}
          >
            -
          </button>
          <div className="limit-label-and-value-container">
            <p className="limit-value">{timeLimitMinutes}</p>
          </div>
          <button
            className="limit-controller-button"
            type="button"
            disabled={isButtonsDisabled}
            onClick={this.onTimerLimitInMinutesIncrement}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeStartSeconds, timeLimitMinutes} = this.state
    const totalRemainingSeconds = timeLimitMinutes * 60 - timeStartSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringFieldMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringFieldSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringFieldMinutes}:${stringFieldSeconds}`
  }

  render() {
    const {timerElapsed} = this.state
    const labelText = timerElapsed ? 'Running' : 'Paused'
    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-display-section">
            <div className="elapsed-timer-container">
              <h1 className="elapsed-time">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="timer-state">{labelText}</p>
            </div>
          </div>
          <div className="control-section">
            {this.renderTimeControllerSection()}
            {this.renderTimeLimitControllerSection()}
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
