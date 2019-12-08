import React from "react";
import Playlists from "./Playlists/Playlists";
import "./Sidenav.css";
import { Link } from "react-router-dom";

const Sidenav = props => {
  return (
    <div className="Sidenav">
      <Link to="/browse">Browse</Link>
      <Playlists />
    </div>
  );
};

export default Sidenav;
