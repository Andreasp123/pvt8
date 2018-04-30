import React, {Component} from 'react';


import { StyleSheet, Text, View, TextInput, Scrollview, TouchableOpacity } from 'react-native';





export default class testnavigation extends React.Component {

  render() {
    return (
      <View style= {styles.container}>
      <View style = {styles.header}>

      <Text>hejsan</Text>




      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
   flex:1,
   backgroundColor: 'rgb(255, 30, 255)',
 },
header:{
  flex:1,
  alignItems: 'center',
  justifyContent: 'center',
  borderBottomWidth: 10,
  borderBottomColor: '#ddd',
  backgroundColor: 'black',
},

 textInput:{
   flex: 1,
   backgroundColor: 'pink',

 },

 footer:{
   position: 'absolute',
   flex: 1,
   backgroundColor: 'green',
 },
});
