// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';
import { Card } from 'react-native-elements';
import moment from 'moment';

class Deck extends Component<{ navigation: Object }, void> {
  static navigationOptions = { headerTitle: 'View Deck' };

  render() {
    const { deck } = this.props;
    const cardCount = deck.questions.length;
    // Generate last quiz date string while handling null values
    const lastQuiz = deck.lastQuizDate
      ? moment(new Date(deck.lastQuizDate)).fromNow()
      : null;

    return (
      <Card title={deck.title}>
        <Text>{`This deck contains ${cardCount} question ${
          cardCount === 1 ? 'card' : 'cards'
        }.`}</Text>
        <Text>
          {lastQuiz
            ? `You last completed a quiz with this deck ${lastQuiz}.`
            : 'You have yet to complete this quiz.'}
        </Text>
        <View>
          <Button
            title="Add a Question"
            onPress={() =>
              this.props.navigation.navigate('NewQuestion', {
                deck: deck.title
              })
            }
          />
        </View>
        <View>
          <Button
            title="Start a Quiz"
            disabled={!(deck.questions.length > 0)}
            onPress={() =>
              this.props.navigation.navigate('Quiz', {
                deck: deck.title
              })
            }
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
