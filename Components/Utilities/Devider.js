import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

const Devider = (props) => (
    <View style={{width: props.width, borderBottomColor: '#e5e5e5',
    borderBottomWidth: 1, alignItems: "center", marginBottom: 30, marginTop: 10}}>
        <Text style={{backgroundColor: "#FFFFFF", color: "#929292", position: "relative", top: 10, paddingLeft:20, paddingRight: 10}}>{props.text}</Text>
    </View>
);

export default Devider;