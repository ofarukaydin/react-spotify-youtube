import { combineReducers } from "@reduxjs/toolkit";
import playerReducer from "../reducers/playerReducer";
import currentTrackReducer from "../reducers/tracksReducer";

const rootReducer = combineReducers({
  player: playerReducer,
  currentTrack: currentTrackReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
