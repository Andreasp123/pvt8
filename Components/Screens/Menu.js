import React from 'react';
import { StyleSheet, Text, View, NavigatorIOS, Button, Alert, Prompt, prompt, AlertIOS, TouchableHighlight, TouchableOpacity
 } from 'react-native';
 import {LoginButton, ShareDialog} from 'react-native';
 import { FontAwesome, EvilIcons } from '@expo/vector-icons';
 import MenuItem from "../Utilities/MenuItem"
 import Devider from "../Utilities/Devider"


import { SwitchNavigator,TabNavigator, StackNavigator,createSwitchNavigator, createStackNavigator
  } from 'react-navigation';
//import { SwitchNavigator, TabNavigator, StackNavigator  } from 'react-native';


export default class Menu extends React.Component {

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
      latitude: '',
      longitude: '',
      createMeetUp: false,
      friendToMeet: '',
    }
  }



  setShareLocation(){
    console.log(this.state.shareGPS)
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
    console.log(this.state.shareLocation)
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
      console.log("i setsafe", report)
      console.log(this.state.username, this.state.userReport, this.state.latitude, this.state.longitude)
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
      shareGPS:true
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
    console.log("i exit först", this.state.shareGPS)
    this.setState({
      shareGPS: true
    })
    console.log("efter setstate", this.state.shareGPS)

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
      <View style={styles.container}>
      {/*
          Dela trygg plats
          Lägg till vän
          Dela min plats
          Tillbaka
        */}
        <View style={styles.profileContainer}>
          <View style={styles.profileMiddleCointainer}>
            <View style={styles.profilePictureAndName}>
              <EvilIcons name="user" size={80} color="#ffffff" />
              <Text style={styles.name}>{this.state.username}</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuContainer}>

          <TouchableOpacity style={{width: "90%"}} onPress={() => {this.reportEvent();}}>
            <MenuItem value="Rapportera otrygg händelse" symbol="frown-o"/>
          </TouchableOpacity>

          <TouchableOpacity style={{width: "90%"}} onPress={() => {this.reportSafePlace();}}>
            <MenuItem value="Dela trygg plats" symbol="smile-o"/>
          </TouchableOpacity>

          <TouchableOpacity style={{width: "90%"}} onPress={() => {this.addFriend();}}>
            <MenuItem value="Lägg till vän" symbol="user-plus"/>
          </TouchableOpacity>

          <TouchableOpacity style={{width: "90%"}} onPress={() => {this.onClickShareLocation();}}>
            <MenuItem value={this.state.shareLocation} symbol="map-marker"/>
          </TouchableOpacity>

          <TouchableOpacity style={{width: "90%"}} onPress={() => {this.meetFriend();}}>
            <MenuItem value="Skapa mötesplats" symbol="map-marker"/>
          </TouchableOpacity>

          <TouchableOpacity style={{width: "90%", alignItems: "center", height: 45, backgroundColor: "#d9d15b", borderRadius:5, justifyContent: "center", position: "absolute", bottom: 30}} onPress={() => {this.exitProfileBtn();}}>
            <Text style={{fontSize: 25}}>Tillbaka</Text>
          </TouchableOpacity>

        </View>
      </View>



    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  profileContainer: {
    flex: 1,
    backgroundColor: "#929292",
    flexDirection: "column",
    alignItems: "center",
    //justifyContent: "center",
    paddingTop: 40,
    justifyContent: "space-evenly",
    width: "100%"
  },
  profileMiddleCointainer: {
    flexDirection: "row",
    width: "85%"
  },
  profilePictureAndName:{
    flexDirection: "row",
    alignItems: "center",
  },
  name:{
    fontSize: 22,
    color: "#ffffff",
    marginLeft: 15,
    fontFamily: 'Roboto_Medium'
  },
  menuContainer: {
    flex: 6,
    backgroundColor: "#f0f0f0",
    width: "100%",
    alignItems: "center",
    paddingTop: 20
  }
});

/*

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

    <Button style ={styles.exitBtn}
    Button onPress={() => {
      this.exitProfileBtn();
    }}
    title="Exit"
    />
    </View>


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
  }
*/
