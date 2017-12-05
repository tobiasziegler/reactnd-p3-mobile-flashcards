// @flow
import React, { Component } from 'react';
import { Button } from 'react-native';
import { List, ListItem } from 'react-native-elements';

class DeckList extends Component<{}, void> {
  // Navigation code with some help from
  // https://reactnavigation.org/docs/navigators/navigation-options#Stack-Navigation-Options
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'My Decks',
    headerRight: (
      <Button title="New Deck" onPress={() => navigation.navigate('NewDeck')} />
    )
  });

  render() {
    return (
      <List>
        <ListItem
          title="Flashcard Deck"
          subtitle="Last quiz completed X days ago"
          badge={{ value: 12, containerStyle: { marginTop: 10 } }}
          onPress={() => this.props.navigation.navigate('Deck')}
        />
      </List>
    );
  }
}

export default DeckList;
