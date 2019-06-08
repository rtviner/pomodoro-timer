import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import '@fortawesome/fontawesome-free/js/solid';
import './style.css';

const DEFAULT_BREAK_TIME = 300;
const DEFAULT_SESSION_TIME = 1500;
const DEFAULT_TIME = 1500;

class App extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            breakTime: DEFAULT_BREAK_TIME,
            sessionTime: DEFAULT_SESSION_TIME,
            currentInterval: "Session",
            currentCount: 0,
            timerStart: 0,
            timerTime: DEFAULT_TIME,
            timerOn: false
        };
        this.setIntervalTime = this.setIntervalTime.bind(this);
        this.playPause = this.playPause.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.clock = this.clock.bind(this);
    }

    componentWillUnmount () {
        clearInterval(this.tick);
    }

    setIntervalTime (event) {
        const eventInfo = event.target.id.split("-");
        const name = `${eventInfo[0]}Time`;
        const intervalTime = this.state[name];

        if (eventInfo[1] === "increment" && intervalTime < 60) {
            this.setState({ [name]: intervalTime + 1 });
        }
        if (eventInfo[1] === "decrement" && intervalTime > 1) {
            this.setState({ [name]: intervalTime - 1 });
        }
    }

    resetTimer () {
        this.setState({ breakTime: DEFAULT_BREAK_TIME });
        this.setState({ sessionTime: DEFAULT_SESSION_TIME });
        const resetTime = (this.state.timerStart > 0) ? this.state.timerStart : DEFAULT_TIME;
        this.setState({ timerTime: resetTime });
    }

    playPause () {
        const { timerOn } = this.state;

        if (timerOn) {
            this.stopTimer();
        } else {
            this.clock();
        }
    }

    stopTimer = () => {
        this.setState({ timerOn: false });
        clearInterval(this.tick);
    }

    clock = () => {
        this.setState({
            timerOn: true,
            timerTime: this.state.timerTime,
            timerStart: this.state.timerTime
        });

        this.tick = setInterval(() => {
            const newTime = this.state.timerTime - 1;
            console.log(newTime);
            if (newTime >= 0) {
                return this.setState({ timerTime: newTime });
            }
            clearInterval(this.tick);
            this.setState({ timerOn: false });
        }, 1000);
    };

    render () {
        const { breakTime, sessionTime, currentInterval, currentCount, timerTime } = this.state;

        let secondsView = ((timerTime % 60) >= 10) ?
            timerTime % 60 : `0${timerTime % 60}`;
        let countdownView = `${Math.floor(timerTime / 60) ||
            "00"}:${secondsView || "00"}`;

        return (
            <div id="clock">
                <h1>Pomodoro Clock</h1>
                <Timer
                    name="break"
                    interval={breakTime / 60}
                    setIntervalTime={this.setIntervalTime}
                />
                <Timer
                    name="session"
                    interval={sessionTime / 60}
                    setIntervalTime={this.setIntervalTime}
                />
                <CountAndTimeDisplay
                    currentInterval={currentInterval}
                    count={currentCount}
                    time={countdownView}
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
