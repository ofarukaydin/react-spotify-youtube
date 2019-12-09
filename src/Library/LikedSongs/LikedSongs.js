import React, { useEffect, useState } from "react";
import Spotify from "../../Spotify/Spotify";
import Track from "../../Sidenav/Playlists/Tracks/Track/Track";
import GridContainer from "../../GridContainer/GridContainer";
import GridRight from "../../GridContainer/GridRight/GridRight";
import GridLeft from "../../GridContainer/GridLeft/GridLeft";

const LikedSongs = () => {
  const [getLikedSongs, setLikedSongs] = useState([]);
  const [getTotalSongs, setTotalSongs] = useState([]);

  useEffect(() => {
    (async () => {
      let likedSongs = await Spotify.getLikedSongs();
      setTotalSongs(likedSongs.total);

      const tracksList = likedSongs.items.map(trackElement => {
        const artistList = trackElement.track.artists.map(artistElement => {
          return { name: artistElement.name, id: artistElement.id };
        });

        return {
          title: trackElement.track.name,
          artists: artistList,
          album: trackElement.track.album.name,
          duration: trackElement.track.duration_ms,
          addedAt: trackElement.added_at.slice(0, 10),
          albumId: trackElement.track.album.id
        };
      });
      setLikedSongs(tracksList);
    })();
  }, []);

  let keyIndex = 0;
  const trackElements = getLikedSongs.map(track => (
    <Track
      key={keyIndex++}
      title={track.title}
      addedAt={track.addedAt}
      artists={track.artists}
      album={track.album}
      duration={track.duration}
      track={track}
      albumId={track.albumId}
    />
  ));

  return (
    <GridContainer>
      <GridLeft
        name="Liked Songs"
        owner={`${getTotalSongs} SONGS`}
        image="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
      ></GridLeft>
      <GridRight>{trackElements ? trackElements : null}</GridRight>
    </GridContainer>
  );
};

export default LikedSongs;
