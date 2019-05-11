import React, {Component} from 'react';
import {View, Dimensions, Picker, StyleSheet, Text, Button} from 'react-native';
import Voice from 'react-native-voice';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

export default class LanguageTransfer extends  Component{
    constructor(props) {
        super(props);
        this.state = {
            language:"english",
            recognized: '',
            started: '',
            results: [],
        };
        Voice.onSpeechStart = this.onSpeechStart.bind(this);
        Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
        Voice.onSpeechResults = this.onSpeechResults.bind(this);
    }

    componentWillUnmount() {
        Voice.destroy().then(Voice.removeAllListeners);
    }

    onSpeechStart(e) {
        this.setState({
            started: '√',
        });
    };

    onSpeechRecognized(e) {
        this.setState({
            recognized: '√',
        });
    };

    onSpeechResults(e) {
        this.setState({
            results: e.value,
        });
    }

    async _startRecognition(e) {
        this.setState({
            recognized: '',
            started: '',
            results: [],
        });
        try {
            debugger
            await Voice.start('en-US');
        } catch (e) {
            console.error(e);
        }
    }

    render () {
        return (
            <View style={{backgroundColor:'white',flex:1,justifyContent:'center',alignItems:'center'}}>
                {this.state.results.map((result, index) => <Text style={styles.transcript}> {result}</Text>
                )}
                <Button style={styles.transcript}
                        onPress={this._startRecognition.bind(this)}
                        title="Start"/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    transcript: {
        textAlign: 'center',
        color: '#B0171F',
        marginBottom: 1,
        top: '400%',
    },
});
