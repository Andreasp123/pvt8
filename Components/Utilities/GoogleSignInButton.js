import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';

const GoogleSignInButton = (props) => (

        <View style={styles.container}>
            <Image
              source={require('../../assets/google_logo.png')}
              resizeMode="contain"
              style={styles.logo}
            />
            <Text style={styles.text}>Sign in with Google</Text>
        </View>
);

export default GoogleSignInButton;

const styles = StyleSheet.create({
    container: {
        width: "80%",
        height: 40,
        backgroundColor: "#FFFFFF",
        borderRadius:5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 8,
        shadowOpacity: 0.12,
        shadowRadius: 3,
        shadowOffset: { height: 0, width: 0 },
    },
    logo: {
        position: "absolute",
        left: 5,
        height: 30,
        width: 32
    },
    text:{
        color: "#000000",
        opacity: 0.54,
        fontFamily: "Roboto_Bold"
    }
});