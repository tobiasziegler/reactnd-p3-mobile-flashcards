// @flow
import { AsyncStorage } from 'react-native';
import { starterDecks } from './data';

export const DECKS_STORAGE_KEY = 'MobileFlashcards:decks';

export const getDecks = () =>
  AsyncStorage.getItem(DECKS_STORAGE_KEY).then(decks => JSON.parse(decks));

export const addDeck = deck =>
  AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(deck));

// Update the date the quiz was last completed for a given deck
export const saveDeckDate = (deck, date) =>
  AsyncStorage.mergeItem(
    DECKS_STORAGE_KEY,
    JSON.stringify({
      [deck.title]: { lastQuizDate: date }
    })
  );

export const addCard = (deck, card) => {
  // Merge the new question with the existing question set for this deck
  const updatedQuestions = [
    ...deck.questions,
    {
      question: card.question,
      answer: card.answer
    }
  ];

  // Merge with the existing data
  return AsyncStorage.mergeItem(
    DECKS_STORAGE_KEY,
    JSON.stringify({
      [deck.title]: { questions: updatedQuestions }
    })
  );
};

// Resets the state to sample data for development and testing
export const resetDecks = () =>
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(starterDecks));
