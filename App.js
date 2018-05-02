import React from 'react';
import { StyleSheet, Text, View, NavigatorIOS, Button,
 } from 'react-native';
import Main from './Components/Main';
import Login from './Components/Login';
import FavouritePlaces from './Components/FavouritePlaces';
import LoggingIn from './Components/LoggingIn';
import favPlaces from './Components/FavPlaces';
import Register from './Components/Register'
//import FavouritePlaces from './Components/FavouritePlaces';

//import testnavigation from './Components/testnavigation';
import StreetLamp from './Components/StreetLamp';
import data from './Components/data';
import { SwitchNavigator,TabNavigator, StackNavigator  } from 'react-navigation';
//import { SwitchNavigator, TabNavigator, StackNavigator  } from 'react-native';

const mainOptions = SwitchNavigator({
  main : Main,
  favPlaces : favPlaces,
  favouritePlaces : FavouritePlaces,
  register : Register,
  loggingIn : LoggingIn,


})
const introStack = StackNavigator({
  loggingIn : LoggingIn,
  register : Register
})

const SwNavigator = SwitchNavigator({
  //login : introStack,
  loggingIn : introStack,
  main : Main,
  favPlaces : favPlaces,
  favouritePlaces : FavouritePlaces,
  register : Register

})
export default class App extends React.Component {

  _handleBackPress() {
    this.props.navigator.pop();
  }



  constructor(props){
    super(props);
    myString : 'detta är min string';

    this.state={
      testState : "it's a test",

    }
    const enString = this.state.myString;
  }



  getTestState(){
    return this.state.testState;
  }

  render() {
let stringTest = 'hej';
    return (

      //<mainOptions />
      <SwNavigator />
      //<Main/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
