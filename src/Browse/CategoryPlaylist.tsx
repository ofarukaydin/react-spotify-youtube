import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardMedia from "../CardMedia/CardMedia";
import Spotify from "../Spotify/Spotify";
import { useLocation } from "react-router";
import GridCardContainer from "../GridContainer/GridCardContainer";
import { Playlist } from "../Spotify/interfaces";

const CategoryPlaylists = () => {
  const [getCategoryPlaylists, setCategoryPlaylists] = useState<Playlist[]>([]);
  const params = useParams<{ categoryId: string }>();
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

  return (
    <>
      <h1 style={{ marginLeft: "30px" }}>
        {location.state ? location.state.categoryName : ""}
      </h1>
      <GridCardContainer>{playlistCards}</GridCardContainer>
    </>
  );
};

export default CategoryPlaylists;
