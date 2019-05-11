import React, {Component} from 'react';
import {Animated, StyleSheet, Text, View,TouchableOpacity} from 'react-native';

export default class  demoAnimation extends Component {
    constructor(props){
        super(props);
        this.state={
            animatedValue : new Animated.Value(0)
        };

    }
    componentWillMount() {

    }
    openView = () =>{
        Animated.timing(this.animatedValue,{
            toValue:1,
            duration:100
        }).start()
    };
    render() {
        const interpolateRotation = this.animatedValue.interpolate({
            inputRange:[0,1],
            outputRange:['0deg','90deg']
        });
        const animatedStyle = {
            transform: [
                {rotation:interpolateRotation}
            ]
        };
        return (
            <View style={styles.container}>
            <Animated.View style={[animatedStyle, {width:100,height:100,backgroundColor: 'red'}]}>
            </Animated.View>
                <TouchableOpacity onPress={()=>{
                    this.openView()
                }}>
                    <Text>Click</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
