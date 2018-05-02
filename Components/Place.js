import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';


export default class Place extends Component {
    render() {
        return (
          //denna gör hela containern klickbar
          <TouchableOpacity onPress={this.props.findPlace} style={styles.findPlace}>
            <View key={this.props.keyval} style={styles.place}>

                //<Text style={styles.noteText}>{this.props.val.date}</Text>
                <TouchableOpacity onPress={this.props.findPlace} style={styles.findPlace}>
                <Text style={styles.placeText}>{this.props.val.place}</Text>
                //</TouchableOpacity>
              <TouchableOpacity onPress={this.props.findPlace} style={styles.findPlace}>

              </TouchableOpacity>

                <TouchableOpacity onPress={this.props.deleteMethod} style={styles.placeDelete}>
                    <Text style={styles.placeDeleteText}>Delete</Text>
                </TouchableOpacity>
            </View>
            </TouchableOpacity> //denna gör hela containern klickbar
        );
    }
}


const styles = StyleSheet.create({
    place: {
        position: 'relative',
        padding: 20,
        paddingRight: 100,
        borderBottomWidth:3,
        borderBottomColor: '#ededed',
        backgroundColor: 'powderblue'
    },
    placeText: {
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: '#E91E63',
        fontSize: 20,
        fontWeight: 'bold',
        fontWeight: '300'
    },
    placeDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2980b9',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10
    },
    placeDeleteText: {
        color: 'white'
    },
    placeFindText: {
        color: 'white'
    },
    placeFind: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2980b9',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10
    },
});
