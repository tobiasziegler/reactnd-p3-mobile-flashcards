// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateDeckDate } from '../actions';
import { saveDeckDate } from '../utils/api';
import { Text, Button, View, StyleSheet, Platform } from 'react-native';
import { Card, Badge } from 'react-native-elements';
import { green, red } from '../utils/colours';
import {
  setLocalNotification,
  clearLocalNotification
} from '../utils/notifications';

class Quiz extends Component<{}, void> {
  static navigationOptions = { headerTitle: 'Quiz' };

  state = {
    currentCard: 0,
    numberOfCards: this.props.deck.questions.length,
    correctAnswers: 0,
    showingAnswer: false,
    quizCompleted: false
  };

  resetQuiz = () => {
    this.setState({
      currentCard: 0,
      numberOfCards: this.props.deck.questions.length,
      correctAnswers: 0,
      showingAnswer: false,
      quizCompleted: false
    });
  };

  flipCard = () => {
    this.setState(state => ({ showingAnswer: !state.showingAnswer }));
  };

  isFinalQuestion = () =>
    this.state.currentCard === this.state.numberOfCards - 1;

  completeQuiz = () => {
    const { deck } = this.props;
    const quizDate = Date.now();

    saveDeckDate(deck, quizDate).then(
      this.props.updateDeckDate(deck, quizDate)
    );

    clearLocalNotification().then(setLocalNotification());
  };

  answerCorrect = () => {
    // If this is the last question, update state and then finalise the quiz
    this.isFinalQuestion()
      ? this.setState(
          state => ({
            correctAnswers: state.correctAnswers + 1,
            quizCompleted: true
          }),
          () => this.completeQuiz()
        )
      : this.setState(state => ({
          currentCard: state.currentCard + 1,
          correctAnswers: state.correctAnswers + 1,
          showingAnswer: false
        }));
  };

  answerIncorrect = () => {
    // If this is the last question, update state and then finalise the quiz
    this.isFinalQuestion()
      ? this.setState(
          state => ({
            quizCompleted: true
          }),
          () => this.completeQuiz()
        )
      : this.setState(state => ({
          currentCard: state.currentCard + 1,
          showingAnswer: false
        }));
  };

  render() {
    const {
      currentCard,
      numberOfCards,
      correctAnswers,
      showingAnswer,
      quizCompleted
    } = this.state;
    const { deck } = this.props;

    const questionsRemaining = numberOfCards - (currentCard + 1);
    const percentageScore = correctAnswers / numberOfCards * 100;

    return quizCompleted ? (
      <Card title={`${deck.title} Quiz - Your Score`}>
        <Text style={[styles.text, { fontSize: 24 }]}>Quiz complete!</Text>
        <Badge
          value={`${percentageScore.toFixed(0)}%`}
          wrapperStyle={styles.badgeWrapper}
          containerStyle={styles.badgeContainer}
          textStyle={styles.badgeText}
        />
        <Text style={[styles.text, { fontSize: 24 }]}>
          You scored {correctAnswers} out of {numberOfCards}.
        </Text>
        <View style={styles.buttonView}>
          <Button title="Restart Quiz" onPress={() => this.resetQuiz()} />
        </View>
        <View style={styles.buttonView}>
          <Button
            title="Back to Deck"
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
      </Card>
    ) : (
      <Card title={`${deck.title} Quiz - Question ${currentCard + 1}`}>
        <Text style={[styles.text, { fontSize: 24 }]}>
          {!showingAnswer
            ? deck.questions[currentCard].question
            : deck.questions[currentCard].answer}
        </Text>
        <View style={styles.buttonView}>
          <Button
            title={!showingAnswer ? 'Show Answer' : 'Show Question'}
            onPress={() => this.flipCard()}
          />
        </View>
        <Card title="Mark your answer">
          <View style={styles.buttonView}>
            <Button
              title="Correct"
              onPress={() => this.answerCorrect()}
              color={green}
            />
          </View>
          <View style={styles.buttonView}>
            <Button
              title="Incorrect"
              onPress={() => this.answerIncorrect()}
              color={red}
            />
          </View>
        </Card>
        <Text style={[styles.text, { marginTop: 16 }]}>
          {questionsRemaining === 0
            ? 'This is your final question!'
            : questionsRemaining === 1
              ? 'You have 1 more question remaining.'
              : `You have ${questionsRemaining} more questions remaining.`}
        </Text>
      </Card>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { deck } = ownProps.navigation.state.params;

  return { deck: state[deck] };
};

const styles = StyleSheet.create({
  text: {
    marginBottom: 10,
    textAlign: 'center'
  },
  badgeContainer: {
    height: 96,
    width: 96,
    borderRadius: 48
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

export default connect(mapStateToProps, { updateDeckDate })(Quiz);
