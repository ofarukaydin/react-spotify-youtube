import React, { useEffect, useState } from "react";
import Spotify from "../Spotify/Spotify";
import { useParams } from "react-router-dom";
import Track from "./Track/Track";
import "./Tracks.css";
import GridContainer from "../GridContainer/GridContainer";
import GridLeft from "../GridContainer/GridLeft/GridLeft";
import GridRight from "../GridContainer/GridRight/GridRight";

type PlaylistDetailsState = {
  images: string;
  id: string;
  name: string;
  owner: string;
  ownerId: string;
  description: string;
};

type PlaylistTracksState = {
  name: string;
  artists: {
    name: string;
    id: string;
  }[];
  album: string;
  duration: number;
  addedAt: string;
  albumId: string;
  id: string;
};

const Tracks = () => {
  const [getPlaylistDetails, setPlaylistDetails] = useState<
    PlaylistDetailsState
  >();
  const [getPlaylistTracks, setPlaylistTracks] = useState<
    PlaylistTracksState[]
  >([]);

  const params = useParams<{ playlistId: string }>();
  useEffect(() => {
    (async () => {
      let playlist = await Spotify.getPlaylistDetails(params.playlistId);
      const iconList = playlist.images.map(icon => icon.url);
      setPlaylistDetails({
        images: iconList[0],
        id: playlist.id,
        name: playlist.name,
        owner: playlist.owner.display_name,
        ownerId: playlist.owner.id,
        description: playlist.description
      });
      let tracks = await Spotify.getTracks(params.playlistId);
      if (tracks) {
        const filteredTrackList = tracks.items.filter(
          track => track.track !== null
        );
        const tracksList = filteredTrackList.map(trackElement => {
          const artistList = trackElement.track.artists.map(artistElement => {
            return { name: artistElement.name, id: artistElement.id };
          });
          return {
            name: trackElement.track.name,
            artists: artistList,
            album: trackElement.track.album.name,
            duration: trackElement.track.duration_ms,
            addedAt: trackElement.added_at.slice(0, 10),
            albumId: trackElement.track.album.id,
            id: trackElement.track.id
          };
        });
        setPlaylistTracks(tracksList);
      }
    })();
  }, [params.playlistId]);
  const trackElements = getPlaylistTracks.map((track, index) => (
    <Track
      key={index}
      name={track.name}
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
        name={getPlaylistDetails ? getPlaylistDetails.name : undefined}
        owner={getPlaylistDetails ? getPlaylistDetails.owner : undefined}
        description={
          getPlaylistDetails ? getPlaylistDetails.description : undefined
        }
        image={getPlaylistDetails ? getPlaylistDetails.images : undefined}
      ></GridLeft>
      <GridRight>{trackElements ? trackElements : null}</GridRight>
    </GridContainer>
  );
};

export default Tracks;
