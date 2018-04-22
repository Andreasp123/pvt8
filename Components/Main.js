import React, {Component} from 'react';


import { StyleSheet, Text, View, TextInput, Scrollview,
  TouchableOpacity, Button, ImageButton, Image, TextField, ScrollView } from 'react-native';

//import SimpleMap from './SimpleMap';
import MapView from 'react-native-maps';



export default class Main extends React.Component {
  constructor(props) {
   super(props);
   this.state = { text: 'Destination' };
 }

 handleClick = () => {
   alert('Button clicked!');
 }



  render() {
    const usernameValidators = [
    {
      message: 'Username must be 4 - 12 characters',
      validator: value => validator.length(value, { min: 4, max: 12 }),
    },
    {
      message: 'Username must be alphanumeric.',
      validator: value => validator.isAlphanumeric(value),
    },
  ];


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







        <MapView style={styles.map}
        region ={{
        latitude:59.338835,
        longitude:18.036469,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
   }}
   >



   <MapView.Marker
      coordinate={{
        latitude:59.338835,
        longitude:18.036469,
      }}
        title={'My marker title'}
        description={'My marker description'}
        />

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
