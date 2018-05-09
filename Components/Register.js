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
        email: "",
      }
    }
  }
  LoggingIn(){
    this.props.navigate("loggingIn")
  }

  register(){
    if(this.state.username === 'undefined'){
      alert("Username can't be empty")
    } else {
      //if(this.state.password === this.state.repeatedPassword){
        fetch('https://pvt.dsv.su.se/Group08/registerUser', {

       method: 'POST',

       headers: {

          'Accept': 'application/json',

         // 'Accept' : "application/json",

         'Content-Type': "application/json"},

         // 'Accept': 'text/plain',

         // 'Content-Type': 'text/plain'},

       body: JSON.stringify({

          "username": this.state.username,

         // "username": this.state.username,
         //
         // "password": this.state.password

         //latitude: this.state.originLatitude,

          "password": this.state.password,
          "email": this.state.email,
       })
     }).
       then((response) => {
         //console.log(response)

         if(response.ok){
           response.json().then(json =>{
             console.log(json)
             if(json.Register === true){
               console.log("det funkar")
               this.props.navigation.navigate("loggingIn")
             }
           })
         }
         console.log('Done', response);
       });

        //call mot databas för att se om användarnamnet är taget
        //if(!taken){

        //}

      //}
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
  updateEmailText(text){
    this.setState({
      email : text,
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
      
      placeholder={"Email"} style ={styles.input}
      onChangeText={text => this.updateEmailText(text, 'email')}
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
