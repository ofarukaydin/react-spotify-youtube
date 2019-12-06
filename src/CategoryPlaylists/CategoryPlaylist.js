import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@material-ui/core";
import MediaCard from "../components/MediaCard";
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
    <Grid item xs={2} wrap="nowrap">
      <MediaCard
        key={playlist.id}
        link={`/playlists/${playlist.id}`}
        img={playlist.image}
        content={playlist.name}
      />
    </Grid>
  ));
  console.log(playlists);

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      spacing={16}
      style={{ marginBottom: "90px", width: "100%" }}
    >
      {playlistCards}
    </Grid>
  );
};

export default CategoryPlaylists;
