import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
	StyleSheet,
    Image,
    TouchableOpacity,
    ActivityIndicator
       
} from 'react-native';
const companyLogo = require("../../components/images/company_logo.png");


export default class Login extends Component {

    state = {
        
        username : '',
        password : '',
        server : '',
        isLoggingIn: false,
        message: ''

      }

      _userLogin = () => {
        
            this.setState({ isLoggingIn: true, message: '' });
        
            var params = {
              username: this.state.username,
              password: this.state.password,
              server: this.state.server
            };
            
        
            var auth = 'Basic '+btoa(`${params.username}:${params.password}`);
            var proceed = false;
            fetch(`http://${params.server}/rest/version-info`, {
              method: "GET",
              headers: {
                'Authorization':auth,
                'Accept':'application/json'
              }
            })
              .then((response) => {
                console.log(response);
                if (response.status == 200) {
                  proceed = true;
                  response = response.json();
                  console.log(response);
                }
                else this.setState({ message: response.message });
              })
              .then(() => {
                this.setState({ isLoggingIn: false })
                if (proceed) this.props.onLoginPress();
              })
              .catch(err => {
                this.setState({ message: err.message });
                this.setState({ isLoggingIn: false })
              });
            
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
		  <ScrollView style={{padding: 50}}>
			<View style={styles.loginContainer}>
                <Image source={companyLogo} style={styles.logo} resizeMode="contain" />
              </View>	
			  <TextInput 
                ref={component => this._server = component}
                onChangeText={(server) => this.setState({ server })}
                onFocus={this.clearServer}
                placeholder='UIM Server IP Address' />
                <TextInput 
                ref={component => this._username = component}
                onChangeText={(username) => this.setState({ username })}
                onFocus={this.clearUsername}
                autoFocus={true}
                placeholder='Username' />
                <TextInput 
                ref={component => this._password = component}
                onChangeText={(password) => this.setState({ password })}
                placeholder='Password' 
                onSubmitEditing={this._userLogin}
                secureTextEntry = {true}/>
                {!!this.state.message && (
          <Text
            style={{ fontSize: 14, color: 'red', padding: 5 }}>
            {this.state.message}
          </Text>
        )}
        {this.state.isLoggingIn && <ActivityIndicator />}
                <View style={{margin:5}} />
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