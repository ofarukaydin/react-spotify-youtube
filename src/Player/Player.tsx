import React from "react";
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
import { useSelector, useDispatch } from "react-redux";
import {
  handleDuration,
  handleEnded,
  pause,
  play,
  playPause,
  seekChange,
  seekMouseDown,
  seekMouseUp,
  toggleMuted,
  volumeChange,
  handleProgress
} from "../store/reducers/playerReducer";
import { RootState } from "../store/reducers/rootReducer";

const Player = () => {
  const dispatch = useDispatch();
  const playerState = useSelector((state: RootState) => state.player);

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
    loading,
    seeking
  } = playerState;

  const handleSeekMouseUp = (
    event: React.MouseEvent<HTMLInputElement>
  ): void => {
    dispatch(seekMouseUp());
    player.seekTo(parseFloat(event.currentTarget.value));
  };

  const handlePlayerProgress = (state: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  }) => {
    // We only want to update time slider if we are not currently seeking
    if (!seeking) {
      dispatch(handleProgress(state));
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
          onPlay={play}
          onPause={pause}
          onBuffer={() => console.log("onBuffer")}
          onSeek={e => console.log("onSeek", e)}
          onEnded={() => dispatch(handleEnded())}
          onError={e => console.log("onError", e)}
          onProgress={handlePlayerProgress}
          onDuration={duration => dispatch(handleDuration({ duration }))}
        />
        <div className="midcontainer">
          <div className="playcontrols">
            <FontAwesomeIcon style={{ margin: "10px" }} icon={faStepBackward} />
            <FontAwesomeIcon
              onClick={e => dispatch(playPause())}
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
                onMouseDown={e => dispatch(seekMouseDown())}
                onChange={e => {
                  dispatch(seekChange(parseFloat(e.target.value)));
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
            onClick={toggleMuted}
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
                dispatch(volumeChange(parseFloat(e.target.value)));
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default hot(module)(Player);
