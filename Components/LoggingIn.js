import React from 'react';
import { StyleSheet, Text, View, TextInput, Scrollview,
  TouchableOpacity, Button, ImageButton, Image, TextField, ScrollView, Dimensions,
  Alert, Platform, Communications, Linking, Icon} from 'react-native';

import Main from './Main';
import { StackNavigator, SwitchNavigator  } from 'react-navigation';

export default class LoggingIn extends React.Component {

  register(){
    this.props.navigation.navigate("register");
  }
  constructor(){
    super();
    this.state={
      credentials: {
        username: "",
        password:"",

      }
    }
  }

  signIn(){
    if(this.state.username === undefined){
      alert("Username can't be empty")
    } else {
      //call mot databas för att se om det är rätt user/lösen
      //if(!taken){
      //if(success){
          this.props.navigation.navigate("main")
        //}

      //}
    }
  }
  register(){
    this.props.navigation.navigate("register")

  }

  getUsername(text){
    this.setState({
      username : text,
    })
  }

  getPasswordText(text){
    this.setState({
      password : text,
    })
  }


  render() {
    return(
      <View style= {styles.container}>
      <View style ={styles.mainContainer}>


      <TextInput
      placeholder={"Username"} style ={styles.input}
      onChangeText={text => this.getUsername(text, 'username')}
      />

      <TextInput
      secureTextEntry
      placeholder={"Password"} style ={styles.input}
      onChangeText={text => this.getPasswordText(text, 'password')}
      />


      <Button
      Button onPress={() => {
        this.signIn();
      }}
      title="Sign in"
      />
      </View>


      <View style ={styles.footer}>
      <Button styles ={styles.signUpBtn}
      Button onPress={() => {
        this.register();
      }}
      title="Sign up"
      />
      </View>



      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
     flex: 1,
     flexDirection: 'column',

  // height: 100 + "%",
  // width: 100 + "%",
  // flex:1,
  // justifyContent: "center",
  // alignItems: "center",
  // backgroundColor: "powderblue",
},
mainContainer:{
  height: 80 + "%",
  width: 100 + "%",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: 'powderblue',
},
input: {
  height: 50,
  width: 100 + "%",
  paddingHorizontal: 50,
  backgroundColor: "lightpink",
  marginBottom: 10,
},
  footer:{
  bottom: 0,
  width: 100 + "%",
  height: 20 +"%",
  backgroundColor: 'powderblue',
  alignItems:'flex-end',

  //justifyContent: 'flex-end'

  },
signUpBtn: {
  position: 'absolute',
  bottom: 25,
  right: 40,
}
});
