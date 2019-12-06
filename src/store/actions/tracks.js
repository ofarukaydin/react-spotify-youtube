import * as actionTypes from "./actionTypes";
import Spotify from "../../Spotify/Spotify";

export const getTracksStart = () => {
  return {
    type: actionTypes.GET_TRACKS_START
  };
};

export const getTracksSuccess = tracks => {
  return {
    type: actionTypes.GET_TRACKS_SUCCESS,
    tracks: tracks
  };
};

export const getTracksFail = error => {
  return {
    type: actionTypes.GET_TRACKS_FAIL,
    error: error
  };
};

export const getTracks = playlistId => {
  return dispatch => {
    dispatch(getTracksStart());
    Spotify.getTracks(playlistId)
    .then(tracks => {
      const tracksList = tracks.items.map(trackElement => {
        const artistList = trackElement.track.artists.map(artistElement => {
          return artistElement.name;
        });

        return {
          title: trackElement.track.name,
          artists: artistList.join(", "),
          album: trackElement.track.album.name,
          duration: trackElement.track.duration_ms,
          addedAt: trackElement.added_at.slice(0, 10)
        };
      });
      dispatch(getTracksSuccess(tracksList))
    })
    .catch(err => dispatch(getTracksFail(err)))
  };
};

export const setCurrentTrack = track => {
  return {
    type: actionTypes.SET_CURRENT_TRACK,
    track: track
  }
}

