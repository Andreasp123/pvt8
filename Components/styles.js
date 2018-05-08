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
    //backgroundColor: 'powderblue'

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
     backgroundColor:'transparent'

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
  // customMapStyle:{
  // [
  //   {
  //     "elementType": "geometry",
  //     "stylers": [
  //       {
  //         "color": "#242f3e"
  //       }
  //     ]
  //   }
  // ]
  //     "elementType": "labels.text.fill",
  //     "stylers": [
  //       {
  //         "color": "#746855"
  //       }
  //     ]
  //   },
  //   {
  //     "elementType": "labels.text.stroke",
  //     "stylers": [
  //       {
  //         "color": "#242f3e"
  //       }
  //     ]
  //   },
  //   {
  //     "featureType": "administrative.locality",
  //     "elementType": "labels.text.fill",
  //     "stylers": [
  //       {
  //         "color": "#d59563"
  //       }
  //     ]
  //   },
  //   {
  //     "featureType": "poi",
  //     "elementType": "labels.text.fill",
  //     "stylers": [
  //       {
  //         "color": "#d59563"
  //       }
  //     ]
  //   },
  //   {
  //     "featureType": "poi.park",
  //     "elementType": "geometry",
  //     "stylers": [
  //       {
  //         "color": "#263c3f"
  //       }
  //     ]
  //   },
  //   {
  //     "featureType": "poi.park",
  //     "elementType": "labels.text.fill",
  //     "stylers": [
  //       {
  //         "color": "#6b9a76"
  //       }
  //     ]
  //   },
  //   {
  //     "featureType": "road",
  //     "elementType": "geometry",
  //     "stylers": [
  //       {
  //         "color": "#38414e"
  //       }
  //     ]
  //   },
  //   {
  //     "featureType": "road",
  //     "elementType": "geometry.stroke",
  //     "stylers": [
  //       {
  //         "color": "#212a37"
  //       }
  //     ]
  //   },
  //   {
  //     "featureType": "road",
  //     "elementType": "labels.text.fill",
  //     "stylers": [
  //       {
  //         "color": "#9ca5b3"
  //       }
  //     ]
  //   },
  //   {
  //     "featureType": "road.highway",
  //     "elementType": "geometry",
  //     "stylers": [
  //       {
  //         "color": "#746855"
  //       }
  //     ]
  //   },
  //   {
  //     "featureType": "road.highway",
  //     "elementType": "geometry.stroke",
  //     "stylers": [
  //       {
  //         "color": "#1f2835"
  //       }
  //     ]
  //   },
  //   {
  //     "featureType": "road.highway",
  //     "elementType": "labels.text.fill",
  //     "stylers": [
  //       {
  //         "color": "#f3d19c"
  //       }
  //     ]
  //   },
  //   {
  //     "featureType": "transit",
  //     "elementType": "geometry",
  //     "stylers": [
  //       {
  //         "color": "#2f3948"
  //       }
  //     ]
  //   },
  //   {
  //     "featureType": "transit.station",
  //     "elementType": "labels.text.fill",
  //     "stylers": [
  //       {
  //         "color": "#d59563"
  //       }
  //     ]
  //   },
  //   {
  //     "featureType": "water",
  //     "elementType": "geometry",
  //     "stylers": [
  //       {
  //         "color": "#17263c"
  //       }
  //     ]
  //   },
  //   {
  //     "featureType": "water",
  //     "elementType": "labels.text.fill",
  //     "stylers": [
  //       {
  //         "color": "#515c6d"
  //       }
  //     ]
  //   },
  //   {
  //     "featureType": "water",
  //     "elementType": "labels.text.stroke",
  //     "stylers": [
  //       {
  //         "color": "#17263c"
  //       }
  //     ]
  //   }
  // ]
  });
