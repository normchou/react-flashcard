import React from 'react';
import { Icon } from 'react-materialize';

const container = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}

const cardContainer = {
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  width: '90%',
  height: 400,
  position: 'relative',
  backgroundColor: '#F7FFF7',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20
}

export default function CardList(props) {
  const { currentCard, totalCards, cards, showQuestion, toggleQuestion, onRemoveCard } = props;
  const { question, answer } = cards;
  let text = showQuestion ? 
    (<p style={{fontSize: 20, textAlign: 'center', color: '#251351'}}>{question}</p>) : 
    (<p style={{fontSize: 20, textAlign: 'center', color: '#40798C'}}>{answer}</p>);

  return (
    <div style={container}>
      <div style={cardContainer}>
        <div style={{position: 'absolute', top: 10, left: 10}}>
          <p style={{margin: 0}}>{currentCard} / {totalCards}</p>
        </div>
        <div
          onClick={toggleQuestion}
          style={{position: 'absolute', top: 10, right: 10, cursor: 'pointer'}}>
          <Icon>replay</Icon>
        </div>
        <div style={{ overflow: 'scroll'}}>
          {text}
        </div>
        <div
          onClick={onRemoveCard.bind(this, cards.id)}
          style={{position: 'absolute', bottom: 10, right: 10, cursor: 'pointer'}}>
          <Icon>clear</Icon>
        </div>
      </div>
    </div>
  )
}