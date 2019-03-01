import React from 'react';

const Timer = ({ minutes, seconds, sessionType }) => {
    const timeLeft = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return (
        <div>
            <div id='timer-label'>{ sessionType }</div>
            <div id='time-left'>{ timeLeft }</div>
        </div>
    )
}

export default Timer;