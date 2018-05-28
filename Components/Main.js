import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Scrollview,
  TouchableOpacity, Button, ImageButton, Image, TextField, ScrollView, Dimensions,
  Alert, Platform, Communications, Linking, LoginButton, TouchableHighlight,ExpandableView,
  Animation, Animated, AnimatedRegion, prompt, AlertIOS, StatusBar } from 'react-native';
  import { FontAwesome, Polyline } from '@expo/vector-icons';

//import {TabNavigator, SwitchNavigator, Icon, NavigatorIOS} from 'react-native';
import { SwitchNavigator, TabNavigator, StackNavigator  } from 'react-navigation';
import { Constants  } from 'expo';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import styles from './styles';
import doge from './doge.jpeg';
import warning from './warning.jpg';

import data from './data';

import call from './call';
import testdata from './testdata';
import street from './StreetLamp';
import FavouritePlaces from './FavouritePlaces';
import testnavigation from './testnavigation';
import MapViewDirections from './MapViewDirections';
import FavPlaces from './FavPlaces';
import register from './Register';
import App from '../App'


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyCYvMpmVhFc0ydILEuXGJNYNGFnBoKPCL8';
const requestCoordinates = 'AIzaSyAprDH-yXK21Imj4qwj0zyKbzAdWHTom9M'

//const myjsonstring = 'https://pvt.dsv.su.se/Group08/getLamps?working=false';

export default class Main extends Component {


	constructor(props) {
		super(props);
    this.navigate = this.props.navigation.navigate;
    this.params = this.props.navigation.state.params;



		this.state = {
      username : this.props.navigation.state.params.username,
      shareGPS: this.props.navigation.state.params.shareGPS,
      meetingPlace: this.props.navigation.state.params.meetingPlace,
      createMeetUp: this.props.navigation.state.params.createMeetUp,
      acceptMeetingRequest: false,
      fetchedMeetUps: false,
      meetUpPlace: '',

      friendToMeet: [
        {
        latitude:59.335493,
        longitude:18.085179
        }
      ],


      testCoordinates:[],

      checkedMap: false,
      fetchedLamps: false,
      fetchWorkingLamps: false,
      fetchInsecureLocations: false,
      fetchSecureLocations: false,
      placeHolderInput: 'Vart ska du?',
      workingLamps:[],
      roadDescription:[],

      secureLocations:[],

      testLat:this.props.navigation.state.params.testLat,
      testLong:this.props.navigation.state.params.testLong,
      testDestination : this.props.navigation.state.params.testDestination,
      testDest: '',
      googleResponse: [],
      userReport: '',
      friendRequests: [],
      friendsCoordinatesMeetUp:[],
      friendsLocation:[],


      mapToUse:[],
      current: 'night',

      destinationLocation : [],
      searchField: '',

      latitude: 59.326822,
      longitude: 18.071540,

      friendsCoordinatesNotAccepted: [],
      friendsCoordinatesAccepted: [],
      friendsCoordinates: [],
      friendsOrigin:[],

      dataSource:[],

      adamData:[],
      markTest:[],
      insecureLocationsData:[],
      testValue: 'hejsan',
      panicData:[],
      animatedTop: new Animated.Value(0),
      error: null,
      origin: [
        {
          latitude: this.props.navigation.state.params.testLat,
					longitude: this.props.navigation.state.params.testLong,
        },
      ],

      panicLocation: [],

			coordinates: [
        {
        latitude: this.props.navigation.state.params.testLat,
        longitude: this.props.navigation.state.params.testLong,
        }
			],
		};


		//this.mapView = null;
	}
  favPlaces(){

    this.navigate({
    routeName: 'favPlaces',
    key: 'favPlaces',
    params: {
       username: this.state.username
    }
 });
    // this.props.navigation.navigate("favPlaces")
  }

  testAlert(){
    alert("detta funkar också")
  }

