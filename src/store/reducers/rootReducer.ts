import { combineReducers } from "@reduxjs/toolkit";
import playerReducer from "../reducers/player";

const rootReducer = combineReducers({ player: playerReducer });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
