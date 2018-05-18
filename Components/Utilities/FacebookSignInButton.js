import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const FacebookSignInButton = (props) => (

        <View style={styles.container}>
            <FontAwesome style={styles.logo} name="facebook-official" size={30} color="#FFFFFF" />
            <Text style={styles.text}>Log in with Facebook</Text>
        </View>
);

export default FacebookSignInButton;

const styles = StyleSheet.create({
    container: {
        width: "80%",
        height: 40,
        backgroundColor: "#4065b4",
        borderRadius:5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 8
    },
    logo: {
        position: "absolute",
        left: 8
    },
    text:{
        color: "#FFFFFF",
        fontFamily: "Roboto_Bold"
    }
});