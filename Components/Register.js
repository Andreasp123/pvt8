import React from 'react';
import { StyleSheet, Text, View, TextInput, Scrollview,
  TouchableOpacity, Button, ImageButton, Image, TextField, ScrollView, Dimensions,
  Alert, Platform, Communications, Linking, Icon} from 'react-native';

import Main from './Main';
import { StackNavigator, SwitchNavigator  } from 'react-navigation';

export default class Register extends React.Component {
  loggingIn(){
    this.props.navigation.navigate("loggingIn");
  }
  constructor(){
    super();
    this.state={
      credentials: {
        username: "",
        password:"",
        repeatedPassword: "",
      }
    }
  }
  LoggingIn(){
    this.props.navigate("loggingIn")
  }

  register(){
    if(this.state.username !== 'undefined'){
      alert("Username can't be empty")
    } else {
      if(this.state.password === this.state.repeatedPassword){

        //call mot databas för att se om användarnamnet är taget
        //if(!taken){
          this.props.navigation.navigate("loggingIn")
        //}

      }
    }

  }

  updateUsername(text){
    this.setState({
      username : text,
    })
  }

  updatePasswordText(text){
    this.setState({
      password : text,
    })
  }
  repeatPasswordText(text){
    this.setState({
      repeatedPassword : text,
    })
  }

  render() {
    return(
      <View style= {styles.container}>


      <TextInput
      placeholder={"Username"} style ={styles.input}
      onChangeText={text => this.updateUsername(text, 'username')}
      />

      <TextInput
      secureTextEntry
      placeholder={"Password"} style ={styles.input}
      onChangeText={text => this.updatePasswordText(text, 'password')}
      />

      <TextInput
      secureTextEntry
      placeholder={"Repeat password"} style ={styles.input}
      onChangeText={text => this.repeatPasswordText(text, 'repeatedPassword')}
      />

      <Button
      Button onPress={() => {
        this.register();
      }}
      title="Signup"
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
  height: 100 + "%",
  width: 100 + "%",
  flex:1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "powderblue",
},
input: {
  height: 50,
  width: 100 + "%",
  paddingHorizontal: 50,
  backgroundColor: "lightpink",
  marginBottom: 10,

}
});
