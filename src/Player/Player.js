import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import ReactPlayer from "react-player"
import Duration from './Duration'
import styles from "./Player.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStepBackward, faStepForward, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons'
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-regular-svg-icons'
import { connect } from "react-redux"
import * as actionTypes from "../store/actions"


class Player extends Component {
    state = {

    }


    handleSeekMouseUp = e => {
        this.props.onSeekMouseUp()
        this.player.seekTo(parseFloat(e.target.value))
    }

    handleProgress = state => {
        console.log('onDuration', this.state)
        // We only want to update time slider if we are not currently seeking
        if (!this.props.player.seeking) {
            this.props.onHandleProgress(state)
        }
    }

    ref = player => {
        this.player = player
    }

    render() {
        const { url, playing, controls, light, volume, muted, loop, played, playbackRate, pip, duration } = this.props.player

        return (
            <div className={styles.playercontainer}>
                <ReactPlayer
                    ref={this.ref}
                    className={styles.reactplayer}
                    width='200px'
                    height='100px'
                    url={url}
                    pip={pip}
                    playing={playing}
                    controls={controls}
                    light={light}
                    loop={loop}
                    playbackRate={playbackRate}
                    volume={volume}
                    muted={muted}
                    onReady={() => console.log('onReady')}
                    onStart={() => console.log('onStart')}
                    onPlay={this.props.onPlay}
                    onEnablePIP={this.handleEnablePIP}
                    onDisablePIP={this.handleDisablePIP}
                    onPause={this.props.onPause}
                    onBuffer={() => console.log('onBuffer')}
                    onSeek={e => console.log('onSeek', e)}
                    onEnded={this.props.onHandleEnded}
                    onError={e => console.log('onError', e)}
                    onProgress={this.handleProgress}
                    onDuration={(duration) => this.props.onHandleDuration({duration})}
                />

                <div className={styles.playermid}>
                    <div className={styles.playbuttons}>
                        <FontAwesomeIcon style={{ margin: "10px" }} icon={faStepBackward} />
                        <FontAwesomeIcon onClick={this.props.onPlayPause} style={{ fontSize: "40px" }} icon={playing ? faPauseCircle : faPlayCircle} />
                        <FontAwesomeIcon style={{ margin: "10px" }} icon={faStepForward} />
                    </div>
                    <div className={styles.playermidcontainer}>
                        <Duration seconds={duration * played} />
                        <div style={{ margin: "0 10px 0 10px" }} className={styles.slidecontainer}>
                            <input className={styles.slider}
                                type='range' min={0} max={1} step='any'
                                value={played}
                                onMouseDown={this.props.onSeekMouseDown}
                                onChange={(e) => { this.props.onSeekChange(parseFloat(e.target.value)) }}
                                onMouseUp={this.handleSeekMouseUp}
                            />
                        </div>
                        <Duration seconds={duration} />
                    </div>

                </div>

                <div className={styles.playerright}>
                    <FontAwesomeIcon style={{ margin: "5px" }} icon={muted ? faVolumeMute : faVolumeUp} onClick={this.props.onToggleMuted} />
                    <div style={{ marginRight: "15px" }} className={styles.slidercontainer}>
                        <input className={styles.slider} type='range' min={0} max={1} step='any' value={volume} onChange={(e) => { this.props.onVolumeChange(parseFloat(e.target.value)) }} />
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        player: state.player
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onSetTrack: (trackUrl) => dispatch({ type: actionTypes.SET_TRACK, url: trackUrl }),
        onPlayPause: () => dispatch({ type: actionTypes.PLAY_PAUSE }),
        onToggleLoop: () => dispatch({ type: actionTypes.TOGGLE_LOOP }),
        onVolumeChange: (value) => dispatch({ type: actionTypes.VOLUME_CHANGE, value: value }),
        onToggleMuted: () => dispatch({ type: actionTypes.TOGGLE_MUTED }),
        onPlay: () => dispatch({ type: actionTypes.PLAY }),
        onPause: () => dispatch({ type: actionTypes.PAUSE }),
        onSeekMouseDown: () => dispatch({ type: actionTypes.SEEK_MOUSE_DOWN }),
        onSeekChange: (value) => dispatch({ type: actionTypes.SEEK_CHANGE, value: value }),
        onSeekMouseUp: () => dispatch({ type: actionTypes.SEEK_MOUSE_UP }),
        onHandleProgress: (value) => dispatch({ type: actionTypes.HANDLE_PROGRESS, value }),
        onHandleEnded: () => dispatch({ type: actionTypes.HANDLE_ENDED }),
        onHandleDuration: (value) => dispatch({ type: actionTypes.HANDLE_DURATION, value }),
        
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(Player))