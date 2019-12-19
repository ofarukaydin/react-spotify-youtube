import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faPauseCircle
} from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { playPause, getUrl } from "../../store/reducers/playerReducer";
import {
  setCurrentTrack,
  CurrentTrack
} from "../../store/reducers/tracksReducer";
import { RootState } from "../../store/reducers/rootReducer";

type PropTypes = {
  artists: {
    name: string;
    id: string;
  }[];
  duration: number;
  name: string;
  track: CurrentTrack;
  albumId?: string;
  album?: string;
  addedAt?: string;
};

const Track = (props: PropTypes) => {
  const dispatch = useDispatch();
  const player = useSelector((state: RootState) => state.player);
  const currentTrack = useSelector((state: RootState) => state.currentTrack);

  const artistList = props.artists.map(
    (
      artist: { id: string | number | undefined; name: React.ReactNode },
      index: number
    ) => {
      return (
        <Link key={artist.id} to={`/artists/${artist.id}`}>
          {artist.name}
          {props.artists.length - 1 === index ? "" : ", "}
        </Link>
      );
    }
  );

  const artistNames = props.artists
    .map((artist: { name: any }) => artist.name)
    .join(", ");

  const handleClick = () => {
    if (currentTrack.duration === props.duration) {
      dispatch(playPause());
    } else {
      dispatch(getUrl(artistNames, props.name));
      dispatch(setCurrentTrack(props.track));
    }
  };

  return (
    <div
      className="tracks-container"
      style={
        !player.loading &&
        player.playing &&
        currentTrack.duration === props.duration
          ? { color: "green" }
          : { color: "white" }
      }
    >
      <div className="tracks-play-icon">
        <FontAwesomeIcon
          onClick={handleClick}
          style={
            !player.loading &&
            player.playing &&
            currentTrack.duration === props.duration
              ? { color: "green" }
              : { color: "white" }
          }
          icon={
            player.playing && currentTrack.duration === props.duration
              ? faPauseCircle
              : faPlayCircle
          }
          spin={
            currentTrack.duration === props.duration
              ? player.loading
              : undefined
          }
        />
      </div>
      <div
        className="tracks-title"
        style={
          !player.loading &&
          player.playing &&
          currentTrack.duration === props.duration
            ? { color: "green" }
            : { color: "white" }
        }
        onClick={handleClick}
      >
        {props.name}
      </div>
      <div className="tracks-artists-album" style={{ color: "grey" }}>
        {artistList} •{" "}
        <Link to={`/albums/${props.albumId}`}>{props.album}</Link>
      </div>
    </div>
  );
};

export default Track;
