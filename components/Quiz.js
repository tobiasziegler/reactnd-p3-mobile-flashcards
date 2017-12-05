// @flow
import React, { Component } from 'react';
import { Text, Button } from 'react-native';
import { Card } from 'react-native-elements';

class Quiz extends Component<{}, void> {
  static navigationOptions = { headerTitle: 'Quiz' };

  render() {
    return (
      <Card title="Quiz Question">
        <Text>Question text will go here.</Text>
        <Button title="Show Answer" />
        <Card title="Mark your answer">
          <Button title="Correct" />
          <Button title="Incorrect" />
        </Card>
      </Card>
    );
  }
}

export default Quiz;
