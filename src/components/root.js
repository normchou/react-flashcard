import React, { Component } from 'react';
import { init as firebaseInit } from '../database/firebase';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from '../store/configureStore.js';
import Routes from '../routes';

export default class Root extends Component {
	constructor(props) {
		super(props);
		firebaseInit();
		this.store = configureStore(browserHistory);
	}

	render() {
		return (
			<Provider store={this.store}>
				<Routes history={syncHistoryWithStore(browserHistory, this.store)} />
			</Provider>
		);
	};
}
