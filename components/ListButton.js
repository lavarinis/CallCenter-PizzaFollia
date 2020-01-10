import React, { Component } from 'react'
import {View,Image,Text,StyleSheet} from 'react-native'

import {
    SelectMultipleButton,
    SelectMultipleGroupButton
  } from "react-native-selectmultiple-button";

const themeColor = '#0D1014'
const ios_blue = '#007AFF'
const renderLabel = (label, styleText,selected,highLightStyle) => {
    textStyle= StyleSheet.compose(styleText,{color: selected ? highLightStyle.textTintColor : highLightStyle.textColor });
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{marginLeft: 10}, {backgroundColor: selected ? highLightStyle.backgroundColor : highLightStyle.backgroundTintColor}}>
          <Text style={textStyle}>{label}</Text>
        </View>
      </View>
    )
  }
export default class ListButton extends Component {

  render() {
    return (
      <View>
        <SelectMultipleGroupButton
          multiple={false}
          group={[
            { value: 'XC40, this is one of car series' },
            { value: 'XC60 is a Sports Utility Vehicle' },
            { value: 'XC90 is a large SUV' },
            { value: 'S90 is a business car' }]}
          defaultSelectedIndexes={[3]}
          renderLabel={renderLabel}
          textStyle={{ fontSize: 22 }}
          buttonViewStyle={{ alignItems: 'flex-start', borderWidth: 0, margin: 0, borderRadius: 0 }}
          highLightStyle={{
            borderColor: ios_blue, textColor: 'gray', backgroundColor: 'transparent',
            borderTintColor: ios_blue, textTintColor: ios_blue, backgroundTintColor: 'transparent'
          }}
          containerViewStyle={{ flexDirection: 'column', }}
        />
        <View style={{ height: 1, backgroundColor: 'gray', marginTop: 20, marginBottom:20 }} />
        <SelectMultipleGroupButton
          multiple={true}
          group={[
            { value: 'XC40, this is one of car series' },
            { value: 'XC60 is a Sports Utility Vehicle' },
            { value: 'XC90 is a large SUV' },
            { value: 'S90 is a business car' }]}
          defaultSelectedIndexes={[0]}
          textStyle={{ fontSize: 18 }}
          renderLabel={renderLabel}
          buttonViewStyle={{ alignItems: 'flex-start', borderWidth: 0, margin: 0, borderRadius: 0 }}
          highLightStyle={{
            borderColor: 'transparent', textColor: 'green', backgroundColor: 'transparent',
            borderTintColor: 'transparent', textTintColor: 'white', backgroundTintColor: 'green'
          }}
          containerViewStyle={{ flexDirection: 'column', height:150, justifyContent:'space-between'}}
        />
      </View>
    )
  }
}