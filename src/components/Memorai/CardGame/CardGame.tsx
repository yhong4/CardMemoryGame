import * as React from 'react';
import {useState, useEffect} from 'react';
import uuid from 'uuid';
// import { CardImage } from './CardImage';
import { Cards } from '../Cards/Cards';
import { ICardType } from './ICardGame';
import cardUrls from '../Porkers';



function shuffleArray<T>(array:T[]):T[] {
    return array.sort(() => Math.random() - .5 );
}

function generateCards(count:number):ICardType[] {
    const cards = shuffleArray<string>(cardUrls)
        .slice(0, count/2)
        .map(url => ({
            id: uuid.v4(),
            imageUrl: "/static/images/cards/" + url,
            isFlipped: false,
            canFlip: true
        }))
    .flatMap(e => [e, {...e, id: uuid.v4()}]);
    
    return shuffleArray<ICardType>(cards);
}

export default function CardGame(totalCard:number):React.ReactElement {
    const [cards, setCards] = useState<ICardType[]>(generateCards(totalCard));
    const [canFlip, setCanFlip] = useState<boolean>(false);
    const [firstCard, setFirstCard] = useState<ICardType | null>(null);
    const [secondCard, setSecondCard] = useState<ICardType | null>(null);

    function setCardIsFlipped(cardId:string, isFlipped:boolean):void {
        if(cardId){
            setCards(prev => prev.map(c => {
                if(c.id !== cardId){
                    return c;
                }
                return {...c, isFlipped}
            }))
        }
    }

    function setCardCanFlip(cardId:string, canFlip:boolean):void {
        if(cardId){
            setCards(prev => prev.map(c => {
                if(c.id !== cardId){
                    return c;
                }
                return {...c, canFlip}
            }))
        }
    }

    useEffect(() => {
        setTimeout(() => {
            let index = 0;
            for (const card of cards) {
                setTimeout(() => setCardIsFlipped(card.id, true), index++ * 500)
            }
            setTimeout(() => setCanFlip(true), cards.length * 100);
        }, 10000);
    }, []);

    function resetFirstAndSecondCards():void {
        setFirstCard(null);
        setSecondCard(null);
    }

    function onSuccessGuess():void {
        const firstCardId:string = firstCard!.id;
        const secondCardId:string = secondCard!.id;

        setCardCanFlip(firstCardId, false);
        setCardCanFlip(secondCardId, false);
        setCardIsFlipped(firstCardId, false);
        setCardIsFlipped(secondCardId, false);
        resetFirstAndSecondCards();
    }

    function onFailureGuess():void {
        const firstCardId:string = firstCard!.id;
        const secondCardId:string = secondCard!.id;

        setTimeout(() => {
            setCardIsFlipped(firstCardId, true);
        }, 1000);
        setTimeout(() => {
            setCardIsFlipped(secondCardId, true);
        }, 1200);

        resetFirstAndSecondCards();
    }

    useEffect(() => {
        if(!firstCard || !secondCard) {
            return
        };
        (firstCard.imageUrl === secondCard.imageUrl) ? onSuccessGuess() : onFailureGuess()
    }, [firstCard, secondCard]);

    function onCardClick(card:ICardType):void {
        if(!canFlip) {
            return
        };
        if(!card.canFlip) {
            return
        };
        if((firstCard && (card.id === firstCard.id) || (secondCard && (card.id === secondCard.id)))){
            return
        };
        
        setCardIsFlipped(card.id, false);

        (firstCard) ? setSecondCard(card):setFirstCard(card);
    }

    return (
        <div className="game container-md">
            <div className="cards-container">
                {cards.map(card => <Cards onClick={() => onCardClick(card)} key={card.id} {...card} />)}
            </div>
        </div>
    );
}