import React, { Component } from 'react';
import { ListView, Platform, Slider, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { createAnimatableComponent, View, Text } from 'react-native-animatable';

const AnimatableListView = createAnimatableComponent(ListView);

const COLORS = [
    '#65b237', // green
    '#346ca5', // blue
    '#a0a0a0', // light grey
    '#ffc508', // yellow
    '#217983', // cobolt
    '#435056', // grey
    '#b23751', // red
    '#333333', // dark
    '#ff6821', // orange
    '#e3a09e', // pink
    '#1abc9c', // turquoise
    '#302614', // brown
];

const ANIMATION_TYPES = {

    'Bouncing Exits': [
        'bounceOut',
        'bounceOutDown',
        'bounceOutUp',
        'bounceOutLeft',
        'bounceOutRight',
    ],


};

const NATIVE_INCOMPATIBLE_ANIMATIONS = [
    'jello',
    'lightSpeedIn',
    'lightSpeedOut',
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 28,
        fontWeight: '300',
        textAlign: 'center',
        margin: 20,
        marginTop: (Platform.OS === 'ios' ? 40 : 20),
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 20,
        backgroundColor: 'transparent',
    },
    slider: {
        height: 30,
        margin: 10,
    },
    toggle: {
        width: 120,
        backgroundColor: '#333',
        borderRadius: 3,
        padding: 5,
        fontSize: 14,
        alignSelf: 'center',
        textAlign: 'center',
        margin: 10,
        color: 'rgba(255, 255, 255, 1)',
    },
    toggledOn: {
        color: 'rgba(255, 33, 33, 1)',
        fontSize: 16,
        transform: [{
            rotate: '8deg',
        }, {
            translateY: -20,
        }],
    },
    sectionHeader: {
        backgroundColor: '#F5FCFF',
        padding: 15,
    },
    sectionHeaderText: {
        textAlign: 'center',
        fontSize: 18,
    },
});

export default class AllAnimationDemo extends Component {
    constructor(props) {
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });
        this.state = {
            dataSource: dataSource.cloneWithRowsAndSections(ANIMATION_TYPES),
            duration: 1000,
            toggledOn: false,
        };
    }

    textRef = null;
    handleTextRef = (ref) => {
        this.textRef = ref;
    };

    handleDurationChange = (duration) => {
        this.setState({ duration: Math.round(duration) });
    };

    handleRowPressed = (componentRef, animationType) => {
        componentRef.setNativeProps({
            style: {
                zIndex: 1,
            },
        });
        componentRef.animate(animationType, this.state.duration).then(() => {
            componentRef.setNativeProps({
                style: {
                    zIndex: 0,
                },
            });
        });
        if (this.textRef) {
            this.textRef[animationType](this.state.duration);
        }
    };

    render() {
        const { dataSource, duration, toggledOn } = this.state;
        return (
            <View animation="fadeIn" style={styles.container} useNativeDriver>


                <AnimatableListView
                    animation="bounceInUp"
                    duration={1100}
                    delay={1400}
                    style={styles.listView}
                    dataSource={dataSource}
                    removeClippedSubviews={false}
                    renderSectionHeader={(rows, section) => (
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionHeaderText}>{section}</Text>
                        </View>
                    )}
                    renderRow={(animationType, section, i) => (
                        <AnimationCell
                            animationType={animationType}
                            color={COLORS[i % COLORS.length]}
                            onPress={this.handleRowPressed}
                            useNativeDriver={NATIVE_INCOMPATIBLE_ANIMATIONS.indexOf(animationType) === -1}
                        />
                    )}
                />
            </View>
        );
    }
}

const cellStyles = StyleSheet.create({
    cell: {
        padding: 16,
        marginBottom: 10,
        marginHorizontal: 10,
    },
    name: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});

class AnimationCell extends Component {
    ref = null;
    handleRef = (ref) => {
        this.ref = ref;
    }

    handlePress = () => {
        if (this.ref && this.props.onPress) {
            this.props.onPress(this.ref, this.props.animationType);
        }
    };

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.handlePress}>
                <View
                    ref={this.handleRef}
                    style={[{ backgroundColor: this.props.color }, cellStyles.cell]}
                    useNativeDriver={this.props.useNativeDriver}
                >
                    <Text style={cellStyles.name}>{this.props.animationType}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}