// @flow
import React, { Component } from 'react';
import { Text, TextInput, Button } from 'react-native';
import { Card } from 'react-native-elements';

class NewQuestion extends Component<{}, void> {
  static navigationOptions = { headerTitle: 'Add a Question' };

  render() {
    return (
      <Card title="New Question">
        <Text>Question</Text>
        <TextInput multiline={true} autoFocus={true} />
        <Text>Answer</Text>
        <TextInput multiline={true} />
        <Button title="Submit" />
      </Card>
    );
  }
}

export default NewQuestion;
