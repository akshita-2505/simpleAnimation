import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';
import MapView from 'react-native-maps'

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

export default class Map extends  Component{

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render(){
        return(
            <View style={{flex:1}}>

            <MapView
                style = {{flex:1}}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
            </View>
        )
    }
}
