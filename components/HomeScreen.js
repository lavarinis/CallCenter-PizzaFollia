import React, { Component } from 'react';
import { StyleSheet,View,SafeAreaView,Alert,Button } from 'react-native';
import NumericIncrement from './NumericIncrement';

//Reder del Separatore
function Separator() {
  return <View style={styles.separator} />;
}

export default class HomeScreen extends Component {

  // Navigation Option
  static navigationOptions = {
    title: 'Pizza Follia',
    headerTransparent: true,
    headerStyle: { borderBottomWidth: 0 },
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: "center",
      flex: 1,
      fontSize: 30,
    },
  };
  //Render del HomeScreen
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'column',}}>
          <Button
            title="Nuovo Ordine"
            onPress={() => navigate('Menu')}
          />
          <Separator />
          <Button
            title="Stato Ordini"
            color="#f194ff"
            onPress={() => Alert.alert('Simple Button pressed')}
          />
        </View>
        <NumericIncrement />
      </View>
    );
  }
}
//Stile
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
