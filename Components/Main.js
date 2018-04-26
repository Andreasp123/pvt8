import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Scrollview,
  TouchableOpacity, Button, ImageButton, Image, TextField, ScrollView, Dimensions,
  Alert, Platform, Communications, Linking} from 'react-native';
  import styles from './styles';
import doge from './doge.jpeg';
import { Constants, MapView } from 'expo';
import data from './data';
import call from './call';
import testdata from './testdata';
import street from './StreetLamp';
import MapViewDirections from './MapViewDirections';


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyCYvMpmVhFc0ydILEuXGJNYNGFnBoKPCL8';

//const myjsonstring = 'https://pvt.dsv.su.se/Group08/getLamps?working=false';

export default class Main extends Component {
  // rad 89-113 ska kommenteras in igen när DB fungerar
  // även rad 255

	constructor(props) {
		super(props);


		this.state = {
      numberToCall : 112,
      number: 1,
      latitude: 59.326822,
      longitude: 18.071540,
      originLatitude: 59.326822,
      origionLongitude: 18.071540,
      dataSource:[],

      error: null,
      origin: [
        {
          latitude: 59.326822,
					longitude: 18.071540,
        },
      ],

			coordinates: [
				// {
				// 	latitude: 37.3317876,
				// 	longitude: -122.0054812,
				// },
				{
					latitude: 59.407968,
					longitude: 17.943102,
				},
			],
		};

		this.mapView = null;
	}

  componentDidMount() {
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
           originLatitude: position.coords.latitude,
           originLongitude: position.coords.longitude,
           error: null,
         });
       },

       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
     );
     //DETTA ÄR BARA FÖR ATT DATABASEN INTE SVARAR
     //SKA KOMMENTERAS IN IGEN

     // return fetch('https://pvt.dsv.su.se/Group08/getLamps?working=false')
     //  .then((response) => response.json())
     //  .then((responseJson) => {
     //    this.setState({data : responseJson})
     //    let markers = responseJson.map(lamps => (
     //         <MapView.Marker
     //         key={lamps.name}
     //         coordinate={{
     //         latitude: lamps.lat,
     //         longitude: lamps.lng,
     //
     //
     //       }}
     //       image={doge}
     //       title={lamps.name}
     //       description={lamps.name}
     //       />
     //    ));
     //      this.setState({
     //        dataSource : markers,
     //      });
     //  })
     //  .catch((error) =>{
     //    console.error(error);
     //  });
 }



 handleClick = () => {
   alert('Button clicked!');
 }

 handleClickPanic = () => {
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
   number: '112', // String value with the number to call
   prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
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

    // let markers = data.map(lamps => (
    //      <MapView.Marker
    //      key={lamps.id}
    //      coordinate={{
    //      latitude: lamps.lat,
    //      longitude: lamps.lng,
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
      <TouchableOpacity style={styles.profileBtn} onPress={()=>{alert("you clicked me")}}>
          <Image source={doge}
          //<Image source={require("./doge.jpeg")}
          borderRadius={17}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.favouriteBtn} onPress={()=>{alert("you clicked me")}}>
            <Image source={require("./favourite.png")}
            borderRadius={49}
            />
          </TouchableOpacity>

      </View>

  			  <MapView style={styles.map}
  				initialRegion={{
            latitude:this.state.latitude,
            longitude:this.state.longitude,
            latitudeDelta: 0.043,
            longitudeDelta: 0.034
  				}}


  				ref={c => this.mapView = c}
  				onPress={this.onMapPress}
  				loadingEnabled={true}
  			>
        //DETTA ÄR BARA FÖR ATT DATABASEN INTE SVARAR
        //SKA KOMMENTERAS IN IGEN
        //{destination}


        {this.state.dataSource}

        // "här låg det som ligger under 111111 i fungerande med markers "



         //{"här hade jag markers"}


  			</MapView>


        <View style={styles.bottom}>
        <TextInput style={styles.destinationInput}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}

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
