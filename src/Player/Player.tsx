import React, { MouseEventHandler } from "react";
import { hot } from "react-hot-loader";
import ReactPlayer, { ReactPlayerProps } from "react-player";
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

const Player = (props: ReactPlayerProps) => {
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
  } = props.player;

  const handleSeekMouseUp = (
    event: React.MouseEvent<HTMLInputElement>
  ): void => {
    props.onSeekMouseUp();
    player.seekTo(parseFloat(event.currentTarget.value));
  };

  const handleProgress = (state: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  }) => {
    // We only want to update time slider if we are not currently seeking
    if (!props.player.seeking) {
      props.onHandleProgress(state);
    }
  };
  let player: ReactPlayer;
  const ref = (reactPlayer: ReactPlayer) => {
    player = reactPlayer;
  };

  return (
    <div className="playercontainer player">
      <div className="player-grid-container">
        <ReactPlayer
          ref={ref}
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
          onPlay={props.onPlay}
          onPause={props.onPause}
          onBuffer={() => console.log("onBuffer")}
          onSeek={e => console.log("onSeek", e)}
          onEnded={props.onHandleEnded}
          onError={e => console.log("onError", e)}
          onProgress={handleProgress}
          onDuration={duration => props.onHandleDuration({ duration })}
        />
        <div className="midcontainer">
          <div className="playcontrols">
            <FontAwesomeIcon style={{ margin: "10px" }} icon={faStepBackward} />
            <FontAwesomeIcon
              onClick={props.onPlayPause}
              style={{ fontSize: "40px" }}
              icon={playing ? faPauseCircle : faPlayCircle}
              spin={loading}
            />
            <FontAwesomeIcon style={{ margin: "10px" }} icon={faStepForward} />
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
                onMouseDown={props.onSeekMouseDown}
                onChange={e => {
                  props.onSeekChange(parseFloat(e.target.value));
                }}
                onMouseUp={handleSeekMouseUp}
              />
            </div>
            <Duration seconds={duration} />
          </div>
        </div>

        <div className="playerright">
          <FontAwesomeIcon
            style={{ margin: "5px" }}
            icon={muted ? faVolumeMute : faVolumeUp}
            onClick={props.onToggleMuted}
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
                props.onVolumeChange(parseFloat(e.target.value));
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: { player: any }) => {
  return {
    player: state.player
  };
};

const mapDispatchToProps = (
  dispatch: (arg0: { type: string; url?: any; value?: any }) => any
) => {
  return {
    onSetTrack: (url: any) => dispatch(actions.setTrack(url)),
    onPlayPause: () => dispatch(actions.playPause()),
    onToggleLoop: () => dispatch(actions.toggleLoop()),
    onVolumeChange: (value: any) => dispatch(actions.volumeChange(value)),
    onToggleMuted: () => dispatch(actions.toggleMuted()),
    onPlay: () => dispatch(actions.play()),
    onPause: () => dispatch(actions.pause()),
    onSeekMouseDown: () => dispatch(actions.seekMouseDown()),
    onSeekChange: (value: any) => dispatch(actions.seekChange(value)),
    onSeekMouseUp: () => dispatch(actions.seekMouseUp()),
    onHandleProgress: (value: any) => dispatch(actions.handleProgress(value)),
    onHandleEnded: () => dispatch(actions.handleEnded()),
    onHandleDuration: (value: any) => dispatch(actions.handleDuration(value))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(hot(module)(Player));
