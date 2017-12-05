// @flow
import React, { Component } from 'react';
import { Text, TextInput, Button } from 'react-native';
import { Card } from 'react-native-elements';

class NewDeck extends Component<{}, void> {
  static navigationOptions = { headerTitle: 'Add a Deck' };

  render() {
    return (
      <Card title="Create a new flashcard deck">
        <Text>Title</Text>
        <TextInput autoFocus={true} />
        <Button title="Submit" />
      </Card>
    );
  }
}

export default NewDeck;
