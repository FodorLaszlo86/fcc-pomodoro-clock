import React from 'react';

const DurationControls = ({ sessionDuration, breakDuration, incrementTime, decrementTime }) => {
    return (
        <div>
            <div>
                <h3>Session Length</h3>
                <div>
                    <div id='decrement-session' onClick={ decrementTime }>&#8722;</div>
                    <div>{ sessionDuration }</div>
                    <div id='increment-session' onClick={ incrementTime }>&#43;</div>
                </div>
            </div>
            <div>
                <h3>Break Length</h3>
                <div>
                    <div id='decrement-break' onClick={ decrementTime }>&#8722;</div>
                    <div>{ breakDuration }</div>
                    <div id='increment-break' onClick={ incrementTime }>&#43;</div>
                </div>
            </div>
        </div>
    )
}

export default DurationControls;