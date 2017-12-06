// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initDecks } from '../actions';
import { Button } from 'react-native';
import { List, ListItem } from 'react-native-elements';

class DeckList extends Component<{}, void> {
  // Navigation code with some help from
  // https://reactnavigation.org/docs/navigators/navigation-options#Stack-Navigation-Options
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'My Decks',
    headerRight: (
      <Button title="New Deck" onPress={() => navigation.navigate('NewDeck')} />
    )
  });

  componentDidMount = () => {
    this.props.initDecks();
  };

  render() {
    const { decks } = this.props;

    return (
      <List>
        {Object.keys(decks).map(key => {
          const deck = decks[key]; // Get the deck object matching the key
          const cardCount = deck.questions.length; // Get the number of questions
          const lastQuiz = new Date(deck.lastQuizDate).toLocaleDateString();

          return (
            <ListItem
              key={key}
              title={deck.title}
              subtitle={`Last quiz completed: ${lastQuiz}`}
              badge={{ value: cardCount, containerStyle: { marginTop: 10 } }}
              onPress={() => this.props.navigation.navigate('Deck')}
            />
          );
        })}
      </List>
    );
  }
}

const mapStateToProps = state => {
  return { decks: state };
};

export default connect(mapStateToProps, { initDecks })(DeckList);
