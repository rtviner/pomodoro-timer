import React from 'react';
import ReactDOM from 'react-dom';

const INTERVALS = ["break", "session"];

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
            <div className="timer" id={`${interval}-label`}>
                <h2>{`${interval.toUpperCase()} Length`}</h2>
                <SetTimeButton
                    id={`${interval}-decrement`}
                    text="<"
                />
                <div id={`${interval}-length`}> {time} </div>
                <SetTimeButton
                    id={`${interval}-increment`}
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
