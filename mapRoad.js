import React, { Component } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyCt13beXT1YQ35MHus6EovuvUaVMLmjHRY';

const coordinates = [
    {
        latitude: 37.3317876,
        longitude: -122.0054812,
    },
    {
        latitude: 37.771707,
        longitude: -122.4053769,
    },
]

export default class MapRoad extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{flex:1,backgroundColor:'white'}}>
            <MapView
                initialRegion={{
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}
                style={{flex:1}}>
                <MapView.Marker
                    // image={require('./image/pin.png')}
                    coordinate={coordinates[0]}
                    title={"origin"}
                    description={"start"}
                />
                <MapView.Marker
                    coordinate={coordinates[1]}
                    title={"destination"}
                    description={"end"}
                />
                <MapViewDirections
                    origin={coordinates[0]}
                    destination={coordinates[1]}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor={"hotpink"}
                />
            </MapView>
            </View>
        );
    }
}
