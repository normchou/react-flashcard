import React from 'react';
import { Icon } from 'react-materialize';
import { assign } from 'lodash';

const container = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}

let flipper = {
  transition: '0.6s',
  transformStyle: 'preserve-3d',
  position: 'relative'
}

const flipContainer = {
  perspective: 4000,
  width: '90%',
  height: 400
}

const sharedCardContainer = {
  width: '90%',
  height: 400,
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  backgroundColor: '#F7FFF7',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
  width: '100%',
  backfaceVisibility: 'hidden',
  position: 'absolute',
  top: 0,
  left: 0
}

let frontCardContainer = assign({}, sharedCardContainer, {
  zIndex: 2
})

let backCardContainer = assign({}, sharedCardContainer, {
  transform: 'rotateY(180deg)'
})

export default function CardList(props) {
  const { currentCard, totalCards, cards, showQuestion, toggleQuestion, onRemoveCard } = props;
  const { question, answer } = cards;
  flipper = showQuestion ? 
    assign({}, flipper, { transform: 'rotateY(0deg)' }) :
    assign({}, flipper, { transform: 'rotateY(180deg)' });

  return (
    <div style={container}>
      <div style={flipContainer}>
        <div style={flipper}>
          <div style={frontCardContainer}>
            <div style={{position: 'absolute', top: 10, left: 10}}>
              <p style={{margin: 0}}>{currentCard} / {totalCards}</p>
            </div>
            <div
              onClick={toggleQuestion}
              style={{position: 'absolute', top: 10, right: 10, cursor: 'pointer'}}>
              <Icon>replay</Icon>
            </div>
            <div style={{ overflow: 'scroll'}}>
              <p style={{fontSize: 20, textAlign: 'center', color: '#40798C'}}>{question}</p>
            </div>
            <div
              onClick={onRemoveCard.bind(this, cards.id)}
              style={{position: 'absolute', bottom: 10, right: 10, cursor: 'pointer'}}>
              <Icon>clear</Icon>
            </div>
          </div>
          <div style={backCardContainer}>
            <div style={{position: 'absolute', top: 10, left: 10}}>
              <p style={{margin: 0}}>{currentCard} / {totalCards}</p>
            </div>
            <div
              onClick={toggleQuestion}
              style={{position: 'absolute', top: 10, right: 10, cursor: 'pointer'}}>
              <Icon>replay</Icon>
            </div>
            <div style={{ overflow: 'scroll'}}>
              <p style={{fontSize: 20, textAlign: 'center', color: '#40798C'}}>{answer}</p>
            </div>
            <div
              onClick={onRemoveCard.bind(this, cards.id)}
              style={{position: 'absolute', bottom: 10, right: 10, cursor: 'pointer'}}>
              <Icon>clear</Icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}