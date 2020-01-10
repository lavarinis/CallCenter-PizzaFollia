import React, { Component } from 'react';
import {  View, Text, StyleSheet,ScrollView,FlatList,TouchableOpacity,Image } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    itemsList: {
      marginHorizontal: 20,
    },
    itemElement:{
      flexDirection: 'row',
      borderWidth:0.5,
      borderRadius: 4,
      borderColor:'#ccc',
      margin:6,
      padding:10,
      backgroundColor: '#fff',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    itemtext: {
        fontSize: 15,
        paddingLeft:5       
    }
});
function Item({ item }) {
  if(item.OraConsegna.charAt(0)=='O' || item.OraConsegna.charAt(0)=='A'){
    or="AP "+item.OraConsegna.substring(item.OraConsegna.length, item.OraConsegna.length-5);
  }
  else{
    or="OR "+item.OraConsegna.substring(item.OraConsegna.length, item.OraConsegna.length-5);
  }
  return (
    <View style={styles.itemElement} >
      <Image
          style={{width: 50, height: 50}}
          source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
        />
      <Text style={styles.itemtext} >{item.Nome+ '\n'+item.Cognome}</Text>
      <Text style={{fontSize: 15,paddingLeft:30,textAlign: 'center'}} >{'Totale: \n'+item.Totale.toFixed(2)}</Text>
      <Text style={{fontSize: 15,paddingLeft:30,textAlign: 'center'}} >{'Orario: \n'+or}</Text>
    </View>
  );
}



export default class ItemComponent extends Component {
  renderSeparator = () => {  
    return (  
        <View  
            style={{  
                height: 1,  
                width: "100%",  
                backgroundColor: "#000",  
            }}  
        />  
    );  
};  
//handling onPress action  
getListViewItem = (item) => { 
  this.props.navigation.navigate('Ordine',{otherParam: 'Ordine',item: item});
}  
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1,centerContent: true,paddingBottom: Constants.statusBarHeight}}>
        <FlatList 
        data={this.props.items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <TouchableOpacity onPress={this.getListViewItem.bind(this, item,this.props.navigation)} activeOpacity={1} > 
        <Item item={item}/> 
        </TouchableOpacity> 
        }  
        ItemSeparatorComponent={this.renderSeparator}     
        />
      </ScrollView>
    );
  }
}