import './App.css';
import Sidenav from "./Sidenav/Sidenav"
import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import Tracks from "./Sidenav/Playlists/Tracks/Tracks"
import Player from "./Player/Player"
import styles from "./App.css"

const App = () => {




  return (
    <div className={styles.App}>

    <BrowserRouter>
        <Route path={"/playlists/:playlistId"} exact component={Tracks}/> 
        <Route path="/" component={Sidenav} />
    </BrowserRouter>
    <Player />
    </div>
  );
}

export default App;
