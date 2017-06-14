import cardReducer from './cardReducer';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
	flashcard: cardReducer,
	routing: routerReducer
});

export const getDeckById = (state, deckId) => {
	return state.decks[deckId] || {};
};