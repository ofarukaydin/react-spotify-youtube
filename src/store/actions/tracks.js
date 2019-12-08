import * as actionTypes from "./actionTypes";

export const setCurrentTrack = track => {
  return {
    type: actionTypes.SET_CURRENT_TRACK,
    track: track
  };
};
