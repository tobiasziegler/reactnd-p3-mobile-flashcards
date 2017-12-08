// @flow
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { View, StatusBar } from 'react-native';
import { Constants } from 'expo';
import DeckList from './components/DeckList';
import Deck from './components/Deck';
import Quiz from './components/Quiz';
import NewDeck from './components/NewDeck';
import NewQuestion from './components/NewQuestion';
import { setLocalNotification } from './utils/notifications';

function AppStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Tabs = TabNavigator({
  DeckList: { screen: DeckList },
  NewDeck: { screen: NewDeck }
});

const MainNavigator = StackNavigator({
  Home: { screen: Tabs },
  Deck: { screen: Deck },
  Quiz: { screen: Quiz },
  NewQuestion: { screen: NewQuestion }
});

export default class App extends React.Component<{}, void> {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <AppStatusBar />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
