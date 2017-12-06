// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';
import { Card } from 'react-native-elements';

class Deck extends Component<{ navigation: Object }, void> {
  static navigationOptions = { headerTitle: 'View Deck' };

  render() {
    const { deck } = this.props;
    const cardCount = deck.questions.length;
    const lastQuiz = new Date(deck.lastQuizDate).toLocaleDateString();

    return (
      <Card title={deck.title}>
        <Text>{`This deck contains ${cardCount} question ${
          cardCount === 1 ? 'card' : 'cards'
        }.`}</Text>
        <Text>{`You last completed a quiz with this deck on ${
          lastQuiz
        }.`}</Text>
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

const mapStateToProps = (state, ownProps) => {
  const { key } = ownProps.navigation.state.params;

  return { deck: state[key] };
};

export default connect(mapStateToProps)(Deck);
