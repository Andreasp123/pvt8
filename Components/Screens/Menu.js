import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Prompt, prompt, AlertIOS
 } from 'react-native';

export default class Menu extends React.Component {
    render(){
        return(
            <View style={styles.text}>
                <Text>Menu</Text>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    text: {
        alignItems: 'center',
        justifyContent: "center",
        paddingTop: 100
    }
});