// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, StyleSheet, Platform } from 'react-native';
import { Card, Badge } from 'react-native-elements';
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
        <Text style={styles.text}>This deck contains</Text>
        <Badge
          value={cardCount}
          wrapperStyle={styles.badgeWrapper}
          containerStyle={styles.badgeContainer}
          textStyle={styles.badgeText}
        />
        <Text style={styles.text}>{`question ${
          cardCount === 1 ? 'card' : 'cards'
        }.`}</Text>
        <Text style={[styles.text, { marginTop: 32 }]}>
          {lastQuiz
            ? `You last completed a quiz with this deck ${lastQuiz}.`
            : 'You have yet to complete this quiz.'}
        </Text>
        <View style={styles.buttonView}>
          <Button
            title="Add a Question"
            onPress={() =>
              this.props.navigation.navigate('NewQuestion', {
                deck: deck.title
              })
            }
          />
        </View>
        <View style={styles.buttonView}>
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

const styles = StyleSheet.create({
  text: {
    marginBottom: 10,
    textAlign: 'center'
  },
  badgeContainer: {
    height: 48,
    width: 48,
    borderRadius: 24
  },
  badgeWrapper: {
    alignItems: 'center',
    marginBottom: 10
  },
  badgeText: {
    fontSize: 24
  },
  buttonView: {
    marginBottom: Platform.OS === 'ios' ? 0 : 16,
    marginTop: Platform.OS === 'ios' ? 0 : 16
  }
});

export default connect(mapStateToProps)(Deck);
