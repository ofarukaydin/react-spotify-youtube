import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faPauseCircle
} from "@fortawesome/free-regular-svg-icons";
import * as actions from "../../../../store/actions/player";
import { setCurrentTrack } from "../../../../store/actions/tracks";

const Track = props => {


  const handleClick = () => {
    props.getUrl(props.artists, props.title);
    props.setCurrentTrack(props.track);
  };

  return (
    <tbody style={props.player.playing && props.tracks.currentTrack.duration === props.duration ? { color: "green" } : { color: "grey" }}>
      <tr>
        <td>
          <FontAwesomeIcon
            onClick={handleClick}
            icon={props.player.playing && props.tracks.currentTrack.duration === props.duration ? faPauseCircle : faPlayCircle}
            spin={props.tracks.currentTrack.duration === props.duration ? props.player.loading : null}
          />
        </td>
        <td onClick={handleClick}>{props.title}</td>
        <td>{props.artists}</td>
        <td>{props.album}</td>
      </tr>
    </tbody>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setTrack: trackUrl => dispatch(actions.setTrack(trackUrl)),
    pause: () => dispatch(actions.pause()),
    getUrl: (artists, title) => dispatch(actions.getUrl(artists, title)),
    setCurrentTrack: track => dispatch(setCurrentTrack(track))
  };
};

const mapStateToProps = state => {
  return {
    player: state.player,
    tracks: state.tracks
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Track);
