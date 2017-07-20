import React, { Component } from 'react';
import { isUndefined } from 'lodash';
import CardList from './cardList';
import { getDeckById } from '../../reducers'
import { connect } from 'react-redux';
import { createCardItem, removeCardItem } from '../../actions';
import { Button, Icon, Row, Modal } from 'react-materialize';

const backgroundColor = '#031A6B'

class ShowCards extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentCard: 0,
			showQuestion: true
		}

		this.mayRenderCardList = this.mayRenderCardList.bind(this);
		this.updateCard = this.updateCard.bind(this);
		this.toggleQuestion = this.toggleQuestion.bind(this);
	}

	onSubmit = (e) => {
		e.preventDefault();

		let refQuestion = this.refs['card-question'];
		let cardQuestion = refQuestion.value;
		let refAnswer = this.refs['card-answer'];
		let cardAnswer = refAnswer.value;
		
		this.props.createCardItem(
			this.props.params.id,
			cardQuestion,
			cardAnswer
		)

		if (this.state.currentCard < 0) {
			this.setState({
				currentCard: 0
			});
		}

		refQuestion.value = '';
		refAnswer.value = '';
	}

	onCardRemove = (cardId) => {
		this.props.removeCardItem(this.props.deck.id, cardId);

		if (this.state.currentCard > 0) {
			this.setState({
				currentCard: this.state.currentCard - 1
			})
		}
	}

	onHomeClick = () => {
		this.props.router.push('/');
	}

	renderCardNav() {
		return (
			<div className="navbar-fixed">
			    <nav className="nav-extended" style={{backgroundColor: backgroundColor}}>
			    	<div className="nav-wrapper">
			        	<div style={{paddingLeft: '18px', cursor: 'pointer'}} className="left" onClick={this.onHomeClick}>
			        		<Icon large>keyboard_arrow_left</Icon>	
			        	</div>
			        	<span className="brand-logo center">{this.props.deck.name}</span>
			      	</div>
			    </nav>
		  	</div>
		);
	}

	renderModal() {
		return (
			<Modal
				header=""
				bottomSheet
				trigger={
					<Button
						style={{backgroundColor: backgroundColor}}
						floating waves='light'><Icon>add</Icon></Button>
				}>
				<Row>
					<form onSubmit={this.onSubmit}>
						<div className="input-field col s12">
							<input type="text" id="question" ref="card-question" />
							<label htmlFor="question">Question</label>
						</div>
						<div className="input-field col s12">
							<input type="text" id="answer" ref="card-answer" />
							<label htmlFor="answer">Answer</label>
						</div>
						<div className="col s12">
							<Button modal="close" waves="light">Add new card</Button>
						</div>
					</form>
				</Row>
			</Modal>
		)
	}

	updateCard() {
		const totalCard = this.props.deck.cards.length;
		const currentCard = this.state.currentCard;
		let nextCard = currentCard + 1

		if (nextCard === totalCard) nextCard = 0;

		this.setState({
			currentCard: nextCard,
			showQuestion: true
		});
	}

	toggleQuestion() {
    this.setState({
      showQuestion: !this.state.showQuestion
    })
  }

	mayRenderCardList() {
		const { cards } = this.props.deck;
		const { currentCard, showQuestion } = this.state;

		if (isUndefined(cards)) {
			return null;
		}

		const currentCardCount = currentCard + 1;
		const totalCards = cards.length;

		return (
			<div>
				<CardList
					showQuestion={showQuestion}
					toggleQuestion={this.toggleQuestion}
					currentCard={currentCardCount}
					totalCards={totalCards}
					cards={cards[currentCard]}
					onRemoveCard={this.onCardRemove} />
				<Button
					large
					waves="light"
					style={{ marginTop: 30, marginLeft: '50%', transform: 'translateX(-48px)', backgroundColor: backgroundColor }}
					onClick={this.updateCard}>Next</Button>
			</div>
		)

	}

	render() {
		return (
			<div style={{position: 'relative', minHeight: '100vh'}}>
				{this.renderCardNav()}
				<div style={{marginTop: 30}}>
					{this.mayRenderCardList()}
				</div>
				<div style={{position: 'absolute', bottom: 20, right: 20}}>
					{this.renderModal()}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		deck: getDeckById(state.flashcard, props.params.id)
	}
};

export default connect(mapStateToProps, { createCardItem, removeCardItem })(ShowCards);