import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Scrollview,
  TouchableOpacity, Button, ImageButton, Image, TextField, ScrollView, Dimensions,
  Alert, Platform, Communications, Linking, LoginButton, TouchableHighlight,ExpandableView,
  Animation, Animated, AnimatedRegion, prompt, AlertIOS, StatusBar} from 'react-native';
  import { FontAwesome } from '@expo/vector-icons';

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

      friendToMeet: [
        {
        latitude:59.335493,
        longitude:18.085179
        }
      ],

      testLat:this.props.navigation.state.params.testLat,
      testLong:this.props.navigation.state.params.testLong,
      testDestination : this.props.navigation.state.params.testDestination,
      testDest: '',
      googleResponse: [],
      userReport: '',
      friendRequests: [],

      destinationLocation : [],
      searchField: '',

      latitude: 59.326822,
      longitude: 18.071540,

      friendsCoordinatesNotAccepted: [],
      friendsCoordinatesAccepted: [],
      friendsCoordinates: [],

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
    console.log("i checkfriend")
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
   console.log(response)
   if(response.ok){
     response.json().then(json =>{

       if(json[0] !== undefined){
         this.setState({
           friendRequests : json,
           friendsName: json[0].username
         })
       }

       if(this.state.friendsName !== undefined){
         console.log("kom hit")
         this.acceptFriendRequest(this.state.friendsName)
       }
     })

   }

  });
}
//Hjälpmetod till checkFriendRequests
acceptFriendRequest(friendsName){
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
    "username_receiver": 'user1'
  })
  }).
  then((response) => {
   if(response.ok){
     console.log(response)
   }
   //console.log('Done', response);
  });
}

  aTestData(){

    return fetch('https://pvt.dsv.su.se/Group08/getRoute?name=Frutunnelbana')
     .then((response) => response.json())
     .then((responseJson) => {
       this.setState({testData : responseJson})
       let testAdam1 = responseJson.map(circle => (
            <MapView.Circle
            key={circle.id}
            center={{
            latitude: circle.lat,
            longitude: circle.lng,
          }}
          radius={3}
          strokeWidth = { 1 }
          strokeColor = { '#1a66ff' }
          fillColor = { '#1a66ff' }
          animation = {Animated.bounce}
          />


       ));
         this.setState({
           adamData : testAdam1,
         });
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
    fetch('https://pvt.dsv.su.se/Group08/getFriendsLocation', {
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
       if(json.username !== undefined){
            let friend = responseJson.map(friend => (
              <MapView.Marker
              key={friend.lat}
              coordinate={{
              latitude: friend.lat,
              longitude: friend.lng,
            }}
              title={friend.username}
              description={'Här är jag'}
              pinColor={'green'}
                />
            ));
            this.setState({
              friendsCoordinates: friend,
            })
       }
     })
   }

 });
}
 // then((response) => {
 //   if(response.ok){
 //     response.json().then(json =>{
 //       if(json.username !== undefined){
 //         let friend = responseJson.map(friend => (
 //              <MapView.Marker
 //              key={friend.lat}
 //              coordinate={{
 //              latitude: friend.lat,
 //              longitude: friend.lng,
 //            }}
 //            title={friend.username}
 //            description={'Här är jag'}
 //            pinColor={'green'}
 //            />
 //         ));
 //       }}
 //     }}

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

  componentDidMount() {
    this.aTestData()
    this.fetchPanicLocations()
    this.checkFriendRequests()
    this.getInsecureLocation()

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

     return fetch('https://pvt.dsv.su.se/Group08/getLamps?working=false')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({data : responseJson})
        let circles = responseJson.map(circle => (
             <MapView.Circle
             key={circle.name}
             center={{
             latitude: circle.lat,
             longitude: circle.lng,
           }}
           radius={3}
           strokeWidth = { 1 }
           strokeColor = { '#1a66ff' }
           fillColor = { '#1a66ff' }
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
   console.log("i insecure")
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
      console.log(responseJson)
      this.setState({
        insecureData: responseJson
      })
      let insecureMarkers = responseJson.map(markers => (
           <MapView.Marker
           key={markers.lat}
           coordinate={{
           latitude: markers.lat,
           longitude: markers.lng,
         }}
         title={'Otrygg händelse' + markers.key}
         description={markers.val}
         pinColor={'purple'}


         />

      ));
      this.setState({
        insecureLocationsData: insecureMarkers,
      })
    }
    //console.log('Done', response);
  );
  }

 handleClickFavourite = () => {
   this.navigate({
   routeName: 'favouritePlaces',
   key: 'favouritePlaces',
   params: {
      destination: 'kista'
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
  console.log("här ens?")
  this.setState({
    userReport: report
  })
  console.log(this.state.userReport)
}

handleClickMenu = () => {
   this.navigate({
     routeName: 'menu',
     key: 'menu'
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

 searchPlace(text, field){
   this.setState({
     searchField : text,
   })
   //console.log(this.state.searchField)
 }

 handleClick = () => {
   alert('Button clicked!');
 }

 handleClickPanic = () => {
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
    if(response.ok === false){

      console.log("no go")
    }
    //console.log('Done', response);
  });
   var ring = false
   Alert.alert(
  'SKRIK OCH PANIK',
  'Är du säker?',
  [
    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel', },
    {text: 'OK', onPress: () => console.log('OK Pressed'), ring: true},
  ],
  { cancelable: false }
)
  if(ring){
    const args = {
   number: '112',
   prompt: false
 }
 call(args).catch(console.error)
  }
}// !handleClickPanic


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





	render() {
    //this.getInsecureLocation()
    this.fetchPanicLocations()
    this.shareMyLocation()
    this.fetchFriendShareLocation()

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
      strokeColor = { 'red' }
      fillColor = { 'red' }

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
        //origin={this.state.origin}
        destination={this.state.coordinates[0]}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={3}
        strokeColor="hotpink"
        onReady={this.onReady}
        onError={this.onError}
      />

    ));

    let meetUp = this.state.coordinates.map(destination => (
      <MapViewDirections
      key={destination.latitude}
        origin={this.state.friendToMeet[0]}
        //origin={this.state.origin}
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
          customMapStyle = { generatedMapStyle }
          initialRegion={{
            latitude: 59.406539,
            longitude: 17.945055,
            //latitude:this.state.testLat,
            //longitude:this.state.testLong,
            // latitude:this.state.latitude,
            // longitude:this.state.longitude,
            latitudeDelta: 0.043,
            longitudeDelta: 0.034}}

          ref={c => this.mapView = c}
          onPress={this.onMapPress}
          loadingEnabled={true}>
          
          {/* destination gör att jag inte ser kista som position som jag hårdkodat ovan i lat och long */}
          {/*destination*/}
          {this.state.adamData}
          {this.state.dataSource}
          {this.state.friendsCoordinates}
          {panicMarker}
          {this.state.insecureLocationsData}

        </MapView>

        {/* Container för sök-ruta ovanför kartan */}
        <View style={styles.topContainer}>
          <View style={styles.topButtonContainer}>
            <View style={styles.favoriteButtonContainer}>
            <TouchableOpacity onPress={()=>{this.handleClickFavourite()}}>
                <FontAwesome name="heart" size={40} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <View style={styles.profileButtonContainer}>
              <TouchableOpacity onPress={()=>{this.handleClickProfile()}}>
                <FontAwesome name="user-circle-o" size={40} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.searchContainer}>
            <View style={styles.searchBox}>
              <TouchableOpacity onPress={()=>{this.handleClickMenu()}}>
                <FontAwesome name="bars" size={20} color="#414141" />
              </TouchableOpacity>
              <View style = {styles.deviderLine} />
              <TextInput
                style={styles.searchField}
                placeholder="Vart ska du?"
                value={this.state.searchField}
                onChangeText={text => this.searchPlace(text, 'searchField')}/>
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
