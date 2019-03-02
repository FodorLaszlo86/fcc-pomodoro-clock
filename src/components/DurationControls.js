import React from 'react';

const DurationControls = ({ sessionDuration, breakDuration, incrementTime, decrementTime }) => {
    return (
        <div id='duration-controls'>
            <div className='set-timer'>
                <h3 id='session-label'>Session Length</h3>
                <div className='set-timer-body'>
                    <div id='session-decrement' onClick={ decrementTime }>&#8722;</div>
                    <div id='session-length'>{ sessionDuration }</div>
                    <div id='session-increment' onClick={ incrementTime }>&#43;</div>
                </div>
            </div>
            <div className='set-timer'>
                <h3 id='break-label'>Break Length</h3>
                <div className='set-timer-body'>
                    <div id='break-decrement' onClick={ decrementTime }>&#8722;</div>
                    <div id='break-length'>{ breakDuration }</div>
                    <div id='break-increment' onClick={ incrementTime }>&#43;</div>
                </div>
            </div>
        </div>
    )
}

export default DurationControls;