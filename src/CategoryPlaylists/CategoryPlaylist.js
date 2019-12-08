import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardMedia from "../CardMedia/CardMedia";
import Spotify from "../Spotify/Spotify";

const CategoryPlaylists = props => {
  const [getCategoryPlaylists, setCategoryPlaylists] = useState([]);
  const params = useParams();
  useEffect(() => {
    (async () => {
      let playlists = await Spotify.getCategoryPlaylists(params.categoryId);
      console.log(playlists.playlists.items);
      setCategoryPlaylists(playlists.playlists.items);
    })();
  }, [params.categoryId]);

  const playlists = getCategoryPlaylists.map(playlist => {
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
  console.log(playlists);

  return (

    <div className="card-grid-container">{playlistCards}</div>

  );
};

export default CategoryPlaylists;
