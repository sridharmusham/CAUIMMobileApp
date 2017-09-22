/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
 
import Login from './src/pages/Login';
import Main from './src/pages/Main';

export default class UIMApp extends Component {

   state = {
    isLoggedIn: false,
    username:''
  }

  render() {

    if (this.state.isLoggedIn) 
      return <Main 
          onLogoutPress={() => this.setState({isLoggedIn: false})}
          username = {this.state.username}
        />;
    else 
      return <Login 
          onLoginPress={() => this.setState({isLoggedIn: true})}
          onLoginSuccess = {(user) => this.setState({username:user})}
        />;
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('UIMApp', () => UIMApp);
