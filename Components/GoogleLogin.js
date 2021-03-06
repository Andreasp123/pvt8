import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import Expo from 'expo';

export default class GoogleLogin extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      signedIn:false,
      name: "",
      photoUrl: "",
      username: '',
    }
    this.navigate = this.props.navigation.navigate;
    this.params = this.props.navigation.state.params;
  }

  signIn= async () =>{
    try {
          const result = await Expo.Google.logInAsync({
            androidClientId: "831902995271-qdbvifs2v6k86acn31gg0ec0eka52nlk.apps.googleusercontent.com",
            iosClientId:"831902995271-8ednb3vj5r4c3evo2tf7u9eqr8u0fk0b.apps.googleusercontent.com",
            scopes: ['profile', 'email'],
          })

          if (result.type === 'success') {
            this.setState({
              signedIn:true,
              name: result.user.name,
              username: result.user.name,
              photoUrl: result.user.photoUrl,
              email: result.user.email
            })
            this.navigate({
            routeName: 'main',
            key: 'main',
            params: {
               username: this.state.username,

            }
         });
              console.log("ett litet test", this.state.name)
              console.log("mailen", this.state.email)
          } else {
            console.log("cancelled")
          }
        } catch(e) {
          console.log("error",e)
        }
      }


  render() {
    return (
      <View style={styles.container}>
    {this.state.signedIn ? (
        <LoggedInPage name={this.state.name} photoUrl={this.state.photoUrl} />
    ) : (
      <LoginPage signIn={this.signIn} />
    )}
      </View>

    )
  }
}

const LoginPage = props => {
  return (
    <View>
      <Text style={styles.header}>Logga in med Google</Text>
    <Button title="Logga in med Google" onPress={() => props.signIn()} />
    </View>
  )
}

const LoggedInPage = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome:{props.name}</Text>
    <Image style={styles.image} source={{ uri: props.photoUrl }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 25
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  }
});
