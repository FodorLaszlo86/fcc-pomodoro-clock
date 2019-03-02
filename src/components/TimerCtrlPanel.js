import React from 'react';

const TimerCtrlPanel = ({ timerCtrl, reset, paused }) => {
    
    return (
        <div>
             <button id='start_stop' onClick={ timerCtrl }>
                {paused ? <i className="material-icons">play_arrow</i> : <i className="material-icons">pause</i> }
            </button>
            <button id='reset' onClick={ reset } >
                <i className="material-icons">repeat</i>
            </button>
        </div>
    )
}

export default TimerCtrlPanel;