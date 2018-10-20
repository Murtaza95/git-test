import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is my first IOS/Andriod App in React Native</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
      backgroundColor: '#808080',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
