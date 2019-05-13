import React, { Component } from 'react';
import { StyleSheet,
    Text,
    View,
    Easing,
    Dimensions,
    Animated,
    TouchableHighlight,
    ScrollView} from 'react-native';
const {height,width} = Dimensions.get('window')

export  default class bounceOutLeftDemo extends Component {

    constructor () {
        super();
        this.animatedValue = new Animated.Value(0)
    }

    animate (easing) {
        this.animatedValue.setValue(0);
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1,
                duration: 1000,
                easing
            }
        ).start()
    }

    render () {
        const marginLeft = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, width]
        });

        const interpolateRotation = this.animatedValue.interpolate({
            inputRange:[0,1],
            outputRange:['0deg','90deg']
        });
        const animatedStyle = {
            transform: [
                {rotate:marginLeft}
            ]
        };

        return (
            <View style={styles.container}>
                <Animated.View style={[styles.block, {marginLeft} ]} />
                <ScrollView>
                    <Button easing='Out' onPress={this.animate.bind(this, Easing.out(Easing.quad))} />
                </ScrollView>
            </View>
        );
    }
}

const Button = ({onPress, easing}) => (
    <TouchableHighlight style={styles.button}  onPress={onPress}>
        <Text>{easing}</Text>
    </TouchableHighlight>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 60,
        backgroundColor:"#ffffff"
    },
    button: {
        height: 60,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#ededed',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    block: {
        width: 50,
        height: 50,
        backgroundColor: 'red',
        // top:60
    }
});

