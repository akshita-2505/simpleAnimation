import React, {Component} from 'react';
import {View, Text, Button, TextInput, Dimensions, Keyboard, ScrollView} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

var {height, width} = Dimensions.get('window');

// console.disableYellowBox = true;

export default class Setting extends  Component{

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render(){
        return(
            <View style={{flex:1,backgroundColor:'white'}}>


            </View>
        )
    }
}
