import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import SelectMultiple from 'react-native-select-multiple'

const fruits = ['Apples', 'Oranges', 'Pears']
// --- OR ---
// const fruits = [
//   { label: 'Apples', value: 'appls' },
//   { label: 'Oranges', value: 'orngs' },
//   { label: 'Pears', value: 'pears' }
// ]
const ios_blue = '#007AFF'
const renderLabel = (label, style) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Image style={{width: 42, height: 42}} source={{uri: 'https://dummyimage.com/100x100/52c25a/fff&text=S'}} />
      <View style={{marginLeft: 10}}>
        <Text style={style}>{label}</Text>
      </View>
    </View>
  )
}

export default class SingleSelect extends Component {
    state = { selectedFruits: [] }

    onSelectionsChange = (selectedFruits) => {
      // selectedFruits is array of { label, value }
      this.setState({ selectedFruits })
    }
  
    render () {
      return (
        <View>
          <SelectMultiple
            items={fruits}
            renderLabel={renderLabel}
            selectedItems={this.state.selectedFruits}
            onSelectionsChange={this.onSelectionsChange} 
            checkboxStyle={{width:0,height:0}}
            selectedLabelStyle={{color: ios_blue}}
            maxSelect={1}
            />
        </View>
      )
    }
}