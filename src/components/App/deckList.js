import { map } from 'lodash';
import React from 'react';
import { Row, Card, Button, Icon } from 'react-materialize';

const cardContainer = {
	boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
	width: 210,
	height: 210,
	marginBottom: 18,
	position: 'relative',
	backgroundColor: '#F7FFF7',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center'
}

export default (props) => {
	return (
		<div
			className="container"
			style={{paddingTop: '27px', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap'}}>
		{
			map(props.decks, (deck, i) => {
				return (
						<div
							style={cardContainer}
							key={i}>
							<div
								onClick={props.onClick.bind(this, deck.id)}
								style={{textAlign: 'center', fontSize: 20, cursor: 'pointer'}}>
								<p>{deck.name}</p>
							</div>
							<div 
								onClick={props.onRemove.bind(this, deck.id)}
								style={{position: 'absolute', top: 10, right: 10, cursor: 'pointer'}} >
								<Icon tiny>clear</Icon>
							</div>
						</div>
				)
			})
		}
		{props.children}
		</div>
	);
}