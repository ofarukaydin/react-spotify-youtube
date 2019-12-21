import React, { useEffect, useState, useReducer, useRef } from "react";
import Spotify from "../Spotify/Spotify";
import GridCardContainer from "../GridContainer/GridCardContainer";
import CardMedia from "../CardMedia/CardMedia";
import Track from "../Tracks/Track";
import "./Search.css";

import {
  SearchTrackResults,
  SearchAlbumResults,
  SearchArtistResults,
  SearchPlaylistResults
} from "../Spotify/interfaces";

type ViewState = {
  albums: boolean;
  tracks: boolean;
  playlists: boolean;
  artists: boolean;
};

type SearchResultsState = {
  albums: SearchAlbumResults[];
  playlists: SearchPlaylistResults[];
  tracks: SearchTrackResults[];
  artists: SearchArtistResults[];
};
type Action =
  | { type: "albums" }
  | { type: "artists" }
  | { type: "playlists" }
  | { type: "tracks" };

const initialState = {
  albums: false,
  tracks: true,
  playlists: false,
  artists: false
};

function reducer(state: ViewState, action: Action) {
  switch (action.type) {
    case "albums":
      return { albums: true, tracks: false, playlists: false, artists: false };
    case "tracks":
      return { albums: false, tracks: true, playlists: false, artists: false };
    case "playlists":
      return { albums: false, tracks: false, playlists: true, artists: false };
    case "artists":
      return { albums: false, tracks: false, playlists: false, artists: true };
    default:
      throw new Error();
  }
}

const Search = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchValue, setSearchValue] = useState("");
  const [getSearchResults, setSearchResults] = useState<SearchResultsState>({
    albums: [],
    artists: [],
    playlists: [],
    tracks: []
  });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef && inputRef.current) {
        if (searchValue === inputRef.current.value) {
          (async () => {
            let search = await Spotify.searchAll(searchValue);
            setSearchResults(search);
          })();
        }
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchValue, inputRef]);

  let artistList = getSearchResults.artists.map(artist => (
    <CardMedia
      key={artist.id}
      url={`/artists/${artist.id}`}
      image={artist.image}
      title={artist.name}
      artistView
    />
  ));

  let playlistsList = getSearchResults.playlists.map(playlist => (
    <CardMedia
      key={playlist.id}
      url={`/playlists/${playlist.id}`}
      image={playlist.image}
      title={playlist.name}
    />
  ));
  let albumsList = getSearchResults.albums.map(album => (
    <CardMedia
      key={album.id}
      url={`/albums/${album.id}`}
      image={album.image}
      title={album.name}
    />
  ));
  let tracksList = getSearchResults.tracks.map((track, index) => (
    <Track
      key={index}
      name={track.name}
      artists={track.artists}
      album={track.album}
      duration={track.duration}
      track={track}
      albumId={track.albumId}
    />
  ));

  return (
    <>
      <div className="box">
        <div className="container-1">
          <input
            data-testid="searchinput"
            ref={inputRef}
            value={searchValue}
            onChange={event => setSearchValue(event.target.value)}
            type="search"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="browseNavbar">
        <ul>
          <li onClick={() => dispatch({ type: "tracks" })}>
            <span className={state.tracks ? "isActive" : undefined}>
              Tracks
            </span>
          </li>
          <li onClick={() => dispatch({ type: "artists" })}>
            <span className={state.artists ? "isActive" : undefined}>
              Artists
            </span>
          </li>
          <li onClick={() => dispatch({ type: "playlists" })}>
            <span className={state.playlists ? "isActive" : undefined}>
              Playlists
            </span>
          </li>
          <li onClick={() => dispatch({ type: "albums" })}>
            <span className={state.albums ? "isActive" : undefined}>
              Albums
            </span>
          </li>
        </ul>
      </div>
      {state.artists ? (
        <GridCardContainer>{artistList}</GridCardContainer>
      ) : null}

      {state.playlists ? (
        <GridCardContainer>{playlistsList}</GridCardContainer>
      ) : null}

      {state.albums ? (
        <GridCardContainer>{albumsList}</GridCardContainer>
      ) : null}

      {state.tracks ? tracksList : null}
    </>
  );
};

export default Search;
