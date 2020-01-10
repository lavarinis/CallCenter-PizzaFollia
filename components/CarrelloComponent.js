import React, { Component } from 'react';
import { StyleSheet, Text, View,Button,SafeAreaView,Alert } from 'react-native';
export default class CarrelloComponent extends Component {   
    static navigationOptions = {
        title: 'Carrello',
        headerStyle: {
            backgroundColor: '#f4511e',
          },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
          },
      };
    render() {
        const {navigate} = this.props.navigation;
        return (
            <SafeAreaView style={styles.container}>
            <View>
              <Text>CarrelloComponent</Text>
            </View>
          </SafeAreaView>
         );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      marginHorizontal: 16,
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
  });
  