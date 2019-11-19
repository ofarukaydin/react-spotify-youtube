import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import ReactPlayer from "react-player"
import Duration from './Duration'
import styles from "./Player.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStepBackward, faStepForward, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons'
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-regular-svg-icons'

class Player extends Component {
    state = {
        url: null,
        pip: false,
        playing: false,
        controls: false,
        light: false,
        volume: 0.8,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        loop: false
    }

    load = url => {
        this.setState({
            url,
            played: 0,
            loaded: 0,
            pip: false,
            playing: true
        })
    }

    handlePlayPause = () => {
        this.setState({ playing: !this.state.playing })
    }

    handleStop = () => {
        this.setState({ url: null, playing: false })
    }

    handleToggleControls = () => {
        const url = this.state.url
        this.setState({
            controls: !this.state.controls,
            url: null
        }, () => this.load(url))
    }

    handleToggleLight = () => {
        this.setState({ light: !this.state.light })
    }

    handleToggleLoop = () => {
        this.setState({ loop: !this.state.loop })
    }

    handleVolumeChange = e => {
        this.setState({ volume: parseFloat(e.target.value) })
    }

    handleToggleMuted = () => {
        this.setState({ muted: !this.state.muted })
    }

    handleSetPlaybackRate = e => {
        this.setState({ playbackRate: parseFloat(e.target.value) })
    }

    handleTogglePIP = () => {
        this.setState({ pip: !this.state.pip })
    }

    handlePlay = () => {
        console.log('onPlay')
        this.setState({ playing: true })
    }

    handleEnablePIP = () => {
        console.log('onEnablePIP')
        this.setState({ pip: true })
    }

    handleDisablePIP = () => {
        console.log('onDisablePIP')
        this.setState({ pip: false })
    }

    handlePause = () => {
        console.log('onPause')
        this.setState({ playing: false })
    }

    handleSeekMouseDown = e => {
        this.setState({ seeking: true })
    }

    handleSeekChange = e => {
        this.setState({ played: parseFloat(e.target.value) })
    }

    handleSeekMouseUp = e => {
        this.setState({ seeking: false })
        this.player.seekTo(parseFloat(e.target.value))
    }

    handleProgress = state => {
        console.log('onProgress', state)
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
            this.setState(state)
        }
    }

    handleEnded = () => {
        console.log('onEnded')
        this.setState({ playing: this.state.loop })
    }

    handleDuration = (duration) => {
        console.log('onDuration', duration)
        this.setState({ duration })
    }

    renderLoadButton = (url, label) => {
        return (
            <button onClick={() => this.load(url)}>
                {label}
            </button>
        )
    }

    ref = player => {
        this.player = player
    }

    render() {
        const { url, playing, controls, light, volume, muted, loop, played, duration, playbackRate, pip } = this.state


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
                        onPlay={this.handlePlay}
                        onEnablePIP={this.handleEnablePIP}
                        onDisablePIP={this.handleDisablePIP}
                        onPause={this.handlePause}
                        onBuffer={() => console.log('onBuffer')}
                        onSeek={e => console.log('onSeek', e)}
                        onEnded={this.handleEnded}
                        onError={e => console.log('onError', e)}
                        onProgress={this.handleProgress}
                        onDuration={this.handleDuration}
                    />

                    <div className={styles.playermid}>
                        <div className={styles.playbuttons}>
                            <FontAwesomeIcon style={{ margin: "10px" }} icon={faStepBackward} />
                            <FontAwesomeIcon onClick={this.handlePlayPause} style={{ fontSize: "40px" }} icon={this.state.playing ? faPauseCircle : faPlayCircle} />
                            <FontAwesomeIcon style={{ margin: "10px" }} icon={faStepForward} />
                        </div>
                        <div className={styles.playermidcontainer}>
                            <Duration seconds={duration * played} />
                            <div style={{ margin: "0 10px 0 10px" }} className={styles.slidecontainer}>
                                <input className={styles.slider}
                                    type='range' min={0} max={1} step='any'
                                    value={played}
                                    onMouseDown={this.handleSeekMouseDown}
                                    onChange={this.handleSeekChange}
                                    onMouseUp={this.handleSeekMouseUp}
                                />
                            </div>
                            <Duration seconds={duration} />
                        </div>

                    </div>

                    <div className={styles.playerright}>
                        <FontAwesomeIcon style={{ margin: "5px" }} icon={this.state.muted ? faVolumeMute : faVolumeUp} onClick={this.handleToggleMuted} />
                        <div style={{ marginRight: "15px" }} className={styles.slidercontainer}>
                            <input className={styles.slider} type='range' min={0} max={1} step='any' value={volume} onChange={this.handleVolumeChange} />
                        </div>
                    </div>
                </div>
        )
    }
}

export default hot(module)(Player)