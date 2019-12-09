import React, { useEffect, useState } from "react";
import Spotify from "../../Spotify/Spotify";
import CardMedia from "../../CardMedia/CardMedia";
import GridCardContainer from "../../GridContainer/GridCardContainer/GridCardContainer";
const Playlists = () => {
  const [getPlaylists, setPlaylists] = useState([]);

  useEffect(() => {
    (async () => {
      let playlists = await Spotify.getPlayList();
      setPlaylists(playlists.items);
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
      description: playlist.description,
      primary_color: playlist.primary_color
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
