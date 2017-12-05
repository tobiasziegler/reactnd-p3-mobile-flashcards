// @flow
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Card } from 'react-native-elements';

class Deck extends Component<{ navigation: Object }, void> {
  static navigationOptions = { headerTitle: 'View Deck' };

  render() {
    return (
      <Card title="Flashcard Deck">
        <Text>Number of cards.</Text>
        <View>
          <Button
            title="Add a Question"
            onPress={() => this.props.navigation.navigate('NewQuestion')}
          />
        </View>
        <View>
          <Button
            title="Start a Quiz"
            onPress={() => this.props.navigation.navigate('Quiz')}
          />
        </View>
      </Card>
    );
  }
}

export default Deck;
