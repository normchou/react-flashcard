import * as firebase from 'firebase';
import { filter } from 'lodash';
import deckModel from './models/deckModel';
import cardModel from './models/cardModel';
import firebaseConfig from './config/';

let database;

export const init = () => {
	firebase.initializeApp(firebaseConfig);
	database = firebase.database();
};

export const getDecksDB = () => {
	return database.ref('/').once('value');
};

export const getCardDB = (deckId) => {
	return database.ref(`/${deckId}`).once('value');
};

export const addDeck = (name) => {
	let key = database.ref('/').push().key;
	let model = deckModel(
		key,
		name,
		firebase.database.ServerValue.TIMESTAMP
	);

	return database.ref(`/${key}`).set(model);
};

export const addCardItem = (id, question, answer) => {
	return new Promise((resolve, reject) => {
		database.ref(`/${id}`).once('value').then((deck) => {
			let cards = deck.val().cards || [];
			let key = database.ref(`/${id}`).push().key;
			cards.push(cardModel(
				key,
				question,
				answer,
				firebase.database.ServerValue.TIMESTAMP
			));

			database.ref(`/${id}/cards`).set(cards)
				.then(res => { resolve(res) })
				.catch(error => { reject(error) })
		});
	});
};

export const removeDeck = (deckId) => {
	return new Promise((resolve, reject) => {
		database.ref(`/${deckId}`).remove()
			.then(res => resolve(res))
			.catch(error => reject(error))
	});
};

export const removeCard = (deckId, cardId) => {
	return new Promise((resolve, reject) => {
		database.ref(`/${deckId}/cards`).once('value').then((cards) => {
			let currentCards = cards.val();
			let newCards = filter(currentCards, (card) => card.id !== cardId);

			database.ref(`/${deckId}/cards`).set(newCards)
				.then(res => resolve(res))
				.catch(error => reject(error))
		});
	});
}