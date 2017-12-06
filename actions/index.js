// @flow
import { starterDecks } from '../utils/data';

export const RECEIVE_DECKS = 'RECEIVE_DECKS';

export const receiveDecks = decks => ({
  type: RECEIVE_DECKS,
  decks
});
