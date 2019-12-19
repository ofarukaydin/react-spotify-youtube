import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CurrentTrack = {
  name: string;
  artists: {
    name: string;
    id: string;
  }[];
  album?: string;
  duration: number;
  addedAt?: string;
  albumId?: string;
  id: string;
};

const currentTrackSlice = createSlice({
  name: "currentTrack",
  initialState: {
    name: "",
    artists: [{}],
    album: "",
    duration: 0,
    addedAt: "",
    albumId: "",
    id: ""
  },
  reducers: {
    setCurrentTrack(state, action: PayloadAction<CurrentTrack>) {
      state.name = action.payload.name;
      state.artists = action.payload.artists;
      if (
        action.payload.album &&
        action.payload.addedAt &&
        action.payload.albumId
      ) {
        state.album = action.payload.album;
        state.addedAt = action.payload.addedAt;
        state.albumId = action.payload.albumId;
      }
      state.duration = action.payload.duration;
      state.id = action.payload.id;
    }
  }
});
export const { setCurrentTrack } = currentTrackSlice.actions;
export default currentTrackSlice.reducer;
