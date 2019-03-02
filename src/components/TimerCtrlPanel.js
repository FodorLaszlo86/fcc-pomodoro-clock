import React from 'react';


const TimerCtrlPanel = ({ timerCtrl, reset, paused }) => {
    
    return (
        <div id='clock-controls'>
             <button id='start_stop' className='clock-controls-btn' onClick={ timerCtrl }>
                { 
                    paused ? 
                        <i className="material-icons">play_arrow</i> 
                        : 
                        <i className="material-icons">pause</i> 
                } 
            </button>
            <button id='reset' className='clock-controls-btn' onClick={ reset } >
                <i className="material-icons">repeat</i>
            </button>
        </div>
    )
}

export default TimerCtrlPanel;