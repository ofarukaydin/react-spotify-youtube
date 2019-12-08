import React, { useEffect, useState } from "react";
import Spotify from "../../../Spotify/Spotify";
import { useParams } from "react-router-dom";
import Track from "./Track/Track";
import "./Tracks.css";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/tracks";

const Tracks = props => {
  const [getPlaylistDetails, setPlaylistDetails] = useState({});
  const params = useParams();
  useEffect(() => {
    props.getTracks(params.playlistId);
    (async () => {
      let playlist = await Spotify.getPlaylistDetails(params.playlistId);
      const iconList = playlist.images.map(icon => icon.url);
      setPlaylistDetails({
        image: iconList[0],
        id: playlist.id,
        name: playlist.name,
        owner: playlist.owner.display_name,
        ownerId: playlist.owner.id,
        description: playlist.description,
        primary_color: playlist.primary_color
      });
    })();
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
      albumId={track.albumId}
    />
  ));

  return (
    <div className="playlist-grid-container">
      <div className="playlist-left-container">
        <div className="playlist-left">
          <img
            className="playlist-img"
            src={getPlaylistDetails.image}
            alt="Cover"
          />
          <p className="playlist-name">{getPlaylistDetails.name}</p>
          <p className="playlist-owner">{getPlaylistDetails.owner}</p>
          <p className="playlist-description">
            {getPlaylistDetails.description}
          </p>
        </div>
      </div>
      <div className="playlist-right-container">
        <div className="playlist-right">
          {trackElements ? trackElements : null}
        </div>
      </div>
    </div>
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
