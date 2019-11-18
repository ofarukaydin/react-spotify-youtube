import './App.css';
import Sidenav from "./Sidenav/Sidenav"
import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import Tracks from "./Sidenav/Playlists/Tracks/Tracks"

const App = () => {




  return (
    <BrowserRouter>
      <Route path={"/playlists/:playlistId"} exact render={() => <Tracks/>}/> 
      <Route path="/" exact component={Sidenav} ></Route>
    </BrowserRouter>
  );
}

export default App;
