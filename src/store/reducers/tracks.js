import * as actionTypes from "../actions/actionTypes";

const initialState = {
  currentTrack: {
    title: null,
    artists: null,
    album: null,
    duration: null,
    addedAt: null
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
