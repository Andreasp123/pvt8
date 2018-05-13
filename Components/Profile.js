import React from 'react';
import { StyleSheet, Text, View, NavigatorIOS, Button, Alert, Prompt, prompt, AlertIOS
 } from 'react-native';


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
      userReport: '',
      newFriend: '',

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



//användarrapport, otrygg händelse
  reportEvent(){
    // glöm ej call mot databas i setUserReport
    AlertIOS.prompt(
   'Rapportera otrygg händelse',
   'Vad har hänt?',
   [
     {
       text: 'Avbryt',
       onPress: () => console.log('Cancel Pressed'), style: 'Avbryt',
       //Skulle det crascha här så byt ut text och style från avbryt till cancel
     },
     {
       text: 'Rapportera', onPress: this.setUserReport.bind(this),
     },
   ],
   );
  }
  //hjälpmetod till reportEvent för att kunna hämta ut värdet användaren skriver in
  //glöm inte att skicka iväg till databasen när endpointen är uppe
    setUserReport(report){
      this.setState({
        userReport: report
      })
      console.log(this.state.userReport)
    }

//Hjälpmetod till addFriend
//måste calla databasen

  //lägga till en vän
  addFriend(){
    AlertIOS.prompt(
   'Lägg till vän',
   'Användarnamn:',
   [{
       text: 'Avbryt',
       onPress: () => console.log('Cancel Pressed'), style: 'cancel',
     },
     {
       text: 'OK', onPress: this.setNewFriend.bind(this),
     },
   ],
   );
  }
  //hjälpmetod till addfriend
  setNewFriend(newFriend){
    this.setState({
      newFriend: newFriend
    })
    fetch('https://pvt.dsv.su.se/Group08/friendRequest', {
   method: 'POST',
   headers: {
     'Accept' : "application/json",
     'Content-Type': "application/json"},
     // 'Accept': 'text/plain',
     // 'Content-Type': 'text/plain'},
   body: JSON.stringify({
     "username_sender": this.state.username,
     "username_receiver": this.state.newFriend

   })
 }).
   then((response) => {
     if(response.ok === false){
       console.log("no go")
     }else{
       'Vänförfrågan skickad',
       [
         {text: 'OK', onPress: () => console.log('OK Pressed')},
       ],
       { cancelable: false }
     }
     //console.log('Done', response);
   });
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
