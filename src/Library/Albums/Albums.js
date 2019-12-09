import React, { useEffect, useState } from "react";
import Spotify from "../../Spotify/Spotify";
import CardMedia from "../../CardMedia/CardMedia";
import GridCardContainer from "../../GridContainer/GridCardContainer/GridCardContainer";

const Albums = () => {
  const [getSavedAlbums, setSavedAlbums] = useState([]);

  useEffect(() => {
    (async () => {
      let savedAlbums = await Spotify.getSavedAlbums();
      setSavedAlbums(savedAlbums.items);
    })();
  }, []);

  let albumsList = getSavedAlbums.map(album => (
    <CardMedia
      key={album.album.id}
      url={`/albums/${album.album.id}`}
      image={album.album.images[0].url}
      title={album.album.name}
    />
  ));

  return <GridCardContainer>{albumsList}</GridCardContainer>;
};

export default Albums;
