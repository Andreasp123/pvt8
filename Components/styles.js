import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
     width: 200,
     height: 100,
     borderRadius: 25/2,
    },
   warningBtn:{
     position: 'absolute',
     top: 5,
     right: 40,
     width: 25,
     height: 15,

    },
    warning:{
      position: 'absolute',
      width: 25,
      height: 15,
      borderRadius: 25/2,

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
