import React from 'react';

const Timer = ({ minutes, seconds, sessionType }) => {
    return (
        <div>
            <div>{ sessionType }</div>
            <div>{ minutes.toString().padStart(2, '0') } : { seconds.toString().padStart(2, '0') }</div>
        </div>
    )
}

export default Timer;