import * as React from 'react';
import { ICardImageProps } from './ICardImage';
import './Cards.scss';

export const CardImage = ({src, className}:ICardImageProps): React.ReactElement => 
    <img src={src} className={className} />

