import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import Places from './src/containers/Places/Places';

export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
          <Places/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 60,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});
