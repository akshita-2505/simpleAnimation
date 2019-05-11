import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Switch} from 'react-native';

let background = false;
export default class Dark extends Component<Props> {
    constructor() {
        super();
        this.state = {
            switch1Value: false,
        }
    }
    toggleSwitch1 = (value) => {
        this.setState({switch1Value: value})
        background = value;
    }
    render() {
        return (
            <View style={[styles.container,{backgroundColor: background ? 'black' : 'white'
            }]}>
                <Switch
                    onValueChange = {this.toggleSwitch1}
                    value = {this.state.switch1Value}
                />
                <Text style={[styles.welcome,{color: background ? 'white' : 'black'}]}>Welcome to React Native!</Text>
                <Text style={[styles.instructions,{color: background ? 'white' : 'black'}]}>To get started, edit App.js</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});
