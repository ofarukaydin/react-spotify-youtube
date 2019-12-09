import React, { useEffect, useState, useReducer, useRef } from "react";
import Spotify from "../Spotify/Spotify";
import GridCardContainer from "../GridContainer/GridCardContainer/GridCardContainer";
import CardMedia from "../CardMedia/CardMedia";
import Track from "../Sidenav/Playlists/Tracks/Track/Track";
import "./Search.css";

const initialState = {
  albums: false,
  tracks: true,
  playlists: false,
  artists: false
};

function reducer(state, action) {
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
  const [getSearchResults, setSearchResults] = useState({
    albums: [],
    artists: [],
    playlists: [],
    tracks: []
  });
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue === inputRef.current.value) {
        (async () => {
          let search = await Spotify.searchTracks(searchValue);
          setSearchResults(search);
        })();
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchValue, inputRef]);

  let artistList = getSearchResults.artists.map(artist => (
    <CardMedia
      url={`/artists/${artist.id}`}
      image={artist.image}
      title={artist.name}
      artistView
    />
  ));
  console.log(getSearchResults);

  let playlistsList = getSearchResults.playlists.map(playlist => (
    <CardMedia
      url={`/playlists/${playlist.id}`}
      image={playlist.image}
      title={playlist.name}
    />
  ));
  let albumsList = getSearchResults.albums.map(album => (
    <CardMedia
      url={`/albums/${album.id}`}
      image={album.image}
      title={album.name}
    />
  ));
  let keyIndex = 0;
  let tracksList = getSearchResults.tracks.map(track => (
    <Track
      key={keyIndex++}
      title={track.name}
      artists={track.artists}
      album={track.album}
      duration={track.duration}
      track={track}
      albumId={track.albumId}
    />
  ));

  return (
    <>
      <div class="box">
        <div class="container-1">
          <input
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
            <a className={state.tracks ? "isActive" : null}>Tracks</a>
          </li>
          <li onClick={() => dispatch({ type: "artists" })}>
            <a className={state.artists ? "isActive" : null}>Artists</a>
          </li>
          <li onClick={() => dispatch({ type: "playlists" })}>
            <a className={state.playlists ? "isActive" : null}>Playlists</a>
          </li>
          <li onClick={() => dispatch({ type: "albums" })}>
            <a className={state.albums ? "isActive" : null}>Albums</a>
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
