import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';
import MapView from 'react-native-maps'

const {width, height} = Dimensions.get('window')

const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default class Map extends  Component{

    constructor(props) {
        super(props);
        this.state = {
            initialPosition: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0,
            }
        };
    }

    componentDidMount() {

        navigator.geolocation.getCurrentPosition((position) => {
                var lat = parseFloat(position.coords.latitude)
                var long = parseFloat(position.coords.longitude)
                // this.map.animateToRegion({
                //     latitude: position.coords.latitude,
                //     longitude: position.coords.longitude,
                //     latitudeDelta: 0.005,
                //     longitudeDelta: 0.005
                // })
                var initialRegion = {
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }
                this.setState({initialPosition: initialRegion})
            },
            (error) => alert(JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});

    }

    render(){
        return(
            <View style={{flex:1}}>
                <MapView
                    // provider="google"
                    style={{ flex: 1 }}
                    region={this.state.initialPosition}
                >
                    <MapView.Marker
                        coordinate={{
                            latitude: this.state.initialPosition.latitude,
                            longitude: this.state.initialPosition.longitude,
                        }}
                        title={"marker.stationName"}
                        description={"metadata"}
                    />

                </MapView>
            </View>
        )
    }
}
