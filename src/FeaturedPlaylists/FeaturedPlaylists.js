import React, { useEffect, useState } from "react";
import CardMedia from "../CardMedia/CardMedia";
import Spotify from "../Spotify/Spotify";

const Categories = props => {
  const [getFeaturedPlaylists, setFeaturedPlaylists] = useState([]);

  useEffect(() => {
    (async () => {
      let featuredPlaylists = await Spotify.getFeaturedPlaylists();
      setFeaturedPlaylists(featuredPlaylists.playlists.items);
      console.log(featuredPlaylists);
    })();
  }, []);

  const playlists = getFeaturedPlaylists.map(playlist => {
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

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Editor's picks</h1>

      <div className="card-grid-container">{playlistCards}</div>
    </>
  );
};

export default Categories;
