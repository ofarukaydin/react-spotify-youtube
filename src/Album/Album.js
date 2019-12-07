import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@material-ui/core";
import MediaCard from "../components/MediaCard";
import Spotify from "../Spotify/Spotify";

const Album = props => {
  const [getAlbum, SetAlbum] = useState([]);
  const params = useParams();
  useEffect(() => {
    (async () => {
      let albums = await Spotify.getAlbums(params.albumId);
      console.log(albums);
/*       setCategoryPlaylists(playlists.playlists.items);
 */    })();
  }, [params.albumId]);


  return (
      <h1>Albums</h1>
/*     <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      spacing={16}
      style={{ marginBottom: "90px", width: "100%" }}
    >
      {playlistCards}
    </Grid> */
  );
};

export default Album;