import React from 'react';
import { StyleSheet, Text, View, TextInput, Scrollview,
  TouchableOpacity, Button, ImageButton, Image, TextField, ScrollView, Dimensions,
  Alert, Platform, Communications, Linking} from 'react-native';
import ljusag from './lg.png';
import Main from './Main';
//import { StackNavigator, SwitchNavigator  } from 'react-navigation';
//import {TabNavigator, SwitchNavigator, Icon, NavigatorIOS} from 'react-native';
import { SwitchNavigator,TabNavigator, StackNavigator  } from 'react-navigation';
export default class LoggingIn extends React.Component {


  constructor(props){
    super(props);
    this.state={

        username: "",
        password:"",
    }
    this.signIn = this.signIn.bind(this);
    this.navigate = this.props.navigation.navigate;
    this.params = this.props.navigation.state.params;
  }


  register(){
    this.props.navigation.navigate("register");
  }

  signIn(){
      if(this.state.username === undefined){
        alert("Username can't be empty")
      } else {
        console.log("username", this.state.username)

        this.navigate({
        routeName: 'main',
        key: 'main',
        params: {
           username: this.state.username
        }
     });

        // this.navigate("main", {
        //   params: {
        //   username: this.state.username,
        //
        //   }
        // });
    }
  }

  register(){
    this.props.navigation.navigate("register")

  }

  getUsername(text){
    console.log(this.state.username)
    this.setState({
      username : text,
    })
    console.log(this.state.username)
  }

  getPasswordText(text){
    console.log(this.state.password)
    this.setState({
      password : text,
    })
    console.log(this.state.password)
  }

  updateUsername(text, field){
    let newUsername = Object.assign(this.state.username);
    username[field] = text;
    this.setState({
      username: newUsername
    });
    console.log("user", this.state.username)
  }
  updatePassword(text, field){
    let newPassword = Object.assign(this.state.password);
    username[field] = text;
    this.setState({
      password: newPassword
    });
    console.log("password", this.state.password)
  }




  render() {
    return(
      <View style= {styles.container}>

      <View style ={styles.mainContainer}>


      <TextInput
      value={this.state.username}
      placeholder={"Username"} style ={styles.input}
      onChangeText={text => this.getUsername(text, 'username')}
      />

      <TextInput
      value={this.state.password}
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
},
backgroundImage:{
  flex: 1,
  backgroundColor:'transparent',
  justifyContent: 'center',
  alignItems: 'center',
  width: 100 +"%"
}
});
