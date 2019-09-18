import React from 'react';
import '../styles.css';

const MostUsed = (props) =>{
    const {mostUsed} = props;
    return (
        <div>
            {Array(Math.min(mostUsed.length,5)).fill("").map((_, i) => {
            return <div class = "mostUsed" key={i}>
                    {mostUsed[i].name}
                </div>
        })}
        </div>
    )

}

export default MostUsed;