import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const MenuItem = (props) => (
    <View style={{padding: 10, flexDirection: "row", alignItems: "center"}}>
        <FontAwesome style={{width: 30}} name={props.symbol} size={25} color="#929292" />
        <Text style={{fontSize: 25, marginLeft: 20}}>{props.value}</Text>
          
    </View>
);

export default MenuItem;