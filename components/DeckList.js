// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import { getDecks, resetDecks } from '../utils/api';
import { View, Button } from 'react-native';
import { List, ListItem } from 'react-native-elements';

class DeckList extends Component<{}, void> {
  // Navigation code with some help from
  // https://reactnavigation.org/docs/navigators/navigation-options#Stack-Navigation-Options
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'My Decks',
    tabBarLabel: 'My Decks'
  });

  componentDidMount = () => {
    getDecks().then(decks => this.props.receiveDecks(decks));
  };

  render() {
    const { decks } = this.props;

    return (
      <View>
        <List>
          {decks &&
            Object.keys(decks).map(key => {
              const deck = decks[key]; // Get the deck object matching the key
              const cardCount = deck.questions.length; // Get the number of questions
              // Generate last quiz date string while handling null values
              const lastQuiz = deck.lastQuizDate
                ? new Date(deck.lastQuizDate).toLocaleDateString()
                : 'never';

              return (
                <ListItem
                  key={key}
                  title={deck.title}
                  subtitle={`Last quiz completed: ${lastQuiz}`}
                  badge={{
                    value: cardCount,
                    containerStyle: { marginTop: 10 }
                  }}
                  onPress={() =>
                    this.props.navigation.navigate('Deck', { key: key })
                  }
                />
              );
            })}
        </List>
        <Button title="Reset Sample Data" onPress={() => resetDecks()} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { decks: state };
};

export default connect(mapStateToProps, { receiveDecks })(DeckList);
