import React, { Component } from "react";
import {
    View,
    Text,
    ImageBackground,
    Dimensions,
    Image,
    TouchableOpacity,
    Animated,
    Easing,
    Slider
} from "react-native";
import { connect } from "react-redux";
import SoundPlayer from "react-native-sound-player";
const { width, height } = Dimensions.get("window");

export default class PlayerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeCounter: 0,
            currentPosition: 0,
            audioDuration: 0
        };
        SoundPlayer.reset();
    }

    updateAudioDuration() {
        SoundPlayer.onProgressUpdate(progress => {
            this.setState({isLoading:false, currentPosition: progress.currentPosition})
            // console.log("progress", progress);
        });

        SoundPlayer.getDuration(duration => {
            if (isNaN(duration)) {
                duration = 0;
            }
            this.setState({ audioDuration: duration });
        });
    }

    seekForward() {
        const { currentPosition } = this.state;
        SoundPlayer.seek(currentPosition + 10);
    }

    seekBackWard() {
        const { currentPosition } = this.state;
        SoundPlayer.seek(currentPosition - 10);
    }

    render() {
        return (
            <Slider
                step={1}
                minimumValue={0}
                maximumValue={this.state.audioDuration}
                minimumTrackTintColor="#ec68cc"
                value={this.state.currentPosition}
                onValueChange={currentPosition => {
                    SoundPlayer.seek(currentPosition);
                }}
                style={{ width: "88%" }}
            />
        );
    }
}

class PlayerScreen extends Component {
    constructor(props) {
        super(props);

        };
    }

    componentDidMount() {

        this.playAndResume();

        SoundPlayer.onPlayerBufferStatus(status => {
            this.setState({ isLoading: status.loading });
        });

        SoundPlayer.onProgressUpdate(progress => {
            if (progress.currentPosition !== 0){
                this.setState({isLoading:false})
            }
            // console.log("progress", progress);
        });
    }

    hidePlayer() {
        if (SoundPlayer) {
            SoundPlayer.stop();
        }

        this.setState({ paused: true });
        this.props.hidePlayer();
    }


    playAndResume() {
        const { audio } = this.state;
        const { isValid = false } = this.props;
        const { audioFileName, audioFileURL } = audio;
        SoundPlayer.position(async position => {
            if (position && position > 1) {
                this.setState({ paused: false });
                SoundPlayer.resume();
            } else {
                this.setState({ paused: false });
                this.slider.updateAudioDuration();
                const fileExists = await checkIfAudioExists({
                    fileName: audioFileName
                });
                this.playMedia({
                    context: this,
                    fileName: fileExists && isValid ? audioFileName : audioFileURL,
                    isBundled: fileExists && isValid,
                    isFromCard: false
                });
            }
        });
    }

    async playMedia({ context, fileName, isBundled }) {
        trackEvent({ category: "Player", action: `played file is ${fileName}` });
        try {
            if (isBundled) {
                // this.setState({ isLoading: false });
                context.setState({ paused: false });
                const audioPath = `${getAudioDir()}/${fileName}`;

                SoundPlayer.playSoundFile("", "mp3", audioPath);
            } else {
                const url = fileName;
                SoundPlayer.playUrl(url);
            }
        } catch (e) {
            console.log("cannot play the sound file", e);
        }
        this.slider.updateAudioDuration();
    }

    pause() {
        try {
            SoundPlayer.pause();
            this.setState({ paused: true });
            // or play from url
        } catch (e) {
            console.log("cannot pause the sound file", e);
        }
    }

    renderPlayerControls() {
        return (
            <View
                style={{
                    position: "absolute",
                    justifyContent: "center",
                    alignItems: "center",
                    bottom: 20,
                    height: 160,
                    width
                    // backgroundColor: "red"
                }}
            >
                <SliderComponent ref={ref => (this.slider = ref)} />
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row"
                    }}
                >
                    <TouchableOpacity onPress={() => this.slider.seekBackWard()}>
                        <Image
                            source={require("../../../assets/images/btn-previous.png")}
                            resizeMode="contain"
                            style={{
                                width: 64,
                                height: 64
                            }}
                        />
                    </TouchableOpacity>
                    {this.getPlayPauseButton()}
                    <TouchableOpacity onPress={() => this.slider.seekForward()}>
                        <Image
                            source={require("../../../assets/images/btn-next.png")}
                            resizeMode="contain"
                            style={{
                                width: 64,
                                height: 64
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    render() {

        return (
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "rgba(164, 136, 190, 0.50)"
                    }}
                >
                    {this.renderSongAlbumTitle()}
                    {this.renderPlayerControls()}
                </View>
        );
    }
}

