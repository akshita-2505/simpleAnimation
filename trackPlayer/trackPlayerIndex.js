import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Slider,
    Image,
    LayoutAnimation,
    ScrollView} from 'react-native'
import TrackPlayer from 'react-native-track-player';
import {Player} from 'react-native-audio-toolkit';
import Icon from 'react-native-vector-icons/AntDesign';

export default class TrackPlayerIndex extends React.PureComponent {
    constructor() {
        super();
        this.rec = TrackPlayer.add({
            id: 'trackId',
            url: require('./1.mp3'),
            title: 'Track Title',
            artist: 'Track Artist',
        });

        this.state = {
            btnPlayStatus: true,
            progress: 0,
            isNew: true,
            volumnClick: false,
        };
        this.lastSeek = 0;
        this.rec.on('ended',() => {
            this.rec.stop(() => {
                alert('song end')
                this.setState({btnPlayStatus: true})
                this.clearSeekInterval()
                this.onPlayPausePress()
            })
        })
    }

    _shouldUpdateProgressBar() {
        return Date.now() - this.lastSeek > 200;
    }

    componentDidMount() {
        // let data = this.rec
        // alert(JSON.stringify(data))
        LayoutAnimation.linear()
    }

    onStart = () => {
        this._progressInterval = setInterval(() => {
            if (this.rec && this._shouldUpdateProgressBar()) {
                this.setState({progress: Math.max(0, this.rec.currentTime) / this.rec.duration});
            }
        }, 100);
    };

    componentWillUnmount() {
        this.clearSeekInterval()
    }

    seek = (percentage) => {
        if (!this.rec) return;
        this.lastSeek = Date.now();
        let position = percentage * this.rec.duration;
        this.rec.seek(position);
        this.setState({progress : percentage})
    }

    clearSeekInterval = () => {
        clearInterval(this._progressInterval);
    }

    onPlayPausePress = () => {
        // if (this.state.btnPlayStatus) {
            this.rec.play(() => {
                this.onStart();
            })

        // } else {
        //     this.rec.pause(() => {
        //         this.clearSeekInterval()
        //     });
        // }
        // this.setState({btnPlayStatus: !this.state.btnPlayStatus})
    }

    onSongPress = (songNo) => {
        this.clearSeekInterval()
        this.rec.stop()
        this.rec = new Player('song'+songNo+'.mp3', {autoDestroy: false})
        this.setState({btnPlayStatus: true, isNew: false})
        this.rec.on('ended',() => {
            this.rec.stop(() => {
                alert('song end 1')
                this.setState({btnPlayStatus: true})
                this.clearSeekInterval()
                this.onPlayPausePress()
            })
        })
    }

    onForwardPress = () => {
        this.rec.seek(this.rec.currentTime + (0.02 * this.rec.duration))
    }


    onBackwardPress = () => {
        this.rec.seek(this.rec.currentTime - (0.02 * this.rec.duration))

    }

    onSoundIconClick = () => {
        this.setState({volumnClick: !this.state.volumnClick})
    }

    // componentDidMount(){
    //
    //     setInterval(()=>{this.check()},10000)
    // }
    //
    // check = async() => {
    //     // let position = await TrackPlayer.getDuration();
    //     let position = TrackPlayer.updateOptions({
    //         ratingType: TrackPlayer.RATING_5_STARS,
    //
    //         stopWithApp: false,
    //
    //         capabilities: [
    //             TrackPlayer.CAPABILITY_PLAY,
    //             TrackPlayer.CAPABILITY_PAUSE,
    //             TrackPlayer.CAPABILITY_STOP
    //         ],
    //
    //         // An array of capabilities that will show up when the notification is in the compact form on Android
    //         compactCapabilities: [
    //             TrackPlayer.CAPABILITY_PLAY,
    //             TrackPlayer.CAPABILITY_PAUSE
    //         ]
    //     });
    //     console.log(position)
    // }

    playSong = async (data) => {
        let buffered = await TrackPlayer.getState();
        if(buffered !== 'ready') {
            TrackPlayer.setupPlayer().then(async () => {
                await TrackPlayer.add({
                    id: 'trackId',
                    url: require('./1.mp3'),
                    title: 'Track Title',
                    artist: 'Track Artist',
                });
                TrackPlayer.setVolume(1) // between 0 to 1
                if (data === 'play') {
                    TrackPlayer.play();
                } else if (data === 'pause') {
                    TrackPlayer.pause();
                } else if (data === 'stop') {
                    TrackPlayer.stop();
                }
            });
        }
    }
    render() {
        return (
            <View style={{flex:1,backgroundColor:'#37b',justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', marginTop: 100}}>
                    <Text onPress={()=>this.onPlayPausePress()}> play </Text>
                    <Text onPress={()=>this.playSong('pause')}> pause </Text>
                    <Text onPress={()=>this.playSong('stop')}> stop </Text>
                </TouchableOpacity>
                <View style={{ marginTop: 50,flexDirection:'row'}}>
                    <Slider
                        step={0.0001}
                        onValueChange={(percentage) => this.seek(percentage)}
                        value={this.state.progress}
                        style={{marginTop: 5, padding: 5,color:'black',width:'100%'}}
                        // backgroundColor={'black'}
                    />
                </View>
                {/*<SliderComponent ref={ref => (this.slider = ref)} />*/}
            </View>
        )
    }
}