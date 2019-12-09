import React, { useEffect, useState } from "react";
import CardMedia from "../../CardMedia/CardMedia"
import Spotify from "../../Spotify/Spotify";
import GridCardContainer from "../../GridContainer/GridCardContainer/GridCardContainer"

const Categories = props => {
  const [getNewReleases, setNewReleases] = useState([]);

  useEffect(() => {
    (async () => {
      let newReleases = await Spotify.getNewReleases();
      

      const newList = newReleases.albums.items.map(newElement => {
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

      setNewReleases(newList)

    })();
  }, []);

  let newReleasesCards = getNewReleases.map(newRelease => (
      <CardMedia
        key={newRelease.id}
        url={`/albums/${newRelease.id}`}
        image={newRelease.image}
        title={newRelease.name}
      />
  ));

  return <><h1 style={{marginLeft: "30px"}}>New Releases</h1><GridCardContainer>{newReleasesCards}</GridCardContainer></>
};

export default Categories;
