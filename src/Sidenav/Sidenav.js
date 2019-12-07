import React from "react";
import Playlists from "./Playlists/Playlists";
import "./Sidenav.css";
import { Link } from "react-router-dom";

const Sidenav = props => {
  return (
    <div className="Sidenav">
      <Link to="/categories">Categories</Link>
      <Link to="/featured">Featured</Link>
      <Link to="/new">New Releases</Link>
      <Link to="/card">Test Cards</Link>
      <Playlists />
    </div>
  );
};

export default Sidenav;
