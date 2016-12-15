import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity
} from 'react-native';

import {configureStore} from './app/store';

import App from './app/components/App';


class cs496_a4_front extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
          <App />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  }
});

AppRegistry.registerComponent('cs496_a4_front', () => cs496_a4_front);
