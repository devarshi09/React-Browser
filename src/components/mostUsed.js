import React from 'react';
import '../styles.css';

const MostUsed = (props) =>{
    const {mostUsed} = props;

    return (
        <div>
            {Array(Math.min(mostUsed.length,5)).fill("").map((_, i) => {
                return <MostUsedListItem key={i} mostUsed={mostUsed}/>
            })}
        </div>
    )

}

export default MostUsed;

function MostUsedListItem({mostUsed}) {
    return <div class="mostUsed">
        {mostUsed.name}
    </div>;
}
