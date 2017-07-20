import React from 'react';
import { map } from 'lodash';
import { Card, Button, Icon } from 'react-materialize';

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

export default class CardList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showQuestion: true
    }

    this.toggleQuestion = this.toggleQuestion.bind(this);
  }

  toggleQuestion() {
    this.setState({
      showQuestion: !this.state.showQuestion
    })
  }

  render() {
    const { currentCard, totalCards } = this.props;
    const { question, answer } = this.props.cards;
    let text = this.state.showQuestion ? question : answer;

    return (
      <div style={container}>
        <div style={cardContainer}>
          <div style={{position: 'absolute', top: 10, left: 10}}>
            <p style={{margin: 0}}>{currentCard} / {totalCards}</p>
          </div>
          <div
            onClick={this.toggleQuestion}
            style={{position: 'absolute', top: 10, right: 10, cursor: 'pointer'}}>
            <Icon>replay</Icon>
          </div>
          <div>
            <p style={{fontSize: 30, textAlign: 'center'}}>{text}</p>
          </div>
        </div>
      </div>
    )
  }
}