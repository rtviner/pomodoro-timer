import React from 'react';
import ReactDOM from 'react-dom';

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

const Timers = ({ intervals, time }) => (
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

const PomodoroClock = ({ intervals, time }) => (
    <div id="clock">
        <h1>Pomodoro Clock</h1>
        <Timers intervals={INTERVALS} time={time}/>
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
