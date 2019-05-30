import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import '@fortawesome/fontawesome-free/js/solid';
import './style.css';

// const INTERVALS = [
//     { name: "break", defaultTime: "5" },
//     { name: "session", defaultTime: "25" }
// ];

class App extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            intervals: [{
                name: "break",
                time: "5"
            },
            {
                name: "session",
                time: "25"
            }],
            currentInterval: "session",
            currentCount: "0",
            timeLeft: "25:00"
        };

        this.setIntervalTime = this.setIntervalTime.bind(this);
    }

    setIntervalTime (event) {
        const intervalName = event.target.id.split("-")[0];
        console.log(intervalName);
    }

    render () {
        const { intervals, currentInterval, currentCount, timeLeft } = this.state;
        return (
            <PomodoroClock
                intervals={intervals}
                intervalClick={this.setIntervalTime}
                intervalName={currentInterval.toUpperCase()}
                count={currentCount}
                time={timeLeft}
            />
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

const Timers = ({ intervals, onClick }) => (
    <div className="interaction">
        {intervals.map(interval => (
            <div key={interval.name} className="timer" id={`${interval.name}-label`}>
                <h2>{interval.name.toUpperCase()}</h2>
                <div id={`${interval.name}-length`}> {interval.time} </div>
                <SetTimeButton
                    id={`${interval.name}-decrement`}
                    text="<"
                    onClick={onClick}
                />
                <SetTimeButton
                    id={`${interval.name}-increment`}
                    text=">"
                    onClick={onClick}
                />
            </div>
        ))}
    </div>
);

Timers.propTypes = {
    intervals: PropTypes.array,
    onClick: PropTypes.func
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

const Controls = () => (
    <div>
        <button
            id="start_stop"
        >
            <i className="fa fa-play" aria-hidden="true"/>
            <i className="fa fa-pause" aria-hidden="true"/>
        </button>
        <button
            id="reset"
        >
            <i className="fa fa-refresh" aria-hidden="true"/>
        </button>
    </div>
);


const PomodoroClock = ({ intervals, intervalClick, intervalName, count, time }) => (
    <div id="clock">
        <h1>Pomodoro Clock</h1>
        <Timers
            intervals={intervals}
            onClick={(event) => intervalClick(event)}
        />
        <CountAndTimeDisplay
            currentInterval={intervalName}
            count={count}
            time={time}
        />
        <Controls />
    </div>
);

PomodoroClock.propTypes = {
    intervals: PropTypes.array,
    intervalClick: PropTypes.func,
    intervalName: PropTypes.string,
    count: PropTypes.string,
    time: PropTypes.string
};

ReactDOM.render(<App />, document.getElementById('root'));
