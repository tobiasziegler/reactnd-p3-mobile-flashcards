// @flow
import { starterDecks } from '../utils/data';

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const CREATE_DECK = 'CREATE_DECK';
export const UPDATE_DECK_DATE = 'UPDATE_DECK_DATE';
export const CREATE_CARD = 'CREATE_CARD';

export const receiveDecks = decks => ({
  type: RECEIVE_DECKS,
  decks
});

export const createDeck = deck => ({
  type: CREATE_DECK,
  deck
});

export const updateDeckDate = (deck, date) => ({
  type: UPDATE_DECK_DATE,
  deck,
  date
});

export const createCard = (deck, card) => ({
  type: CREATE_CARD,
  deck,
  card
});
