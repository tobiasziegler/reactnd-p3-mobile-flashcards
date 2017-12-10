// @flow
import React, { Component } from 'react';
import { Text, TextInput, Button, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { createCard } from '../actions';
import { addCard } from '../utils/api';

class NewQuestion extends Component<{}, void> {
  static navigationOptions = { headerTitle: 'Add a Question' };

  state = {
    question: '',
    answer: ''
  };

  submitQuestion = () => {
    const { question, answer } = this.state;
    const { deck, navigation } = this.props;

    const card = { question: question, answer: answer };

    if (!question || question === '') {
      Alert.alert(
        'Missing Question',
        'Please enter the question in the question field.'
      );
      return;
    }

    if (!answer || answer === '') {
      Alert.alert(
        'Missing Answer',
        'Please enter the answer in the answer field.'
      );
      return;
    }

    // Add to AsyncStorage via API and then update Redux state
    addCard(deck, card).then(this.props.createCard(deck, card));

    navigation.goBack();
  };

  render() {
    return (
      <Card title="New Question">
        <Text>Question</Text>
        <TextInput
          multiline={true}
          autoFocus={true}
          value={this.state.question}
          onChangeText={value => this.setState({ question: value })}
        />
        <Text>Answer</Text>
        <TextInput
          multiline={true}
          value={this.state.answer}
          onChangeText={value => this.setState({ answer: value })}
        />
        <Button title="Submit" onPress={() => this.submitQuestion()} />
      </Card>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { deck } = ownProps.navigation.state.params;

  return { deck: state[deck] };
};

export default connect(mapStateToProps, { createCard })(NewQuestion);
