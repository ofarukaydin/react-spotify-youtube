import React, { useEffect, useState } from "react";
import Playlist from "./Playlist/Playlist";
import Spotify from "../../Spotify/Spotify";

const Playlists = props => {
  const [Playlists, setPlaylists] = useState([]);

  useEffect(() => {
    (async () => {
      let playlists = await Spotify.getPlayList();
      const playlistArray = playlists.items.map(playlist => {
        return {
          name: playlist.name,
          id: playlist.id
        };
      });
      setPlaylists(playlistArray);
    })();
  }, []);

  let playlistElement = Playlists.map(playlist => {
    return (<Playlist key={playlist.id} name={playlist.name} id={playlist.id} />);
  });

  return (
    <div className="playlistNavbar">
    <ul>
      {playlistElement}
    </ul>
  </div>
  );
};

export default Playlists;
