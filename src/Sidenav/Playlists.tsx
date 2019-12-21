import React, { useEffect, useState } from "react";
import Playlist from "./Playlist";
import Spotify from "../Spotify/Spotify";

type PlaylistsState = {
  name: string;
  id: string;
}[];

const Playlists = () => {
  const [Playlists, setPlaylists] = useState<PlaylistsState>([]);

  useEffect(() => {
    (async () => {
      let playlists = await Spotify.getPlayList();
      if (playlists) {
        const playlistArray = playlists.items.map(playlist => {
          return {
            name: playlist.name,
            id: playlist.id
          };
        });
        setPlaylists(playlistArray);
      }
    })();
  }, []);

  let playlistElement = Playlists.map(playlist => {
    return <Playlist key={playlist.id} name={playlist.name} id={playlist.id} />;
  });

  return (
    <div className="playlistNavbar">
      <ul>{playlistElement}</ul>
    </div>
  );
};

export default Playlists;
