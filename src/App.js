import './App.css';
import Sidenav from "./Sidenav/Sidenav"
import React from "react"
import { Route } from "react-router-dom"
import Tracks from "./Sidenav/Playlists/Tracks/Tracks"
import Player from "./Player/Player"
import styles from "./App.css"

const App = () => {




  return (
    <div className={styles.App}>
        <Route path={"/playlists/:playlistId"} exact component={Tracks}/> 
        <Route path="/" component={Sidenav} />
    <Player />
    </div>
  );
}

export default App;
