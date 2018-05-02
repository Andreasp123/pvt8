import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import data from './data'
import testdata from './testdata'
import Place from './Place';

export default class FavouritePlaces extends Component {

    constructor(props){
        super(props);
        this.navigate = this.props.navigation.navigate;
        this.params = this.props.navigation.state.params;
        this.state = {
            placeArray: [],
            placeText: '',
            testArray: testdata,
            savedPlaces: [],
            testDestination: [],
            latitude: '',
            longitude: '',
        };
    }
    componentDidMount() {
      for(var i = 0; i < testdata.length; i++){
        this.state.savedPlaces.push({
          'place': testdata[i].val,
          'latitude': testdata[i].lat,
          'longitude' : testdata[i].long
        });
        this.setState({ savedPlaces: this.state.savedPlaces });
        this.setState({shitText:''});
      }
      console.log(this.state.savedPlaces)
       }


    render() {
// test
let testing = this.state.savedPlaces.map((val, key)=>{
    return <Place key={key} keyval={key} val={val}
            onPress={() => {
            this.findPlace(val);
            }}
            deleteMethod={()=>this.deletePlace(key)}
               findPlace={()=>this.findPlace(val)}
            />
});
let places = this.state.placeArray.map((val, key)=>{
    return <Place key={key} keyval={key} val={val}
            onPress={() => {
            this.findPlace(key);
            }}
            deleteMethod={()=>this.deletePlace(key)}
               findPlace={()=>this.findPlace(val)}
            />
});
// let places = this.state.placeArray.map((val, key)=>{
//     return <Place key={key} keyval={key} val={val}
//             onPress={() => {
//             this.findPlace(val);
//             }}
//             deleteMethod={()=>this.deletePlace(key)}
//                findPlace={()=>this.findPlace(val)}
//             />
// });


      //test



        return (
            <View style={styles.container}>
                <View style={styles.header}>
                <TouchableOpacity onPress={ this.addPlace.bind(this) } style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Ny favoritplats'
                        onChangeText={(placeText)=> this.setState({placeText})}
                        value={this.state.placeText}
                        placeholderTextColor='white'
                        underlineColorAndroid='transparent'>
                    </TextInput>
                  //
                </View>
                <ScrollView style={styles.scrollContainer}>

                    {places}
                    {testing}

                </ScrollView>


                <View style={styles.footer}>


                </View>

             </View>
        );
    }

    addTest(){
      for(var i = 0; i < testdata.length; i++){
        this.state.savedPlaces.push({
          'place': testdata[i]
        });
        this.setState({ savedPlaces: this.state.savedPlaces });
        this.setState({shitText:''});
      }
    }

    addPlace(){
        if(this.state.placeText){
            this.state.placeArray.push({
                'place': this.state.placeText
            });
            this.setState({ placeArray: this.state.placeArray });
            this.setState({placeText:''});
        }
    }

    deletePlace(key){
        this.state.placeArray.splice(key, 1);
        this.setState({placeArray: this.state.placeArray});
    }

    findPlace(val){
      this.setState(
  {
    latitude: val.latitude,
    longitude: val.longitude,
    testDestination:[
      {
        latitude: val.latitude,
        longitude: val.longitude
      }
    ],
    },
  () => {
    this.navigate({
    routeName: 'main',
    key: 'main',
    params: {
      testLat: this.state.latitude,
      testLong: this.state.longitude

    },
 });
    }
  );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E91E63',

    },
    header: {
        backgroundColor: '#252525',
        //backgroundColor: '#E91E63',
        alignItems: 'center',
        justifyContent:'center',
        //borderBottomWidth: 10,
        //borderBottomColor: '#ddd',
        height: 95,
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        padding: 26
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: '#252525',
        height: 1,
        //height: 75,
    },
    textInput: {
        alignSelf: 'stretch',
        color: '#fff',
        padding: 20,
        backgroundColor: '#252525',
        borderTopWidth:2,
        borderTopColor: '#E91E63'
    },
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 10,
        bottom: 2,
        backgroundColor: '#E91E63',
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24
    }
});
