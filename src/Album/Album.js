import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spotify from "../Spotify/Spotify";
import Track from "../Sidenav/Playlists/Tracks/Track/Track"

const Album = props => {
  const [getAlbum, SetAlbum] = useState([]);
  const [getAlbumTracks, setAlbumTracks] = useState([])
  const params = useParams();
  useEffect(() => {
    (async () => {
      let album = await Spotify.getAlbums(params.albumId);
      console.log(album);
      const iconList = album.images.map(icon => icon.url);
      const artistsList = album.artists.map(artist => artist.name);
      SetAlbum({
        image: iconList[0],
        artists: artistsList.join(", "),
        id: album.id,
        name: album.name,
        releaseDate: album.release_date.slice(0, 4),
        totalTracks: album.total_tracks,
      })
      const tracksList = album.tracks.items.map(trackElement => {
        const artistList = trackElement.artists.map(artistElement => {
          return {name: artistElement.name, id: artistElement.id}
        });

        return {
          title: trackElement.name,
          artists: artistList,
          name: trackElement.name,
          duration: trackElement.duration_ms,
          trackNumber: trackElement.track_number,
          id: trackElement.id,
        };
      })
      setAlbumTracks(tracksList)
      
    })()
    
    ;
  }, [params.albumId]);

  
  let keyIndex = 0;
  const trackElements = getAlbumTracks.map(track => (
    <Track
      key={keyIndex++}
      title={track.title}
      artists={track.artists}
      album={getAlbum.name}
      duration={track.duration}
      track={track}
      albumId={getAlbum.id}
    />
  ));

  return (
    <div className="playlist-grid-container">
      <div className="playlist-left-container">
        <div className="playlist-left">
          <img
            className="playlist-img"
            src={getAlbum.image}
            alt="Cover"
          />
          <p className="playlist-name">{getAlbum.name}</p>
          <p className="playlist-owner">{getAlbum.artists}</p>
          <p className="playlist-description">
            {getAlbum.releaseDate} • {getAlbum.totalTracks} songs
          </p>
        </div>
      </div>
      <div className="playlist-right-container">
        <div className="playlist-right">
          {trackElements ? trackElements : null}
        </div>
      </div>
    </div>
  );
};



export default Album
