import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import SoundPlayer1 from 'react-native-sound-player'

export default class SoundPlayer extends React.PureComponent {
    constructor() {
        super();
        this.state = {
        }
    }
    playSong(data) {
        try {
            // play the file tone.mp3
            SoundPlayer1.playSoundFile('01 Sun Mere (Gajendra Verma)', 'mp3')
            // or play from url
            SoundPlayer1.playUrl('https://example.com/music.mp3')
        } catch (e) {
            alert(e)
        }
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
