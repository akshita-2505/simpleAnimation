import React from 'react'
import { View  } from 'react-native'
import { createAppContainer,
    createStackNavigator,
    createBottomTabNavigator,
    createDrawerNavigator,
createSwitchNavigator} from 'react-navigation';
import AnimationDemo from './animationDemo';
import AllAnimationDemo from './AllAnimationDemo';
import ButtonAnimated from './buttonAnimated';
import TextAnimated from './textAnimated';
import Dark from './dark';
import Notes from './notes';
import Map from './map';
import MapRoad from './mapRoad';
import Scanner from './scanner';
import LineChartDemo from './lineChartDemo';
import GraphDemo from './graphDemo';

const bottom = createBottomTabNavigator({
    ButtonAnimated,
    TextAnimated
},{
    initialRouteName:'ButtonAnimated'
});

const drawer = createDrawerNavigator({
    bottom,
    Dark,
    Notes,
    Map,
    MapRoad,
    Scanner,
    LineChartDemo,
    GraphDemo
},{
    initialRouteName:'bottom'
});

const stack = createStackNavigator({
    drawer,
    AnimationDemo,
    AllAnimationDemo
},{
    initialRouteName:'AnimationDemo',
    headerMode:'none'
})

const AppNavigator = createSwitchNavigator(
    {
        AppLaunch: stack,
    },
    {
        initialRouteName: "AppLaunch"
    }
);

const appContainer = createAppContainer(AppNavigator);

export default appContainer;
