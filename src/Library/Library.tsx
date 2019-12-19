import React from "react";
import { NavLink } from "react-router-dom";

const Library = () => {
  return (
    <div className="browseNavbar">
      <ul>
        <li>
          <NavLink activeClassName="isActive" to="/library/liked">
            Liked Songs
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="isActive" to="/library/albums">
            Albums
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="isActive" to="/library/playlists">
            Playlists
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Library;
