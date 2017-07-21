import React, { Component } from 'react';
import DeckList from './deckList';
import { connect } from 'react-redux';
import { loadDecks, createDeck, loadSpecificDeck, removeSpecificDeck } from '../../actions';
import { Button, Icon, Row, Modal } from 'react-materialize';

const cardContainer = {
	boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.19)',
	width: 210,
	height: 210,
	marginBottom: 18,
	position: 'relative',
	backgroundColor: '#F7FFF7',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	cursor: 'pointer'
}

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
					<div className="flashcard" style={cardContainer}><Icon medium>add</Icon></div>
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
				    <nav className="nav-extended" style={{backgroundColor: '#031A6B'}}>
				    	<div className="nav-wrapper">
				        	<span className="brand-logo center">Flashcards</span>
				      	</div>
				    </nav>
			  	</div>
			  	<div className="container">
				</div>
				<DeckList
					decks={this.props.decks}
					onClick={this.onDeckClick}
					onRemove={this.onDeckRemove}>
					{this.renderModal()}
				</DeckList>
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
