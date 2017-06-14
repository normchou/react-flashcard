import actionType from '../constants';
import { assign } from 'lodash';

let initialState = {
	decks: {}
};

export default (state=initialState, action) => {

	switch(action.type) {
		case actionType.LOAD_DECKS_SUCCESS:
			state = assign({}, state, { decks: action.payload });
			return state;

		default:
			return state;
	}
};