import React from "react";
import { Link } from "react-router-dom";

const Playlist = props => {
  return <Link to={"/playlists/" + props.id}>{props.name}</Link>;
};

export default Playlist;
