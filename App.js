// @flow
import React from 'react';
import { StackNavigator } from 'react-navigation';
import { View, StatusBar } from 'react-native';
import { Constants } from 'expo';
import DeckList from './components/DeckList';
import Deck from './components/Deck';
import Quiz from './components/Quiz';
import NewDeck from './components/NewDeck';
import NewQuestion from './components/NewQuestion';

function AppStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const MainNavigator = StackNavigator({
  Home: { screen: DeckList },
  Deck: { screen: Deck },
  Quiz: { screen: Quiz },
  NewDeck: { screen: NewDeck },
  NewQuestion: { screen: NewQuestion }
});

export default class App extends React.Component<{}, void> {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppStatusBar />
        <MainNavigator />
      </View>
    );
  }
}
