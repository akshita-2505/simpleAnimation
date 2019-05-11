import React, { Component } from 'react';
import { View, StatusBar, TextInput, Animated } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import { Sae, Fumi, Kohana, Makiko, Hideo } from 'react-native-textinput-effects';

class FloatingLabelInput extends Component {
    state = {
        isFocused: false,
    };

    componentWillMount() {
        this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
    }

    handleFocus = () => this.setState({ isFocused: true });
    handleBlur = () => this.setState({ isFocused: false });

    componentDidUpdate() {
        Animated.timing(this._animatedIsFocused, {
            toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
            duration: 200,
        }).start();
    }

    render() {
        const { label, ...props } = this.props;
        const labelStyle = {
            position: 'absolute',
            left: 0,
            top: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [18, 0],
            }),
            fontSize: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 14],
            }),
            color: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: ['#aaa', '#000'],
            }),
        };
        return (
            <View style={{ paddingTop: 18 }}>
                <Animated.Text style={labelStyle}>
                    {label}
                </Animated.Text>
                <TextInput
                    {...props}
                    style={{ height: 26, fontSize: 20, color: '#000', borderBottomWidth: 1, borderBottomColor: '#555' }}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    blurOnSubmit
                />
            </View>
        );
    }
}

export default class TextAnimated extends Component {
    state = {
        value: '',
    };

    handleTextChange = (newText) => this.setState({ value: newText });

    render() {
        return (
            <View style={{ flex: 1, padding: 30, backgroundColor: 'pink' }}>
                <StatusBar hidden />
                <FloatingLabelInput
                    label="Email"
                    value={this.state.value}
                    onChangeText={this.handleTextChange}
                />
                <View style={{height:25 ,marginTop:20}}/>
                <Sae
                    label={'Email Address'}
                    iconClass={FontAwesomeIcon}
                    iconName={'pencil'}
                    iconColor={'white'}
                    inputPadding={16}
                    labelHeight={24}
                    // active border height
                    borderHeight={2}
                    // TextInput props
                    autoCapitalize={'none'}
                    autoCorrect={false}
                />
                <View style={{height:25 ,marginTop:20}}/>
                <Fumi
                    label={'Course Name'}
                    iconClass={FontAwesomeIcon}
                    iconName={'university'}
                    iconColor={'#f95a25'}
                    iconSize={20}
                    iconWidth={40}
                    inputPadding={16}
                />
                <View style={{height:25 ,marginTop:20}}/>
                <Kohana
                    style={{ backgroundColor: '#f9f5ed' }}
                    label={'Line'}
                    iconClass={MaterialsIcon}
                    iconName={'directions-bus'}
                    iconColor={'#f4d29a'}
                    inputPadding={16}
                    labelStyle={{ color: '#91627b' }}
                    inputStyle={{ color: '#91627b' }}
                    // labelContainerStyle={{ padding: 20 }}
                    iconContainerStyle={{ padding: 20 }}
                    useNativeDriver
                />
                <View style={{height:25 ,marginTop:20}}/>
                <Makiko
                    label={'Comment'}
                    iconClass={FontAwesomeIcon}
                    iconName={'comment'}
                    iconColor={'white'}
                    inputPadding={16}
                    inputStyle={{ color: '#db786d' }}
                />
                <View style={{height:25 ,marginTop:20}}/>
                <Hideo
                    iconClass={FontAwesomeIcon}
                    iconName={'envelope'}
                    iconColor={'white'}
                    // this is used as backgroundColor of icon container view.
                    iconBackgroundColor={'#f2a59d'}
                    inputStyle={{ color: '#464949' }}
                />
            </View>
        );
    }
}
