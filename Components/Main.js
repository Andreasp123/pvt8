import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Scrollview,
  TouchableOpacity, Button, ImageButton, Image, TextField, ScrollView, Dimensions,
  Alert, Platform, Communications, Linking, LoginButton, TouchableHighlight} from 'react-native';
//import {TabNavigator, SwitchNavigator, Icon, NavigatorIOS} from 'react-native';
import { SwitchNavigator, TabNavigator, StackNavigator  } from 'react-navigation';
import { Constants, MapView } from 'expo';
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
  // profile(){
  //   this.props.navigation.navigate("login");
  // }

  // register(){
  //
  //   this.props.navigation.navigate("register")
  // }



  // rad 89-113 ska kommenteras in igen när DB fungerar
  // även rad 255

	constructor(props) {
		super(props);
    this.navigate = this.props.navigation.navigate;
    this.params = this.props.navigation.state.params;



		this.state = {
      username : this.props.navigation.state.params.username,

      testLat:this.props.navigation.state.params.testLat,
      testLong:this.props.navigation.state.params.testLong,
      testDestination : this.props.navigation.state.params.testDestination,
      testDest: '',
      googleResponse: [],

      destinationLocation : [],
      searchField: '',

      latitude: 59.326822,
      longitude: 18.071540,


      originLatitude: 59.326822,
      origionLongitude: 18.071540,
      dataSource:[],
      markTest:[],
      testValue: 'hejsan',


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
				},
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



  componentDidMount() {
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
           originLatitude: position.coords.latitude,
           originLongitude: position.coords.longitude,
           error: null,
         });

         //TESTARRRRRRRRR AIzaSyAprDH-yXK21Imj4qwj0zyKbzAdWHTom9M
             if(this.props.navigation.state.params.testDest !== undefined){
               var dontscrewup = 'https://maps.googleapis.com/maps/api/geocode/json?address=lidingö&key=AIzaSyAprDH-yXK21Imj4qwj0zyKbzAdWHTom9M';
               var preLocation = "https://maps.googleapis.com/maps/api/geocode/json?address=";
               var postLocation = "&key=AIzaSyAprDH-yXK21Imj4qwj0zyKbzAdWHTom9M";
               var decidedDestination = this.state.testDest;
               var combined = preLocation + decidedDestination + postLocation;
               console.log("nu så", preLocation + decidedDestination + postLocation )
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

                  console.log("deep shit", this.state.coordinates)
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
        let markers = responseJson.map(lamps => (
             <MapView.Marker
             key={lamps.name}
             coordinate={{
             latitude: lamps.lat,
             longitude: lamps.lng,


           }}
           image={doge}
           title={lamps.name}
           description={lamps.name}
           />
        ));
          this.setState({
            dataSource : markers,
          });
      })
      .catch((error) =>{
        console.error(error);
      });


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





 handleClickProfile = () => {
   this.setState(
{
 destinationGoogle: 'kista'

 },
 console.log("iclickpr" , this.state.destinationGoogle),
() => {
 this.navigate({
 routeName: 'testmain',
 key: 'testmain',
 params: {
   destinationGoogle: 'kista'

 },
});
 }
);
 }

 searchPlace(text, field){
   this.setState({
     searchField : text,
   })
   console.log(this.state.searchField)
 }


 handleClick = () => {
   alert('Button clicked!');
 }

 handleClickPanic = () => {


   fetch('https://pvt.dsv.su.se/Group08/sendPanicLocation', {
  method: 'POST',
  headers: {
    //'Accept' : "application/json",
    //'Content-Type': "application/json"},
    'Accept': 'text/plain',
    'Content-Type': 'text/plain'},
  body: JSON.stringify({
    latitude:'59.1111111',
    //latitude: this.state.originLatitude,
    longitude: '59.2222222',
  })
}).
  then((response) => {
    if(response.ok === false){
      console.log("no go")
    }
    console.log('Done', response);
  });

  //  fetch('https://pvt.dsv.su.se/Group08/sendPanicLocation', {
  // method: 'POST',
  // headers: {
  //   Accept: 'text/plain',
  //   Content-Type: 'text/plain',
  // },
  // body: JSON.stringify({
  //   id: "25",
  //   latitude: '59.111111',
  //   longitude: '59.222222',
  // }),
  // });

   var ring = false
   Alert.alert(
  'SKRIK OCH PANIK',
  'Är du säker?',
  [

    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel', },
    {text: 'OK', onPress: () => console.log('OK Pressed',ring: true)},
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
    //console.log("här", this.state.testDest)

    // if(street.length > 1){
      let panicMarker = street.map(panic => (

           <MapView.Marker
           key={panic.name}
           coordinate={{
           latitude: panic.lat,
           longitude: panic.lng,
         }}
         image={warning}

         />

      ));
    // }


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


    // let destination = this.state.destinationLocation.map(destination => (
    //   <MapViewDirections
    //   key={destination.lat}
    //     origin={this.state.origin[0]}
    //     //origin={this.state.origin}
    //     destination={this.state.destinationLocation}
    //     apikey={GOOGLE_MAPS_APIKEY}
    //     strokeWidth={3}
    //     strokeColor="hotpink"
    //     onReady={this.onReady}
    //     onError={this.onError}
    //   />
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
		return (

      <View style= {styles.container}>


      <View style={styles.top}>

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

  			  <MapView style={styles.map}
  				initialRegion={{
            latitude:this.state.testLat,
            longitude:this.state.testLong,
            // latitude:this.state.latitude,
            // longitude:this.state.longitude,
            latitudeDelta: 0.043,
            longitudeDelta: 0.034
  				}}


  				ref={c => this.mapView = c}
  				onPress={this.onMapPress}
  				loadingEnabled={true}
  			>
        //DETTA ÄR BARA FÖR ATT DATABASEN INTE SVARAR
        //SKA KOMMENTERAS IN IGEN
        {destination}
        {panicMarker}






        {this.state.dataSource}

        // "här låg det som ligger under 111111 i fungerande med markers "



         //{"här hade jag markers"}


  			</MapView>destinationInput


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
