import React, {Component} from 'react';
import {View, Text, Button, TextInput, Dimensions, Keyboard, ScrollView} from 'react-native';
var {height, width} = Dimensions.get('window');

console.disableYellowBox = true;

export default class Notes extends  Component{

    constructor(props) {
        super(props);
        this.state = {
            text:"",
            height:height
        };
    }

    componentDidMount() {
        Keyboard.addListener('keyboardDidShow', (e) => this._keyboardWillShow(e));
        Keyboard.addListener('keyboardDidHide', (e) => this._keyboardWillHide(e));
    }

    _keyboardWillShow(e) {
        this.setState({height: (height - e.endCoordinates.height)-50});
    }
    _keyboardWillHide(e) {
        this.setState({height: height});
    }

    render(){
        return(
            <View style={{flex:1,backgroundColor:'white'}}>
                <View style={{top: 50, alignItems:'flex-end',marginRight:10}}>
                <Button title="Done" onPress={Keyboard.dismiss}/>
                </View>
                <ScrollView keyboardDismissMode="onDrag" scrollEnabled={false}>
                <TextInput style={{height: this.state.height*0.84,
                            borderColor: 'black',
                            borderWidth: 1,
                            top:50,
                            margin:10,
                }}
                           onChangeText={(text) => this.setState({text})}
                           value={this.state.text}
                           editable = {true}
                           multiline={true}
                           returnKeyType='next'
                           onScroll={() => Keyboard.dismiss()}
                           keyboardDismissMode="onDrag"
                />
                </ScrollView>

            </View>
        )
    }
}

