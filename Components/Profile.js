import React from 'react';
import { StyleSheet, Text, View, NavigatorIOS, Button, Alert, Prompt, prompt, AlertIOS, TouchableHighlight
 } from 'react-native';
 import {LoginButton, ShareDialog} from 'react-native';


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
      shareGPS: true,
      shareLocation : 'Dela min plats',
      userReport: '',
      newFriend: '',
      latitude: '',
      longitude: '',
      createMeetUp: false,
      friendToMeet: '',


    }
  }



  setShareLocation(){
    fetch('https://pvt.dsv.su.se/Group08/setShareLocationFriends', {
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': "application/json"},
   body: JSON.stringify({
      "username":  this.state.username,
      "setShareLocation": this.state.shareGPS
   })
 }).
   then((response) => {
     if(response.ok){
       response.json().then(json =>{
       })
     }
   });
  }

  onClickShareLocation(){
    console.log(this.state.username)
    if(this.state.shareLocation === 'Dela min plats'){
      this.setState({
        shareLocation : 'Sluta dela plats',
        shareGPS: false
      })
      this.setShareLocation()


    } else {
      this.setState({
        shareLocation: 'Dela min plats',
        shareGPS: true
      })
      this.setShareLocation()
    }
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }


//denna skall flyttas till mainOptions
getInsecureLocation(){
  fetch('https://pvt.dsv.su.se/Group08/getInsecureLocations', {
 method: 'POST',
 headers: {
   'Accept' : "application/json",
   //'Accept': 'text/plain',
   'Content-Type': "application/json"},
   // 'Accept': 'text/plain',
   // 'Content-Type': 'text/plain'},
}).
 then((response) => response.json())
   .then((responseJson) => {
     //console.log(responseJson)
   }
   //console.log('Done', response);
   )
 };


//användarrapport, otrygg händelse
  reportEvent(){
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
      console.log("här?")
      this.setState({
        userReport: report
      })
      fetch('https://pvt.dsv.su.se/Group08/addInsecureLocation', {
     method: 'POST',
     headers: {
        'Accept': 'application/json',
       'Content-Type': "application/json"},
     body: JSON.stringify({

        "username":  "usermedemail",
        "locationname": this.state.userReport,
        "latitude": this.state.latitude,
        "longitude": this.state.longitude,

     })
   }).
     then((response) => {
       console.log(response)

       if(response.ok){
         response.json().then(json =>{

         })

       }

       //console.log('Done', response);

     });
    }

    reportSafePlace(){
      AlertIOS.prompt(
     'Det här var ju trevligt',
     'Vad gillar du med denna platsen?',
     [
       {
         text: 'Avbryt',
         onPress: () => console.log('Cancel Pressed'), style: 'Avbryt',
         //Skulle det crascha här så byt ut text och style från avbryt till cancel
       },
       {
         text: 'Dela', onPress: this.setSafePlace.bind(this),
       },
     ],
     );
    }

    setSafePlace(report){
      console.log("här?")
      this.setState({
        userReport: report
      })
      fetch('https://pvt.dsv.su.se/Group08/addSecureLocation', {
     method: 'POST',
     headers: {
        'Accept': 'application/json',
       'Content-Type': "application/json"},
     body: JSON.stringify({

        "username":  this.state.username,
        "locationname": this.state.userReport,
        "latitude": this.state.latitude,
        "longitude": this.state.longitude,

     })
   }).
     then((response) => {
       console.log(response)

       if(response.ok){
         response.json().then(json =>{

         })

       }

       //console.log('Done', response);

     });
    }

    // skapa mötesplats
    meetFriend(){
      AlertIOS.prompt(
     'Vem ska du träffa?',
     'Användarnamn:',
     [{
         text: 'Avbryt',
         onPress: () => console.log('Cancel Pressed'), style: 'cancel',
       },
       {
         text: 'OK', onPress: this.meetAtPlace.bind(this),
       },
     ],
     );
    }

    meetAtPlace(friend){
      this.setState({friendToMeet: friend,
        shareGPS: true
      })

      AlertIOS.prompt(
     'Vart ska ni träffas?',
     'Destination:',
     [{
         text: 'Avbryt',
         onPress: () => console.log('Cancel Pressed'), style: 'cancel',
       },
       {
         text: 'OK', onPress: this.askFriendToMeet.bind(this),
       },
     ],
     );
    }

    askFriendToMeet(destination){
      this.setState({
        meetingPlace: destination,
        createMeetUp: true,
      })

      fetch('https://pvt.dsv.su.se/Group08/meetingRequest', {
     method: 'POST',
     headers: {
       //'Accept' : "application/json",
       'Accept': 'application/json',
       'Content-Type': "application/json"},
       // 'Accept': 'text/plain',
       // 'Content-Type': 'text/plain'},
     body: JSON.stringify({
       "username_sender": this.state.username,
       "username_receiver": this.state.friendToMeet,
       "destination": this.state.meetingPlace,
       "meeting_name": this.state.meetingPlace

     })
   }).
     then((response) => {
       console.log(response)

       //console.log('Done', response);
     });
    }



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
  setNewFriend(sendToFriend){
    console.log("new friend", sendToFriend)
    console.log("username", this.state.username)
    this.setState({
      sendToFriend: sendToFriend
    })
    fetch('https://pvt.dsv.su.se/Group08/friendRequest', {
   method: 'POST',
   headers: {
     //'Accept' : "application/json",
     'Accept': 'text/plain',
     'Content-Type': "application/json"},
     // 'Accept': 'text/plain',
     // 'Content-Type': 'text/plain'},
   body: JSON.stringify({
     "username_sender": this.state.username,
     "username_receiver": this.state.sendToFriend

   })
 }).
   then((response) => {
     console.log(response)
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
    console.log("friendtomeet",this.state.friendToMeet)
    console.log("meetingplace",this.state.meetingPlace)
    this.navigate({
    routeName: 'main',
    key: 'main',
    params: {
       username: this.state.username,
       shareGPS: this.state.shareGPS,
       //dessa under ska byta namn sen men måste bytas i alla klasser då så får heta så test tills vidare
       testLat: this.state.latitude,
       testLong: this.state.longitude,
       createMeetUp: this.state.createMeetUp,
       meetingPlace: this.state.meetingPlace
    }
  });
  }


  render() {

    this.getInsecureLocation()

    return (
    <View style ={styles.container}>
    <Button style ={styles.reportEvent}
    Button onPress={() => {
      this.reportEvent();
    }}
    title="Rapportera händelse"
    />
    <Button style ={styles.reportEvent}
    Button onPress={() => {
      this.reportSafePlace();
    }}
    title="Dela trygg plats"
    />


    <Button style ={styles.addFriendBtn}
    Button onPress={() => {
      this.addFriend();
    }}
    title="Lägg till vän"
    />

    <Button style ={styles.shareBtn}
    Button onPress={() => {
      this.onClickShareLocation();
    }}
    title={this.state.shareLocation}
    />

    <Button style ={styles.shareBtn}
    Button onPress={() => {
      this.meetFriend();
    }}
    title={"Skapa mötesplats"}
    />

    <Button style ={styles.exitBtn}
    Button onPress={() => {
      this.exitProfileBtn();
    }}
    title="Exit"
    />








    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  reportEvent:{
    top: 35,
  },
  shareBtn:{
    top: 75,
  },
  exitBtn:{
    top: 115
  },
  tweetBtn:{
    top: 155
  },
  FriendBtn:{
    top: 155
  },
  shareText: {
    fontSize: 20,
    margin: 10,
  },
});
