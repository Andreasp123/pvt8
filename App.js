import React from 'react';
import { StyleSheet, Text, View, NavigatorIOS, Button,
 } from 'react-native';
import Main from './Components/Main';
import Login from './Components/Login';
import FavouritePlaces from './Components/FavouritePlaces';
import LoggingIn from './Components/LoggingIn';
import favPlaces from './Components/FavPlaces';
import Register from './Components/Register';
import Profile from './Components/Profile';
import facebookLogin from './Components/facebookLogin';
import GoogleLogin from './Components/GoogleLogin';
//import FavouritePlaces from './Components/FavouritePlaces';
//import testMain from './Components/testMain';
//import testnavigation from './Components/testnavigation';
import StreetLamp from './Components/StreetLamp';
import data from './Components/data';
import { SwitchNavigator,TabNavigator, StackNavigator,createSwitchNavigator, createStackNavigator
  } from 'react-navigation';
//import { SwitchNavigator, TabNavigator, StackNavigator  } from 'react-native';

const mainOptions = createSwitchNavigator({
  main : Main,
  favPlaces : favPlaces,
  favouritePlaces : FavouritePlaces,
  register : Register,
  loggingIn : LoggingIn,
  facebook : facebookLogin,
  google : GoogleLogin,
  profile : Profile
  //testmain : testMain,


})
const introStack = createStackNavigator({
  loggingIn : LoggingIn,
  register : Register,
  facebook : facebookLogin,
  google : GoogleLogin,
  profile : Profile
})

const SwNavigator = createSwitchNavigator({

  loggingIn : introStack, // denna ska ligga överst
  main : Main,
  //testmain : testMain,
  favPlaces : favPlaces,
  favouritePlaces : FavouritePlaces,
  register : Register,
  facebook : facebookLogin,
  google : GoogleLogin,
  profile : Profile

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
