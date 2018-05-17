import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Prompt, prompt, AlertIOS
 } from 'react-native';

 import {
   StackNavigator,
 } from 'react-navigation';

export default class Manu extends React.Component {

  constructor(props){
    super(props);
    this.navigate = this.props.navigation.navigate;
    this.params = this.props.navigation.state.params;

    this.state={
      username : "",

    };
  }


    render(){
        return(
<View style={styles.container}>

            <View style={styles.text}>
                <Text>Menu</Text>
                  <View>
          <Text>Gå tillbaka</Text>
            <Button style ={styles.exitBtn}
         Button onPress={() => {
           this.exitProfileBtn();
         }}
         title="Exit"
         />
        </View>
            </View>
          </View>


        )
    };

    exitProfileBtn(){
     this.navigate({
     routeName: 'main',
     key: 'main',
     params: {
        username: this.state.username,
     }
   });
   }
}

const styles = StyleSheet.create({
    text: {
        alignItems: 'center',
        justifyContent: "center",
        paddingTop: 100
    }
});
