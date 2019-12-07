import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import MediaCard from "../components/MediaCard";
import Spotify from "../Spotify/Spotify";

const Categories = props => {
  const [getNewReleases, setNewReleases] = useState([]);

  useEffect(() => {
    (async () => {
      let newReleases = await Spotify.getNewReleases();
      setNewReleases(newReleases.albums.items)

    })();
  }, []);

  const newList = getNewReleases.map(newElement => {
    const artistList = newElement.artists.map(artistElement => {
      return artistElement.name;
    });
    const iconList = newElement.images.map(icon => icon.url)

    return {
      name: newElement.name,
      artists: artistList.join(", "),
      id: newElement.id,
      releaseDate: newElement.release_date,
      totalTracks: newElement.total_tracks,
      albumType: newElement.album_type,
      image: iconList[0],
    };
  })
  console.log(newList)


  let newReleasesCards = getNewReleases.map(newRelease => (
    <Grid item xs={2}>
      <MediaCard
        key={newRelease.id}
        link={`/albums/${newRelease.id}`}
        img={newRelease.image}
        content={newRelease.name}
      />
    </Grid>
  ));

  return (
    <>
      <h1 style={{textAlign: "center"}}>New Releases</h1>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={16}
        style={{ marginBottom: "90px", width: "100%" }}
      >
        {newReleasesCards}
      </Grid>
    </>
  );
};

export default Categories;
