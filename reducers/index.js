// @flow
import {
  RECEIVE_DECKS,
  CREATE_DECK,
  CREATE_CARD,
  UPDATE_DECK_DATE
} from '../actions';

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return action.decks;
    case CREATE_DECK:
      return {
        ...state,
        ...action.deck
      };
    case UPDATE_DECK_DATE:
      return {
        ...state,
        [action.deck.title]: {
          ...state[action.deck.title],
          lastQuizDate: action.date
        }
      };
    case CREATE_CARD:
      return {
        ...state,
        [action.deck.title]: {
          ...state[action.deck.title],
          questions: [
            ...state[action.deck.title].questions,
            { question: action.card.question, answer: action.card.answer }
          ]
        }
      };
  }
}

export default decks;
