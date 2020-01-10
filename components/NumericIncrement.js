import React, { Component } from 'react'
import { View, Text,Image } from 'react-native'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from "prop-types";

const ios_blue = '#2196F3'

export default class NumericIncrement extends Component {
    static propTypes = {
        onValuesChange: PropTypes.func
    };
    static defaultProps = {
        onValuesChange: selectedValues => {}
    }
    constructor(props) {
        super(props);

        this.state = {
            val: 1,
        };
    }

    IncrementaVal = () => {
        this.setState({ val: this.state.val + 1 });
        this.props.onValuesChange(this.state.val+1);
    }
    DecrementaVal = () => {
        this.setState({ val: this.state.val - 1 });
        this.props.onValuesChange(this.state.val-1);
    }

    render() {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Button type="clear" titleStyle={{ fontSize: 44 }} onPress={this.DecrementaVal} disabled={this.state.val == 1 ? true : false} 
                icon={<Icon name="minus"size={20} color={this.state.val == 1 ? "#CCC" : ios_blue} />} />
                <Text style={{ fontSize: 32, marginRight:15, marginLeft:15,color:"#5f5f5f"}}>{this.state.val}</Text>
                <Button  type="clear" titleStyle={{ fontSize: 44 }} onPress={this.IncrementaVal}  icon={<Icon name="plus"size={20} color={ios_blue} />} />
            </View>
            
        )
    }
}
