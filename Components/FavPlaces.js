import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Scrollview,
  TouchableOpacity, Button, ImageButton, Image, TextField, ScrollView, Dimensions,
  Alert, Platform, Communications, Linking} from 'react-native';
//import {TabNavigator, SwitchNavigator, Icon, NavigatorIOS} from 'react-native';
import { SwitchNavigator, TabNavigator, StackNavigator  } from 'react-navigation';
import { Constants, MapView } from 'expo';
import doge from './doge.jpeg';
import warning from './warning.jpg';
import data from './data';
import Main from './Main';
//const myjsonstring = 'https://pvt.dsv.su.se/Group08/getLamps?working=false';

export default class FavPlaces extends Component {
  constructor(props){
    super(props);
    this.navigate = this.props.navigation.navigate;
    this.params = this.props.navigation.state.params;

    this.state ={
      data : data,
    }
  }
  profile(){
    this.props.navigation.navigate("login");
  }
  main(){
    this.props.navigation.navigate("main")
  }
  handleClickMain = () => {
    this.navigate({
    routeName: 'main',
    key: 'main',
    params: {
      // username: this.state.username
    }
 });

      // this.props.navigation.navigate("main");

  }

    render() {
      // console.log("1", this.props.navigation.state.params.latitude);
      // console.log("2", this.params.latitude);


          return (
              <View style={styles.container}>
                  <TouchableOpacity style={styles.btn} onPress={() => {
                      console.log(this.props.numberToCall) //here's where I want it to log testValue from the index file
                      this.handleClickMain()
                  }
                  }>
                  <Image source={doge}
                  borderRadius={17}
                  />
                </TouchableOpacity>

              

              </View>
          );
      }
  }
const styles = StyleSheet.create({
  container: {
 flex: 1,
 flexDirection: 'column',

 },
 texty:{
   fontSize:20,
 },
  top:{
    height: (window.height),
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
  btn:{
    backgroundColor: 'green',
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
