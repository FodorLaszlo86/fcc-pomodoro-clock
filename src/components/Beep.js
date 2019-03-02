import React from 'react';

const Beep = () => {
    return (
        <audio
            src='https://goo.gl/65cBl1'
            type='audio/mpeg'
            id='beep' 
            className='beep' 
            muted={ false }
            autoPlay={ false }
            loop={ false } 
        />
    )
}

export default Beep;