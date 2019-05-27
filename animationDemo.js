import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, Animated, Easing, Dimensions} from 'react-native';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const bounceOutLeft = {
    0: {
        opacity: 1,
        translateX: 0,
    },
    0.2: {
        opacity: 1,
        translateX: -10,
    },
    0.4: {
        translateX: 20,
    },
    0.45: {
        translateX: 20,
    },
    0.55: {
        opacity: 1,
    },
    1: {
        opacity: 0,
        translateX: -600,
    },

};
export default class animationDemo extends  Component{

    constructor(props) {
        super(props);
        this.state = {

        };
        this.offset = new Animated.Value(10);
        // this.animatedValue = new Animated.ValueXY(0,1);
        this.animatedRotateValue = new Animated.Value(0);
    }

     sizeAnimation = () => {
        this.offset.setValue(100);
        Animated.timing(this.animatedRotateValue,{
            toValue:1,
            duration:2000,
        }).start(()=>{
           Animated.timing(this.offset,{
               toValue:-250,
               duration:1000,
           }).start()
        })
    };

    render(){
        const interpolateRotation = this.animatedRotateValue.interpolate({
            inputRange:[0,1],
            outputRange:['0deg','-360deg']
        });
        const interpolateTranslate= this.animatedRotateValue.interpolate({
              inputRange: [0, 1],
            outputRange: [0, -SCREEN_WIDTH]
        });
        const animatedStyle = {
            transform: [

                {rotate: interpolateRotation},
                {translateX:interpolateTranslate}
            ]
        };

        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center',backgroundColor:"#d5e0e0"}}>
                <Animated.View style={[animatedStyle,{height:SCREEN_HEIGHT/4,width:SCREEN_WIDTH/2, backgroundColor:'pink',alignItems:"flex-end",justifyContent:"flex-end"}]}>

                  {/*you can put your code here*/}

                   <Text style={{fontSize:15}}
                          onPress={this.sizeAnimation}>{'BounceOutLeft'}</Text>
                </Animated.View>
                <View><Text onPress={()=>this.props.navigation.navigate('ButtonAnimated')}>Click</Text></View>
            </View>
        )
    }
}


