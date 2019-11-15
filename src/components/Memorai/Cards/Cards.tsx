import * as React from 'react';
import { CardImage } from '../CardImage';

import { ICardProps } from './ICards';

export const Cards = ({imageUrl, isFlipped, onClick}:ICardProps): React.ReactElement => {
    return (
        <div className="card-container" onClick={onClick}> 
            <div className={"card" + ( isFlipped ? "flip" : "")}>
                <CardImage className="side front" src={imageUrl}/>
                <div className="side back" />
            </div>
        </div>
    )
}