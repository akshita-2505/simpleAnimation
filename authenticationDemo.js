import React, { Component } from 'react';
import { SafeAreaView, Text, View, TextInput,TouchableHighlight ,TouchableOpacity} from 'react-native';
import firebase from 'react-native-firebase';

class authenticationDemo extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            password: '',
            email: '',
        };
    }
    componentDidMount() {
        this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
            this.setState({
                loading: false,
                user,
            });
        });
    }
    componentWillUnmount() {
        debugger
        this.authSubscription();
    }
    render() {

        return (
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'white' }}>
                <TextInput
                    value={this.state.name}
                    onChangeText={email => this.setState({email})}
                    placeholder = "Email"
                    style={{width:'80%',
                        padding: 4,
                        marginRight: 5,
                        fontSize: 20,
                        borderWidth: 1,
                        borderRadius: 8,
                    }}/>
                <TextInput
                    value={this.state.name}
                    placeholder = "Password"
                    onChangeText={password => this.setState({password})}
                    style={{width:'80%',
                        padding: 4,
                        marginRight: 5,
                        fontSize: 20,
                        borderWidth: 1,
                        borderRadius: 8,
                    }}/>
                <View style={{marginLeft:'50%',justifyContent: 'center',alignItems: 'center',height:50,width:'100%'}}>
                    <TouchableHighlight
                        style={{ height: 45,
                            width:'25%',
                            flexDirection: 'row',
                            backgroundColor: 'white',
                            borderWidth: 1,
                            marginBottom: 10,
                            marginTop: 10,
                            alignSelf: 'stretch',
                            justifyContent: 'center'}}
                        underlayColor="white"
                        onPress={this.handleSubmit}
                    >
                        <Text style={{fontSize: 18,
                            color: '#111',
                            alignSelf: 'center'}}>Add</Text>
                    </TouchableHighlight>
                </View>
            </SafeAreaView>
        );
    }
}

export default authenticationDemo;