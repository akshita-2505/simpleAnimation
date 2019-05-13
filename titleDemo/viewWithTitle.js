import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    FlatList,
    Animated,
    ScrollView, Dimensions
} from 'react-native';
import {
    statusBarHeight,
    headerHeight,
    SafeAreaWithHeader,
} from './dimensionsHelper';
import {renderCheck} from '../src/home';

const vw: number = SafeAreaWithHeader.vw;
const vh: number = SafeAreaWithHeader.vh;
var {height, width} = Dimensions.get('window');


export default class ViewWithTitle extends  Component{

    constructor(props){
        super(props);
        this.state={
            title: "Watch Now",
            children:"",
            data: [{"name":"abc"},{"name":"xyz"}],
            scrollY: new Animated.Value(0),
            renderItem: () => this.renderItemData()
        };
    }

    headerHeight: number = statusBarHeight + headerHeight;

    renderItemData= () => {
        return (
            <View style={{width:0,height:0}}/>
        );
    }
    renderTitle = () => {

        if (this.state.title) {
            if (Platform.OS === 'ios') {
                let title = this.state.title;
                if (title.length > 34) {
                    title = title.substr(0, 32) + "...";
                }
                let titleOpacity = this.state.scrollY.interpolate({
                    inputRange: [0, 41, 48],
                    outputRange: [0, 0, 1],
                    extrapolate: 'clamp'
                });
                let borderBottomColor = this.state.scrollY.interpolate({
                    inputRange: [56, 57],
                    outputRange: ["#ffffff", '#f2f2f2'],
                    extrapolate: 'clamp'
                });
                return (
                    <Animated.View style={[styles.iOSTitleContainer, {
                        height: this.headerHeight,
                        opacity: titleOpacity,
                        borderBottomColor: borderBottomColor
                    }]}>
                        <Text style={styles.iOSTitle}>
                            {title}
                        </Text>
                    </Animated.View>
                )
            } else {
                let title = this.state.title;
                if (title.length > 38) {
                    title = title.substr(0, 36) + "...";
                }
                return (
                    <View style={[styles.androidTitleContainer, {height: this.headerHeight}]}>
                        <Text style={styles.androidTitle}>
                            {title}
                        </Text>
                    </View>
                )

            }
        }
    };

    renderIOSBigTitle = () => {
        if (Platform.OS === 'ios' && this.state.title) {
            let title = this.state.title;
            if (title.length > 19) {
                title = title.substr(0, 17) + "...";
            }
            const fontSize = this.state.scrollY.interpolate({
                inputRange: [-50, 0],
                outputRange: [40, 34],
                extrapolate: 'clamp'
            });
            const top = this.state.scrollY.interpolate({
                inputRange: [0, 70],
                outputRange: [0, -70]
            });
            return (
                <Animated.View style={ [styles.iOSBigTitleContainer, {transform: [{translateY: top}]}]}
                               key="iosBigTitle">
                    <Animated.Text
                        allowFontScaling={false}
                        style={[styles.iOSBigTitle, {fontSize: fontSize}]}>
                        {title}
                    </Animated.Text>
                </Animated.View>
            )
        }
    };


    renderContentArea = () => {
        debugger
        // if (this.state.children) {
            let padding = (Platform.OS === 'ios' && this.state.title) ? 56 : 0;
            return (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    style={{paddingTop: padding}}
                    onScroll={
                        Animated.event(
                            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
                        )}
                >
                    <View style={[styles.contentContainer, {paddingBottom: padding}]}>
                        {
                            this.props.handleCode()
                        }
                    </View>
                </ScrollView>
            )
        // }
    };

    renderContentAreaList = () => {
        if (this.state.data && this.state.renderItem) {
            let headerHeight = (Platform.OS === 'ios' && this.state.title) ? 56 : 0;
            return (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    renderItem={ this.state.renderItem }
                    ListHeaderComponent={ <View style={{width: 100 * vw, height: headerHeight}}/> }
                    data={this.state.data}
                    onScroll={
                        Animated.event(
                            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
                        )}
                />
            )
        }
    };

    renderTitleArea = () => {
        return (
            <View style={{fontWeight: 'bold',fontSize:25,marginLeft:width*0.1}}>
                {
                    this.renderTitle()
                }
            </View>
        )
    };

    render() {
        return (
            <View style={styles.outerContainer}>
                {
                    this.renderIOSBigTitle()
                }
                {
                    this.renderTitleArea()
                }
                <View style={[styles.innerContainer, {height:height}]}>
                    {
                        this.renderContentArea()
                    }
                    {
                        this.renderContentAreaList()
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    outerContainer: {
        width: 100 * vw,
        backgroundColor: '#ffffff',
    },
    titleContainer: {
        width: 100 * vw,
        backgroundColor: '#ffffff',
    },
    iOSTitleContainer: {
        width: 100 * vw,
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    iOSTitleContainerInvisible: {
        width: 100 * vw,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    iOSTitle: {
        marginBottom: 13,
        fontSize: 17,
        lineHeight: 17,
        fontWeight: 'bold',
        color: '#353535',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    androidTitleContainer: {
        width: 100 * vw,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    androidTitleContainerInvisible: {
        width: 100 * vw,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
    androidComponentContainer: {
        position: 'absolute',
        right: 16,
        bottom: 0,
        width: 100 * vw - 32,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    androidTitle: {
        marginBottom: 16,
        marginLeft: 72,
        fontSize: 16,
        lineHeight: 20,
        fontWeight: 'bold',
        color: '#353535',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    iOSBigTitleContainer: {
        position: 'absolute',
        top: headerHeight + statusBarHeight,
        left: 0,
        width: 100 * vw,
        height: 56,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2'
    },
    iOSBigTitle: {
        marginTop: 8,
        marginBottom: 8,
        marginLeft: 16,
        fontSize: 34,
        lineHeight: 40,
        fontWeight: 'bold',
        color: '#353535',
        backgroundColor: 'rgba(0,0,0,0)',
    },
    innerContainer: {
        position: 'relative',
        width: 100 * vw,
    },
    contentContainer: {
        width: 100 * vw,
        backgroundColor: '#fff',
    }
});
