import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import '@fortawesome/fontawesome-free/js/solid';
import './style.css';

class App extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            breakTime: 5,
            sessionTime: 25,
            currentInterval: "session",
            currentCount: "0",
            timeLeft: "25:00"
        };

        this.setIntervalTime = this.setIntervalTime.bind(this);
    }

    setIntervalTime (event) {
        const eventInfo = event.target.id.split("-");
        const name = `${eventInfo[0]}Time`;
        const prevState = this.state[name];

        return (eventInfo[1] === "increment") ?
            this.setState({ [name]: prevState + 1 }) :
            this.setState({ [name]: prevState - 1 });

        console.log(prevState);
    }

    render () {
        const { breakTime, sessionTime, currentInterval, currentCount, timeLeft } = this.state;
        return (
            <PomodoroClock
                interval1={breakTime}
                interval2={sessionTime}
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

const Timer = ({ name, interval, onClick }) => (
    <div className="interaction">
        <div className="timer" id={`${name}-label`}>
            <h2>{name.toUpperCase()}</h2>
            <div id={`${name}-length`}> {interval} </div>
            <SetTimeButton
                id={`${name}-decrement`}
                text="<"
                onClick={onClick}
            />
            <SetTimeButton
                id={`${name}-increment`}
                text=">"
                onClick={onClick}
            />
        </div>
    </div>
);

Timer.propTypes = {
    name: PropTypes.string,
    interval: PropTypes.number,
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


const PomodoroClock = ({ interval1, interval2, intervalClick, intervalName, count, time }) => (
    <div id="clock">
        <h1>Pomodoro Clock</h1>
        <Timer
            name="break"
            interval={interval1}
            onClick={(event) => intervalClick(event)}
        />
        <Timer
            name="session"
            interval={interval2}
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
    interval1: PropTypes.number,
    interval2: PropTypes.number,
    intervalClick: PropTypes.func,
    intervalName: PropTypes.string,
    count: PropTypes.string,
    time: PropTypes.string
};

ReactDOM.render(<App />, document.getElementById('root'));
