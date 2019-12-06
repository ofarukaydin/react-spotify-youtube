import * as actionTypes from "../actions/actionTypes";

const initialState = {
  currentTrack: {
    title: null,
    artists: null,
    album: null,
    duration: null,
    addedAt: null
  },
  trackList: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TRACKS_SUCCESS:
      return {
        ...state,
        currentTrack: { ...state.currentTrack },
        trackList: action.tracks
      };
    case actionTypes.SET_CURRENT_TRACK:
      return {
        ...state,
        currentTrack: action.track
      };

    default:
      return state;
  }
};

export default reducer;
