import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: {
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
  },
  reducers: {
    setTrack(state, action) {
      state.url = action.payload.url;
      state.played = 0;
      state.loaded = 0;
      state.pip = false;
      state.playing = true;
    },
    playPause(state, action) {
      state.playing = !state.playing;
    },
    toggleLoop(state, action) {
      state.loop = !state.loop;
    },
    volumeChange(state, action) {
      state.volume = action.payload.value;
    },
    toggleMuted(state, action) {
      state.muted = !state.muted;
    },
    play(state, action) {
      state.playing = true;
    },
    pause(state, action) {
      state.playing = false;
    },
    setLoading(state, action) {
      state.loading = action.payload.loading;
    },
    seekMouseDown(state, action) {
      state.seeking = true;
    },
    seekChange(state, action) {
      state.played = action.payload.value;
    },
    seekMouseUp(state, action) {
      state.seeking = false;
    },
    handleProgress(state, action) {
      state = { ...state, ...action.payload.value };
    },
    handleEnded(state, action) {
      state.playing = state.loop;
    },
    handleDuration(state, action) {
      state = { ...state, ...action.payload.value };
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
  handleProgress
} = playerSlice.actions;
export default playerSlice.reducer;
