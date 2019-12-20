import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { AxiosResponse } from "axios";
import axios from "axios";

type HandleProgress = {
  playedSeconds: number;
  loadedSeconds: number;
  loaded: number;
  played: number;
};

const playerSlice = createSlice({
  name: "player",
  initialState: {
    url: "",
    fetchedUrl: "",
    pip: true,
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
    error: "",
    playedSeconds: 0,
    loadedSeconds: 0
  },
  reducers: {
    setTrack(state, action: PayloadAction<string>) {
      state.url = action.payload;
      state.played = 0;
      state.loaded = 0;
      state.pip = false;
      state.playing = true;
    },
    playPause(state) {
      state.playing = !state.playing;
    },
    toggleLoop(state) {
      state.loop = !state.loop;
    },
    volumeChange(state, action: PayloadAction<number>) {
      state.volume = action.payload;
    },
    toggleMuted(state) {
      state.muted = !state.muted;
    },
    play(state) {
      state.playing = true;
    },
    pause(state) {
      state.playing = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    seekMouseDown(state) {
      state.seeking = true;
    },
    seekChange(state, action: PayloadAction<number>) {
      state.played = action.payload;
    },
    seekMouseUp(state) {
      state.seeking = false;
    },
    handleProgress(state, action: PayloadAction<HandleProgress>) {
      state.loaded = action.payload.loaded;
      state.loadedSeconds = action.payload.loadedSeconds;
      state.played = action.payload.played;
      state.playedSeconds = action.payload.playedSeconds;
    },
    handleEnded(state) {
      state.playing = state.loop;
    },
    handleDuration(state, action: PayloadAction<{ duration: number }>) {
      state.duration = action.payload.duration;
    },
    getUrlStart(state) {
      state.loading = true;
    },
    getUrlSuccess(state) {
      state.error = "No error";
      state.loading = false;
    },
    getUrlFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    }
  }
});
export const {
  setTrack,
  playPause,
  toggleLoop,
  volumeChange,
  toggleMuted,
  play,
  pause,
  setLoading,
  seekMouseDown,
  seekMouseUp,
  seekChange,
  handleDuration,
  handleEnded,
  handleProgress,
  getUrlFailed,
  getUrlSuccess,
  getUrlStart
} = playerSlice.actions;
export default playerSlice.reducer;

export const getUrl = (
  artists: string,
  title: string
): AppThunk => async dispatch => {
  dispatch(getUrlStart());
  let backendUrl = process.env.REACT_APP_SPOTIFY_BACKEND_URL;
  axios
    .get(backendUrl + "/search?q=" + artists + " " + title)
    .then((res: AxiosResponse) => {
      const url = res.data.url;
      dispatch(getUrlSuccess());
      dispatch(setTrack(url));
    })
    .catch(err => {
      dispatch(getUrlFailed("An error occurred"));
    });
};
