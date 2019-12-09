import React, { useEffect, useState } from "react";
import CardMedia from "../../CardMedia/CardMedia";
import Spotify from "../../Spotify/Spotify";
import GridCardContainer from "../../GridContainer/GridCardContainer/GridCardContainer"

const Categories = props => {
  const [getFeaturedPlaylists, setFeaturedPlaylists] = useState([]);

  useEffect(() => {
    (async () => {
      let featuredPlaylists = await Spotify.getFeaturedPlaylists();
      setFeaturedPlaylists(featuredPlaylists.playlists.items);
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
      <h1 style={{marginLeft: "30px"}}>Editor's picks</h1>

      <GridCardContainer>{playlistCards}</GridCardContainer>
    </>
  );
};

export default Categories;
