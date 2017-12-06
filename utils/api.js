// @flow
import { AsyncStorage } from 'react-native';
import { starterDecks } from './data';

export const DECKS_STORAGE_KEY = 'MobileFlashcards:decks';

export const getDecks = () =>
  AsyncStorage.getItem(DECKS_STORAGE_KEY).then(decks => JSON.parse(decks));

// Resets the state to sample data for development and testing
export const resetDecks = () =>
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(starterDecks));
