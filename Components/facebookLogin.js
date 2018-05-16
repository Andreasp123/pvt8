import React, { Component } from 'react';
import { Alert, Button, Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import Expo from 'expo';

export default class facebookLogin extends Component {
  constructor(props){
    super(props);
    this.navigate = this.props.navigation.navigate;
    this.params = this.props.navigation.state.params;
    this.setState({
      signedIn : false,
    })
  }

  navigateMain(){
    
      this.navigate({
      routeName: 'register',
      key: 'register',
      params: {

      }
   });


  }
 render() {
   this.navigateMain()
   logIn()



   return (
     <View style={styles.container}>
       <Text style={styles.paragraph}>
         Tjaba!

       </Text>
       <Button onPress={logIn} title="Sign in to Facebook" />
     </View>
   );
 }
}

async function logIn() {

const {

 type,

 token,

 email,

} = await Expo.Facebook.logInWithReadPermissionsAsync('147486059438562', {

 permissions: ['public_profile','email'],
});
if (type === 'success') {
 const response = await fetch(
       `https://graph.facebook.com/me?access_token=${token}&fields=name,email`);
       this.setState({
         signedIn: true,
       })



       response.json().then(json =>{
       console.log(json)
     })
     navigateMain()


 Alert.alert('Logged in!', `Hej ${(await response.json()).name}!`);

}

}



const styles = StyleSheet.create({
 container: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
   paddingTop: Constants.statusBarHeight,
   backgroundColor: '#ecf0f1',
 },
 paragraph: {
   margin: 24,
   fontSize: 18,
   fontWeight: 'bold',
   textAlign: 'center',
   color: '#34495e',
 },
});
