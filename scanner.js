import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Camera from 'react-native-openalpr';

export default class Scanner extends  Component{

    constructor(props) {
        super(props);
        this.camera = null;

        this.state = {
            camera: {
                aspect: Camera.constants.Aspect.fill,
            },
            plate: 'Scan a plate',
        };
    }
    onPlateRecognized = ({ plate, confidence }) => {
        if (confidence > 85) {
            this.setState({
                plate,
            })
        }
    }
    render(){
        return(
            <View style={{flex:1,backgroundColor:'white'}}>
                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={this.state.camera.aspect}
                    captureQuality={Camera.constants.CaptureQuality.medium}
                    country="us"
                    onPlateRecognized={this.onPlateRecognized}
                    plateOutlineColor="#ff0000"
                    showPlateOutline
                    torchMode={Camera.constants.TorchMode.off}
                    touchToFocus
                />
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{this.state.plate}</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textContainer: {
        position: 'absolute',
        top: 100,
        left: 50,
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
    },
    preview:{
        top:50,
        margin:10,
        height:667,
        width:412,
        backgroundColor: 'orange'
    }
});
