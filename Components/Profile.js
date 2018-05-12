import React from 'react';
import { StyleSheet, Text, View, NavigatorIOS, Button,
 } from 'react-native';

//import FavouritePlaces from './Components/FavouritePlaces';
//import testMain from './Components/testMain';
//import testnavigation from './Components/testnavigation';

import { SwitchNavigator,TabNavigator, StackNavigator,createSwitchNavigator, createStackNavigator
  } from 'react-navigation';
//import { SwitchNavigator, TabNavigator, StackNavigator  } from 'react-native';


export default class Profile extends React.Component {

  constructor(props){
    super(props);
    this.navigate = this.props.navigation.navigate;
    this.params = this.props.navigation.state.params;

    this.state={
      username : this.props.navigation.state.params.username,

      shareGPS: false,
      shareLocation : 'Dela min plats',
      händelse : '',
      userReport: '',

    }
  }

  onClickShareLocation(){
    if(this.state.shareLocation === 'Dela min plats'){
      this.setState({
        shareLocation : 'Sluta dela plats',
        shareGPS: true
      })
    } else {
      this.setState({
        shareLocation: 'Dela min plats',
        shareGPS: false
      })
    }
  }

//hjälpmetod till reportEvent för att kunna hämta ut värdet användaren skriver in
  setUserReport(report){
    console.log("här ens?")
    this.setState({
      userReport: report
    })
    console.log(this.state.userReport)
  }

//användarrapport, otrygg händelse
  reportEvent(){
    // glöm ej call mot databas i setUserReport
    AlertIOS.prompt(
   'Rapportera otrygg händelse',
   'Vad har hänt?',
   [
     {
       text: 'Cancel',
       onPress: () => console.log('Cancel Pressed'), style: 'cancel',
     },
     {
       text: 'OK', onPress: this.setUserReport.bind(this),
     },
   ],
   );
  }

  exitProfileBtn(){
    this.navigate({
    routeName: 'main',
    key: 'main',
    params: {
       username: this.state.username,
       shareGPS: this.state.shareGPS,
    }
  });
  }


  render() {

    return (
    <View style ={styles.container}>




    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
