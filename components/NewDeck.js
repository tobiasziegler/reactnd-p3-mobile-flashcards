// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createDeck } from '../actions';
import { addDeck } from '../utils/api';
import {
  Text,
  TextInput,
  View,
  Button,
  Alert,
  StyleSheet,
  Platform
} from 'react-native';
import { Card } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';

class NewDeck extends Component<{}, void> {
  static navigationOptions = {
    headerTitle: 'Add a Deck',
    tabBarLabel: 'New Deck',
    tabBarIcon: ({ tintColor }) => (
      <MaterialCommunityIcons name="plus" size={30} color={tintColor} />
    )
  };

  state = { title: '' };

  submitDeck = () => {
    const { title } = this.state;
    const { decks, navigation } = this.props;

    if (!title || title === '') {
      Alert.alert('Empty Title', 'Please enter a title for your new deck.');
      return;
    }

    if (decks[title]) {
      Alert.alert('Duplicate Title', 'A deck with this title already exists.');
      return;
    }

    // Create the object structure for the new deck
    const deck = {
      [title]: {
        title: title,
        lastQuizDate: null,
        questions: []
      }
    };

    // Store using the API and then fire an action to update Redux state
    addDeck(deck).then(this.props.createDeck(deck));

    navigation.navigate('Deck', { key: title });

    this.setState({ title: '' });
  };

  render() {
    return (
      <Card title="Create a new flashcard deck">
        <Text>Title</Text>
        <TextInput
          autoFocus={true}
          value={this.state.title}
          onChangeText={value => this.setState({ title: value })}
          style={styles.textInput}
        />
        <View style={styles.buttonView}>
          <Button title="Submit" onPress={() => this.submitDeck()} />
        </View>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return { decks: state };
};

const styles = StyleSheet.create({
  textInput: {
    height: 32,
    marginTop: 8,
    paddingBottom: 16
  },
  buttonView: {
    marginBottom: Platform.OS === 'ios' ? 0 : 16,
    marginTop: Platform.OS === 'ios' ? 0 : 16
  }
});

export default connect(mapStateToProps, { createDeck })(NewDeck);
