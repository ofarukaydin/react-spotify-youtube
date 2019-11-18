import React from "react"
import Playlists from "./Playlists/Playlists"
import styles from "./Sidenav.module.css"


const Sidenav = (props) => {

    return (
        <div className={styles.Sidenav}>
          <Playlists />
        </div>
      );
}

export default Sidenav