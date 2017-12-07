// @flow
import { starterDecks } from '../utils/data';

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const CREATE_DECK = 'CREATE_DECK';

export const receiveDecks = decks => ({
  type: RECEIVE_DECKS,
  decks
});

export const createDeck = deck => ({
  type: CREATE_DECK,
  deck
});
