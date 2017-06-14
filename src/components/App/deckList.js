import { map } from 'lodash';
import React from 'react';
import { Row, Card, Button, Icon } from 'react-materialize';

export default (props) => {
	return (
		<div className="container" style={{paddingTop: '27px'}}>
		{
			map(props.decks, (deck, i) => {
				return (
					<Row key={i}>
						<Card key={i} title={deck.name}
							actions={[
								<Button waves="light" floating key="open"
									onClick={props.onClick.bind(this, deck.id)}>
									<Icon left>open_in_new</Icon>
								</Button>,
								<Button waves="light" floating key="remove"
									className="red"
									onClick={props.onRemove.bind(this, deck.id)}
									style={{float: 'right'}}>
									<Icon left>delete</Icon>
								</Button>
							]}>
						</Card>
					</Row>
				)
			})
		}
		</div>
	);
}