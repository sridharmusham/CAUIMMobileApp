import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  View,
  Image,
  Button,
  Alert,
  ActivityIndicator
} from 'react-native';

import Proxy from '../util/Proxy';
import Environment from '../../Environment'
const companyLogo = require('../../components/images/company_logo.png');
export default class Login extends Component {

  state = {
    username: 'administrator',
    password: 'Admin@123',
    isLoggingIn: false,
    message: '',
    server: '10.131.78.168'
  }
  _userLogin = () => {

    this.setState({ isLoggingIn: true, message: '' });

    var params = {
      username: this.state.username,
      password: this.state.password,
      server: this.state.server
    };


    var proceed = false;
    Environment.CLIENT_API = `http://${params.server}/rest/`;
    Environment.AUTH = 'Basic ' + Base64.btoa(`${params.username}:${params.password}`);
    var uri = Environment.CLIENT_API+'version-info';

    var prox = new Proxy();
    prox.get(uri)
      .then(() => {
        this.setState({ isLoggingIn: false })
        this.props.onLoginSuccess(params.username);
        this.props.onLoginPress();
      })
      .catch(err => {
        this.setState({ message: err.message });
        this.setState({ isLoggingIn: false })
      });
    // fetch("https://" + Environment.CLIENT_API + "/oauth/token", {
    //   method: "POST",
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   body: formBody
    // })
    //   .then((response) => response.json())
    //   .then((response) => {
    //     if (response.status == 200) proceed = true;
    //     else this.setState({ message: response.message });
    //   })
    //   .then(() => {
    //     this.setState({ isLoggingIn: false })
    //     if (proceed) this.props.onLoginPress();
    //   })
    //   .catch(err => {
    //     this.setState({ message: err.message });
    //     this.setState({ isLoggingIn: false })
    //   });
  }

  clearUsername = () => {
    this._username.setNativeProps({ text: '' });
    this.setState({ message: '' });
  }

  clearPassword = () => {
    this._password.setNativeProps({ text: '' });
    this.setState({ message: '' });
  }
  clearServer = () => {
    this._server.setNativeProps({ text: '' });
    this.setState({ message: '' });
  }

  render() {
    return (
      <ScrollView style={{ padding: 40 }}>
        <View style={styles.loginContainer}>
                <Image source={companyLogo} style={styles.logo} resizeMode="contain" />
              </View>	
        <TextInput
          ref={component => this._server = component}
          placeholder='Server'
          onChangeText={(server) => this.setState({ server })}
          autoFocus={true}
          onFocus={this.clearServer}
        />
        <TextInput
          ref={component => this._username = component}
          placeholder='Username'
          onChangeText={(username) => this.setState({ username })}
          autoFocus={true}
          onFocus={this.clearUsername}
        />
        <TextInput
          ref={component => this._password = component}
          placeholder='Password'
          onChangeText={(password) => this.setState({ password })}
          secureTextEntry={true}
          onFocus={this.clearPassword}
          onSubmitEditing={this._userLogin}
        />
        {!!this.state.message && (
          <Text
            style={{ fontSize: 14, color: 'red', padding: 5 }}>
            {this.state.message}
          </Text>
        )}
        {this.state.isLoggingIn && <ActivityIndicator />}
        <View style={{ margin: 7 }} />
        <Button
          disabled={this.state.isLoggingIn || !this.state.username || !this.state.password}
          onPress={this._userLogin}
          title="Login"
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
     loginContainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
       // position: 'absolute',
        width: 325,
        height: 80
    }
 });