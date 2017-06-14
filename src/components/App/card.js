import React, { Component } from 'react';
import CardList from './cardList';
import { getDeckById } from '../../reducers'
import { connect } from 'react-redux';
import { createCardItem, removeCardItem } from '../../actions';
import { Button, Icon, Row, Modal } from 'react-materialize';

class ShowCards extends Component {
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
		);

		refQuestion.value = '';
		refAnswer.value = '';
	}

	onCardRemove = (cardId) => {
		this.props.removeCardItem(this.props.deck.id, cardId);
	}

	onHomeClick = () => {
		this.props.router.push('/');
	}

	renderCardNav() {
		return (
			<div className="navbar-fixed">
			    <nav className="nav-extended">
			    	<div className="nav-wrapper">
			        	<div style={{paddingLeft: '18px', cursor: 'pointer'}} className="left" onClick={this.onHomeClick}>
			        		<i className="material-icons">home</i>	
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
					<Button waves='light'>Add New<Icon left>add</Icon></Button>
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

	render() {
		return (
			<div>
				{this.renderCardNav()}
				<div className="container">
					{this.renderModal()}
				</div>
				<CardList cards={this.props.deck.cards} onRemoveCard={this.onCardRemove} />
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