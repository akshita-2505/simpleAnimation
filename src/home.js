import React, {Component} from 'react';
import {View, Text, Button, Image, Dimensions, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

var {height, width} = Dimensions.get('window');

// console.disableYellowBox = true;

export default class Home extends  Component{

    constructor(props) {
        super(props);
        this.state = {
            data:[{
                "name":"Akshita",
                "number":"789456"
            },{
                "name":"Rushita",
                "number":"515512"
            }],
            name:''
        };
    }
    onRowClick = (item) => {
        // this.setState({name:item.name})
    };
    renderItem = ({item, index}) => {
        {
            if(item.name !== "") {
                return (
                    <TouchableOpacity onPress={()=>this.onRowClick(item)} >
                        <View key={index} style={{
                            borderRadius:5,
                            backgroundColor:'#e1eaea',
                            marginLeft: 10,
                            justifyContent:'center',
                        }}>
                            <Text style={{fontSize:20,
                                height:height*0.05,
                                alignContent:'center',
                                justifySelf:'center'
                                // backgroundColor:'red',

                            }}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )
            }
        }
    };
    renderItem1 = ({item, index}) => {
        {
            return (
                <View>
                    <View key={index} style={{
                        borderRadius:10,
                        backgroundColor:'#e1eaea',
                        marginLeft: 10,
                        // justifyContent:'center',
                        overflow:true,
                        height:height*0.2,
                        width:width*0.7
                    }}
                          elevation={10}>
                        <Image source={require('../image/1.jpeg')}
                               style={{resizeMode:'cover',height:height*0.2,width:width*0.7}}/>

                    </View>
                    <View key={index} style={{
                        // backgroundColor:'#e1eaea',
                        marginLeft: 10,
                        top:height*0.008
                    }}><Text style={{fontSize:18}}>{item.name}</Text>
                        <Text style={{fontSize:13}}>{item.number}</Text>
                    </View>
                </View>
            )

        }
    };
    renderItem2= ({item, index}) => {
        {
            if(item.name !== "") {
                return (
                    <View key={index} style={{
                        borderRadius:10,
                        backgroundColor:'#e1eaea',
                        marginLeft: 10,
                        // justifyContent:'center',
                        overflow:true,
                        height:height*0.16,
                        width:width*0.6
                    }}>
                        <Image source={require('../image/2.jpg')}
                               style={{resizeMode:'cover',height:height*0.16,width:width*0.6}}/>

                    </View>

                )
            }
        }
    };
    keyExtractor = (item) => {
        return item.id ;
    };

    renderSeparator = ({leadingItem, section})=>{
        return <View style={{height:10}}/>;
    };

    renderEmpty = () => {
        return <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text style={{fontSize:15}}>
                {"No data found"}
            </Text>
        </View>
    };
    render(){
        return(
            <View style={{flex:1,backgroundColor:'white'}}>
                <ScrollView>
                <View style={{height:height*0.05,
                    // backgroundColor:'gray',
                    top:height*0.03,
                    width:width,
                    // alignItems:'center',
                    justifyContent:'center'
                }}>
                    <Text style={{fontWeight: 'bold',fontSize:25,marginLeft:width*0.1}}>Watch Now</Text>
                </View>
                <View style={{height:height*0.1}}>
                    <FlatList data={this.state.data}
                              style={{top:height*0.03}}
                              horizontal={true}
                              overScrollMode={true}
                              showsHorizontalScrollIndicator={false}
                              contentContainerStyle={{top:20,left:20}}
                              automaticallyAdjustContentInsets={false}
                              renderItem={this.renderItem}
                              keyExtractor={this.keyExtractor}
                              ItemSeparatorComponent={this.renderSeparator}
                              ListEmptyComponent={this.renderEmpty}
                              ListFooterComponent={<View style={{ height: 50}}/>}
                    /></View>
                <View style={{height:height*0.05,
                    // backgroundColor:'gray',
                    top:height*0.05,
                    width:width,
                    // alignItems:'center',
                    justifyContent:'center'
                }}>
                    <Text style={{fontWeight: 'bold',fontSize:25,marginLeft:width*0.1}}>Up next</Text>
                </View>
                <View style={{height:height*0.3}}>
                    <FlatList data={this.state.data}
                              overScrollMode={true}
                              style={{top:height*0.03}}
                              showsHorizontalScrollIndicator={false}
                              horizontal={true}
                              contentContainerStyle={{top:20,left:20,right:30}}
                              automaticallyAdjustContentInsets={false}
                              renderItem={this.renderItem1}
                              keyExtractor={this.keyExtractor}
                              ItemSeparatorComponent={this.renderSeparator}
                              ListEmptyComponent={this.renderEmpty}
                              ListFooterComponent={<View style={{ height: 10,backgroundColor:'red'}}/>

                              }
                    /></View>
                <View style={{height:height*0.05,
                    // backgroundColor:'gray',
                    top:height*0.05,
                    width:width,
                    flexDirection:'row',
                    justifyContent:'space-between'
                }}>
                    <Text style={{fontWeight: 'bold',fontSize:25,marginLeft:width*0.1}}>What to watch</Text>
                    <View style={{alignItems: 'flex-end'}}>
                        <Button title={"See All"} onPress={()=>{}}/></View>
                </View>
                <View style={{height:height*0.3}}>
                    <FlatList data={this.state.data}
                              style={{top:height*0.03}}
                              contentInset={{right:40}}
                              showsHorizontalScrollIndicator={false}
                              horizontal={true}
                              contentContainerStyle={{top:20,left:20}}
                              automaticallyAdjustContentInsets={false}
                              renderItem={this.renderItem2}
                              keyExtractor={this.keyExtractor}
                              ItemSeparatorComponent={this.renderSeparator}
                              ListEmptyComponent={this.renderEmpty}
                              ListFooterComponent={<View style={{ height: 50}}/>

                              }
                    /></View>
                </ScrollView>
            </View>
        )
    }
}
