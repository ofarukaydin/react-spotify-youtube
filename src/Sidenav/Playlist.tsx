import React from "react";
import { NavLink } from "react-router-dom";

const Playlist = (props: { id: string; name: string }) => {
  return (
    <li>
      <NavLink activeClassName="playlistActive" to={"/playlists/" + props.id}>
        {props.name}
      </NavLink>
    </li>
  );
};

export default Playlist;
