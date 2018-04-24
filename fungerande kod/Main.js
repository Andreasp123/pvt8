import React, {Component} from 'react';
import lamps from './StreetLamp';
import data from './data';
import { StyleSheet, Text, View, TextInput, Scrollview,
  TouchableOpacity, Button, ImageButton, Image, TextField, ScrollView } from 'react-native';
//import SimpleMap from './SimpleMap';
import MapView from 'react-native-maps';


export default class Main extends React.Component {
  constructor(props) {
   super(props);
   this.state = { text: 'Destination' ,
      latitude: 59.326822,
      longitude: 18.071540,
      error: null,
  };
 }

 componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
}

 handleClick = () => {
   alert('Button clicked!');
 }

  render() {
    console.log(this.state.latitude,
    this.state.longitude,);
    //const StreetLamp  = this.props.StreetLamp;



    let markers = data.map(lamps =>  (
      <MapView.Marker
      key={lamps.id}
      coordinate={{
      latitude: lamps.lat,
      longitude: lamps.lng,
    }}
    title={lamps.id}
    description={lamps.id}
  />
));


    return (
      <View style= {styles.container}>


      <View style={styles.top}>
      <TouchableOpacity style={styles.profileBtn} onPress={()=>{alert("you clicked me")}}>
          <Image source={require("./doge.jpeg")}
          borderRadius={17}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.favouriteBtn} onPress={()=>{alert("you clicked me")}}>
            <Image source={require("./favourite.png")}
            borderRadius={49}
            />
          </TouchableOpacity>

      </View>
        if(this.state.latitude !== null){

        }
        <MapView style={styles.map}
        region ={{
        latitude:this.state.latitude,
        longitude:this.state.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
      >
        {markers}
        </MapView>


        <View style={styles.bottom}>
        <TextInput style={styles.destinationInput}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />

        <TouchableOpacity style={styles.warningBtn} onPress={()=>{alert("you clicked me")}}>
            <Image
            source={require("./index.jpg")}
            borderRadius={27}
            />
          </TouchableOpacity>
        </View>


      </View>


    );
  }
};

const styles = StyleSheet.create({
 container: {
flex: 1,
flexDirection: 'column'
},
texty:{
  fontSize:20,
},
 top:{
   height: 85,
   backgroundColor: 'powderblue'

 },
 profileBtn:{
   position: 'absolute',
   top: 25,
   right: 30,
   width: 25,
   height: 15,
   borderRadius: 25/2,
  },
  favouriteBtn:{
    position: 'absolute',
    top: 20,
    left: 5,
    width: 25,
    height: 15,
    borderRadius: 25/2,
   },
  warningBtn:{
    position: 'absolute',
    top: 5,
    right: 40,
    width: 25,
    height: 15,

   },
   warningBtnOnMap:{
     position: 'absolute',
     bottom: 25,
     right: 40,
     width: 25,
     height: 15,
   },



 map:{
   height: 515,
 },

 bottom:{
  height: 75, backgroundColor: 'lightpink',
  alignItems:'center'

 },
 destinationInput:{

   height: 40,
   width: 125,
   position: 'absolute',

   borderColor: 'powderblue',
   borderWidth: 1
 },

 });