  //Ny
  checkFriendRequests(){
    fetch('https://pvt.dsv.su.se/Group08/getFriendRequests', {
   method: 'POST',
   headers: {
     'Accept' : "application/json",
     'Content-Type': "application/json"},
     // 'Accept': 'text/plain',
     // 'Content-Type': 'text/plain'},
   body: JSON.stringify({
     "username": this.state.username
   })
 }).
 then((response) => {
   if(response.ok){
     response.json().then(json =>{
       console.log("i checkfriends",json)

       if(json[0] !== undefined){
         this.setState({
           friendRequests : json,
           friendsName: json[0].username
         })
       }

       if(json[0].username !== undefined){
         console.log("friendsname inte undefined", this.state.friendsName)
         this.acceptFriendRequest(this.state.friendsName)
       }
     })

   }

  });
}
//Hjälpmetod till checkFriendRequests
acceptFriendRequest(friendsName){
  console.log("är i accept där jag inte borde vara")

  Alert.alert(`${friendsName} vill lägga till dig som vän`, undefined, [
  {
    text: 'Avböj',
    onPress: () => console.log('Cancel Pressed'),
    style: 'cancel',
  },
  { text: 'Acceptera', onPress: () => this.confirmFriendRequest(this) },
]);

  }
  //hjälpmetod till acceptFriendRequest
confirmFriendRequest(){
  console.log("i confirm")
  fetch('https://pvt.dsv.su.se/Group08/confirmFriendRequest', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
   // 'Accept' : "application/json",
   'Content-Type': "application/json"},
   // 'Accept': 'text/plain',
   // 'Content-Type': 'text/plain'},
  body: JSON.stringify({

    "username_sender": this.state.friendsName,
    "username_receiver": this.state.username
  })
  }).
  then((response) => {
   if(response.ok){

   }
   //console.log('Done', response);
  });
}

//everything meetingPlace
checkMeetUps(){
  console.log("i checkMeetUps")
  if(!this.state.fetchedMeetUps){
    this.setState({fetchedMeetUps: true})
    fetch('https://pvt.dsv.su.se/Group08/getMeetingRequests', {
   method: 'POST',
   headers: {
     'Accept' : "application/json",
     'Content-Type': "application/json"},
     // 'Accept': 'text/plain',
     // 'Content-Type': 'text/plain'},
   body: JSON.stringify({
     "username": this.state.username
   })
 }).

 then((response) => {
   console.log(response)
   if(response.ok){
     response.json().then(json =>{
       console.log("i checkmeetups", json)
       console.log("json.username",json[0].username)
       if(json[0].username !== undefined){
         this.setState({friendsName: json[0].username})
         this.acceptFriendsMeeting(json[0].username)
       }

     })
   }
  });
}
}
//Hjälpmetod till checkFriendRequests
acceptFriendsMeeting(friendsName){
  console.log("i acceptfriendsMeeting", friendsName)
Alert.alert(`${friendsName} vill skapa en mötesplats`, undefined, [
{
  text: 'Avböj',
  onPress: () => console.log('Cancel Pressed'),
  style: 'cancel',
},
{ text: 'Acceptera', onPress: () => this.confirmFriendsMeeting(this) },
]);
}

confirmFriendsMeeting(){
console.log("i confirm")
console.log("i confirm friendsname", this.state.friendsName)
fetch('https://pvt.dsv.su.se/Group08/confirmMeetingRequest', {
method: 'POST',
headers: {
  'Accept': 'application/json',
 // 'Accept' : "application/json",
 'Content-Type': "application/json"},
 // 'Accept': 'text/plain',
 // 'Content-Type': 'text/plain'},
body: JSON.stringify({

  // "username_sender": this.state.username,
  // "username_receiver": this.state.friendsName

  "username_sender": this.state.friendsName,
  "username_receiver": this.state.username
})
}).
then((response) => {
 if(response.ok){
   response.json().then(json =>{
     console.log("i confirm meeting", json)
   })
 }
 //console.log('Done', response);
});

this.getMeetingPlaces()
}

getMeetingPlaces(){

  console.log("kom till getMeetingPlaces")
  fetch('https://pvt.dsv.su.se/Group08/getMeetingPlaces', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
   // 'Accept' : "application/json",
   'Content-Type': "application/json"},
   // 'Accept': 'text/plain',
   // 'Content-Type': 'text/plain'},
  body: JSON.stringify({
    "username": this.state.username
  })
  })
  .then((response) => response.json())
  .then((json) =>{
    var lastPlace = json.length-1;
    console.log(json[lastPlace].val)


    this.setState({
      meetUpPlace: json[lastPlace].val,
    })
    //console.log(json[0].val)
    this.setMeetUpPlace()
  });

}

