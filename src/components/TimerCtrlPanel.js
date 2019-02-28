import React from 'react';

const TimerCtrlPanel = ({ paused, pauseTimer, startTimer }) => {
    if(paused) {
        return (
            <div>
                 <button onClick={ startTimer }>
                    <i className="material-icons">play_arrow</i>
                </button>
                <button>
                    <i className="material-icons">repeat</i>
                </button>
            </div>
        )
    } else {
        return (
            <div>
                 <button onClick={ pauseTimer }>
                    <i className="material-icons">pause</i>
                </button>
                <button>
                    <i className="material-icons">repeat</i>
                </button>
            </div>
        )
    }
}

export default TimerCtrlPanel;