import * as actionTypes from "./actionTypes";
import axios from "axios";

export const getUrlStart = () => {
  return {
    type: actionTypes.GET_URL_START
  };
};

export const getUrlSuccess = url => {
  return {
    type: actionTypes.GET_URL_SUCCESS,
    url: url
  };
};

export const getUrlFail = error => {
  return {
    type: actionTypes.GET_URL_FAIL,
    error: error
  };
};

export const getUrl = (artists, title) => {
  return dispatch => {
    dispatch(getUrlStart());
    axios
      .get("http://localhost/search?q=" + artists + " " + title)
      .then(res => {
        const url = res.data.url;
        dispatch(getUrlSuccess(url))
        dispatch(setTrack(url));
      })
      .catch(err => {
        dispatch(getUrlFail(err));
      });
  };
};

export const setTrack = url => {
  return {
    type: actionTypes.SET_TRACK,
    url: url
  };
};

export const playPause = () => {
  return {
    type: actionTypes.PLAY_PAUSE
  };
};

export const toggleLoop = () => {
  return {
    type: actionTypes.TOGGLE_LOOP
  };
};

export const volumeChange = value => {
  return {
    type: actionTypes.VOLUME_CHANGE,
    value: value
  };
};

export const toggleMuted = () => {
  return {
    type: actionTypes.TOGGLE_MUTED
  };
};

export const play = () => {
  return {
    type: actionTypes.PLAY
  };
};

export const pause = () => {
  return {
    type: actionTypes.PAUSE
  };
};

export const seekMouseDown = () => {
  return {
    type: actionTypes.SEEK_MOUSE_DOWN
  };
};

export const seekChange = value => {
  return {
    type: actionTypes.SEEK_CHANGE,
    value: value
  };
};

export const seekMouseUp = () => {
  return {
    type: actionTypes.SEEK_MOUSE_UP
  };
};

export const handleDuration = value => {
  return {
    type: actionTypes.HANDLE_DURATION,
    value: value
  };
};

export const handleEnded = () => {
  return {
    type: actionTypes.HANDLE_ENDED
  };
};

export const handleProgress = value => {
  return {
    type: actionTypes.HANDLE_PROGRESS,
    value: value
  };
};

export const setLoading = value => {
  return {
    type: actionTypes.SET_LOADING,
    loading: value
  };
}