setMeetUpPlace(){
  console.log("meetupplace", this.state.meetUpPlace)

  var dontscrewup = 'https://maps.googleapis.com/maps/api/geocode/json?address=lidingö&key=AIzaSyAprDH-yXK21Imj4qwj0zyKbzAdWHTom9M';
  var preLocation = "https://maps.googleapis.com/maps/api/geocode/json?address=";
  var postLocation = "&key=AIzaSyAprDH-yXK21Imj4qwj0zyKbzAdWHTom9M";
  var decidedDestination = this.state.meetUpPlace;
  var combined = preLocation + decidedDestination + postLocation;
  console.log("combined", combined)
  //console.log("nu så", preLocation + decidedDestination + postLocation )
  return fetch(preLocation + decidedDestination + postLocation)
   .then((response) => response.json())
   .then((responseJson) => {
     this.setState({
       gResponse : responseJson,

     })
     console.log(responseJson)
     if(this.state.gResponse.results[0].geometry.location.lat !== undefined){
         this.setState({
           coordinates: [
             {
               latitude: this.state.gResponse.results[0].geometry.location.lat,
               longitude: this.state.gResponse.results[0].geometry.location.lng
             },
           ],
           friendsCoordinatesMeetUp: [
             {
               latitude: this.state.gResponse.results[0].geometry.location.lat,
               longitude: this.state.gResponse.results[0].geometry.location.lng
             },
           ],
         })

     }

   })
   .catch((error) =>{
     console.log(error);
   });
   this.fetchFriendShareLocation()
}

fetchAndShareLocations(){
  if(this.state.friendsCoordinatesMeetUp !== undefined || this.state.friendsCoordinatesMeetUp !== ''){
    this.fetchFriendShareLocation()
    this.shareMyLocation()
  }
}


getWorkingLamps(){
  if(!this.state.fetchWorkingLamps){
    return fetch('https://pvt.dsv.su.se/Group08/getLamps?working=true')
       .then((response) => response.json())
       .then((responseJson) => {
         this.setState({testCoordinates : responseJson})
         let wLamps = responseJson.map(circle => (
              <MapView.Circle
              key={circle.id}
              center={{
              latitude: circle.lat,
              longitude: circle.lng,
            }}
            radius={1}
            strokeWidth = { 1 }
            strokeColor = { 'yellow' }
            fillColor = { '#1a66ff' }
            animation = {Animated.bounce}
            />
          ));
           this.setState({
             workingLamps : wLamps,
           });
       })
       .catch((error) =>{
         console.error(error);
       });
  }
  console.log("testc i getworking", this.state.testCoordinates)
  this.setState({
    fetchWorkingLamps: true
  })
 //  https://pvt.dsv.su.se/Group08/getRoute?name=Frutunnelbana
 }

 fetchFromAlgorithm(){
   return fetch('https://pvt.dsv.su.se/Group08/getRoute?name=Frutunnelbana')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({roadDescription : responseJson})

      })
      .catch((error) =>{
        console.error(error);
      });
 }



  fetchPanicLocations(){
    return fetch('https://pvt.dsv.su.se/Group08/getPanicLocations')
     .then((response) => response.json())
     .then((responseJson) => {
       this.setState({panicData : responseJson})
       //console.log(this.state.panicData)




         // this.setState({
         //   adamData : testAdam1,
         // });
     })
     console.log("response igen", responseJson)
     .catch((error) =>{
       console.error(error);
     });
  }

