import React from "react";
import { NavLink } from "react-router-dom";

const Playlist = props => {
  return (
    <li>
      <NavLink activeClassName="playlistActive" to={"/playlists/" + props.id}>
        {props.name}
      </NavLink>
    </li>
  );
};

export default Playlist;
