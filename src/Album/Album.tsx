import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spotify from "../Spotify/Spotify";
import Track from "../Tracks/Track";
import GridContainer from "../GridContainer/GridContainer";
import GridLeft from "../GridContainer/GridLeft";
import GridRight from "../GridContainer/GridRight";

type AlbumState = {
  image: string;
  artists: string;
  id: string;
  name: string;
  releaseDate: string;
  totalTracks: number;
};

type AlbumTracksState = {
  artists: {
    name: string;
    id: string;
  }[];
  name: string;
  duration: number;
  id: string;
};

const Album = () => {
  const [getAlbum, SetAlbum] = useState<AlbumState>();
  const [getAlbumTracks, setAlbumTracks] = useState<AlbumTracksState[]>([]);
  const params = useParams<{ albumId: string }>();
  useEffect(() => {
    (async () => {
      let album = await Spotify.getAlbums(params.albumId);
      const iconList = album.images.map(icon => icon.url);
      const artistsList = album.artists.map(artist => artist.name);
      SetAlbum({
        image: iconList[0],
        artists: artistsList.join(", "),
        id: album.id,
        name: album.name,
        releaseDate: album.release_date.slice(0, 4),
        totalTracks: album.total_tracks
      });
      const tracksList = album.tracks.items.map(trackElement => {
        const artistList = trackElement.artists.map(artistElement => {
          return { name: artistElement.name, id: artistElement.id };
        });

        return {
          artists: artistList,
          name: trackElement.name,
          duration: trackElement.duration_ms,
          id: trackElement.id
        };
      });
      setAlbumTracks(tracksList);
    })();
  }, [params.albumId]);

  let trackElements;

  if (getAlbum) {
    trackElements = getAlbumTracks.map((track, index) => (
      <Track
        key={index}
        name={track.name}
        artists={track.artists}
        album={getAlbum.name}
        duration={track.duration}
        track={track}
        albumId={getAlbum.id}
      />
    ));
  }

  return (
    <GridContainer>
      <GridLeft
        name={getAlbum ? getAlbum.name : undefined}
        owner={getAlbum ? getAlbum.artists : undefined}
        description={
          getAlbum
            ? `${getAlbum.releaseDate} • ${getAlbum.totalTracks} songs`
            : undefined
        }
        image={getAlbum ? getAlbum.image : undefined}
      ></GridLeft>
      <GridRight>{trackElements ? trackElements : undefined}</GridRight>
    </GridContainer>
  );
};

export default Album;