//dela min och hämta användares coordinater nedan
shareMyLocation(){
    //console.log("sharegps i main", this.state.shareGPS)

    if(this.state.shareGPS){

      fetch('https://pvt.dsv.su.se/Group08/setUserLocation', {
     method: 'POST',
     headers: {
        'Accept': 'application/json',
       'Content-Type': "application/json"},
     body: JSON.stringify({

        "username":  this.state.username,
        "latitude": this.state.latitude,
        "longitude": this.state.longitude,
     })
   }).
     then((response) => {
       if(response.ok){
       }
     });
    }
  }

  fetchFriendShareLocation(){

    fetch('https://pvt.dsv.su.se/Group08/getFriendLocations', {
   method: 'POST',
   headers: {
      'Accept': 'application/json',
     'Content-Type': "application/json"},
   body: JSON.stringify({
      "username":  this.state.username,
   })
 }).
 then((response) => {
   if(response.ok){
     response.json().then(json =>{
       if(json[0].username !== undefined){


            let friend = json.map(friend => (
              <MapView.Marker
              key={friend.dateTime}
              coordinate={{
              latitude: friend.lat,
              longitude: friend.lng,
            }}
              title={friend.username}
              description={'Här är jag'}
              pinColor={'green'}
                />
            ));
            //console.log("friend", friend)
            this.setState({
              friendsCoordinates: friend,
              friendsLocation:[{
                latitude:json[0].lat,
                longitude: json[0].lng
              }]

            })

            // if(json.username === this.state.friendsName){
            //   friendToMeet:[{
            //     latitude: json.lat,
            //     longitude: json.lng
            //   }]
            // }



       }
     })
   }

 });
}




     // let friend = responseJson.map(friend => (
     //      <MapView.Marker
     //      key={friend.lat}
     //      coordinate={{
     //      latitude: friend.lat,
     //      longitude: friend.lng,
     //    }}
     //    title={friend.username}
     //    description={'Här är jag'}
     //    pinColor={'green'}
     //    />
     // ));

     //     this.setState({
     //       friendsCoordinates: friend,
     //     });
     //   })
     //   .catch((error) =>{
     //     console.error(error);
     //   });
     // }

  // friendShareLocation(){
  //   acceptFriendRequest(friendsName){
  //     Alert.alert(`${friendsName} dela sin plats med dig`, undefined, [
  //     {
  //       text: 'Avböj',
  //       onPress: () => console.log('Cancel Pressed'),
  //       style: 'cancel',
  //     },
  //     { text: 'Acceptera', onPress: () => this.confirmFriendRequest(this) },
  //   ]);
  //
  //     }
  // }

  fetchNotWorkingLamps(){
    if(!this.state.fetchedLamps){
      console.log("fetchar lampor")
      return fetch('https://pvt.dsv.su.se/Group08/getLamps?working=false')
       .then((response) => response.json())
       .then((responseJson) => {
         this.setState({data : responseJson})
         let circles = responseJson.map(circle => (
              <MapView.Circle
              key={circle.id}
              center={{
              latitude: circle.lat,
              longitude: circle.lng,
            }}
            radius={1}
            strokeWidth = { 1 }
            strokeColor = { 'red' }
            fillColor = { 'red' }
            animation = {Animated.bounce}
            />


         ));
           this.setState({
             dataSource : circles,
           });
       })
       .catch((error) =>{
         console.error(error);
       });
       this.setState({
         fetchedLamps: true
       })
    }
  }
  //
  // setMap(){
  //
  // //    this.setState({mapToUse : generatedMapStyle})
  //
  //   console.log("i setmap")
  //
  //     console.log("i setmap")
  //     fetch('https://pvt.dsv.su.se/Group08/getSunriseSunset', {
  //    method: 'POST',
  //    headers: {
  //      'Accept' : "text/plain",
  //       //'Accept' : "application/json",
  //      'Content-Type': "application/json"},
  //      //'Accept': 'text/plain',
  //      //'Content-Type': 'text/plain'},
  //    body: JSON.stringify({
  //
  //       latitude: this.state.latitude,
  //       longitude: this.state.longitude
  //    })
  //  }).
  //    then((response) => {
  //      //console.log("response i setmap", response)
  //      if(response.ok){
  //        response.json().then(json =>{
  //          console.log(json.current)
  //          if(json.current === 'day'){
  //
  //            console.log("det är day")
  //            this.setState({current: 'day'})
  //
  //          }
  //
  //        })
  //
  //      }
  //
  //      //console.log('Done', response);
  //
  //    });
  //
  //
  // }

  // changeMap(){
  //   if(this.state.current === 'day'){
  //     this.setState({mapToUse : generatedMapStyle})
  //   }
  //
  // }

  componentDidMount() {
    this.fetchAndShareLocations()
    this.checkMeetUps()
    this.shareMyLocation()
    this.fetchFriendShareLocation()
    this.getWorkingLamps()
    this.fetchPanicLocations()
    this.checkFriendRequests()
    this.getInsecureLocation()
    this.getSecureLocation()
    this.fetchPanicLocations()
    this.shareMyLocation()
    this.fetchNotWorkingLamps()


    Animated.timing(this.state.animatedTop, {
    toValue: 200, // position where you want the component to end up
    duration: 400 // time the animation will take to complete, in ms
  }).start()

    this.setState({testDest:this.props.navigation.state.params.testDest})

     navigator.geolocation.getCurrentPosition(
       (position) => {
         this.setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           origin: [
             {
               latitude: position.coords.latitude,
               longitude: position.coords.longitude,
             },
           ],
           panicLocation: [
             {
               latitude: position.coords.latitude,
               longitude: position.coords.longitude,
             },
           ],

           error: null,
         });

         //TESTARRRRRRRRR AIzaSyAprDH-yXK21Imj4qwj0zyKbzAdWHTom9M
             if(this.props.navigation.state.params.testDest !== undefined){

               var dontscrewup = 'https://maps.googleapis.com/maps/api/geocode/json?address=lidingö&key=AIzaSyAprDH-yXK21Imj4qwj0zyKbzAdWHTom9M';
               var preLocation = "https://maps.googleapis.com/maps/api/geocode/json?address=";
               var postLocation = "&key=AIzaSyAprDH-yXK21Imj4qwj0zyKbzAdWHTom9M";
               var decidedDestination = this.state.testDest;
               var combined = preLocation + decidedDestination + postLocation;
               //console.log("nu så", preLocation + decidedDestination + postLocation )
               return fetch(preLocation + decidedDestination + postLocation)
                .then((response) => response.json())
                .then((responseJson) => {
                  this.setState({
                    googleResponse : responseJson,

                  })
                  this.setState({
                    coordinates: [
                      {
                        latitude: this.state.googleResponse.results[0].geometry.location.lat,
                        longitude: this.state.googleResponse.results[0].geometry.location.lng
                      },
                    ],
                    // googleLat: this.state.googleResponse.results[0].geometry.location.lat,
                    // googleLong: this.state.googleResponse.results[0].geometry.locatio.lng
                  })


                })
                .catch((error) =>{
                  console.error(error);
                });
         }

       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
     );

     this.setState({
       username : this.props.navigation.state.params.username,
     })


      //adam

      // testar ta bort denna
      // let destination = this.state.coordinates.map(destination => (
      //   <MapViewDirections
      //   key={destination.latitude}
      //     origin={this.state.origin[0]}
      //     //origin={this.state.origin}
      //     destination={this.state.coordinates[0]}
      //     apikey={GOOGLE_MAPS_APIKEY}
      //     strokeWidth={3}
      //     strokeColor="hotpink"
      //     onReady={this.onReady}
      //     onError={this.onError}
      //   />
      //
      // ));

 }
 getInsecureLocation(){
   if(!this.state.fetchInsecureLocations){
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

        this.setState({
          insecureData: responseJson
        })
        let insecureMarkers = responseJson.map(markers => (
             <MapView.Marker
             key={markers.lat+ markers.lng}
             coordinate={{
             latitude: markers.lat,
             longitude: markers.lng,
           }}
           title={'Otrygg händelse' + markers.key}
           description={markers.val}
           pinColor={'red'}


           />

        ));
        this.setState({
          insecureLocationsData: insecureMarkers,
        })
      }

      //console.log('Done', response);
    );
   }

   this.setState({
     fetchInsecureLocations: true
   })

  }

  getSecureLocation(){
    console.log("i get secure")
    if(!this.state.fetchSecureLocations){
      fetch('https://pvt.dsv.su.se/Group08/getSecureLocations', {
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


         let secureMarkers = responseJson.map(markers => (
              <MapView.Marker
              key={markers.lat}
              coordinate={{
              latitude: markers.lat,
              longitude: markers.lng,
            }}
            title={markers.username}
            description={markers.val}
            pinColor={'green'}


            />

         ));
         this.setState({
           secureLocations: secureMarkers,
         })

       }

       //console.log('Done', response);
     );
    }

    this.setState({
      fetchSecureLocations: true
    })

   }

 handleClickFavourite = () => {
   this.navigate({
   routeName: 'favouritePlaces',
   key: 'favouritePlaces',
   params: {
      username: this.state.username
   }
 });

//    console.log(this.state.latitude)
//    this.navigate({
//    routeName: 'favPlaces',
//    key: 'favPlaces',
//    params: {
//       latitude: this.state.latitude
//    }
// });

     // this.props.navigation.navigate("favPlaces");

 }



