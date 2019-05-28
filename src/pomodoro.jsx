import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    render () {
        return (
			<PomodoroClock />
        );
    }
}

const Control = ({  }) => (
	<button>

	<button/>
)

const MainDisplay = ({  }) => (
	<div mainDisplay>
		<h2 label />
		<h3 counter /> //only if sessions not for break (1, 2, 3, 4)
		<div countdown />
	</div>
)

const SetTimeButton = ({ id, text }) => (
	<button 
		onClick={onClick}
		className={className}
		id={id}
		type="button"
	>
		{text}
	<button/>
)

const Timers = ({ intervals, time }) => (
	{intervals.map(interval => (
		<div class="timer" id={`${interval}-label`}>
			<h2>{`${interval.toUpperCase()} Length`}</h2>
			<SetTimeButton
				id={`${interval}-decrement`}
				text="<"
			/>
			<div id={`${interval}-length`}> {time} <div/>
			<SetTimeButton 
				id={`${interval}-increment`}
				text=">"
			/>
		<div/>
	)
	)}
);

const PomodoroClock = ({ intervals, time }) => (
	<h1>Pomodoro Clock</h1>
	<div class="interaction">
		<Timers data={timerData}/>
	</div>
		<MainDisplay 
		/>
	<div class="interaction">
		<Control 
		/>
		<Control 
		/>
	</div>
);

const INTERVALS = ["break", "session"]; 


ReactDOM.render(<App />, document.getElementById('root'));
