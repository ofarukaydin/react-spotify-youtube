import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import MediaCard from "../components/MediaCard";
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
    <Grid item xs={2} wrap="nowrap">
      <MediaCard
        key={playlist.id}
        link={`/playlists/${playlist.id}`}
        img={playlist.image}
        content={playlist.name}
      />
    </Grid>
  ));

  return (
    <>
      <h1 style={{textAlign: "center"}}>Editor's picks</h1>
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
    </>
  );
};

export default Categories;