//denna ska tas bort härifrån, finns i profile
setUserReport(report){

  this.setState({
    userReport: report
  })
  console.log(this.state.userReport)
}

handleClickMenu = () => {
   this.navigate({
     routeName: 'menu',
     key: 'menu',
     params: {
        username: this.state.username
     }
   })
}

//denna koden är endast tillagd på profile för att det var den enda knappen som fetchPanicLocations
//ska bytas ut, koden finns i profile
 handleClickProfile = () => {
   this.navigate({
   routeName: 'profile',
   key: 'profile',
   params: {
      username: this.state.username
   }
});

  //  AlertIOS.prompt(
  // 'Lägg till vän',
  // 'Användarnamn:',
  // [{
  //     text: 'Avbryt',
  //     onPress: () => console.log('Cancel Pressed'), style: 'cancel',
  //   },
  //   {
  //     text: 'OK', onPress: this.setNewFriend.bind(this),
  //   },
  // ],
  // );

  //  AlertIOS.prompt(
  // 'Rapportera otrygg händelse',
  // 'Vad har hänt?',
  // [
  //   {
  //     text: 'Cancel',
  //     onPress: () => console.log('Cancel Pressed'),
  //     style: 'cancel',
  //   },
  //   {
  //     text: 'OK', onPress: this.setUserReport.bind(this),
  //   },
  // ],
  // );
 }
 setNewFriend(sendToFriend){

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

 searchPlace(text, field){

   if(text.length > 3){
     console.log(text)
     this.setState({
       searchField : text,
     })
     this.getCoordinatesFromGoogle(text)
   }
   //console.log(this.state.searchField)
 }

 getCoordinatesFromGoogle(text){
   var dontscrewup = 'https://maps.googleapis.com/maps/api/geocode/json?address=lidingö&key=AIzaSyAprDH-yXK21Imj4qwj0zyKbzAdWHTom9M';
   var preLocation = "https://maps.googleapis.com/maps/api/geocode/json?address=";
   var postLocation = "&key=AIzaSyAprDH-yXK21Imj4qwj0zyKbzAdWHTom9M";
   var decidedDestination = text;
   var combined = preLocation + decidedDestination + postLocation;
   //console.log("nu så", preLocation + decidedDestination + postLocation )
   return fetch(preLocation + decidedDestination + postLocation)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        googleResponse : responseJson,

      })
      if(this.state.googleResponse.results[0].address_components[2].long_name !== undefined){
        if(this.state.googleResponse.results[0].address_components[1].long_name == 'Sverige' ||
        this.state.googleResponse.results[0].address_components[2].long_name == 'Sverige' ||
        this.state.googleResponse.results[0].address_components[3].long_name == 'Sverige' ||
        this.state.googleResponse.results[0].address_components[4].long_name == 'Sverige'
      ){
          this.setState({
            coordinates: [
              {
                latitude: this.state.googleResponse.results[0].geometry.location.lat,
                longitude: this.state.googleResponse.results[0].geometry.location.lng
              },
            ],
          })
        }
      }

    })
    .catch((error) =>{
      console.log(error);
    });


 }



 handleClick = () => {
   alert('Button clicked!');
 }


 handleClickPanic = () => {
//    fetch('https://pvt.dsv.su.se/Group08/sendPanicLocation', {
//   method: 'POST',
//   headers: {
//     'Accept' : "application/json",
//     'Content-Type': "application/json"},
//     // 'Accept': 'text/plain',
//     // 'Content-Type': 'text/plain'},
//   body: JSON.stringify({
//     "latitude": this.state.latitude,
//
//     //latitude: this.state.originLatitude,
//     "longitude": this.state.longitude
//
//   })
// }).
//   then((response) => {
//     if(response.ok === false){
//
//       console.log("no go")
//     }
//     //console.log('Done', response);
//   });

   Alert.alert(
  'SKRIK OCH PANIK',
  'Är du säker?',
  [
    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel', },
    {text: 'OK', onPress: this.panicClicked.bind(this),},
    //onPress: this.setUserReport.bind(this),
  ],
  { cancelable: false }
  )
}// !handleClickPanic

