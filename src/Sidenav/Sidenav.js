import React from "react"
import Playlists from "./Playlists/Playlists"
import styles from "./Sidenav.module.css"

import {Link} from "react-router-dom"

const Sidenav = (props) => {

    return (
        <div className={styles.Sidenav}>
          <Link to="/categories">Categories</Link>
          <Link to="/featured">Featured</Link>
          <Link to="/new">New Releases</Link>
          <Playlists />
        </div>
      );
}

export default Sidenav