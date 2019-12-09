import React from "react";
import { NavLink } from "react-router-dom";
import "./Browse.css"

const Browse = props => {
  return (
    <div className="browseNavbar">
      <ul>
        <li>
          <NavLink activeClassName="isActive" to="/browse/categories">Genres</NavLink>
        </li>
        <li>
          <NavLink activeClassName="isActive" to="/browse/featured">Featured</NavLink>
        </li>
        <li>
          <NavLink activeClassName="isActive" to="/browse/new">New Releases</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Browse;
