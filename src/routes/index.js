import React, { Component } from 'react';
import Cards from '../components/App/card.js';
import App from '../components/App/app.js'
import { connect } from 'react-redux';
import { loadDecks } from '../actions'
import { Router, IndexRoute, Route } from 'react-router'

class Routes extends Component {
	constructor(props) {
		super(props);
		this.props.loadDecks();
	}

	render() {
		return (
			<Router {...this.props}>
				<Route path='/'>
					<IndexRoute component={App} />
					<Route path=':id' component={Cards} />
				</Route>
			</Router>
		);
	}
}

export default connect(null, {loadDecks})(Routes);