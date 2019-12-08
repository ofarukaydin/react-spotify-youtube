import React, { useEffect, useState } from "react";
import Spotify from "../../../Spotify/Spotify";
import { useParams } from "react-router-dom";
import Track from "./Track/Track";
import "./Tracks.css";
import GridContainer from "../../../GridContainer/GridContainer";
import GridLeft from "../../../GridContainer/GridLeft/GridLeft";
import GridRight from "../../../GridContainer/GridRight/GridRight";

const Tracks = props => {
  const [getPlaylistDetails, setPlaylistDetails] = useState({});
  const [getPlaylistTracks, setPlaylistTracks] = useState([]);

  const params = useParams();
  useEffect(() => {
    (async () => {
      let playlist = await Spotify.getPlaylistDetails(params.playlistId);
      const iconList = playlist.images.map(icon => icon.url);
      setPlaylistDetails({
        image: iconList[0],
        id: playlist.id,
        name: playlist.name,
        owner: playlist.owner.display_name,
        ownerId: playlist.owner.id,
        description: playlist.description,
        primary_color: playlist.primary_color
      });
      let tracks = await Spotify.getTracks(params.playlistId);
      const tracksList = tracks.items.map(trackElement => {
        const artistList = trackElement.track.artists
          ? trackElement.track.artists.map(artistElement => {
              return { name: artistElement.name, id: artistElement.id };
            })
          : { name: "", id: "" };

        return {
          title: trackElement.track.name,
          artists: artistList,
          album: trackElement.track.album.name,
          duration: trackElement.track.duration_ms,
          addedAt: trackElement.added_at.slice(0, 10),
          albumId: trackElement.track.album.id
        };
      });
      setPlaylistTracks(tracksList);
    })();
  }, [params.playlistId]);
  let keyIndex = 0;
  const trackElements = getPlaylistTracks.map(track => (
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
          name={getPlaylistDetails.name}
          owner={getPlaylistDetails.owner}
          description={getPlaylistDetails.description}
          image={getPlaylistDetails.image}
        ></GridLeft>
        <GridRight>{trackElements ? trackElements : null}</GridRight>
      </GridContainer>

  );
};

export default Tracks;
