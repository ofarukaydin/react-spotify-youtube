import React, { useEffect, useState } from "react";
import Spotify from "../../../Spotify/Spotify";
import { useParams } from "react-router-dom";
import Track from "./Track/Track";
import styles from "./Tracks.module.css";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/tracks";

const Tracks = props => {
  const params = useParams();
  useEffect(() => {
    props.getTracks(params.playlistId);
  }, [params.playlistId]);

  let keyIndex = 0;
  const trackElements = props.tracks.trackList.map(track => (
    <Track
      key={keyIndex++}
      title={track.title}
      addedAt={track.addedAt}
      artists={track.artists}
      album={track.album}
      duration={track.duration}
      track={track}
    />
  ));

  return (
    <table className={styles.Tracklist}>
      <tbody>
        <tr>
          <th></th>
          <th>Title</th>
          <th>Artist</th>
          <th>Album</th>
        </tr>
      </tbody>
      {trackElements ? trackElements : null}
    </table>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    getTracks: trackUrl => dispatch(actions.getTracks(trackUrl))
  };
};

const mapStateToProps = state => {
  return {
    player: state.player,
    tracks: state.tracks
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tracks);
