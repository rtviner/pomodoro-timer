import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import '@fortawesome/fontawesome-free/js/solid';
import './style.css';
import soundfile from './winkSound.mp3';

const DEFAULT_BREAK_TIME = 300;
const DEFAULT_SESSION_TIME = 1500;

class App extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            breakTime: DEFAULT_BREAK_TIME,
            sessionTime: DEFAULT_SESSION_TIME,
            interval: "Session",
            count: 0,
            timerStart: 0,
            timerTime: DEFAULT_SESSION_TIME,
            timerOn: false
        };
        this.setIntervalTime = this.setIntervalTime.bind(this);
        this.playPause = this.playPause.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.switchInterval = this.switchInterval.bind(this);
        this.updateCount = this.updateCount.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.countdown = this.countdown.bind(this);
    }

    componentWillUnmount () {
        clearInterval(this.tick);
    }

    setIntervalTime (event) {
        const { interval } = this.state;
        const eventInfo = event.target.id.split("-");
        const name = `${eventInfo[0]}Time`;
        const intervalTime = this.state[name];
        let newTime;
        if (eventInfo[1] === "increment" && intervalTime < 3600) {
            newTime = intervalTime + 60;
            this.setState({ [name]: newTime });
        }
        if (eventInfo[1] === "decrement" && intervalTime > 60) {
            newTime = intervalTime - 60;
            this.setState({ [name]: newTime });
        }
        if (eventInfo[0] === interval.toLowerCase() && newTime) {
            this.setState({ timerTime: newTime });
        }
    }

    resetTimer () {
        this.audio.currentTime = 0;
        this.audio.pause();
        this.stopTimer();
        this.setState({
            breakTime: DEFAULT_BREAK_TIME,
            sessionTime: DEFAULT_SESSION_TIME,
            timerTime: DEFAULT_SESSION_TIME,
            interval: "Session",
            count: 0
        });
    }

    playPause () {
        if (this.state.timerOn) this.stopTimer();
        else this.countdown();
    }

    stopTimer = () => {
        this.setState({ timerOn: false });
        clearInterval(this.tick);
    }

    switchInterval () {
        if (this.state.interval === "Session") {
            let newBreakTime = (this.state.count === 4) ?
                1800 : this.state.breakTime;
            this.setState({
                interval: "Break",
                timerTime: newBreakTime
            });
        } else {
            this.setState({
                interval: "Session",
                timerTime: this.state.sessionTime
            });
        }
    }

    updateCount () {
        const { interval } = this.state;
        let newCount = this.state.count + 1;
        if (interval === "Break" && newCount > 4) {
            this.setState({
                count: 0
            });
        }
        if (interval === "Session") {
            this.setState({
                count: newCount
            });
        }
    }

    countdown = () => {
        this.setState({
            timerOn: true,
            timerTime: this.state.timerTime,
            timerStart: this.state.timerTime
        });
        this.tick = setInterval(() => {
            let newTime = this.state.timerTime - 1;
            if (newTime === 0) {
                this.audio.play();
                this.updateCount();
            }
            if (newTime >= 0) {
                return this.setState({ timerTime: newTime });
            }
            this.switchInterval();
        }, 1000);
    };

    render () {
        const { breakTime, sessionTime, interval, count, timerTime } = this.state;
        let minutesView = (Math.floor(timerTime / 60)) >= 10 ?
            Math.floor(timerTime / 60) :
            `0${Math.floor(timerTime / 60)}`;
        let secondsView = ((timerTime % 60) >= 10) ?
            timerTime % 60 : `0${timerTime % 60}`;
        let countdownView = `${minutesView ||
            "00"}:${secondsView || "00"}`;

        return (
            <div id="clock">
                <h1>Pomodoro Clock</h1>
                <Timer
                    name="break"
                    title="Break Length"
                    interval={breakTime / 60}
                    setIntervalTime={this.setIntervalTime}
                />
                <Timer
                    name="session"
                    title="Session Length"
                    interval={sessionTime / 60}
                    setIntervalTime={this.setIntervalTime}
                />
                <CountAndTimeDisplay
                    currentInterval={interval}
                    count={count}
                    time={countdownView}
                />
                <audio
                    src={soundfile}
                    id="beep"
                    ref={(x) => { this.audio = x; }}
                />
                <Controls
                    playPauseClick={this.playPause}
                    resetClick={this.resetTimer}
                />
            </div>
        );
    }
}

const SetTimeButton = ({ id, onClick, text }) => (
    <button
        id={id}
        type="button"
        onClick={onClick}
    >
        {text}
    </button>
);

SetTimeButton.propTypes = {
    id: PropTypes.string,
    onClick: PropTypes.func,
    text: PropTypes.string
};

const Timer = ({ name, title, interval, setIntervalTime }) => (
    <div className="interaction">
        <div className="timer" id={`${name}-label`}>
            <h2>{title}</h2>
            <div id={`${name}-length`}> {interval} </div>
            <SetTimeButton
                id={`${name}-decrement`}
                text="-"
                onClick={setIntervalTime}
            />
            <SetTimeButton
                id={`${name}-increment`}
                text="+"
                onClick={setIntervalTime}
            />
        </div>
    </div>
);

Timer.propTypes = {
    name: PropTypes.string,
    title: PropTypes.string,
    interval: PropTypes.number,
    setIntervalTime: PropTypes.func
};

const CountAndTimeDisplay = ({ currentInterval, count, time }) => (
    <div id="count-time-display">
        <h2
            id="timer-label"
        >
            {currentInterval}
        </h2>
        <h4 id="counter">
            {count}
        </h4>
        <h3 id="time-left">
            {time}
        </h3>
    </div>
);

CountAndTimeDisplay.propTypes = {
    currentInterval: PropTypes.string,
    count: PropTypes.number,
    time: PropTypes.string
};

const Controls = ({ playPauseClick, resetClick }) => (
    <div>
        <button
            id="start_stop"
            onClick={playPauseClick}
        >
            <i className="fa fa-play" aria-hidden="true"/>
            <i className="fa fa-pause" aria-hidden="true"/>
        </button>
        <button
            id="reset"
            onClick={resetClick}
        >
            <i className="fa fa-refresh" aria-hidden="true"/>
        </button>
    </div>
);

Controls.propTypes = {
    playPauseClick: PropTypes.func,
    resetClick: PropTypes.func
};

ReactDOM.render(<App />, document.getElementById('root'));
