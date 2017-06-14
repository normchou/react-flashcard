import { getDecksDB, addDeck, addCardItem, removeDeck, removeCard } from '../database/firebase';
import actionType from '../constants';
import { push } from 'react-router-redux';

export const loadDecks = () => {
	return dispatch => {
		dispatch({
			type: actionType.LOAD_DECKS_REQUEST
		});

		getDecksDB()
			.then(decks => {
				dispatch({
					type: actionType.LOAD_DECKS_SUCCESS,
					payload: decks.val()
				});
			})
			.catch(error => {
				dispatch({
					type: actionType.LOAD_DECKS_FAILED,
					payload: error
				});
			});
	}
};

export const createDeck = (name) => {
	return dispatch => {
		dispatch({
			type: actionType.ADD_DECK_REQUEST
		});

		addDeck(name)
			.then(res => {
				loadDecks()(dispatch);
				dispatch({
					type: actionType.ADD_DECK_SUCCESS
				});
			})
			.catch(error => {
				dispatch({
					type: actionType.ADD_DECK_FAILED,
					payload: error
				});
			});
	}
};

export const createCardItem = (deckId, question, answer) => {
	return dispatch => {
		dispatch({
			type: actionType.CREATE_CARD_REQUEST
		});

		addCardItem(deckId, question, answer)
			.then(res => {
				loadDecks()(dispatch);
				dispatch({
					type: actionType.CREATE_CARD_SUCCESS,
					payload: res
				});
			})
			.catch(error => {
				dispatch({
					type: actionType.CREATE_CARD_FAILED,
					payload: error
				});
			});
	}
};

export const removeSpecificDeck = (deckId) => {
	return dispatch => {
		dispatch({
			type: actionType.REMOVE_DECK_REQUEST
		});

		removeDeck(deckId)
			.then(res => {
				loadDecks()(dispatch);
				dispatch({
					type: actionType.REMOVE_DECK_SUCCESS
				})
			})
			.catch(error => {
				dispatch({
					type: actionType.REMOVE_DECK_FAILED,
					payload: error
				});
			});
	}
}

export const removeCardItem = (deckId, cardId) => {
	return dispatch => {
		dispatch({
			type: actionType.REMOVE_CARD_REQUEST
		});

		removeCard(deckId, cardId)
			.then(res => {
				loadDecks()(dispatch);
				dispatch({
					type: actionType.REMOVE_CARD_SUCCESS
				})
			})
			.catch(error => {
				dispatch({
					type: actionType.REMOVE_CARD_FAILED,
					payload: error
				});
			});
	}
}

export const loadSpecificDeck = (deckId) => {
	return dispatch => dispatch(push(`/${deckId}`));
};