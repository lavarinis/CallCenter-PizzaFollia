import React, { Component } from 'react';
import { Text,View,SafeAreaView } from 'react-native';
import {SelectMultipleGroupButton} from "react-native-selectmultiple-button";
import NumericIncrement from './NumericIncrement';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const ios_blue = '#007AFF'


renderLabel = (label, style,selected,highLightStyle) => {
    let costo="";
    if (label.localeCompare("Baby")==0){
        costo="€  -1.00";
    }
    else if(label.localeCompare("Normale")==0){
        costo="";
    }
    else{
        costo="€ +1.50";
    }
    return (
      <View style={{flexDirection: 'row'}}>       
        <View style={{justifyContent: 'space-between',flex: 1,flexDirection: 'row',marginBottom:7}}>
          <Text style={{fontSize: 20, color: selected ? highLightStyle.textTintColor : highLightStyle.textColor }}>{label}</Text>
          <Text style={{fontSize: 20, color: selected ? highLightStyle.textTintColor : highLightStyle.textColor }}>{costo}</Text>
        </View>
      </View>
    )
}

export default class ModalContent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tot: this.props.item.Prezzo.toFixed(2),
        };

        this.item= this.props.item;
        this.formatoPizza={tipo:"Normale",costo:0};
        this.NumeroPizza=1;
    }

    updateTotaleFormato = (val) => {
        this.setState({ tot: ((this.item.Prezzo+val[0])*this.NumeroPizza).toFixed(2) });
        if(val==0){
            this.formatoPizza={tipo:"Normale",costo:0};
        }
        else if(val==-1){
            this.formatoPizza={tipo:"Baby",costo:-1};
        }
        else{
            this.formatoPizza={tipo:"Doppia Pasta",costo:1.5};
        }
    }
    updateTotaleNumero = (val) => {
        this.NumeroPizza=val;
        this.setState({ tot: ((this.item.Prezzo+this.formatoPizza.costo)*val).toFixed(2) });
    }

  render() {
    return (
        <View style={{flex: 1,width:'100%'}}>
            <View style={{ flex: 1 ,width:'100%',marginTop:15}}>
                <Text style={{ textAlign: 'center',fontSize: 26,marginBottom:6}}>{this.item.Nome}</Text>
                <Text style={{ textAlign: 'center',fontSize: 14,color: '#5f5f5f',marginBottom:18}}>{this.item.Ingredienti.toString()}</Text>
                <View style={{height: 1,width:'100%',backgroundColor: '#CED0CE',marginBottom:18}}/>
                <Text style={{fontSize: 22,marginBottom:20}}>{"Formato:"}</Text>
                <SelectMultipleGroupButton multiple={false}
                group={[
                    { value: -1,displayValue:'Baby'},
                    { value: 0,displayValue:'Normale'},
                    { value: 1.5,displayValue:'Doppia Pasta'}]}
                defaultSelectedIndexes={[1]}
                renderLabel={renderLabel}
                buttonViewStyle={{ alignItems:'flex-start', borderWidth: 0, margin: 0, borderRadius: 0 }}
                highLightStyle={{
                    borderColor: ios_blue, textColor:'#5f5f5f', backgroundColor:'transparent',
                    borderTintColor: ios_blue, textTintColor: ios_blue, backgroundTintColor:'transparent'
                }}
                containerViewStyle={{ flexDirection:'column',marginBottom:20 }}
                onSelectedValuesChange={selectedValues => this.updateTotaleFormato(selectedValues)}
                />
                <Text style={{fontSize: 22,marginTop:3,marginBottom:25}}>{"Numero:"}</Text>
                <NumericIncrement onValuesChange={value => this.updateTotaleNumero(value)}/>
            </View>
            <View style={{flex: 1,justifyContent:'flex-end'}}>
                <Button title="Avanti" iconRight={true} containerStyle={{marginBottom:20}}
                    titleStyle={{flex:1,flexDirection:'row',justifyContent:'space-between',textAlign:"left",marginLeft:20,fontSize:26,fontFamily:''}}
                    icon={<Text  style={{color:'white',marginRight:20,fontSize:16,paddingTop:2,paddingBottom:1,fontSize:26}}>{this.state.tot}</Text>}
                />
            </View>
        </View>
    )
  }
}
