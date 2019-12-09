import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardMedia from "../../CardMedia/CardMedia";
import Spotify from "../../Spotify/Spotify";
import { useLocation } from "react-router";
import GridCardContainer from "../../GridContainer/GridCardContainer/GridCardContainer";

const CategoryPlaylists = props => {
  const [getCategoryPlaylists, setCategoryPlaylists] = useState([]);
  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      let playlists = await Spotify.getCategoryPlaylists(params.categoryId);
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

  return (
    <>
      <h1 style={{ marginLeft: "30px" }}>{location.state.categoryName}</h1>
      <GridCardContainer>{playlistCards}</GridCardContainer>
    </>
  );
};

export default CategoryPlaylists;
