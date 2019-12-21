import React, { useEffect, useState } from "react";
import Spotify from "../Spotify/Spotify";
import CardMedia from "../CardMedia/CardMedia";
import GridCardContainer from "../GridContainer/GridCardContainer";
import { ISearch } from "../Spotify/interfaces";

const Playlists = () => {
  const [getPlaylists, setPlaylists] = useState<ISearch["playlists"]["items"]>(
    []
  );

  useEffect(() => {
    (async () => {
      let playlists = await Spotify.getPlayList();
      if (playlists) {
        setPlaylists(playlists.items);
      }
    })();
  }, []);

  const playlists = getPlaylists.map(playlist => {
    const iconList = playlist.images.map(icon => icon.url);
    return {
      image: iconList[0],
      id: playlist.id,
      name: playlist.name,
      owner: playlist.owner.display_name,
      ownerId: playlist.owner.id,
      description: playlist.description
    };
  });

  let playlistCards = playlists.map(playlist => (
    <CardMedia
      key={playlist.id}
      url={`/playlists/${playlist.id}`}
      image={playlist.image}
      title={playlist.name}
    />
  ));

  return <GridCardContainer>{playlistCards}</GridCardContainer>;
};

export default Playlists;
