import React from 'react';
import { StyleSheet, Text, View, TextInput, Scrollview,
  TouchableOpacity, Button, ImageButton, Image, TextField, ScrollView, Dimensions,
  Alert, Platform, Communications, Linking, StatusBar} from 'react-native';
import ljusag from './lg.png';
import Main from './Main';
import Devider from './Utilities/Devider';
import FacebookSignInButton from './Utilities/FacebookSignInButton';
import GoogleSignInButton from './Utilities/GoogleSignInButton';
//import { StackNavigator, SwitchNavigator  } from 'react-navigation';
//import {TabNavigator, SwitchNavigator, Icon, NavigatorIOS} from 'react-native';
import { SwitchNavigator,TabNavigator, StackNavigator  } from 'react-navigation';

export default class LoggingIn extends React.Component {
  //För att dölja den vita headern
  static navigationOptions = {
    header: null
  }
  constructor(props){
    super(props);
    this.state={

        username: "",
        password:"",
        testLatitude: "",
        testLongitude: "",
    }
    this.signIn = this.signIn.bind(this);
    this.navigate = this.props.navigation.navigate;
    this.params = this.props.navigation.state.params;
  }


  register(){
    this.props.navigation.navigate("register");
  }

  signIn(){

         console.log("i logg", this.state.testLatitude )

       if(this.state.username === undefined || this.state.username == ''){

         alert("Username can't be empty")

       } else {

         fetch('https://pvt.dsv.su.se/Group08/login', {
        method: 'POST',
        headers: {
           'Accept': 'application/json',
          // 'Accept' : "application/json",
          'Content-Type': "application/json"},
          // 'Accept': 'text/plain',
          // 'Content-Type': 'text/plain'},
        body: JSON.stringify({

           "username": "testuser23",

          // "username": this.state.username,
          //
          // "password": this.state.password

          //latitude: this.state.originLatitude,

           "password": "testpass2"
        })
      }).
        then((response) => {
          console.log(response)

          if(response.ok){
            response.json().then(json =>{
              console.log("json body", json)
              if(json.Login === true){
                //console.log("det funkar")
                this.navigate({
                routeName: 'main',
                key: 'main',
                params: {
                   username: this.state.username,
                   testLat: this.state.testLatitude,
                   testLong: this.state.testLongitude
                }
             });
              }
            })

          }

          //console.log('Done', response);

        });

         // this.navigate("main", {

         //   params: {

         //   username: this.state.username,

         //

         //   }

         // });

     }

   }

   signInWithFacebook(){
     this.navigate({
     routeName: 'facebook',
     key: 'facebook',
     params: {
     }
   });
 }

 signInWithGoogle(){
   this.navigate({
   routeName: 'google',
   key: 'google',
   params: {
   }
 });
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

  componentDidMount() {
     navigator.geolocation.getCurrentPosition(
       (position) => {
         this.setState({
           testLatitude: position.coords.latitude,
           testLongitude: position.coords.longitude,

         });
       },

       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
     );
 }

  render() {
    return(
      <View style={styles.loginScreenContainer}>
      <StatusBar barStyle="dark-content"/>
        <View style={styles.loginRoundBox}>
          <View style={styles.logotypeContainer}>
            <Image
              source={require('../assets/logotype.png')}
              resizeMode="contain"
              style={{
                resizeMode: 'contain',
                height: 120
              }}
            />
            <Text style={{fontFamily: 'Roboto_Bold', fontSize:20, color: "#555555", marginTop: 20 }}>
              Välkommen till Ljusa Gatan!
            </Text>
            <Text style={{fontFamily: 'Roboto_Light', fontSize:15, color: "#555555"}}>
            Den ljusaste vägen
            </Text>
          </View>
          <View style={styles.loginFieldContainer}>
              <TextInput
                value={this.state.username}
                placeholder={"Användarnamn"}
                placeholderTextColor={"#929292"}
                style ={styles.usernameInput}
                onChangeText={text => this.getUsername(text, 'username')}
              />
              <TextInput
                placeholderTextColor={"#929292"}
                style ={styles.passwordInput}
                value={this.state.password}
                secureTextEntry
                placeholder={"Lösenord"}
                onChangeText={text => this.getPasswordText(text, 'password')}    
              />
              <TouchableOpacity
                style ={styles.loginButton}
                onPress={() => {
                  this.signIn();
                }}>
                <Text>Logga in</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style ={styles.registerButton}
                onPress={() => {
                  this.signIn();
                }}>
                <Text>Registrera nytt konto</Text>
              </TouchableOpacity>
              
              <Devider text="Eller logga in med" width="80%" />
              <TouchableOpacity
                style={{width: "100%", alignItems: "center", marginBottom: 5}}
                onPress={() => {
                  this.signInWithFacebook();
                }}
                >
                <FacebookSignInButton/>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={{width: "100%", alignItems: "center"}}
                onPress={() => {
                  this.signInWithGoogle();
                }}
                >
                <GoogleSignInButton/>
              </TouchableOpacity> 
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginScreenContainer:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    height: "100%"
  },
  loginRoundBox:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: "85%",
    height: "85%",
    backgroundColor: "#FFFFFF",
    borderRadius:15,
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 },
  },
  logotypeContainer:{
    alignItems: 'center',
  },
  loginFieldContainer:{
    width: "100%",
    alignItems: "center",
    marginTop: 20
  },
  usernameInput:{
    height: 40,
    width: "80%",
    paddingLeft: 15,
    backgroundColor: "#f0f0f0",
    borderRadius:5,
    fontSize: 15,
    fontFamily: 'Roboto_Medium'
  },
  passwordInput:{
    height: 40,
    width: "80%",
    paddingLeft: 15,
    backgroundColor: "#f0f0f0",
    borderRadius:5,
    fontSize: 15,
    fontFamily: 'Roboto_Medium',
    marginTop: 5
  },
  loginButton:{
    height: 40,
    width: "80%",
    backgroundColor: "#d9d15b",
    borderRadius:5,
    marginTop: 5,
    alignItems: "center",
    justifyContent: 'center',
  },
  registerButton:{
    height: 40,
    width: "50%",
    backgroundColor: "#f0f0f0",
    borderRadius:5,
    marginTop: 5,
    alignItems: "center",
    justifyContent: 'center',
  }
  
  
});


//Gammal return:
/*

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
            onPress={() => {
              this.signIn();
            }}
            title="Sign in"
          />
          <Button
            onPress={() => {
              this.signInWithFacebook();
            }}
            title="Sign in with facebook"
          />

          <Button
            Button onPress={() => {
              this.signInWithGoogle();
            }}
            title="Sign in with Google"
          />
        </View>

        <View style ={styles.footer}>
          <Button
            styles ={styles.signUpBtn}
            onPress={() => {
              this.register();
            }}
            title="Sign up"
          />
        </View>
      </View>

*/

/*
  Gammal style:
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
}*/