import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import '@fortawesome/fontawesome-free/js/solid';
import './style.css';

const DEFAULT_BREAK_TIME = 5;
const DEFAULT_SESSION_TIME = 25;
const DEFAULT_TIME = "25:00";

// function soundAlarm () {
//     console.log("alarm!");
// }

class App extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            breakTime: DEFAULT_BREAK_TIME,
            sessionTime: DEFAULT_SESSION_TIME,
            currentInterval: "Session",
            currentCount: "0",
            currentTime: DEFAULT_TIME,
            timerOn: false
        };


        this.setIntervalTime = this.setIntervalTime.bind(this);
        this.reset = this.reset.bind(this);
        this.playPause = this.playPause.bind(this);
        this.countdown = this.countdown.bind(this);
        this.tick = this.tick.bind(this);
    }

    componentDidMount () {
        this.tick;
    }

    componentWillUnmount () {
        clearTimeout(this.tick);
    }

    setIntervalTime (event) {
        const eventInfo = event.target.id.split("-");
        const name = `${eventInfo[0]}Time`;
        const prevState = this.state[name];

        if (eventInfo[1] === "increment" && prevState < 60) {
            this.setState({ [name]: prevState + 1 });
        }
        if (eventInfo[1] === "decrement" && prevState > 1) {
            this.setState({ [name]: prevState - 1 });
        }
    }

    reset () {
        this.setState({ breakTime: DEFAULT_BREAK_TIME });
        this.setState({ sessionTime: DEFAULT_SESSION_TIME });
        this.setState({ currentTime: DEFAULT_TIME });
    }

    playPause () {
        this.setState({ timerOn: !this.state.timerOn });
        const timerOn = this.state.timerOn;
        console.log(timerOn);
        const currentInterval = this.state.currentInterval;
        // const timer = this.timer;
        if (!timerOn) {
            const minutes = (currentInterval === "Session") ?
                this.state.sessionTime :
                this.state.intervalTime;
            this.countdown(minutes, 0);
        } else {
            clearTimeout(this.tick);
        }
    }

    tick = (minutes, seconds) => {
        setTimeout(() => {
            let secondsView = ((seconds % 60) >= 10) ? seconds % 60 : `0${seconds % 60}`;
            let countdownView = `${Math.floor(seconds / 60) || "00"}:${secondsView || "00"}`;
            this.setState({ currentTime: countdownView });
        }, 1000 * (minutes * 60 - seconds));
    }

    countdown (min, sec) {
        for (let seconds = (min * 60 + sec); seconds >= 0; seconds--) {
            this.tick(min, seconds);
        }
    }

    render () {
        const { breakTime, sessionTime, currentInterval, currentCount, currentTime } = this.state;
        return (
            <div id="clock">
                <h1>Pomodoro Clock</h1>
                <Timer
                    name="break"
                    interval={breakTime}
                    setIntervalTime={this.setIntervalTime}

                />
                <Timer
                    name="session"
                    interval={sessionTime}
                    setIntervalTime={this.setIntervalTime}
                />
                <CountAndTimeDisplay
                    currentInterval={currentInterval}
                    count={currentCount}
                    time={currentTime}
                />
                <Controls
                    playPauseClick={this.playPause}
                    resetClick={this.reset}
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

const Timer = ({ name, interval, setIntervalTime }) => (
    <div className="interaction">
        <div className="timer" id={`${name}-label`}>
            <h2>{name.toUpperCase()}</h2>
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
    count: PropTypes.string,
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
