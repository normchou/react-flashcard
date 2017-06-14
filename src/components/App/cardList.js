import React from 'react';
import { map } from 'lodash';
import { Card, Button } from 'react-materialize';

export default (props) => {
  return (
    <div className="container" style={{paddingTop: '27px'}}>
      {
        map(props.cards, (card, i) => {
          return (
            <Card key={i}
                title={card.question}
                reveal={<p>{card.answer}</p>}
                actions={[<Button floating key={i} waves='light' icon='delete'
                            onClick={props.onRemoveCard.bind(this, card.id)}
                            className='red'/>]}>
            </Card>
          )
        })
      }
    </div>
  )
}