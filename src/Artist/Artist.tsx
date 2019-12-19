import React, { useEffect, useState } from "react";
import Spotify from "../Spotify/Spotify";
import { useParams } from "react-router-dom";
import Track from "../Tracks/Track/Track";
import CardMedia from "../CardMedia/CardMedia";
import GridCardContainer from "../GridContainer/GridCardContainer/GridCardContainer";
import GridContainer from "../GridContainer/GridContainer";
import GridLeft from "../GridContainer/GridLeft/GridLeft";
import GridRight from "../GridContainer/GridRight/GridRight";

type PopularTracksState = {
  name: string;
  artists: {
    name: string;
    id: string;
  }[];
  album: string;
  duration: number;
  albumId: string;
  id: string;
};

type ArtistInfoState = {
  name: string;
  image: string;
  followers: number;
  genres: string;
  popularity: number;
  id: string;
};

type ArtistsAlbumsState = {
  image: string;
  artists: string;
  id: string;
  name: string;
  releaseDate: string;
  totalTracks: number;
};

const Artist = () => {
  const params = useParams<{ artistId: string }>();
  const [getPopularTracks, setPopularTracks] = useState<PopularTracksState[]>(
    []
  );
  const [getArtistsAlbums, setArtistsAlbums] = useState<ArtistsAlbumsState[]>(
    []
  );
  const [getArtistInfo, setArtistInfo] = useState<ArtistInfoState>();

  useEffect(() => {
    (async () => {
      let artistTracks = await Spotify.getArtistsTopTracks(params.artistId);

      const tracksList = artistTracks.tracks.map(trackElement => {
        const artistList = trackElement.artists.map(artistElement => {
          return { name: artistElement.name, id: artistElement.id };
        });

        return {
          name: trackElement.name,
          artists: artistList,
          album: trackElement.album.name,
          duration: trackElement.duration_ms,
          albumId: trackElement.album.id,
          id: trackElement.id
        };
      });
      setPopularTracks(tracksList);

      let artistInfo = await Spotify.getArtist(params.artistId);
      let artistInfoList = {
        name: artistInfo.name,
        image: artistInfo.images.map(image => image.url)[0],
        followers: artistInfo.followers.total,
        genres: artistInfo.genres.join(", "),
        popularity: artistInfo.popularity,
        id: artistInfo.id
      };

      setArtistInfo(artistInfoList);

      let albums = await Spotify.getArtistsAlbums(params.artistId);
      const albumList = albums.items.map(album => {
        const iconList = album.images.map(icon => icon.url);
        const artistsList = album.artists.map(artist => artist.name);
        return {
          image: iconList[0],
          artists: artistsList.join(", "),
          id: album.id,
          name: album.name,
          releaseDate: album.release_date.slice(0, 4),
          totalTracks: album.total_tracks
        };
      });

      setArtistsAlbums(albumList);
    })();
  }, [params]);
  const popularTracks = getPopularTracks.map(track => (
    <Track
      key={track.id}
      name={track.name}
      artists={track.artists}
      album={track.album}
      duration={track.duration}
      track={track}
      albumId={track.albumId}
    />
  ));

  let albumsList = getArtistsAlbums.map(album => (
    <CardMedia
      key={album.id}
      url={`/albums/${album.id}`}
      image={album.image}
      title={album.name}
    />
  ));

  return (
    <>
      <GridContainer>
        <GridLeft
          name={getArtistInfo ? getArtistInfo.name : undefined}
          owner={
            getArtistInfo ? `${getArtistInfo.followers} followers` : undefined
          }
          image={getArtistInfo ? getArtistInfo.image : undefined}
          artistView
        ></GridLeft>
        <GridRight>
          <h1 style={{ margin: "30px 0 0 15px" }}>Popular Tracks</h1>
          {popularTracks ? popularTracks : undefined}
        </GridRight>
      </GridContainer>
      <h1 style={{ textAlign: "center" }}>Albums</h1>
      <GridCardContainer>{albumsList}</GridCardContainer>
    </>
  );
};

export default Artist;
