// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateDeckDate } from '../actions';
import { saveDeckDate } from '../utils/api';
import { Text, Button } from 'react-native';
import { Card } from 'react-native-elements';
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
        <Text>
          Quiz complete! You scored {correctAnswers} out of {numberOfCards} ({percentageScore.toFixed(
            0
          )}%).
        </Text>
        <Button title="Restart Quiz" onPress={() => this.resetQuiz()} />
        <Button
          title="Back to Deck"
          onPress={() => this.props.navigation.goBack()}
        />
      </Card>
    ) : (
      <Card title={`${deck.title} Quiz - Question ${currentCard + 1}`}>
        <Text>
          {!showingAnswer
            ? deck.questions[currentCard].question
            : deck.questions[currentCard].answer}
        </Text>
        <Button
          title={!showingAnswer ? 'Show Answer' : 'Show Question'}
          onPress={() => this.flipCard()}
        />
        <Card title="Mark your answer">
          <Button title="Correct" onPress={() => this.answerCorrect()} />
          <Button title="Incorrect" onPress={() => this.answerIncorrect()} />
        </Card>
        <Text>
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

export default connect(mapStateToProps, { updateDeckDate })(Quiz);
