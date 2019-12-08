import React from "react";
import Playlists from "./Playlists/Playlists";
import "./Sidenav.css";
import { Link } from "react-router-dom";

const Sidenav = props => {
  return (
    <div className="Sidenav">
      <Link to="/browse/categories">Browse</Link>
      <Link to="/search">Search</Link>
      <Link to="/library/liked">Library</Link>
      <Playlists />
    </div>
  );
};

export default Sidenav;
