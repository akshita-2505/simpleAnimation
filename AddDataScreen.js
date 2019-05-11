import React, { Component } from 'react';
import { SafeAreaView, Text, FlatList, View, TextInput,TouchableHighlight ,TouchableOpacity} from 'react-native';
import * as Firebase from 'firebase';
const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyDoBnwBJpnT7mfGpexS1t2EAMciqnYBlas",
    authDomain: "fir-abdfa.firebaseapp.com",
    databaseURL: "https://fir-abdfa.firebaseio.com/",
    projectId: "fir-abdfa",
    storageBucket: "fir-abdfa.appspot.com",
    messagingSenderId: "937321627937"
};

let app = Firebase.initializeApp(config);
db = app.database();
let itemsRef = db.ref( '/demo');

let addItem = item => {
    itemsRef.push({
        name: item
    });
};
let updateItem = item => {
    itemsRef.update({name:item})
}
class AddDataScreen extends Component {
    constructor() {
        super();
        this.state = {
            key: '',
            name: '',
        };

        // this.ref = firebase.firestore().collection('posts');
        //     this.unsubscribe = null;
        //     this.state = {
        //       posts: [],
        //       loading: true,
        //     };
    }
    componentDidMount() {
        this.handleList()
    }
    handleChange = e => {
        this.setState({
            name: e.nativeEvent.text
        });
    };
    handleSubmit = () => {

        const { key,name } = this.state;
        if(key === ''){
            addItem(name);
            alert('Item saved successfully');
        }
        else{
            itemsRef.child(key).set({name: name}).then().catch();

        }
        this.setState({name:'',key:''});
        this.handleList()

    };
    handleList = () => {
        let newUser = {};
        itemsRef.on('value', snapshot => {
            let data = snapshot.val();
            if(data)
            {
                let i = 0;
                Object.keys(data).forEach((key)=>{
                    i++;

                    newUser[i] = {};
                    newUser[i]['key'] = key;
                    newUser[i]['name'] = data[key]['name']
                })

            }
            let item = Object.values(newUser);
            this.setState({item:item})
        });

    };
    handleDelete = () =>{
        const { key } = this.state;
        itemsRef.child(key).remove().then().catch();
        this.setState({name:'',key:''});
        this.handleList()
    }
    onRowClick = (item) => {
        this.setState({name:item.name,key:item.key})
    };
    renderItem = ({item, index}) => {
        {
            if(item.name !== "") {
                return (
                    <TouchableOpacity onPress={()=>this.onRowClick(item)} >
                        <View key={index}>
                            <Text animation="swing" easing="ease-out" iterationCount="infinite" style={{borderWidth:1}}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
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

    render() {

        return (
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'white' }}>
                <Text >Add Item</Text>
                <TextInput
                    value={this.state.name}
                    onChange={this.handleChange} style={{width:'80%',
                    padding: 4,
                    marginRight: 5,
                    fontSize: 20,
                    borderWidth: 1,
                    borderRadius: 8,
                }}/>
                <View style={{flexDirection:'row', justifyContent: 'space-around',alignItems: 'center',height:50,width:'100%'}}>
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
                        onPress={()=>{this.handleList()}}
                    >
                        <Text style={{fontSize: 18,
                            color: '#111',
                            alignSelf: 'center'}}>List</Text>
                    </TouchableHighlight>
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
                        onPress={()=>{this.handleDelete()}}
                    >
                        <Text style={{fontSize: 18,
                            color: '#111',
                            alignSelf: 'center'}}>Delete</Text>
                    </TouchableHighlight>
                </View>
                <FlatList data={this.state.item}
                          style={{height:50}}
                          contentContainerStyle={{top:20}}
                          automaticallyAdjustContentInsets={false}
                          renderItem={this.renderItem}
                          keyExtractor={this.keyExtractor}
                          ItemSeparatorComponent={this.renderSeparator}
                          ListEmptyComponent={this.renderEmpty}
                          ListFooterComponent={<View style={{ height: 50}}/>}
                />
            </SafeAreaView>
        );
    }
}

export default AddDataScreen;
