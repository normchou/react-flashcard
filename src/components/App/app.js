import React, { Component } from 'react';
import DeckList from './deckList';
import { connect } from 'react-redux';
import { loadDecks, createDeck, loadSpecificDeck, removeSpecificDeck } from '../../actions';
import { Button, Icon, Row, Modal } from 'react-materialize';

class App extends Component {
	componentDidMount() {
		this.props.loadDecks();
	}

	onSubmit = (e) => {
		e.preventDefault();

		let ref = this.refs['deck-name'];
		let deckName = ref.value;
		this.props.createDeck(deckName);
		ref.value = '';
	}

	onDeckClick = (deckId) => {
		this.props.loadSpecificDeck(deckId);
	}

	onDeckRemove = (deckId) => {
		this.props.removeSpecificDeck(deckId);
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
							<input type="text" id="deck_name" ref="deck-name" />
							<label htmlFor="deck_name">Deck Name</label>
						</div>
						<div className="col s12">
							<Button modal="close" waves="light">Add new deck</Button>
						</div>
					</form>
				</Row>
			</Modal>
		)
	}

	render() {
		return (
			<div>
				<div className="navbar-fixed">
				    <nav className="nav-extended">
				    	<div className="nav-wrapper">
				        	<span className="brand-logo center">Flashcards</span>
				      	</div>
				    </nav>
			  	</div>
			  	<div className="container">
					{this.renderModal()}
				</div>
				<DeckList
					decks={this.props.decks}
					onClick={this.onDeckClick}
					onRemove={this.onDeckRemove} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		decks: state.flashcard.decks
	}
};

export default connect(mapStateToProps, { loadDecks, createDeck, loadSpecificDeck, removeSpecificDeck })(App);
