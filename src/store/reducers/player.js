import * as actionTypes from "../actions/actionTypes";

/* type PlayerState = {
  url: null | string;
  fetchedUrl: null | string;
  pip: boolean;
  playing: boolean;
  controls: boolean;
  light: boolean;
  volume: number;
  muted: boolean;
  played: number;
  loaded: number;
  duration: number;
  playbackRate: number;
  loop: boolean;
  seeking: boolean;
  loading: boolean;
  error: null | string
} */

const initialState = {
  url: null,
  fetchedUrl: null,
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
  loop: false,
  seeking: false,
  loading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TRACK:
      return {
        ...state,
        url: action.url,
        played: 0,
        loaded: 0,
        pip: false,
        playing: true
      };
    case actionTypes.PLAY_PAUSE:
      return {
        ...state,
        playing: !state.playing
      };
    case actionTypes.TOGGLE_LOOP:
      return {
        ...state,
        loop: !state.player.loop
      };
    case actionTypes.VOLUME_CHANGE:
      return {
        ...state,
        volume: action.value
      };
    case actionTypes.TOGGLE_MUTED:
      return {
        ...state,
        muted: !state.player.muted
      };
    case actionTypes.PLAY:
      return {
        ...state,
        playing: true
      };
    case actionTypes.PAUSE:
      return {
        ...state,
        playing: false
      };
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.loading
      };
    case actionTypes.SEEK_MOUSE_DOWN:
      return {
        ...state,
        seeking: true
      };

    case actionTypes.SEEK_CHANGE:
      return {
        ...state,
        played: action.value
      };

    case actionTypes.SEEK_MOUSE_UP:
      return {
        ...state,
        seeking: false
      };
    case actionTypes.HANDLE_PROGRESS:
      return {
        ...state,
        ...action.value
      };
    case actionTypes.HANDLE_ENDED:
      return {
        ...state,
        playing: state.loop
      };
    case actionTypes.HANDLE_DURATION:
      return {
        ...state,
        ...action.value
      };
    case actionTypes.GET_URL_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.GET_URL_SUCCESS:
      return {
        ...state,
        fetchedUrl: action.url,
        loading: false
      };
    case actionTypes.GET_URL_FAIL:
      return {
        ...state,
        fetchedUrl: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default reducer;
