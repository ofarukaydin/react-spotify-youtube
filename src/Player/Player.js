import React, { Component } from "react";
import { hot } from "react-hot-loader";
import ReactPlayer from "react-player";
import Duration from "./Duration";
import "./Player.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStepBackward,
  faStepForward,
  faVolumeUp,
  faVolumeMute
} from "@fortawesome/free-solid-svg-icons";
import {
  faPlayCircle,
  faPauseCircle
} from "@fortawesome/free-regular-svg-icons";
import { connect } from "react-redux";
import * as actions from "../store/actions/player";

class Player extends Component {
  state = {};

  handleSeekMouseUp = e => {
    this.props.onSeekMouseUp();
    this.player.seekTo(parseFloat(e.target.value));
  };

  handleProgress = state => {
    // We only want to update time slider if we are not currently seeking
    if (!this.props.player.seeking) {
      this.props.onHandleProgress(state);
    }
  };

  ref = player => {
    this.player = player;
  };

  render() {
    const {
      url,
      playing,
      controls,
      light,
      volume,
      muted,
      loop,
      played,
      playbackRate,
      pip,
      duration,
      loading
    } = this.props.player;

    return (
      <div className="playercontainer player">
        <div className="player-grid-container">
          <ReactPlayer
            ref={this.ref}
            width="220px"
            height="90px"
            url={url}
            pip={pip}
            playing={playing}
            controls={controls}
            light={light}
            loop={loop}
            playbackRate={playbackRate}
            volume={volume}
            muted={muted}
            onReady={() => console.log("onReady")}
            onStart={() => console.log("onStart")}
            onPlay={this.props.onPlay}
            onEnablePIP={this.handleEnablePIP}
            onDisablePIP={this.handleDisablePIP}
            onPause={this.props.onPause}
            onBuffer={() => console.log("onBuffer")}
            onSeek={e => console.log("onSeek", e)}
            onEnded={this.props.onHandleEnded}
            onError={e => console.log("onError", e)}
            onProgress={this.handleProgress}
            onDuration={duration => this.props.onHandleDuration({ duration })}
          />
          <div className="midcontainer">
            <div className="playcontrols">
              <FontAwesomeIcon
                style={{ margin: "10px" }}
                icon={faStepBackward}
              />
              <FontAwesomeIcon
                onClick={this.props.onPlayPause}
                style={{ fontSize: "40px" }}
                icon={playing ? faPauseCircle : faPlayCircle}
                spin={loading}
              />
              <FontAwesomeIcon
                style={{ margin: "10px" }}
                icon={faStepForward}
              />
            </div>
            <div className="slidercontainer">
              <Duration seconds={duration * played} />
              <div style={{ margin: "0 10px 0 10px" }}>
                <input
                  className="slider"
                  type="range"
                  min={0}
                  max={1}
                  step="any"
                  value={played}
                  onMouseDown={this.props.onSeekMouseDown}
                  onChange={e => {
                    this.props.onSeekChange(parseFloat(e.target.value));
                  }}
                  onMouseUp={this.handleSeekMouseUp}
                />
              </div>
              <Duration seconds={duration} />
            </div>
          </div>

          <div className="playerright">
            <FontAwesomeIcon
              style={{ margin: "5px" }}
              icon={muted ? faVolumeMute : faVolumeUp}
              onClick={this.props.onToggleMuted}
            />
            <div style={{ marginRight: "15px" }}>
              <input
                className="slider"
                type="range"
                min={0}
                max={1}
                step="any"
                value={volume}
                onChange={e => {
                  this.props.onVolumeChange(parseFloat(e.target.value));
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    player: state.player
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetTrack: url => dispatch(actions.setTrack(url)),
    onPlayPause: () => dispatch(actions.playPause()),
    onToggleLoop: () => dispatch(actions.toggleLoop()),
    onVolumeChange: value => dispatch(actions.volumeChange(value)),
    onToggleMuted: () => dispatch(actions.toggleMuted()),
    onPlay: () => dispatch(actions.play()),
    onPause: () => dispatch(actions.pause()),
    onSeekMouseDown: () => dispatch(actions.seekMouseDown()),
    onSeekChange: value => dispatch(actions.seekChange(value)),
    onSeekMouseUp: () => dispatch(actions.seekMouseUp()),
    onHandleProgress: value => dispatch(actions.handleProgress(value)),
    onHandleEnded: () => dispatch(actions.handleEnded()),
    onHandleDuration: value => dispatch(actions.handleDuration(value))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(hot(module)(Player));
