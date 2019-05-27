import React from 'react'
import { View, Text, TouchableOpacity,  NativeModules, NativeEventEmitter } from 'react-native'
import SoundPlayer from 'react-native-sound-player';

export default class Final extends React.PureComponent {
    constructor() {
        super();
        this.state = {
        }
    }

    playSong(data) {
        SoundPlayer.playSoundFile('breathe_in_slow','mp3');
    }
    render() {
        return (
            <View style={{flex:1,backgroundColor:'#f0f0f0',justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity>
                    <Text onPress={()=>this.playSong('play1')}> play </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text onPress={()=>this.playSong('pause1')}> pause </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
