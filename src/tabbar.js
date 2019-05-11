import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, Dimensions, Keyboard, ScrollView, SafeAreaView} from 'react-native';
import Tabbar1 from 'react-native-tabbar-bottom'
import Home from './home';
import Setting from './setting';
var {height, width} = Dimensions.get('window');

console.disableYellowBox = true;

export default class Tabbar extends Component {
    constructor() {
        super()
        this.state = {
            page: "Home",
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {
                    // if you are using react-navigation just pass the navigation object in your components like this:
                    // {this.state.page === "HomeScreen" && <MyComp navigation={this.props.navigation}>Screen1</MyComp>}
                }
                {this.state.page === "Home" && <Home/>}
                {this.state.page === "Setting" && <Text>Screen2</Text>}
                {this.state.page === "SearchScreen" && <Text>Screen5</Text>}

                <Tabbar1
                    stateFunc={(tab) => {
                        this.setState({page: tab.page})
                        //this.props.navigation.setParams({tabTitle: tab.title})
                    }}
                    activePage={this.state.page}
                    tabs={[
                        {
                            page: "Home",
                            icon: "home",
                            iconText: "Home"
                        },
                        {
                            page: "Setting",
                            icon: "notifications",
                            iconText: "notifications",
                            // badgeNumber: 11,
                        },
                        {
                            page: "SearchScreen",
                            iconText: "search",
                            icon: "search",
                        },
                    ]}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
        bottom:13
    }
});
