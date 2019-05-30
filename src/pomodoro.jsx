import React from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
import '@fortawesome/fontawesome-free/js/solid';
import './style.css';

const INTERVALS = [
    { name: "break", defaultTime: "5" },
    { name: "session", defaultTime: "25" }
];


class App extends React.Component {
    render () {
        return (
            <PomodoroClock />
        );
    }
}

const SetTimeButton = ({ id, text }) => (
    <button
        id={id}
        type="button"
    >
        {text}
    </button>
);

const Timers = ({ intervals }) => (
    <div className="interaction">
        {intervals.map(interval => (
            <div className="timer" id={`${interval.name}-label`}>
                <h2>{interval.name.toUpperCase()}</h2>
                <SetTimeButton
                    id={`${interval.name}-decrement`}
                    text="<"
                />
                <div id={`${interval.name}-length`}> {interval.defaultTime} </div>
                <SetTimeButton
                    id={`${interval.name}-increment`}
                    text=">"
                />
            </div>
        ))}
    </div>
);

const MainDisplay = ({ intervalName, count, time }) => (
    <div mainDisplay>
        <h2
            id="timer-label"
        >
            {intervalName}
        </h2>
        <h4 id="counter">
            {count}
        </h4>
        <h3 id="time-left">
            {time}
        </h3>
    </div>
);

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

const PomodoroClock = ({ intervals, intervalName, count, time }) => (
    <div id="clock">
        <h1>Pomodoro Clock</h1>
        <Timers
            intervals={INTERVALS}
        />
        <MainDisplay
            intervalName="Session"
            count="0"
            time="25:00"
        />
        <Controls />
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
