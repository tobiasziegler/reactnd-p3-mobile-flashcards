// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import { getDecks, resetDecks } from '../utils/api';
import { FlatList, View, Button } from 'react-native';
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

  resetSubmit = () => {
    resetDecks();
    getDecks().then(decks => this.props.receiveDecks(decks));
  };

  // FlatList ideas via https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6
  renderItem = ({ item }) => {
    const cardCount = item.questions.length; // Get the number of questions
    // Generate last quiz date string while handling null values
    const lastQuiz = item.lastQuizDate
      ? new Date(item.lastQuizDate).toLocaleDateString()
      : 'never';

    return (
      <ListItem
        key={item.title}
        title={item.title}
        subtitle={`Last quiz completed: ${lastQuiz}`}
        badge={{
          value: cardCount,
          containerStyle: { marginTop: 10 }
        }}
        onPress={() =>
          this.props.navigation.navigate('Deck', { key: item.title })
        }
      />
    );
  };

  renderFooter = () => {
    return (
      <Button title="Reset Sample Data" onPress={() => this.resetSubmit()} />
    );
  };

  render() {
    const { decks } = this.props;

    return (
      <View>
        <List>
          <FlatList
            data={Object.values(decks)}
            renderItem={this.renderItem}
            ListFooterComponent={this.renderFooter}
            keyExtractor={item => item.title}
          />
        </List>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { decks: state };
};

export default connect(mapStateToProps, { receiveDecks })(DeckList);