//hjälpmetod till handleClickPanic
panicClicked(){
  fetch('https://pvt.dsv.su.se/Group08/sendPanicLocation', {
 method: 'POST',
 headers: {
   'Accept' : "application/json",
   'Content-Type': "application/json"},
   // 'Accept': 'text/plain',
   // 'Content-Type': 'text/plain'},
 body: JSON.stringify({
   "latitude": this.state.latitude,

   //latitude: this.state.originLatitude,
   "longitude": this.state.longitude

 })
}).
 then((response) => {
 });
 this.callIfPanic()
}
//hjälpmetod till handleClickPanic
callIfPanic(){
  const args = {
 number: '112',
 prompt: false
}
call(args).catch(console.error)
}


	// onMapPress = (e) => {
	// 	if (this.state.coordinates.length == 2) {
	// 		this.setState({
	// 			coordinates: [
	// 				e.nativeEvent.coordinate,
	// 			],
	// 		});
	// 	} else {
	// 		this.setState({
	// 			coordinates: [
	// 				...this.state.coordinates,
	// 				e.nativeEvent.coordinate,
	// 			],
	// 		});
	// 	}
	// }

	onReady = (result) => {
		this.mapView.fitToCoordinates(result.coordinates, {
			edgePadding: {
				right: (width / 20),
				bottom: (height / 20),
				left: (width / 20),
				top: (height / 20),
			}
		});
	}

	onError = (errorMessage) => {
		Alert.alert(errorMessage);
	}


  // let markers = data.map(lamps => (
  //      <MapView.Marker
  //      key={lamps.id}
  //      coordinate={{
  //      latitude: lamps.lat,
  //      longitude: lamps.lng,



	render() {



    // let poltheline = this.state.workingLamps.map(description => (
    //      <MapView.Polyline
    //      key={description.id}
    //      coordinates={[
    //           { latitude: description.lat, longitude: description.lng },
    //
    //         ]}
    //         strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
    //   strokeColors={[
    //     '#7F0000',
    //     '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
    //
    //   ]}
    //   strokeWidth={6}
    // />
    //
    //   ));


    //console.log(this.state.friendsCoordinates)
    //this.getInsecureLocation()



    //console.log(this.state.adamData)

//     let testAdam = adamsTest.map(circles => (
//   <MapView.Circle.Animated
//   key={circles.lat}
//   center={{
//     latitude: circles.lat,
//     longitude: circles.lng
//   }}
//   radius={10}
//   strokeWidth = { 1 }
//   strokeColor = { '#1a66ff' }
//   fillColor = { '#1a66ff' }
//   />
//
//
// ));

    //console.log("här", this.state.testDest)



    // if(street.length > 1){
      let panicMarker = this.state.panicData.map(panic => (

        <MapView.Circle
        key={panic.id}
        center={{
        latitude: panic.lat,
        longitude: panic.lng,

      }}
      radius={3}
      strokeWidth = { 1 }
      strokeColor = { 'purple' }
      fillColor = { 'purple' }

      />

      ));
    // }
    // let insecureMarkers = this.state.insecureData.map(markers => (
    //      <MapView.Marker
    //      key={markers.key}
    //      coordinate={{
    //      latitude: markers.lat,
    //      longitude: markers.lng,
    //
    //
    //
    //    }}
    //    title={'Otrygg händelse'}
    //    description={markers.val}
    //
    //
    //    />
    //
    // ));

    // let markers = data.map(lamps => (
    //      <MapView.Marker
    //      key={lamps.id}
    //      coordinate={{
    //      latitude: lamps.lat,
    //      longitude: lamps.lng,
    //
    //
    //
    //    }}
    //    image={doge}
    //    title={lamps.id}
    //    description={lamps.id}
    //
    //
    //    />
    //
    // ));




    //DEN FUNGERANDE
    // för att slippa error
    let destination = this.state.coordinates.map(destination => (
      <MapViewDirections
      key={destination.latitude}
        origin={this.state.origin[0]}
        destination={this.state.coordinates[0]}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={3}
        strokeColor="hotpink"
        onReady={this.onReady}
        onError={this.onError}
      />

    ));



    let meetUp = this.state.friendsCoordinatesMeetUp.map(destination => (
      <MapViewDirections
      key={destination.latitude}
        //origin={this.state.friendToMeet[0]}
        origin={this.state.friendsLocation[0]}
        destination={this.state.coordinates[0]}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={3}
        strokeColor="green"
        onReady={this.onReady}
        onError={this.onError}
      />

    ));
        //Grafiska element
		return (

      <View style= {styles.container}>
        {/* Sätter vit färg på ikonerna i statusbaren */}
        <StatusBar barStyle="light-content"/>

        {/* Map view i helskärm */}
        <MapView style={styles.map}
          provider = { MapView.PROVIDER_GOOGLE }
          //customMapStyle = { this.state.mapToUse }
          customMapStyle = { generatedMapStyle }
          initialRegion={{
            latitude:this.state.testLat,
            longitude:this.state.testLong,
            //latitude:this.state.testLat,
            //longitude:this.state.testLong,
            // latitude:this.state.latitude,
            // longitude:this.state.longitude,
            latitudeDelta: 0.043,
            longitudeDelta: 0.034}}

          ref={c => this.mapView = c}
          onPress={this.onMapPress}
          loadingEnabled={true}>


          {destination}
          {this.state.workingLamps}
          {this.state.dataSource}
          {this.state.friendsCoordinates}
          {panicMarker}
          {this.state.insecureLocationsData}
          {this.state.secureLocations}
          {meetUp}





        </MapView>

        {/* Container för sök-ruta ovanför kartan */}
        <View style={styles.topContainer}>
          <View style={styles.topButtonContainer}>
            <View style={styles.favoriteButtonContainer}>
            <TouchableOpacity onPress={()=>{this.handleClickFavourite()}}>
                <FontAwesome name="heart" size={40} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            {/*<View style={styles.profileButtonContainer}>
              <TouchableOpacity onPress={()=>{this.handleClickProfile()}}>
                <FontAwesome name="user-circle-o" size={40} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            */}
          </View>
          <View style={styles.searchContainer}>
            <View style={styles.searchBox}>
              <TouchableOpacity onPress={()=>{this.handleClickMenu()}}>
                <FontAwesome name="bars" size={20} color="#414141" />
              </TouchableOpacity>
              <View style = {styles.deviderLine} />


                <TextInput
                value={this.state.searchField}
                placeholder={this.state.placeHolderInput} style ={styles.destinationInput}
                onChangeText={text => this.searchPlace(text, 'searchField')}

                />




            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={()=>{this.handleClickPanic()}}>
              <View style={styles.sosButton}>
                <Text
                  style={styles.sosText}
                  >
                  LARM - Ring 112
                </Text>
              </View>
            </TouchableOpacity>
        </View>
      </View>
		);
	}
}

    /*
    Old render

		return (


      <View style= {styles.container}>


    <View style={styles.top}>
    <TextInput
    value={this.state.searchField}
    placeholder={"Hitta hit"} style ={styles.destinationInputTop}
    onChangeText={text => this.searchPlace(text, 'searchField')}
    />


      <TouchableOpacity style={styles.profileBtn} onPress={()=>{
        console.log("klickar")
        this.handleClickProfile()}
        }>
          <Image source={doge}
          borderRadius={17}
          />
        </TouchableOpacity>


        <TouchableOpacity style={styles.favouriteBtn} onPress={()=>{
          this.handleClickFavourite()}
          }>
            <Image source={require("./favourite.png")}
            borderRadius={49}
            />
          </TouchableOpacity>



        </View>
      //var tvungen att logga för att bli av med



  			  <MapView style={styles.map}
          provider = { MapView.PROVIDER_GOOGLE }
            customMapStyle = { generatedMapStyle }
  				initialRegion={{
            latitude:this.state.testLat,
            longitude:this.state.testLong,
            // latitude:this.state.latitude,
            // longitude:this.state.longitude,
            latitudeDelta: 0.043,
            longitudeDelta: 0.034,


  				}}



  				ref={c => this.mapView = c}
  				onPress={this.onMapPress}
  				loadingEnabled={true}
  			>
        //DETTA ÄR BARA FÖR ATT DATABASEN INTE SVARAR
        //SKA KOMMENTERAS IN IGEN
        //{destination}



        {this.state.adamData}
        {this.state.dataSource}
        {this.state.friendsCoordinates}

        {panicMarker}

        {this.state.insecureLocationsData}




        // "här låg det som ligger under 111111 i fungerande med markers "



         //{"här hade jag markers"}


  			</MapView>



        <View style={styles.bottom}>
        <TextInput
        value={this.state.searchField}
        placeholder={"Hitta hit"} style ={styles.destinationInput}
        onChangeText={text => this.searchPlace(text, 'searchField')}
        />


      />
        <TouchableOpacity style={styles.warningBtn} onPress={()=>{
          this.handleClickPanic()}
        }>
            <Image
            source={require("./index.jpg")}
            borderRadius={27}
            />
          </TouchableOpacity>


        </View>
			</View>

		);
	}
}
*/

const generatedMapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
]

// const styles = StyleSheet.create({
//   container: {
//  flex: 1,
//  flexDirection: 'column'
//  },
//  texty:{
//    fontSize:20,
//  },
//   top:{
//     height: 85,
//     backgroundColor: 'powderblue'
//
//   },
//   profileBtn:{
//     position: 'absolute',
//     top: 25,
//     right: 30,
//     width: 25,
//     height: 15,
//     borderRadius: 25/2,
//    },
//    favouriteBtn:{
//      position: 'absolute',
//      top: 20,
//      left: 5,
//      width: 25,
//      height: 15,
//      borderRadius: 25/2,
//     },
//    warningBtn:{
//      position: 'absolute',
//      top: 5,
//      right: 40,
//      width: 25,
//      height: 15,
//
//     },
//     warningBtnOnMap:{
//       position: 'absolute',
//       bottom: 25,
//       right: 40,
//       width: 25,
//       height: 15,
//     },
//
//
//
//   map:{
//     height: 515,
//   },
//
//   bottom:{
//    height: 75, backgroundColor: 'lightpink',
//    alignItems:'center'
//
//   },
//   destinationInput:{
//
//     height: 40,
//     width: 125,
//     position: 'absolute',
//
//     borderColor: 'powderblue',
//     borderWidth: 1
//   },
//
//   });
